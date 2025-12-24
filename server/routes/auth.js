import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersPath = path.join(__dirname, '../data/users.json');
const sessionsPath = path.join(__dirname, '../data/sessions.json');

// Initialize users file with default admin
async function initUsers() {
  try {
    await fs.access(usersPath);
  } catch {
    const defaultAdmin = {
      id: 'admin-1',
      username: 'admin',
      password: hashPassword('admin123'), // Change this!
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    await fs.writeFile(usersPath, JSON.stringify([defaultAdmin], null, 2));
  }
}

// Initialize sessions file
async function initSessions() {
  try {
    await fs.access(sessionsPath);
  } catch {
    await fs.writeFile(sessionsPath, JSON.stringify([], null, 2));
  }
}

initUsers();
initSessions();

// Simple password hashing
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Generate session token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Read users
async function readUsers() {
  try {
    const data = await fs.readFile(usersPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Read sessions
async function readSessions() {
  try {
    const data = await fs.readFile(sessionsPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save sessions
async function saveSessions(sessions) {
  await fs.writeFile(sessionsPath, JSON.stringify(sessions, null, 2));
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'שם משתמש וסיסמה נדרשים'
      });
    }

    const users = await readUsers();
    const user = users.find(u => u.username === username && u.password === hashPassword(password));

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'שם משתמש או סיסמה שגויים'
      });
    }

    // Create session
    const token = generateToken();
    const sessions = await readSessions();

    // Remove old sessions for this user
    const filteredSessions = sessions.filter(s => s.userId !== user.id);

    // Add new session (valid for 24 hours)
    filteredSessions.push({
      token,
      userId: user.id,
      username: user.username,
      role: user.role,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    });

    await saveSessions(filteredSessions);

    res.json({
      success: true,
      message: 'התחברת בהצלחה',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בהתחברות'
    });
  }
});

// POST /api/auth/logout
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
      const sessions = await readSessions();
      const filteredSessions = sessions.filter(s => s.token !== token);
      await saveSessions(filteredSessions);
    }

    res.json({
      success: true,
      message: 'התנתקת בהצלחה'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בהתנתקות'
    });
  }
});

// GET /api/auth/verify
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'לא מחובר'
      });
    }

    const sessions = await readSessions();
    const session = sessions.find(s => s.token === token);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'טוקן לא תקין'
      });
    }

    // Check if expired
    if (new Date(session.expiresAt) < new Date()) {
      // Remove expired session
      const filteredSessions = sessions.filter(s => s.token !== token);
      await saveSessions(filteredSessions);

      return res.status(401).json({
        success: false,
        message: 'הטוקן פג תוקף'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: session.userId,
          username: session.username,
          role: session.role
        }
      }
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה באימות'
    });
  }
});

// Middleware to protect routes
export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'נדרשת התחברות'
      });
    }

    const sessions = await readSessions();
    const session = sessions.find(s => s.token === token);

    if (!session || new Date(session.expiresAt) < new Date()) {
      return res.status(401).json({
        success: false,
        message: 'נדרשת התחברות מחדש'
      });
    }

    req.user = {
      id: session.userId,
      username: session.username,
      role: session.role
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאת אימות'
    });
  }
}

export default router;
