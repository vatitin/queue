// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import Logout from "./Logout";

const Navbar = () => {
  let { authState } = useContext(AuthContext);
  console.log("rendering Navbar component");

  //todo check if this can be done better
  //handles race condition to not be rendered before authState is initialized
  if (!authState) {
    authState = {
      email: "",
      id: 0,
      status: false,
    }

  }
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
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
