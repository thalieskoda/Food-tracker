import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import UserIcon from "./UserIcon";
import HamburgerMenu from "./HamburgerMenu";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { user } = useAuth0();

  return (
    <Wrapper>
      <Container1>
        <HamburgerMenu/>
        <Link to="/homefeed">
        <Title>TRVL-UP</Title>
        </Link>
      </Container1>
      {!user ? (null) : (
      <Container2>
        <UserIcon/>
      </Container2>
      )}
    </Wrapper>
  );
};

const Link = styled(NavLink)`
`

const Title = styled.h1`
padding:10px;
`

const Container1 = styled.div`
display:flex;
align-items:center;
`;

const Container2 = styled.div`
display:flex;
align-items:center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: radial-gradient(circle,#d6ffe6,#d6ecff) no-repeat;
  align-items:center;
  height:10vh;
`;
export default Header;
