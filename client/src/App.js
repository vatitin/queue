//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { Home } from "./pages/Home";
import CreatePatient from "./pages/CreatePatient";
import { Patient } from "./pages/Patient";
import { Patients } from "./pages/Patients";
import { LoginTherapist } from "./pages/LoginTherapist";
import { RegisterTherapist } from "./pages/RegisterTherapist";
import { Navbar } from "./pages/Navbar";
import { AuthContext } from "./helpers/AuthContext"
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {

  const [authState, setAuthState] = useState(false)

  useEffect(() => {
    const config = {
        headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
    }
    axios.get('http://localhost:3001/therapistAuth/login', config)
      .then(response => {
        if (response.data.loggedIn) {
          setAuthState(true);
        } else {
          setAuthState(false);
        }
      })
      .catch(error => {
        console.error('Error checking login status:', error);
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/loginTherapist" element={<LoginTherapist/>} />
            <Route path="/registerTherapist" element={<RegisterTherapist/>} />
            <Route path="/addNewPatient/:therapistId" element={<CreatePatient/>} />
            <Route path="/patient/:id" element={<Patient/>} />
            <Route path="/myPatients" element={<Patients/>} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
