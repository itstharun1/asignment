import { useState } from 'react';
import { getWeather } from '../api';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getWeather(
            `${position.coords.latitude},${position.coords.longitude}`
          );
          setWeather(data);
        } catch (err) {
          setError(err.response?.data?.error || 'Failed to fetch weather data');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Failed to get your location. Please enter a city manually.');
        setLoading(false);
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Weather Information</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="input flex-grow"
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>
        
        <button
          type="button"
          onClick={handleLocationClick}
          className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
        >
          📍 Use my location
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 mb-6">
          {error}
        </div>
      )}

      {weather && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">
            {weather.city}
            {weather.location && (
              <span className="text-sm font-normal text-gray-600 block">
                {weather.location}
              </span>
            )}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Temperature</p>
              <p className="text-2xl font-semibold">
                {weather.tempC}°C / {weather.tempF}°F
              </p>
            </div>
            
            <div>
              <p className="text-gray-600">Conditions</p>
              <p className="text-2xl font-semibold">{weather.description}</p>
            </div>
            
            {weather.humidity && (
              <div>
                <p className="text-gray-600">Humidity</p>
                <p className="text-2xl font-semibold">{weather.humidity}%</p>
              </div>
            )}
            
            {weather.windSpeed && (
              <div>
                <p className="text-gray-600">Wind Speed</p>
                <p className="text-2xl font-semibold">{weather.windSpeed} km/h</p>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date(weather.fetchedAt).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
}