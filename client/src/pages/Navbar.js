// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from'react-router-dom';

const Navbar = () => {
  const { user } = useAuthContext();

    const navigate = useNavigate();
    const { logout } = useLogout();

    const onLogoutClick = () => {
      logout()
      navigate("/")
    };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
              {user && (
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
            {user ? (
              <>
                <li className="nav-item">
                  <button type="submit" onClick={onLogoutClick} className="nav-link btn btn-link">Logout</button>
                </li>
                <li className="nav-item">
                      <Link to="/myProfile" className="nav-link active" aria-current="page">{user.email}</Link>
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
