import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-3 text-white">
      <div className="flex justify-between items-center">
        {/* Home Link on the left */}
        <Link to="/" className="hover:underline">Home</Link>

        {/* Login and Signup Links on the right */}
        <div className="flex space-x-10">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
