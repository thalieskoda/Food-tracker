import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import { useState, useContext, useEffect } from "react";
import CurrentPositionContext from "./CurrentPositionContext";
import TravelSearch from "./TravelSearch";
import SearchBar from "./SearchBar";

//setting styles to the map
const containerStyle = {
  width: "100%",
  height: "90vh",
};
//Rendering GoogleMaps
const Map = () => {
  const { setCoordinates, coordinates, center, setCenter } = useContext(
    CurrentPositionContext
  );

  const [bounds, setBounds] = useState({});
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  console.log(selectedRestaurant);
  // verify if the map is loaded.
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // libraries: ['places'] //only looking for "places" --> restaurant
  });

  // Every time that the coordinates changes, we'll set the center to the new coordinates and adding the Marker.
  useEffect(() => {
    setCenter(coordinates);
  }, [coordinates]);

  // Fetches nearby restaurants using PlacesService when map is ready
  const onLoad = (map) => {
    setMap(map);
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: "5000",
      type: ["restaurant"],
      fields: ["photos", "name"],
    };
    // Searching nearby for the resques that contains ***"restaurant"*** according to the location "center"
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
  };
  console.log(places);
  // If there's a map and it's loaded, and there's at least one place in the area ;
  useEffect(() => {
    if (isLoaded && map && places.length > 0) {
      // Setting the bounds for the search
      const newBounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        newBounds.extend(place.geometry.location);
      });
      map.fitBounds(newBounds);
    }
  }, [isLoaded, map, places, coordinates]); // Everything that one of those changes, this useEffect gets called.

  console.log(selectedRestaurant);
  return isLoaded ? (
    <>
      <SearchBar map={map} setPlaces={setPlaces} />
      <MapContainer>
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
              onClick={() => setSelectedRestaurant(place)}
            />
          ))}
        </GoogleMap>
      </MapContainer>
      <SearchContainer>
      {selectedRestaurant && (
        <TravelSearch
          name={selectedRestaurant.name}
          address={selectedRestaurant.vicinity}
          rating={selectedRestaurant.rating}
          ratingNumber={selectedRestaurant.user_ratings_total}
          price={selectedRestaurant.price_level}
          photos={selectedRestaurant.photos}
          id={selectedRestaurant.place_id}
          icon={selectedRestaurant.icon}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
      </SearchContainer>
    </>
  ) : (
    <>
      <LoadingIcon>
        <FiLoader />
      </LoadingIcon>
    </>
  );
};

const SearchContainer = styled.div`
position:relative;
`
const MapContainer = styled.div`
  position: relative;
  top: -40px;
`;
const LoadingIcon = styled(FiLoader)`
  position: relative;
  left: 50%;
  top: 10px;
  animation: spin 1s infinite linear;
  height: 70vh;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Map;
