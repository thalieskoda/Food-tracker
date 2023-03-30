import styled from "styled-components";
import TravelSearch from "../TravelSearch";
import Map from "../Map";
const Homefeed = ({ setCoordinates, coordinates, bounds, setBounds}) => {
  console.log(setCoordinates);
  return (
    <>
      <Wrapper>
        <Searching>
          <TravelSearch coordinates={coordinates} setCoordinates={setCoordinates} bounds={bounds} setBounds={setBounds}/>
        </Searching>
        <Maps>
          <Map coordinates={coordinates} setCoordinates={setCoordinates} bounds={bounds} setBounds={setBounds}/>
        </Maps>
      </Wrapper>
    </>
  );
};
const Maps = styled.div`

  width: 60%;
`;
const Searching = styled.div`

  width: 40%;
`;
const Wrapper = styled.div`
  display: flex;
  height: 90vh;
`;
export default Homefeed;
