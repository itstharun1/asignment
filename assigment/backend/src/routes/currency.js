import express from 'express';
import { convertCurrency } from '../services/currencyService.js';

const router = express.Router();

router.get('/convert', async (req, res) => {
  const { from, to, amount } = req.query;
  
  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'Missing required parameters: from, to, amount' });
  }

  if (from !== 'INR') {
    return res.status(400).json({ error: 'Only INR is supported as source currency' });
  }

  if (!['USD', 'EUR'].includes(to)) {
    return res.status(400).json({ error: 'Target currency must be USD or EUR' });
  }

  const numAmount = Number(amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  try {
    const result = await convertCurrency(from, to, numAmount);
    res.json(result);
  } catch (error) {
    console.error('Currency conversion error:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Failed to convert currency' 
    });
  }
});

export default router;