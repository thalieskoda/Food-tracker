import styled from "styled-components";
import { CgMailForward } from "react-icons/cg";
import { useAuth0 } from "@auth0/auth0-react";

const NoFavorite = () => {
  const { user } = useAuth0();

  return (
    <>
      <Container>
        <Hey>Hey {user.given_name},</Hey>
        <Text>
          you should probably go back to the home page and add your favorite
          restaurants!
        </Text>
      </Container>
      <ContainerIcon>
        <Icon>
          <CgMailForward size={50} color="#3b597b" />
        </Icon>
        <Click>click there to get started! </Click>
      </ContainerIcon>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 70vh;
`;

const Hey = styled.h1`
  border-bottom: 3px #3b597b solid;
  border-left: 3px #3b597b solid;
  padding: 60px;
`;

const Text = styled.p`
  border-top: 3px #3b597b solid;
  border-right: 3px #3b597b solid;
  padding: 60px;
`;
const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 0 15px;
  position: relative;
  top: -620px;
`;
const Icon = styled.div`
  transform: rotate(-90deg);
`;
const Click = styled.p`
  font-weight: 200;
`;
export default NoFavorite;
