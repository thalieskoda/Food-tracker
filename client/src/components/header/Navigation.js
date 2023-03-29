import styled from "styled-components"
import HamburgerMenu from "./HamburgerMenu";

const Navigation = () => {

    return(
        <div>
            <Nav>
                <Ul>
                    <Li>Home</Li>
                    <Li>About</Li>
                    <Li>Contact us</Li>
                </Ul>
                <HamburgerMenu/>
            </Nav>
        </div>
    )

}

const Li = styled.li`
list-style-type: style type none;;
padding-right: 10px;
`;

const Ul = styled.ul`
display:flex;
flex-wrap:wrap;
float:right;
margin:20 0px;
padding: 0 25px;
`
const Nav = styled.div`
width: 100%;
height:50%;
background-color:red;
`
export default Navigation