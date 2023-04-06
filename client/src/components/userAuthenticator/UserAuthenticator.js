import styled from "styled-components";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import Homefeed from "../Homefeed";
import { FiLoader } from "react-icons/fi";
import Picture from "../Picture";

const UserAuthenticator = () => {
  const { user } = useAuth0();

  return (
    <Wrapper>
      {!user ? (
        <>
          <Container>
            <Div>
              <Center>
              <Welcome>
                <h1>Hello there ! </h1>
                <P>
                  Welcome to our personalized travel planner, where we help you
                  find the hidden gems and create unforgettable memories. With
                  us, you can create your own travel story by exploring unique
                  destinations, tasting local cuisine, and discovering the
                  world's best-kept secrets. Let us be your guide to an
                  unforgettable adventure.
                </P>
              </Welcome>
              <Buttons>
                <LoginButton />
              </Buttons>
              </Center>
            </Div>

            
            <Picture/>
          </Container>
        </>
      ) : (
        <>
          {!Homefeed ? (
            <LoadingIcon>
              <FiLoader />
            </LoadingIcon>
          ) : (
            <Homefeed />
          )}
        </>
      )}
    </Wrapper>
  );
};
const Center  =styled.div`
display:flex;
flex-direction:column;
`
const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const P = styled.p`
  border: black 1px solid;
  padding: 20px;
  width:500px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 30vh;
padding: 0 0 0 30px;

`;
const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 400px;
padding: 0 0 0 20px;
`;


const Buttons = styled.div`
  display: flex;
  padding: 0 0 0 20px;
`;
const LoadingIcon = styled(FiLoader)`
  position: relative;
  left: 50%;
  top: 10px;
  animation: spin 1s infinite linear;
  height: 90vh;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default UserAuthenticator;
