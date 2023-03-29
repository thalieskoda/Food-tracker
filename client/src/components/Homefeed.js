import styled from "styled-components";
import TravelSearch from "./TravelSearch";
import GoogleMap from "./GoogleMap"
const Homefeed = () => {
  return (
    <>
      <Wrapper>
        <Searching>
          <TravelSearch/>
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
