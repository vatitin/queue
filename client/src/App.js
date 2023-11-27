//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { Home } from "./pages/Home";
import CreatePatient from "./pages/therapist/CreatePatient";
import { Patient } from "./pages/therapist/Patient";
import { MyPatients } from "./pages/therapist/MyPatients";
import { LoginTherapist } from "./pages/therapist/auth/LoginTherapist";
import { RegisterTherapist } from "./pages/therapist/auth/RegisterTherapist";
import { Navbar } from "./pages/Navbar";
import { Profile } from './pages/therapist/Profile'
import { PageNotFound } from "./pages/PageNotFound";
import { AuthContextProvider } from "./context/AuthContext"

function App() {

  //todo check if PageNottFound to use without navbar
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/loginTherapist" element={<LoginTherapist/>} />
            <Route path="/registerTherapist" element={<RegisterTherapist/>} />
            <Route path="/addNewPatient/:patientStatus" element={<CreatePatient/>} />
            <Route path="/patient/:id" element={<Patient/>} />
            <Route path="/myPatients/:patientStatus" element={<MyPatients/>} />
            <Route path="/myProfile" element={<Profile/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
