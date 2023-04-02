import styled from "styled-components";
import TravelSearch from "./TravelSearch";
import Map from "./Map";
const Homefeed = () => {
  return (
    <>
      <Wrapper>
        <Searching>
        <>
          <p>1. Enter a city that you would like to visit</p>
          <p>2. Select your favorite restaurants</p>
          <p>3. Add them to your profile</p>
          <p>
            4. Check the address of the restaurant you'd like to go directly from
            your profile when the time comes
          </p>
        </>
        </Searching>
        <Maps>
          <Map/>
        </Maps>
      </Wrapper>
    </>
  );
};
const Maps = styled.div`

  width: 100%;
`;
const Searching = styled.div`

  width: 40%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction:row;
  height: 90vh;
`;
export default Homefeed;
