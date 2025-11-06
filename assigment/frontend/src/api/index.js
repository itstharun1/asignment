import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export async function getWeather(city) {
  const { data } = await api.get(`/api/weather`, {
    params: { city }
  });
  return data;
}

export async function convertCurrency(amount, to = 'USD') {
  const { data } = await api.get(`/api/convert`, {
    params: {
      from: 'INR',
      to,
      amount
    }
  });
  return data;
}

export async function getQuote() {
  const { data } = await api.get('/api/quote');
  return data;
}

export async function checkHealth() {
  try {
    const { data } = await api.get('/api/health');
    return data.status === 'ok';
  } catch {
    return false;
  }
}