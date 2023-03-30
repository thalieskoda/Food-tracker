import {
  GoogleMap,
 Marker,
  useJsApiLoader
} from "@react-google-maps/api";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import { useMemo, useState, useContext } from "react";
import CurrentPositionContext from "./CurrentPositionContext";
import { useEffect } from "react";

const Map = () => {

  const {setCoordinates, coordinates, center, setCenter} = useContext(CurrentPositionContext);
  const [bounds, setBounds] = useState({})



  //setting styles to the map
  const containerStyle = {
    width: "100%",
    height: "90vh",
  };

  //verify if the map is loaded.
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  // Everytime that the coordinates changes, we'll set the center to the new coordinates and adding the Marker.
  useEffect (()=> {
    setCenter(coordinates)
  },[coordinates])

  //Defining the bounds.
  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  //If the googlemap is loaded, render -->
  return isLoaded ? (
    <>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      margin={[50, 50, 50, 50]}
      onChange={(e) => {
        setCoordinates({ lat: e.center.lat, lng: e.center.lng })
        setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
      }}
      options={{
        mapTypeControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        bounds: defaultBounds
      }}

    >
      <Marker
      position={center}
      />
    </GoogleMap>
</>
  ) : (
    <>
      <LoadingIcon>
        <FiLoader />
      </LoadingIcon>
    </>
  );
};

const LoadingIcon = styled(FiLoader)`
  position: relative;
  left: 50%;
  top: 10px;
  animation: spin 1s infinite linear;
  height: 80vh;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Map;
