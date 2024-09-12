// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/add-recipe" className="hover:underline">Add Recipe</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
