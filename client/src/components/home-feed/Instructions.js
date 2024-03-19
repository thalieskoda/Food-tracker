import styled from "styled-components";
import { FaCity } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { GiPodium } from "react-icons/gi";
import { motion } from "framer-motion";
import { Button, Text } from "@nextui-org/button";
//If the user didn't use the searchbar yet, show the instructions :
const Instructions = () => {
  return (
    <Searching>
      <P
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5 },
        }}>
        <FaCity color="white" /> Enter a city that you would like to visit
      </P>

      <P
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5 },
        }}>
        <MdOutlineFastfood color="white" /> Select your favorite restaurants
      </P>

      <P
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5 },
        }}>
        <FiUser color="white" /> Add them to your profile
      </P>

      <P
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5 },
        }}>
        <GiPodium color="white" /> Rate them once you ate there !
      </P>
    </Searching>
  );
};

const P = styled(motion.p)`
  z-index: 9999;
  font-weight: 200;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
  background-color: #c2b1a9;
  border-radius: 5px;
  padding: 15px 30px 15px 30px;
  color: white;
`;

const Searching = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60vh;
  position: relative;
  left: -450px;
  top: -90%;
  padding: 5px;
  z-index: 1;
`;
export default Instructions;
