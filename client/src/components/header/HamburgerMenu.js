import { useState } from "react";
import styled from "styled-components";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <BurgerMenuClose onClick={handleClick}>
        <span></span>
        <span></span>
        <span></span>
      </BurgerMenuClose>
      {open && <Overlay onClick={handleClick}/>}
      <BurgerMenuOpen isOpen={open}>
        <MenuItem>allo</MenuItem>
        <MenuItem>allo</MenuItem>
        <MenuItem>allo</MenuItem>
      </BurgerMenuOpen>
    </>
  );
};
const Overlay = styled.div`
position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  `;

const MenuItem = styled.div`

&:hover {
  cursor: pointer;
  background-color:#d6ffe6;
}
`;
const BurgerMenuOpen = styled.div`
position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: #fff;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => isOpen ? "translateX(0)" : "translateX(100%)"};
`;

const BurgerMenuClose = styled.div`
   position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  width: 25px;
  padding: 10px;
  cursor: pointer;
  span {
    display: block;
    height: 3px;
    width: 100%;
    background: #333;
    border-radius: 3px;
    &:nth-child(2) {
      margin: 5px 0;
    }
  }
`;
export default HamburgerMenu;
