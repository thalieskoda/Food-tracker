import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//Navigation component
const Navigation = () => {
  return (
    <div>
      <Nav>
        <Ul>
          <Li to="/homefeed">Home</Li>
          <Li to="/about">About</Li>
          <Li to="/contact">Contact</Li>
        </Ul>
      </Nav>
    </div>
  );
};

const Li = styled(Link)`
  list-style-type: none;
  padding-right: 20px;
  color: white;

  &:hover {
    color: white;
    opacity: 0.8;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }
`;

const Ul = styled.ul`
  display: flex;
  margin: 20 0px;
  padding: 0 20px;
  transition: transform 0.2s ease-in-out;
`;

const Nav = styled.div`
  width: 100%;
  height: 50%;
`;

export default Navigation;
