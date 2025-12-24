import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateContact } from '../middleware/validation.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/contacts.json');

// Helper function to read contacts
async function readContacts() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write contacts
async function writeContacts(contacts) {
  await fs.writeFile(dataPath, JSON.stringify(contacts, null, 2), 'utf8');
}

// POST /api/contact - Submit contact form
router.post('/', validateContact, async (req, res) => {
  try {
    const { name, phone, email, company, message } = req.body;

    const contacts = await readContacts();

    const newContact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      company: company ? company.trim() : '',
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    contacts.push(newContact);
    await writeContacts(contacts);

    res.status(201).json({
      success: true,
      message: 'הפנייה נשלחה בהצלחה! ניצור איתך קשר בהקדם.',
      data: { id: newContact.id }
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בשמירת הפנייה. אנא נסו שוב.'
    });
  }
});

export default router;
