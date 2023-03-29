import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import React, { useState } from "react";

const SearchBar = ({ setCoordinates }) => {
  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autoComplete) => {
    setAutoComplete(autoComplete);
  };

  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <Wrapper>
      <P>Explore new places</P>
      <div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div>
            <FiSearch />
            <Input placeholder="Where's your next destination?"></Input>
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
