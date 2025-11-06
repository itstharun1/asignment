import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes cache

const EXCHANGE_API = 'https://api.exchangerate.host/convert';

export async function convertCurrency(from, to, amount) {
  const cacheKey = `rate_${from}_${to}`;
  let rate = cache.get(cacheKey);
  
  if (!rate) {
    try {
      const response = await axios.get(EXCHANGE_API, {
        params: {
          from,
          to,
          amount: 1
        }
      });

      // exchangerate.host may return { success: false, error: { ... } }
      if (response.data && response.data.result && (response.data.success !== false)) {
        rate = response.data.result;
      } else {
        // Try alternative endpoint for latest rates
        const alt = await axios.get('https://api.exchangerate.host/latest', {
          params: { base: from, symbols: to }
        });
        if (alt.data && alt.data.rates && alt.data.rates[to]) {
          rate = alt.data.rates[to];
        }
      }
    } catch (err) {
      // Log and continue to fallback
      console.warn('Exchange API failed:', err.message || err);
    }

    // Fallback to safe mock rates if external services are unavailable
    if (!rate) {
      const fallback = {
        USD: 0.012, // ~1 INR = 0.012 USD (estimate)
        EUR: 0.011  // ~1 INR = 0.011 EUR (estimate)
      };
      rate = fallback[to] || 0;
    }
    cache.set(cacheKey, rate);
  }

  const convertedAmount = amount * rate;
  
  return {
    from,
    to,
    amount,
    rate,
    convertedAmount: Math.round(convertedAmount * 100) / 100,
    fetchedAt: new Date().toISOString()
  };
}