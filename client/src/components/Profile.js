import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CurrentUserContext from "./CurrentUserContext";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";

const Profile = () => {
  //const { user } = useAuth0();
  //Get the user's information with the following line: {JSON.stringify(user,null,2)}
  //the key "sub" has a user Id

  const {currentUser, setCurrentUser} = useContext(CurrentUserContext)
 
  return (

    <>
    { currentUser ? (
      <>
      <h1>hey {currentUser.firstName}, </h1>
      <p> Where's your next adventure {currentUser.email}?</p>
</>
    ) : (
      <LoadingIcon>
      <FiLoader />
    </LoadingIcon>
    )}
    </>
  );
};

const LoadingIcon = styled(FiLoader)`
  position: relative;
  left: 50%;
  top: 10px;
  animation: spin 1s infinite linear;
  height: 80vh;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Profile;
