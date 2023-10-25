// Navbar.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
    }
    axios.get('http://localhost:3001/therapistAuth/login', config)
      .then(response => {
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(error => {
        setIsLoggedIn(false);
        console.error('Error checking login status:', error);
      });
  }, []);

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <Link to="/myPatients">Patients</Link>
      ) : (
        <>
          <Link to="/loginTherapist">Login</Link>
          <Link to="/registerTherapist">Register</Link>
        </>
      )}
    </div>
  );
};

export { Navbar };
