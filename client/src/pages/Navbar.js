// Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { therapistProfile } from '../endpoints';
import { AppRoutes } from '../constants';
import KeycloakService from '../services/KeycloakService';
import apiClient from '../services/APIService';

const Navbar = () => {
  const userId = KeycloakService.getUserId();
  const [email, setEmail] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get(therapistProfile);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching therapist profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const onLogoutClick = () => {
    KeycloakService.logout();
    window.location.href = '/';
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            {userId && (
              <>
                <li className="nav-item">
                  <Link
                    to={AppRoutes.myWaitingPatients}
                    className="nav-link active"
                    aria-current="page"
                  >
                    Warteliste
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={AppRoutes.myActivePatients}
                    className="nav-link active"
                    aria-current="page"
                  >
                    Patienten
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {userId ? (
              <>
                <li className="nav-item">
                  <button
                    type="submit"
                    onClick={onLogoutClick}
                    className="nav-link btn btn-link"
                  >
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <Link
                    to="/myProfile"
                    className="nav-link active"
                    aria-current="page"
                  >
                    {email}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/auth"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Anmelden
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
