import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/weather', label: 'Weather' },
    { path: '/convert', label: 'Currency' },
    { path: '/quotes', label: 'Quotes' }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            InfoHub
          </Link>
          
          <div className="flex space-x-4">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive(path) 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}