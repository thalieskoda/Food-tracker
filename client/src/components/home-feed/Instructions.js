import styled from "styled-components";
import { FaCity } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { GiPodium } from "react-icons/gi";
import { motion } from "framer-motion";

//If the user didn't use the searchbar yet, show the instructions :
const Instructions = () => {
  return (
    <Searching>
      <Wrapper />
      <P   whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.5 },
                    }}>
        <FaCity color="white" /> Enter a city that you would like to visit
      </P>

      <Wrapper />
      <P   whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.5 },
                    }}>
        <MdOutlineFastfood color="white" /> Select your favorite restaurants
      </P>

      <Wrapper />
      <P   whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.5 },
                    }}>
        <FiUser color="white" /> Add them to your profile
      </P>

      <Wrapper />
      <P   whileHover={{
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
  max-width: 325px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
  background-color: #092a51;
  border-radius: 5px;
  padding: 15px 30px 15px 30px;
  color: white;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Searching = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60vh;
  position: relative;
  left: -450px;
  top: -630px;
  padding: 10px;
  z-index: 1;
`;
export default Instructions;
