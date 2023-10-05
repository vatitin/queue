//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import CreatePatient from "./pages/CreatePatient";
import { Patient } from "./pages/Patient";
import { Patients } from "./pages/Patients";
import { LoginTherapist } from "./pages/LoginTherapist";
import { RegisterTherapist } from "./pages/RegisterTherapist";

function App() {

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/loginTherapist">Login</Link>
          <Link to="/registerTherapist">Register</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/loginTherapist" element={<LoginTherapist/>} />
          <Route path="/registerTherapist" element={<RegisterTherapist/>} />
          <Route path="/addNewPatient/:therapistId" element={<CreatePatient/>} />
          <Route path="/patient/:id" element={<Patient/>} />
          <Route path="/patients/:therapistId" element={<Patients/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
