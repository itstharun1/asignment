import request from 'supertest';
import app from '../src/app.js';

describe('API Endpoints', () => {
  // Health check endpoint test
  test('GET /api/health should return ok status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.uptime).toBeDefined();
    expect(response.body.time).toBeDefined();
  });

  // Weather endpoint tests
  test('GET /api/weather without city should return 400', async () => {
    const response = await request(app).get('/api/weather');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('City parameter is required');
  });

  // Currency endpoint tests
  test('GET /api/convert with invalid parameters should return 400', async () => {
    const response = await request(app).get('/api/convert?from=USD&to=EUR&amount=100');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Only INR is supported as source currency');
  });

  // Quote endpoint test
  test('GET /api/quote should return a quote', async () => {
    const response = await request(app).get('/api/quote');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('text');
    expect(response.body).toHaveProperty('author');
  });
});