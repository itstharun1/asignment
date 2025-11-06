import { useState, useEffect } from 'react';
import { getQuote } from '../api';

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuotes = async (count = 3) => {
    setLoading(true);
    setError(null);
    
    try {
      const newQuotes = await Promise.all(
        Array(count).fill().map(() => getQuote())
      );
      setQuotes(prev => [...prev, ...newQuotes]);
    } catch (err) {
      setError('Failed to fetch quotes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleNext = () => {
    if (currentIndex >= quotes.length - 2) {
      fetchQuotes(3);
    }
    setCurrentIndex(i => i + 1);
  };

  const handleCopy = async () => {
    const quote = quotes[currentIndex];
    const text = `"${quote.text}" - ${quote.author}`;
    
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    const quote = quotes[currentIndex];
    const text = `"${quote.text}" - ${quote.author}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Inspirational Quote',
          text
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      handleCopy();
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        {error}
        <button
          onClick={() => fetchQuotes()}
          className="block mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!quotes.length) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentQuote = quotes[currentIndex];

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8">Daily Inspiration</h1>

      <div className="card mb-6">
        <blockquote className="text-xl mb-4">
          "{currentQuote.text}"
        </blockquote>
        <p className="text-gray-600">- {currentQuote.author}</p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleNext}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Next Quote'}
        </button>

        <button
          onClick={handleCopy}
          className="btn btn-secondary"
          title="Copy to clipboard"
        >
          📋 Copy
        </button>

        {navigator.share && (
          <button
            onClick={handleShare}
            className="btn btn-secondary"
            title="Share quote"
          >
            📤 Share
          </button>
        )}
      </div>
    </div>
  );
}