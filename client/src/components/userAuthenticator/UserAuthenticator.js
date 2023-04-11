import styled from "styled-components";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import Homefeed from "../Homefeed/Homefeed";
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
            <Div>
              
                <Welcome>
                  <h1>Hello there ! </h1>
                  <P>
                    Welcome to our personalized food guide, where we assist you
                    in discovering hidden culinary gems and creating
                    unforgettable dining experiences. With us, you can craft
                    your own gastronomic journey by exploring distinctive food
                    destinations, savoring local delicacies, and uncovering the
                    world's best-kept culinary secrets. Allow us to be your
                    culinary compass to an unforgettable food adventure.
                  </P>
                <Buttons>
                  <LoginButton />
                </Buttons>
                </Welcome>
        
            </Div>

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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-evenly;
`;

const P = styled.p`
  border: black 1px solid;
  padding: 20px;
  width: 500px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width:100vw;
`;
const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 70vh;
  width:44vw;
  /* padding: 0 0 0 20px; */
 
`;

const Buttons = styled.div`
  text-align:center;
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
