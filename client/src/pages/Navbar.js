// Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import axios from 'axios';
import { therapistProfile } from '../endpoints';

const Navbar = () => {
    let {userId} = useSessionContext();
    const [email, setEmail] = useState('');
    //todo get email and use it in component
    
    useEffect(() => {
      const config = {
        headers: {
            "Content-Type": "application/json"
            },
            withCredentials: true
      }
      try {
        axios.get(therapistProfile, config).then((response) => {
          setEmail(response.data.email);
        });
      } catch (error) {
        console.error(error);
      }
    }, [setEmail])

    const onLogoutClick = async () => {
      await signOut()
      window.location.href = "/";
    };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      {console.log("email: " + email)}
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
              {userId && (
                <>
                  <li className="nav-item">
                    <Link to="/myPatients/W" className="nav-link active" aria-current="page">Warteliste</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/myPatients/A" className="nav-link active" aria-current="page">Patienten</Link>
                  </li>
                </>
              )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {userId ? (
              <>
                <li className="nav-item">
                  <button type="submit" onClick={onLogoutClick} className="nav-link btn btn-link">Logout</button>
                </li>
                <li className="nav-item">
                      <Link to="/myProfile" className="nav-link active" aria-current="page">{email}</Link>
                </li>
              </>
            ):(
              <>
              <li className="nav-item">
                <Link to="/auth" className="nav-link active" aria-current="page">Anmelden</Link>
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
