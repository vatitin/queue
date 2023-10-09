// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/loginTherapist">Login</Link>
        <Link to="/registerTherapist">Register</Link>   
    </div>
  );
};

export { Navbar };
