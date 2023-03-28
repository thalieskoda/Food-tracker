import styled from "styled-components";
import SearchBar from "./SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import UserIcon from "./UserIcon";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const { user } = useAuth0();

  return (
    <Wrapper>
      <Container1>
        <HamburgerMenu/>
        <Title>TRVL-UP</Title>
      </Container1>
      {!user ? (null) : (
      <Container2>
        <SearchBar />
        <UserIcon/>
      </Container2>
      )}
    </Wrapper>
  );
};



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
  padding:10px;

`;
export default Header;
