import styled from "styled-components";

const HamburgerMenu = () => {
return(
<BurgerMenu>
            <span></span>
            <span></span>
            <span></span>
        </BurgerMenu>

)
}

const BurgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  width: 25px;
  
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
export default HamburgerMenu