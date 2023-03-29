import { useState } from "react";
import React from "react";
import styled from "styled-components";

const HamburgerMenu = () => {

  return (
    <>
      <MenuBurger>
        <Div></Div>
        <Div></Div>
        <Div></Div>
      </MenuBurger>
    </>
  );
};

const MenuBurger = styled.div`
width:2rem;
height:1.7rem;
display:flex;
justify-content:space-around;
flex-flow:column nowrap;
z-index:10;
`;

const Div=styled.div`
width:2rem;
height:0.25rem;
border-radius:10px;
background-color:black;
transform-origin:1px;
transition:akk 0.3s linear;
`

export default HamburgerMenu;
