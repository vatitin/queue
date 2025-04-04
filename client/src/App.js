import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './pages/Navbar';
import { Home } from './pages/Home';
import CreatePatient from './pages/therapist/CreatePatient';
import { Patient } from './pages/therapist/Patient';
import { MyPatients } from './pages/therapist/MyPatients';
import { Profile } from './pages/therapist/Profile';
import { PageNotFound } from './pages/PageNotFound';
import KeycloakService from './services/KeycloakService';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const isRunning = useRef(false);

  useEffect(() => {

    if (isRunning.current) return;
    isRunning.current = true;

    KeycloakService.initKeycloak(() => {
      setAuthenticated(true);
    });
  }, []);

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/addNewPatient/:patientStatus"
            element={<CreatePatient />}
          />
          <Route path="/patient/:id" element={<Patient />} />
          <Route path="/myPatients/:patientStatus" element={<MyPatients />} />
          <Route path="/myProfile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
