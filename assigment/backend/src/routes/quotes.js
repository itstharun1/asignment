import express from 'express';
import { getRandomQuote } from '../services/quoteService.js';

const router = express.Router();

router.get('/quote', async (req, res) => {
  try {
    const quote = await getRandomQuote();
    res.json(quote);
  } catch (error) {
    console.error('Quote API error:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Failed to fetch quote' 
    });
  }
});

export default router;