// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from'react-router-dom';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

const Navbar = () => {
    let {userId} = useSessionContext();

    //todo get email and use it in component
    const navigate = useNavigate();
    //const { logout } = useLogout();

    const onLogoutClick = () => {
      //logout()
      //navigate("/")
    };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
              {userId && (
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
            {userId ? (
              <>
                <li className="nav-item">
                  <button type="submit" onClick={onLogoutClick} className="nav-link btn btn-link">Logout</button>
                </li>
                <li className="nav-item">
                      <Link to="/myProfile" className="nav-link active" aria-current="page">{"changeMeuser.email"}</Link>
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
