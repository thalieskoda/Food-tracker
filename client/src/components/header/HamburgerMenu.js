
import React from "react";
import styled from "styled-components";

const HamburgerMenu = ({ toggleMenu, isOpen }) => {
  return (
    <MenuBurger onClick={toggleMenu}>
      <div isOpen={isOpen}></div>
      <div isOpen={isOpen}></div>
      <div isOpen={isOpen}></div>
    </MenuBurger>
  );
};

const MenuBurger = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }

  div {
    width: 30px;
    height: 3px;
    background-color: #333;
    margin: 6px 0;
    transition: transform 0.2s ease-in-out;

    &:nth-child(1) {
      transform: ${({ isOpen }) =>
        isOpen ? "rotate(45deg) translate(5px, 5px)" : "none"};
    }

    &:nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
    }

    &:nth-child(3) {
      transform: ${({ isOpen }) =>
        isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"};
    }
  }
`;


export default HamburgerMenu;
