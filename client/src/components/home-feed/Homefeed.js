import Map from "./Map";
import styled from "styled-components";

//Homefeed  component where we see the map on the right and Instructions / TravelSearch on the left
const Homefeed = () => {
  return (
    <>
      <Wrapper>
        <Maps>
          <Map />
        </Maps>
      </Wrapper>
    </>
  );
}; 

const Maps = styled.div`
  position: relative;
  right: -550px;
  width: 60%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh;
`;
export default Homefeed; 
