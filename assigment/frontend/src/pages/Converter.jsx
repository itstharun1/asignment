import { useState } from 'react';
import { convertCurrency } from '../api';

export default function Converter() {
  const [amount, setAmount] = useState(100);
  const [to, setTo] = useState('USD');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);

    try {
      const data = await convertCurrency(amount, to);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to convert currency');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (result) {
      handleSubmit(new Event('submit'));
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Currency Converter</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (INR)
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Convert To
            </label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="input"
            >
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={loading}
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Result</h2>
            <button
              onClick={handleRefresh}
              className="text-blue-600 hover:text-blue-800"
              title="Refresh rate"
            >
              🔄
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Converted Amount</p>
              <p className="text-2xl font-semibold">
                {result.convertedAmount} {result.to}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Exchange Rate</p>
              <p className="text-lg">
                1 {result.from} = {result.rate} {result.to}
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Last updated: {new Date(result.fetchedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}