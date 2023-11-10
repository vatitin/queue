// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import Logout from "./Logout";

const Navbar = () => {
  const { authState } = useContext(AuthContext);

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {authState.status ? (
        <>
          <Link to="/myPatients">Patients</Link>
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
