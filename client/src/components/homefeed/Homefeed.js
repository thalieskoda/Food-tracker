import styled from "styled-components";
import TravelSearch from "../TravelSearch";
import Map from "../Map";
const Homefeed = () => {

  return (
    <>
      <Wrapper>
        <Searching>
          <TravelSearch />
        </Searching>
        <Maps>
          <Map />
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
