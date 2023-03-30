import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HamburgerMenu from "./HamburgerMenu";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    setShowDropdown(!showDropdown)
    setIsMenuOpen(false)
  }
  return (
    <div>
      <Nav>
        <Ul isOpen={isMenuOpen}>
          <Li to="/homefeed" onClick={handleClick}>Home</Li>
          <Li to="/about" onClick={handleClick}>About</Li>
          <Li to="/contact" onClick={handleClick}>Contact us</Li>
        </Ul>
        <HamburgerMenu toggleMenu={toggleMenu} isOpen={isMenuOpen} />
      </Nav>
    </div>
  );
};

const Li = styled(Link)`
  list-style-type: none;
  padding-right: 20px;
  

  &:hover{
font-size:17px;

  }
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  float: right;
  margin: 20 0px;
  padding: 0 25px;
  transform: ${({ isOpen }) => (isOpen ? "translateX(1%)" : "translateX(-100%)")};
  transition: transform 0.2s ease-in-out;
`;

const Nav = styled.div`
  width: 100%;
  height: 50%;
`;
export default Navigation;
