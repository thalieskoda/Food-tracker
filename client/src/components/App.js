import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homefeed from "./Homefeed";
import Profile from "./Profile";
import NewUser from "./userAuthenticator/NewUser";
import UserAuthenticator from "./userAuthenticator/UserAuthenticator";
import Header from "./header/Header";


const App = () => {


  return (

    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<UserAuthenticator/>}/>
      <Route path="/homefeed" element={<Homefeed/>}/>
      <Route path="/new" element={<NewUser/>}/>
      <Route path="/profile" element={<Profile/>}/>

    </Routes>
    </BrowserRouter>
    </>
  
  );
};

export default App;
