import { useState } from "react";
import React from "react";
import styled from "styled-components";

const HamburgerMenu = ({ toggleMenu, isOpen }) => {
  return (
    <MenuBurger onClick={toggleMenu}>
      <Div isOpen={isOpen}></Div>
      <Div isOpen={isOpen}></Div>
      <Div isOpen={isOpen}></Div>
    </MenuBurger>
  );
};

const MenuBurger = styled.div`
  width: 2rem;
  height: 1.7rem;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  z-index: 10;
  cursor: pointer;
`;

const Div = styled.div`
  width: 2rem;
  height: 0.25rem;
  border-radius: 10px;
  background-color: ${({ isOpen }) => (isOpen ? "white" : "black")};
  transform-origin: 1px;
  transition: all 0.3s linear;

  &:nth-child(1) {
    transform: ${({ isOpen }) => (isOpen ? "rotate(45deg)" : "rotate(0)")};
  }

  &:nth-child(2) {
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(100%)" : "translateX(0)"};
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
  }

  &:nth-child(3) {
    transform: ${({ isOpen }) => (isOpen ? "rotate(-45deg)" : "rotate(0)")};
  }
`;

export default HamburgerMenu;
