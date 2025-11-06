import axios from 'axios';

const QUOTABLE_API = 'https://api.quotable.io/quotes/random';

// Fallback quotes in case the API is down
const fallbackQuotes = [
  {
    id: 'fb1',
    text: 'Be the change you wish to see in the world.',
    author: 'Mahatma Gandhi'
  },
  {
    id: 'fb2',
    text: "Everything you've ever wanted is on the other side of fear.",
    author: 'George Addair'
  },
  {
    id: 'fb3',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill'
  }
];

export async function getRandomQuote() {
  try {
    const response = await axios.get(QUOTABLE_API);
    const quote = response.data[0];
    
    return {
      id: quote._id,
      text: quote.content,
      author: quote.author
    };
  } catch (error) {
    // Fallback to local quotes if API fails
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  }
}