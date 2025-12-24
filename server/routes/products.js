import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/products.json');
const uploadsPath = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
fs.mkdir(uploadsPath, { recursive: true }).catch(console.error);

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'product-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('סוג קובץ לא נתמך. יש להעלות תמונות בלבד (JPEG, PNG, WebP, GIF)'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Helper function to read products
async function readProducts() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

// Helper function to save products
async function saveProducts(products) {
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2), 'utf8');
}

// Generate unique ID
function generateId() {
  return 'prod-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await readProducts();
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בטעינת המוצרים'
    });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const products = await readProducts();
    const product = products.find(p => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'המוצר לא נמצא'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בטעינת המוצר'
    });
  }
});

// POST /api/products - Create new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, minQuantity, price, featured } = req.body;

    // Validation
    if (!name || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'שם, תיאור וקטגוריה הם שדות חובה'
      });
    }

    const products = await readProducts();

    const newProduct = {
      id: generateId(),
      name,
      description,
      category,
      minQuantity: parseInt(minQuantity) || 50,
      price: price || 'החל מ-₪5',
      featured: featured === 'true' || featured === true,
      image: req.file ? `/uploads/${req.file.filename}` : '/images/placeholder.jpg',
      createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    await saveProducts(products);

    res.status(201).json({
      success: true,
      message: 'המוצר נוסף בהצלחה',
      data: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה ביצירת המוצר'
    });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, minQuantity, price, featured } = req.body;

    const products = await readProducts();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'המוצר לא נמצא'
      });
    }

    const updatedProduct = {
      ...products[productIndex],
      name: name || products[productIndex].name,
      description: description || products[productIndex].description,
      category: category || products[productIndex].category,
      minQuantity: minQuantity ? parseInt(minQuantity) : products[productIndex].minQuantity,
      price: price || products[productIndex].price,
      featured: featured !== undefined ? (featured === 'true' || featured === true) : products[productIndex].featured,
      updatedAt: new Date().toISOString()
    };

    // Update image if new one uploaded
    if (req.file) {
      // Delete old image if it's in uploads folder
      const oldImage = products[productIndex].image;
      if (oldImage && oldImage.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', oldImage);
        fs.unlink(oldImagePath).catch(() => {});
      }
      updatedProduct.image = `/uploads/${req.file.filename}`;
    }

    products[productIndex] = updatedProduct;
    await saveProducts(products);

    res.json({
      success: true,
      message: 'המוצר עודכן בהצלחה',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בעדכון המוצר'
    });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const products = await readProducts();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'המוצר לא נמצא'
      });
    }

    // Delete image if it's in uploads folder
    const product = products[productIndex];
    if (product.image && product.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', product.image);
      fs.unlink(imagePath).catch(() => {});
    }

    products.splice(productIndex, 1);
    await saveProducts(products);

    res.json({
      success: true,
      message: 'המוצר נמחק בהצלחה'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה במחיקת המוצר'
    });
  }
});

export default router;
