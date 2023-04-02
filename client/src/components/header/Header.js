import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import UserIcon from "./UserIcon";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import logo from "../images/travelup.png"
import { useState } from "react";
const Header = () => {
  const { user } = useAuth0();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <Wrapper>
      <Container1>
        <Navigation toggleMenu={toggleMenu} isOpen={isMenuOpen}/>
        {!user? ( <Link to="/">
        <Logo src={logo} alt="logo" isMenuOpen={isMenuOpen}/>
        <Title>-up</Title>
        </Link>) : ( 
        <Link to="/homefeed">
        <Logo src={logo} alt="logo" isMenuOpen={isMenuOpen}/>
        <h1>-up</h1>
        </Link>
        )}
      </Container1>
      {!user ? (null) : (
        <>
      <Container2>
        <UserIcon/>
      </Container2>
        </>
      )}
    </Wrapper>
  );
};

const Title = styled.p`
  /* font-family: Crossant+one; */
`;

const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  position: relative;
  left: ${(props) => (props.isMenuOpen ? "250px" : "0")};
  transition: left 0.3s ease-in-out;
`;

const Logo = styled.img`
  padding: 10px;
  width: 100px;
`;

const Container1 = styled.div`
  display: flex;
  align-items: center;
`;

const Container2 = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: radial-gradient(circle, #d6ffe6, #d6ecff) no-repeat;
  align-items: center;
  height: 10vh;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
`;
export default Header;
