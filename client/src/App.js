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

  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false,
  })

  useEffect(() => {
    const config = {
        headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
    }

    const instance = axios.create({
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 401 || status === 403;
      },
    })

    instance.get('http://localhost:3001/therapistAuth/login', config)
      .then(response => {
        setAuthState(prevState => {
          if (response.data.loggedIn) {
            setAuthState({ ...prevState, status: true });
          } else if (response.status === 401 || response.status === 403) {
            setAuthState({ email: "", id: 0, status: false });
          } else {
            setAuthState({ email: "", id: 0, status: false });
            alert("Ein Fehler ist aufgetreten")
          }
        })
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
            <Route path="/addNewPatient" element={<CreatePatient/>} />
            <Route path="/patient/:id" element={<Patient/>} />
            <Route path="/myPatients" element={<Patients/>} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
