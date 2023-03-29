import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import UserIcon from "./UserIcon";
import HamburgerMenu from "./HamburgerMenu";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import logo from "../images/travelup.png"
import { FiMail } from "react-icons/fi";
const Header = () => {
  const { user } = useAuth0();

  return (
    <Wrapper>
      <Container1>
        <HamburgerMenu/>
        {!user? ( <Link to="/">
        <Logo src={logo} alt="logo"/>
        <Title>-up</Title>
        </Link>) : ( 
        <Link to="/homefeed">
        <Logo src={logo} alt="logo"/>
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
font-family: 'Croissant One', cursive;
`

const Link = styled(NavLink)`
display:flex;
align-items:center;
`

const Logo = styled.img`
padding:10px;
width:100px;
`

const Container1 = styled.div`
display:flex;
align-items:center;
`;

const Container2 = styled.div`
display:flex;
align-items:center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: radial-gradient(circle,#d6ffe6,#d6ecff) no-repeat;
  align-items:center;
  height:10vh;
`;
export default Header;
