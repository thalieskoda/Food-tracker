import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homefeed from "./Homefeed";
import Profile from "./Profile";
import UserAuthenticator from "./userAuthenticator/UserAuthenticator";
import Header from "./header/Header";
import GlobalStyles from "./GlobalStyles";
import { useState } from "react";
import { useEffect } from "react";
import SingleDestination from "./SingleDestination";
import ProtectedRoutes from "./ProtectedRoutes";


const App = () => {

  //Coordinates of the specific place
  const [coordinates, setCoordinates] = useState({})

  //Bounds of the googleMap
  const [bounds, setBounds] = useState({})

  useEffect(()=> {
navigator.geolocation.getCurrentPosition((position) => {

  if (position && position.coords) {
    const {latitude, longitude} = position.coords;
    setCoordinates({lat:latitude, lng:longitude})
  }
});
  },[]);


  return (

    <>
    <BrowserRouter>
    <GlobalStyles/>
    <Header/>
    <Routes>
      <Route path="/" element={<UserAuthenticator/>}/>
      <Route path="/homefeed" element={<ProtectedRoutes/>} component={Homefeed}/>
      <Route path="/profile"  element={<ProtectedRoutes/>} component={Profile}/>
      <Route path="/profile/:destinationId"  element={<ProtectedRoutes/>} component={SingleDestination}/>
    </Routes>
    </BrowserRouter>
    </>
  
  );
};

export default App;
