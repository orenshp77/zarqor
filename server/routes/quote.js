import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateQuote } from '../middleware/validation.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/quotes.json');

// Helper function to read quotes
async function readQuotes() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write quotes
async function writeQuotes(quotes) {
  await fs.writeFile(dataPath, JSON.stringify(quotes, null, 2), 'utf8');
}

// POST /api/quote - Submit quote request
router.post('/', validateQuote, async (req, res) => {
  try {
    const { items, contactInfo, notes } = req.body;

    const quotes = await readQuotes();

    const newQuote = {
      id: Date.now().toString(),
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        priceRange: item.priceRange
      })),
      contactInfo: {
        name: contactInfo.name.trim(),
        phone: contactInfo.phone.trim(),
        email: contactInfo.email.trim(),
        company: contactInfo.company ? contactInfo.company.trim() : ''
      },
      notes: notes ? notes.trim() : '',
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    quotes.push(newQuote);
    await writeQuotes(quotes);

    res.status(201).json({
      success: true,
      message: 'בקשת הצעת המחיר נשלחה בהצלחה! נחזור אליך עם הצעה מפורטת בהקדם.',
      data: { id: newQuote.id }
    });
  } catch (error) {
    console.error('Error saving quote:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בשמירת הבקשה. אנא נסו שוב.'
    });
  }
});

export default router;
