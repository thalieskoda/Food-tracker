import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import UserIcon from "./UserIcon";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import logo from "../images/newlogo.png";
import { useEffect, useState } from "react";

//Header component with the logo and the Nav bar
const Header = () => {
  const { user, isAuthenticated } = useAuth0();

  //POSTing the information of the new logged in user to the server
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${process.env.REACT_APP_BASE_URL}/add-users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    }
  }, [isAuthenticated, user]);

  return (
    <Wrapper>
      <>
        <Navigation />
        {!user ? (
          <Link to="/">
            <Logo src={logo} alt="logo" />
          </Link>
        ) : (
          <Link to="/homefeed">
            <Logo src={logo} alt="logo" />
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
  position: relative;
  left: -120px;
`;

const Container2 = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: radial-gradient(circle, #3b597b, #030e1b) no-repeat;
  align-items: center;
  height: 10vh;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
`;
export default Header;
