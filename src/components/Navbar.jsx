import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            PokéDex Explorer
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md ${
                isActive('/') ? 'bg-red-700' : 'hover:bg-red-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className={`px-3 py-2 rounded-md ${
                isActive('/favorites') ? 'bg-red-700' : 'hover:bg-red-700'
              }`}
            >
              Favorites
            </Link>
            <Link
              to="/comparison"
              className={`px-3 py-2 rounded-md ${
                isActive('/comparison') ? 'bg-red-700' : 'hover:bg-red-700'
              }`}
            >
              Compare
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 