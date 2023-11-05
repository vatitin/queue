// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import Logout from "./Logout";

const Navbar = () => {
  let { authState } = useContext(AuthContext);

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
  {console.log("rendering Navbar")}
      {authState.status ? (
        <>
          <Link to="/myPatients">Patients</Link>
          <Logout />
          <h1>{authState.email}</h1>
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
