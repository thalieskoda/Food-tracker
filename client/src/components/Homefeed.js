import styled from "styled-components";
import TravelSearch from "./TravelSearch";

const Homefeed = () => {
  return (
    <>
      <Wrapper>
        <Searching>
          <TravelSearch/>
        </Searching>
        <Maps>
          <h1>RENDERING MAPS</h1>
        </Maps>
      </Wrapper>
    </>
  );
};
const Maps = styled.div`
  background-color: red;
  width: 60%;
`;
const Searching = styled.div`
  background-color: blue;
  width: 40%;
`;
const Wrapper = styled.div`
  display: flex;
  height: 90vh;
`;
export default Homefeed;
