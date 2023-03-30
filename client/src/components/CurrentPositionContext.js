import { createContext, useState, useEffect } from "react";

const CurrentPositionContext = createContext(null);

export const CurrentPositionProvider = ({ children }) => {

  //Setting the states for my map

 //coordinates of the user's input in the searchBar with Autocomplete.

 const [coordinates, setCoordinates] = useState({lat: 48.8584, lng: 2.2945})
 //Center of Eiffel tower for the beginning
 const [center, setCenter] = useState({lat: 48.8584, lng: 2.2945})

 //Getting the user's geolocation according to his currentPosition if he accepted it.
 useEffect(() => {
   navigator.geolocation.getCurrentPosition(
     ({ coords: { latitude, longitude } }) => {
       setCoordinates({ lat: latitude, lng: longitude })
     }
   )
 }, [])

  return (
    <CurrentPositionContext.Provider
      value={{coordinates, setCoordinates, center, setCenter}}
    >

      {children}
    </CurrentPositionContext.Provider>
  );
};

export default CurrentPositionContext;
