import { FiSearch } from "react-icons/fi";
import { Autocomplete } from "@react-google-maps/api";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import CurrentPositionContext from "../CurrentPositionContext";

//SearchBar component - searching places with the Autocomplete in GoogleMaps
const SearchBar = ({ map, setPlaces, selectedRestaurant }) => {
  const { setCenter } = useContext(CurrentPositionContext);
  const [autoComplete, setAutoComplete] = useState(null);

  // Start as null, but when the input changes, the Autocomplete renders.
  const onLoad = (autoComplete) => {
    setAutoComplete(autoComplete);
  };

  // is called when the user selects a place from the autocomplete suggestions
  // It retrieves the location of the selected place
  const onPlaceChanged = () => {
    if (autoComplete !== null) {
      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();
      setCenter({ lat, lng });
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: { lat, lng },
        radius: "5000",
        type: ["restaurant"],
      };
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // Modify the results array to add the name of each restaurant to the corresponding place object in setPlaces
          const modifiedResults = results.map((result) => {
            return {
              ...result,
              name: result.name,
            };
          });
          setPlaces(modifiedResults);
        }
      });
    }
  };

  // Add a click listener for each marker and set up the info window from Google documentation
  useEffect(() => {
    setPlaces((place) => {
      return place.map((place) => {
        const marker = new window.google.maps.Marker({
          position: place.geometry.location,
          map,
          title: place.name,
        });
        // Add a click listener for each marker and set up the info window from Google documentation
        marker.addListener("click", () => {
          const infoWindow = new window.google.maps.InfoWindow({
            content: marker.title,
          });
          infoWindow.open(map, marker);
        });
        // Add the marker to the place object
        return { ...place, marker };
      });
    });
  }, [map, setPlaces]);

  //Return the Search Bar
  return (
    <Wrapper>
      <P>Explore new places</P>
      <div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div>
            <Input
              placeholder="search..."
              disabled={selectedRestaurant ? true : false}></Input>
            <FiSearch />
          </div>
        </Autocomplete>
      </div>
    </Wrapper>
  );
};

const P = styled.p`
  padding: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 250px;
  padding: 5px;
  margin: 10px;
`;

const Wrapper = styled.div`
  position: relative;
  top: 20px;
  left: -450px;
  display: flex;
  align-items: center;
  z-index: 9999;
  /* background-color: rgba(255, 255, 255, 0.85); */
  width: 27vw;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export default SearchBar;
