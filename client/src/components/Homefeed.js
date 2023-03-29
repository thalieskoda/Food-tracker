import styled from "styled-components";
import TravelSearch from "./TravelSearch";
import GoogleMap from "./Map"
const Homefeed = ({setCoordinates}) => {
  return (
    <>
      <Wrapper>
        <Searching>
          <TravelSearch setCoordinates={setCoordinates}/>
        </Searching>
        <Maps>
          <GoogleMap/>
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
