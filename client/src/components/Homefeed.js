import styled from "styled-components";
import { FaCity } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { GiPodium } from "react-icons/gi";
import Map from "./Map";
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
right:-420px;
width:70%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh;
`;
export default Homefeed;
