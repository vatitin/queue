// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import Logout from "./therapist/auth/Logout";

const Navbar = () => {
  const { authState } = useContext(AuthContext);

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {authState.status ? (
        <>
          <Link to="/myPatients/WAITING">Warteliste</Link>
          <Link to="/myPatients/ACTIVE">Patienten</Link>
          <Logout />
          <Link to="/myProfile">{authState.email}</Link>
        </>
      ) : (
        <>
          <Link to="/loginTherapist">Login</Link>
          <Link to="/registerTherapist">Register</Link>
        </>
      )}
    </div>
  );
}

export { Navbar };
