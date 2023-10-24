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

function App() {

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
