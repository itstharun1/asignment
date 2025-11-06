import express from 'express';
import { getWeatherData } from '../services/weatherService.js';

const router = express.Router();

router.get('/weather', async (req, res) => {
  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Failed to fetch weather data' 
    });
  }
});

export default router;