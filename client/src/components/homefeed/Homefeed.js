import styled from "styled-components";
import Map from "../Homefeed/Map";


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
position:relative;
right:-550px;
width:70%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh;
`;
export default Homefeed;
