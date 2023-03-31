import { createContext, useState, useEffect } from "react";

const CurrentPositionContext = createContext(null);

export const CurrentPositionProvider = ({ children }) => {
 //coordinates of the user's input in the searchBar with Autocomplete.
 const [coordinates, setCoordinates] = useState({})

 //Center of Eiffel tower for the beginning
 const defaultLocation = {lat: 48.8584, lng: 2.2945}
 const [center, setCenter] = useState(defaultLocation)


//Getting the user's geolocation according to his currentPosition if he accepted it.
useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      setCenter({ lat: latitude, lng: longitude })
    },
    () => {
      // Use default location if user denies geolocation access
      setCenter(defaultLocation)
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
