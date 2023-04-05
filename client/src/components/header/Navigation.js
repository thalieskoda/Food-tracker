import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
          <Li to="/homefeed" onClick={handleClick}>
            Home
          </Li>
          <Li to="/about" onClick={handleClick}>
            About
          </Li>
          <Li to="/contact" onClick={handleClick}>
            Contact us
          </Li>
        </Ul>
      </Nav>
    </div>
  );
};

const Li = styled(Link)`
  list-style-type: none;
  padding-right: 20px;
`;

const Ul = styled.ul`
  display: flex;
  margin: 20 0px;
padding:0 20px;
  transition: transform 0.2s ease-in-out;
`;

const Nav = styled.div`
  width: 100%;
  height: 50%;
`;

export default Navigation;
