import styled from "styled-components";
import { FaCity } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { GiPodium } from "react-icons/gi";

const Instructions = () => {
  return (
    <Searching>
      <Wrapper />
      <P>
        <FaCity /> Enter a city that you would like to visit
      </P>

      <Wrapper />
      <P>
        <MdOutlineFastfood /> Select your favorite restaurants
      </P>

      <Wrapper />
      <P>
        <FiUser /> Add them to your profile
      </P>

      <Wrapper />
      <P>
        <GiPodium /> Rate them once you ate there !
      </P>
    </Searching>
  );
};

const P = styled.p`
  z-index: 9999;
  font-weight: 200;
  max-width:320px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
  background-color: #f5f5f5;
  padding: 15px;
`;

const Wrapper = styled.div`
  position: relative;
  /* top: 95px;
  left:10px; */
 
  
`;

const Searching = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60vh;
  position: relative;
  left: -450px;
  top: -750px;
  padding: 10px;
  z-index: 1;
`;
export default Instructions;
