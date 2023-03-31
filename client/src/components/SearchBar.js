import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { Autocomplete } from "@react-google-maps/api";
import React, { useState, useContext } from "react";
import CurrentPositionContext from "./CurrentPositionContext";

const SearchBar = ({map, setPlaces}) => {

  const {setCoordinates, setCenter} = useContext(CurrentPositionContext);

 
  const [autoComplete, setAutoComplete] = useState(null);
  
  //Start as null, but when the input changes, the Autocomplete renders.
  const onLoad = (autoComplete) => {
    setAutoComplete(autoComplete);
  };
  //Create an event handler for the place_changed event, and call addListener() on the Autocomplete object to add the handler.
  //Call Autocomplete.getPlace() on the Autocomplete object, to retrieve a PlaceResult object, which you can then use to get more information about the selected place.
  

  //is called when the user selects a place from the autocomplete suggestions
  //It retrieves the location of the selected place 
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
          setPlaces(results);
        }
      });
    }
  };


  return (
    <Wrapper>
      <P>Explore new places</P>
      <div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div>
            <Input placeholder="search..."></Input>
            <FiSearch />
          </div>
        </Autocomplete>
      </div>
    </Wrapper>
  );
};

const P = styled.p`
  padding: 10px;
  font-weight:bold;
  border-bottom:1px black solid;
`;

const Input = styled.input`
  width: 250px;
  padding: 5px;
  margin: 10px;
`;

const Wrapper = styled.div`
  position: relative;
  top: 20px;
  left:170px;
  display: flex;
  align-items: center;
  padding: 30px;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.85);
  width: 550px;
  align-items: center;
  border-radius:20px;
`;

export default SearchBar;
