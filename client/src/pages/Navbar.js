// Navbar.js

import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext"

const Navbar = () => {

  const {authState} = useContext(AuthContext)

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {authState ? (
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
