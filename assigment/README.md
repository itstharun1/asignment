# InfoHub

InfoHub is a full-stack single-page application that bundles three utility modules:
1. Weather information lookup
2. Currency conversion (INR → USD/EUR)
3. Motivational quote generator

## Features

- React + Vite frontend with Tailwind CSS
- Express.js backend with API caching and rate limiting
- Real-time weather data using Open-Meteo API
- Live currency conversion via exchangerate.host
- Motivational quotes from quotable.io
- Responsive design with loading and error states
- Client-side routing (no page reloads)
- Copy/share functionality for quotes
- Geolocation support for weather

## Project Structure

```
.
├── backend/               # Express.js server
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── services/     # External API integrations
│   │   ├── utils/        # Helper functions
│   │   ├── app.js        # Express app setup
│   │   └── index.js      # Server entry point
│   ├── test/             # API tests
│   └── .env.example      # Environment variables example
│
└── frontend/             # React + Vite app
    ├── src/
    │   ├── api/          # Backend API client
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Route components
    │   └── App.jsx       # Root component
    └── .env.example      # Environment variables example
```

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment example and configure:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

The backend will run on http://localhost:3001 by default.

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment example and configure:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

The frontend will run on http://localhost:5173 by default.

## API Endpoints

### Weather Information
```bash
GET /api/weather?city=London
```
Response:
```json
{
  "city": "London",
  "location": "London, Greater London, England, United Kingdom",
  "tempC": 18,
  "tempF": 64,
  "description": "Partly cloudy",
  "humidity": 72,
  "windSpeed": 12,
  "fetchedAt": "2023-11-05T12:00:00.000Z"
}
```

### Currency Conversion
```bash
GET /api/convert?from=INR&to=USD&amount=1000
```
Response:
```json
{
  "from": "INR",
  "to": "USD",
  "amount": 1000,
  "rate": 0.012,
  "convertedAmount": 12.00,
  "fetchedAt": "2023-11-05T12:00:00.000Z"
}
```

### Random Quote
```bash
GET /api/quote
```
Response:
```json
{
  "id": "abc123",
  "text": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "author": "Winston Churchill"
}
```

### Health Check
```bash
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "uptime": 1234,
  "time": "2023-11-05T12:00:00.000Z"
}
```

## Deployment

### Backend
- Can be deployed to Railway, Render, or any Node.js hosting
- Set environment variables as per `.env.example`
- Configure `PORT` as per hosting requirements

### Frontend
- Can be deployed to Vercel, Netlify, or any static hosting
- Set `VITE_API_URL` to your backend URL
- Build with `npm run build`

## Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [Open-Meteo](https://open-meteo.com/)
- [exchangerate.host](https://exchangerate.host/)
- [quotable.io](https://quotable.io/)