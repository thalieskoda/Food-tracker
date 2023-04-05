import styled from "styled-components";
import TravelSearch from "./TravelSearch";
import Map from "./Map";
const Homefeed = () => {
  return (
    <>
      <Wrapper>
        <Searching>
        <>
          <P>1. Enter a city that you would like to visit</P>
          <P>2. Select your favorite restaurants</P>
          <P>3. Add them to your profile</P>
          <P>
            4. Rate them once you ate there ! 
          </P>
        </>
        </Searching>
        <Maps>
          <Map/>
        </Maps>
      </Wrapper>
    </>
  );
};

const P = styled.p`
padding:10px;
font-weight:bold;
`
const Maps = styled.div`

  width: 100%;
`;
const Searching = styled.div`
padding: 30px;
  width: 40%;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction:row;
  height: 90vh;
`;
export default Homefeed;
