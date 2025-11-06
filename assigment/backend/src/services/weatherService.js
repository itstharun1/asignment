import axios from 'axios';
import NodeCache from 'node-cache';
import { kelvinToCelsius, celsiusToFahrenheit } from '../utils/temperature.js';

const cache = new NodeCache({ stdTTL: 120 }); // 2 minutes cache

const NOMINATIM_API = 'https://nominatim.openstreetmap.org/search';
const OPEN_METEO_API = 'https://api.open-meteo.com/v1/forecast';

async function getCoordinates(city) {
  const params = {
    q: city,
    format: 'json',
    limit: 1
  };

  const response = await axios.get(NOMINATIM_API, { params });
  if (!response.data || response.data.length === 0) {
    throw new Error('City not found');
  }

  const location = response.data[0];
  return {
    lat: location.lat,
    lon: location.lon,
    displayName: location.display_name
  };
}

export async function getWeatherData(city) {
  const cacheKey = `weather_${city.toLowerCase()}`;
  const cachedData = cache.get(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  const { lat, lon, displayName } = await getCoordinates(city);
  
  const params = {
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
    timezone: 'auto'
  };

  const response = await axios.get(OPEN_METEO_API, { params });
  const current = response.data.current;

  const weatherData = {
    city: city,
    location: displayName,
    tempC: Math.round(current.temperature_2m),
    tempF: Math.round(celsiusToFahrenheit(current.temperature_2m)),
    description: getWeatherDescription(current.weather_code),
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    fetchedAt: new Date().toISOString()
  };

  cache.set(cacheKey, weatherData);
  return weatherData;
}

function getWeatherDescription(code) {
  // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  
  return descriptions[code] || 'Unknown';

}