import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import UserIcon from "./UserIcon";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import logo from "../images/travelup.png";
import { useEffect, useState } from "react";
const Header = () => {
  const { user, isAuthenticated } = useAuth0();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/add-users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    }
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <Wrapper>
      <>
        <Navigation toggleMenu={toggleMenu} isOpen={isMenuOpen} />
        {!user ? (
          <Link to="/">
            <Logo src={logo} alt="logo" isMenuOpen={isMenuOpen} />
          </Link>
        ) : (
          <Link to="/homefeed">
            <Logo src={logo} alt="logo" isMenuOpen={isMenuOpen} />
          </Link>
        )}
      </>
      {!user ? null : (
        <>
          <Container2>
            <UserIcon />
          </Container2>
        </>
      )}
    </Wrapper>
  );
};

const Link = styled(NavLink)`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  padding: 10px;
  width: 100px;
  position:relative;
  left:-120px;
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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
 
`;
export default Header;
