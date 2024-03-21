import styled from "styled-components";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import Homefeed from "../home-feed/Homefeed";
import { FiLoader } from "react-icons/fi";
import Picture from "../Picture";
//UesrAuthenticator component - page for the user when he's not logged in.
const UserAuthenticator = () => {
  const { user } = useAuth0();

  //If the user is not logged in, show welcome text
  //If the user is logged in, show the homeFeed (MAP)
  return (
    <Wrapper>
      {!user ? (
        <>
          <Container>
            <Welcome>
              <Title>WELCOME FOODIE !</Title>
              <P>
                Let us be your go-to pals on a tasty adventure. From local
                favorites to global gems, we've got the scoop on where to find
                the best bites. Join us as we explore delicious delights and
                create unforgettable dining experiences together. Let's eat,
                explore, and enjoy every moment! 🍽️✨
              </P>
              <Buttons>
                <LoginButton />
              </Buttons>
            </Welcome>

            <Picture />
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  //border: 3px solid red;
`;
const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 70vh;
  width: 44vw;
  /* padding: 0 0 0 20px; */
`;

const P = styled.p`
  padding: 20px;
  width: 500px;
  font-family: "quicksand";
`;
const Title = styled.p`
  padding: 20px;
  width: 500px;
  font-family: "Delius Unicase", cursive;
  font-weight: 700;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
`;

const Buttons = styled.div`
  text-align: center;
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
