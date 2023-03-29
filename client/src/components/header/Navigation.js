import { useState } from "react";
import styled from "styled-components";
import HamburgerMenu from "./HamburgerMenu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Nav>
        <Ul isOpen={isMenuOpen}>
          <Li>Home</Li>
          <Li>About</Li>
          <Li>Contact us</Li>
        </Ul>
        <HamburgerMenu toggleMenu={toggleMenu} isOpen={isMenuOpen} />
      </Nav>
    </div>
  );
};

const Li = styled.li`
  list-style-type: none;
  padding-right: 10px;
`;
const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  float: right;
  margin: 20px 0px;
  padding: 0 25px;
  position:relative;
  left:100;
  transition: transform 0.3s ease-in-out;
`;


const Nav = styled.div`
  width: 100%;
  height: 50%;
  background-color: red;
`;
export default Navigation;
