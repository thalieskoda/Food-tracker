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
import TravelSearch from "./TravelSearch";


const Map = () => {

  const {setCoordinates, coordinates, center, setCenter} = useContext(CurrentPositionContext);
  const [bounds, setBounds] = useState({});
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

 // Renders markers for nearby restaurants
 const markers = places.map((place, index) => (
  <Marker
    key={index}
    position={{
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }}
    onClick={() => setSelectedRestaurant(place)}
  />
));

  //setting styles to the map
  const containerStyle = {
    width: "100%",
    height: "90vh",
  };
 
  //verify if the map is loaded.
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
   // libraries: ['places'] //only looking for "places" --> restaurant
  });


   // Everytime that the coordinates changes, we'll set the center to the new coordinates and adding the Marker.
   useEffect (()=> {
    setCenter(coordinates)
  },[coordinates])

  // Fetches nearby restaurants using PlacesService when map is ready
  const onLoad = (map) => {
    setMap(map)
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: "5000",
      type: ["restaurant"],
    };
    //Searching nearby for the resques that contains "restaurant" according to the location "center"
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
  };

  //If there's a map and it's loaded, and there's at least one place in the area ; 
  useEffect(() => {
    if (isLoaded && map && places.length > 0) { 
      //Setting the bounds for the search
      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        bounds.extend(place.geometry.location);
      });
      map.fitBounds(bounds);
    }
  }, [isLoaded, map, places, coordinates]); //Everything that one of those changes, this useEffect gets called.

 

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        margin={[50, 50, 50, 50]}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onLoad={onLoad}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        }}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
          />
        ))}
        {markers}
      </GoogleMap>
      
        {selectedRestaurant && (
          <>
      <Container>
      <TravelSearch 
          name={selectedRestaurant.name}
          address={selectedRestaurant.formatted_address}
          rating={selectedRestaurant.rating}
          onClose={() => setSelectedRestaurant(null)}
        />
      </Container>
      </>
        )}
    </>
  ) : (
    <>
      <LoadingIcon>
        <FiLoader />
      </LoadingIcon>
    </>
  );
};


const Container = styled.div`
display:none;
`

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
