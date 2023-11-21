// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import { Logout } from "./therapist/auth/Logout";

const Navbar = () => {
  const { authState } = useContext(AuthContext);

    const handleLogout = Logout();
    
    const onLogoutClick = () => {
      handleLogout();
    };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
              {authState.status && (
                <>
                  <li className="nav-item">
                    <Link to="/myPatients/WAITING" className="nav-link active" aria-current="page">Warteliste</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/myPatients/ACTIVE" className="nav-link active" aria-current="page">Patienten</Link>
                  </li>
                </>
              )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {authState.status ? (
              <>
                <li className="nav-item">
                  <button type="submit" onClick={onLogoutClick} className="nav-link btn btn-link">Logout</button>
                </li>
                <li className="nav-item">
                      <Link to="/myProfile" className="nav-link active" aria-current="page">{authState.email}</Link>
                </li>
              </>
            ):(
              <>
              <li className="nav-item">
                <Link to="/loginTherapist" className="nav-link active" aria-current="page">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/registerTherapist" className="nav-link active" aria-current="page">Register</Link>
              </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );

}

export { Navbar };
