import styled from "styled-components";
import { FaCity } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { GiPodium } from "react-icons/gi";
import SearchBar from "./SearchBar";

const Instructions = () => {
  return (
  
      <Searching>
        <P>
          <FaCity /> Enter a city that you would like to visit
        </P>
        <P>
          <MdOutlineFastfood /> Select your favorite restaurants
        </P>
        <P>
          <FiUser /> Add them to your profile
        </P>
        <P>
          <GiPodium /> Rate them once you ate there !
        </P>
      </Searching>

  );
};

const P = styled.p`
  padding: 10px;
  font-weight: 100;
`;

const Searching = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60vh;
  position: relative;
  left: -400px;
  top: -750px;
  padding: 10px;
  z-index: 1;
`;
export default Instructions;
