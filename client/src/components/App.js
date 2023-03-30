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


  //Setting the states for my map

 //coordinates of the user's input in the searchBar with Autocomplete.
    const [coordinates, setCoordinates] = useState({})
    //Bounds of google map display. Meaning that it can't search further than the bounds.
    const [bounds, setBounds] = useState({})
console.log({coordinates});

    //Getting the user's geolocation according to his currentPosition if he accepted it.
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoordinates({ lat: latitude, lng: longitude })
        }
      )
    }, [])
 

    //Passing props to the Homefeed --> TravelSearch & map --> SearchBar
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
        <Route path="/" element={<UserAuthenticator />} />
        <Route path="/homefeed" element={<ProtectedRoutes component={Homefeed} coordinates={coordinates} setCoordinates={setCoordinates} bounds={bounds} setBounds={setBounds}/>} />
        <Route path="/profile" element={<ProtectedRoutes component={Profile} />} />
        <Route path="/profile/:destinationId" element={<ProtectedRoutes component={SingleDestination} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
