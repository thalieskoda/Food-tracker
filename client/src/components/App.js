import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAuthenticator from "./userAuthenticator/UserAuthenticator";
import GlobalStyles from "./GlobalStyles";
import ProtectedRoutes from "./ProtectedRoutes";
import Header from "./header/Header";
import Homefeed from "./Homefeed";
import Profile from "./Profile";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

const App = () => {


  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
        <Route path="/" element={<UserAuthenticator />} />
        <Route path="/homefeed" element={<ProtectedRoutes component={Homefeed} />} />
        <Route path="/about" element={<ProtectedRoutes component={AboutUs} />} />
        <Route path="/contact" element={<ProtectedRoutes component={ContactUs} />} />
        <Route path="/profile" element={<ProtectedRoutes component={Profile} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
