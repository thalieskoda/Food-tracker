import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { Autocomplete } from "@react-google-maps/api";
import React, { useState } from "react";
import LoginButton from "./userAuthenticator/LoginButton";

const SearchBar = ({ setCoordinates }) => {

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
      console.log({autoComplete});
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
console.log(lat, lng);
    setCoordinates({ lat, lng }); //is not a function
  };
};

console.log({setCoordinates}); //undefined

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
`;

const Input = styled.input`
  width: 250px;
  padding: 5px;
  margin: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
`;

export default SearchBar;
