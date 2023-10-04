//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import CreatePatient from "./pages/CreatePatient";
import { Patient } from "./pages/Patient";
import { Patients } from "./pages/Patients";

function App() {

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addNewPatient/:therapistId" element={<CreatePatient/>} />
          <Route path="/patient/:id" element={<Patient/>} />
          <Route path="/patients/:therapistId" element={<Patients/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
