//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
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
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";

SuperTokens.init({
    appInfo: {
        // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: "Queue app",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:3001",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(),
        Session.init()
    ]
});

function App() {

  //todo check if PageNottFound to use without navbar
  return (
    <div className="App">
      <AuthContextProvider>
      <SuperTokensWrapper>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [EmailPasswordPreBuiltUI])}
            <Route path="/loginTherapist" element={<LoginTherapist/>} />
            <Route path="/registerTherapist" element={<RegisterTherapist/>} />
            <Route path="/addNewPatient/:patientStatus" element={<CreatePatient/>} />
            <Route path="/patient/:id" element={<Patient/>} />
            <Route path="/myPatients/:patientStatus" element={<MyPatients/>} />
            <Route path="/myProfile" element={<Profile/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </Router>
      </SuperTokensWrapper>
      </AuthContextProvider>
    </div>
  );
}

export default App;
