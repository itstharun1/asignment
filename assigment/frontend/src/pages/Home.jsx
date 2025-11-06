import { Link } from 'react-router-dom';

const features = [
  {
    path: '/weather',
    title: 'Weather Info',
    description: 'Get current weather conditions for any city',
    icon: '🌤️'
  },
  {
    path: '/convert',
    title: 'Currency Converter',
    description: 'Convert INR to USD or EUR instantly',
    icon: '💱'
  },
  {
    path: '/quotes',
    title: 'Motivational Quotes',
    description: 'Get inspired with random motivational quotes',
    icon: '💭'
  }
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to InfoHub
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map(({ path, title, description, icon }) => (
          <Link
            key={path}
            to={path}
            className="card hover:shadow-lg transition-shadow group"
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h2>
            <p className="text-gray-600">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}