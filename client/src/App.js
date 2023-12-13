//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import { Home } from "./pages/Home";
import CreatePatient from "./pages/therapist/CreatePatient";
import { Patient } from "./pages/therapist/Patient";
import { MyPatients } from "./pages/therapist/MyPatients";
import { Navbar } from "./pages/Navbar";
import { Profile } from './pages/therapist/Profile'
import { PageNotFound } from "./pages/PageNotFound";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: "Queue app",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init({
          style: `
              [data-supertokens~=superTokensBranding] {
                  display: none
              }
              [data-supertokens~=container] {
                --palette-primary: 66, 201, 151;
                --palette-primaryBorder: 48, 175, 132;
              }
          `
      }),
        Session.init()
    ]
});

function App() {

  //todo check if PageNottFound to use without navbar
  return (
    <div className="App">
      <SuperTokensWrapper>
        <Router>
        <Navbar/>
          <Routes>
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [EmailPasswordPreBuiltUI])}
            <Route path="/" element={<Home/>} />
            {/*SessionAuth wrapped components only render if logged in*/}
            <Route path="/addNewPatient/:patientStatus" element={<SessionAuth><CreatePatient/></SessionAuth>} />
            <Route path="/patient/:id" element={<SessionAuth><Patient/></SessionAuth>} />
            <Route path="/myPatients/:patientStatus" element={<SessionAuth><MyPatients/></SessionAuth>} />
            <Route path="/myProfile" element={<SessionAuth><Profile/></SessionAuth>} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </Router>
      </SuperTokensWrapper>
    </div>
  );
}

export default App;
