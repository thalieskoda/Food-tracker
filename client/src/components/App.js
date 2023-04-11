import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAuthenticator from "./userAuthenticator/UserAuthenticator";
import GlobalStyles from "./GlobalStyles";
import ProtectedRoutes from "./ProtectedRoutes";
import Header from "./header/Header";
import Homefeed from "./Homefeed/Homefeed";
import Profile from "./Profile/Profile";
import AboutUs from "./header/AboutUs";
import ContactUs from "./header/ContactUs";
//App component with protected Routes with Auth0
const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<UserAuthenticator />} />
          <Route
            path="/homefeed"
            element={<ProtectedRoutes component={Homefeed} />}
          />
          <Route
            path="/about"
            element={<ProtectedRoutes component={AboutUs} />}
          />
          <Route
            path="/contact"
            element={<ProtectedRoutes component={ContactUs} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoutes component={Profile} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
