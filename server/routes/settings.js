import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { requireAuth } from './auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const settingsPath = path.join(__dirname, '../data/settings.json');
const uploadsPath = path.join(__dirname, '../uploads');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `site-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Default settings
const defaultSettings = {
  site: {
    name: 'זרקור פרסום ושיווק',
    tagline: 'המומחים למוצרי פרסום וקידום מכירות',
    logo: '/images/logo.png',
    favicon: '/images/favicon.ico',
    email: 'info@zarkor.co.il',
    phone: '03-1234567',
    whatsapp: '972501234567',
    address: 'רחוב הדוגמה 123, תל אביב'
  },
  homepage: {
    heroTitle: 'פתרונות פרסום מקצועיים לעסק שלך',
    heroSubtitle: 'מגוון רחב של מוצרי קידום מכירות, מתנות לעובדים וציוד משרדי ממותג',
    heroImage: '/images/hero-bg.jpg',
    showBestSellers: true,
    showCategories: true,
    showAdvantages: true
  },
  about: {
    title: 'אודות זרקור',
    content: 'זרקור פרסום ושיווק היא חברה מובילה בתחום מוצרי הפרסום והקד"מ...',
    image: '/images/about.jpg'
  },
  story: {
    title: 'הסיפור שלנו',
    content: 'הסיפור של זרקור התחיל לפני למעלה מ-20 שנה...',
    image: '/images/story.jpg'
  },
  contact: {
    title: 'צור קשר',
    subtitle: 'נשמח לעמוד לשירותכם',
    mapEmbed: ''
  },
  footer: {
    copyright: '© 2024 זרקור פרסום ושיווק. כל הזכויות שמורות.',
    socialLinks: {
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  },
  categories: [
    { id: 'writing', name: 'כלי כתיבה', icon: 'Pen', color: '#ec4899' },
    { id: 'office', name: 'סביבת משרד', icon: 'Briefcase', color: '#8b5cf6' },
    { id: 'promo', name: 'מוצרי קד"מ', icon: 'Gift', color: '#06b6d4' },
    { id: 'gifts', name: 'מתנות לעובדים', icon: 'Heart', color: '#f59e0b' },
    { id: 'tech', name: 'טכנולוגיה וגאדג\'טים', icon: 'Smartphone', color: '#10b981' }
  ]
};

// Initialize settings
async function initSettings() {
  try {
    await fs.access(settingsPath);
  } catch {
    await fs.writeFile(settingsPath, JSON.stringify(defaultSettings, null, 2));
  }
}

initSettings();

// Read settings
async function readSettings() {
  try {
    const data = await fs.readFile(settingsPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return defaultSettings;
  }
}

// Save settings
async function saveSettings(settings) {
  await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
}

// GET /api/settings - Get all settings (public)
router.get('/', async (req, res) => {
  try {
    const settings = await readSettings();
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error reading settings:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בטעינת ההגדרות'
    });
  }
});

// PUT /api/settings - Update settings (protected)
router.put('/', requireAuth, async (req, res) => {
  try {
    const updates = req.body;
    const settings = await readSettings();

    // Merge updates
    const newSettings = {
      ...settings,
      ...updates,
      site: { ...settings.site, ...updates.site },
      homepage: { ...settings.homepage, ...updates.homepage },
      about: { ...settings.about, ...updates.about },
      story: { ...settings.story, ...updates.story },
      contact: { ...settings.contact, ...updates.contact },
      footer: { ...settings.footer, ...updates.footer }
    };

    if (updates.categories) {
      newSettings.categories = updates.categories;
    }

    await saveSettings(newSettings);

    res.json({
      success: true,
      message: 'ההגדרות עודכנו בהצלחה',
      data: newSettings
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בעדכון ההגדרות'
    });
  }
});

// POST /api/settings/upload - Upload image (protected)
router.post('/upload', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'לא נבחר קובץ'
      });
    }

    res.json({
      success: true,
      message: 'הקובץ הועלה בהצלחה',
      data: {
        url: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בהעלאת הקובץ'
    });
  }
});

// GET /api/settings/categories - Get categories
router.get('/categories', async (req, res) => {
  try {
    const settings = await readSettings();
    res.json({
      success: true,
      data: settings.categories
    });
  } catch (error) {
    console.error('Error reading categories:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בטעינת הקטגוריות'
    });
  }
});

// PUT /api/settings/categories - Update categories (protected)
router.put('/categories', requireAuth, async (req, res) => {
  try {
    const { categories } = req.body;
    const settings = await readSettings();
    settings.categories = categories;
    await saveSettings(settings);

    res.json({
      success: true,
      message: 'הקטגוריות עודכנו בהצלחה',
      data: categories
    });
  } catch (error) {
    console.error('Error updating categories:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בעדכון הקטגוריות'
    });
  }
});

export default router;
