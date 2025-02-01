import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  const handleAuthRedirect = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      toast.info("You are already logged in.");
    }
  };
  const dashboard=(e)=>{
      if(!isLoggedIn){
        e.preventDefault();
        toast.info("Login to access the Dashboard")
      }
  }
  return (
    <nav className="bg-blue-500 p-3 text-white">
      <div className="flex justify-between items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <div className="flex space-x-10">
          {!isLoggedIn && (
            <>
              <Link to="/login" className="hover:underline" onClick={handleAuthRedirect}>Login</Link>
              <Link to="/signup" className="hover:underline" onClick={handleAuthRedirect}>Signup</Link>
            </>
          )}
          <Link to="/dashboard" className="hover:underline" onClick={dashboard}>Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
