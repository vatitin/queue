//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import CreatePatient from "./pages/CreatePatient";
import { Patient } from "./pages/Patient";

function App() {

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/createPatient">Create A Patient</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createPatient" element={<CreatePatient/>} />
          <Route path="/patient/:id" element={<Patient/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
