import styled from "styled-components";
import {FaCity} from "react-icons/fa";
import {MdOutlineFastfood} from "react-icons/md";
import {FiUser} from "react-icons/fi";
import {GiPodium} from "react-icons/gi";
import Map from "./Map";
const Homefeed = () => {
  return (
    <>
      <Wrapper>
        
        <Searching>
        <>
          <P><FaCity/> Enter a city that you would like to visit</P>
          <P><MdOutlineFastfood/> Select your favorite restaurants</P>
          <P><FiUser/> Add them to your profile</P>
          <P>
            <GiPodium/> Rate them once you ate there ! 
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
font-weight:100;

`
const Maps = styled.div`

  width: 90%;
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
