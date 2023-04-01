import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CurrentUserContext from "./CurrentUserContext";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth0();
  // Get the user's information with the following line: {JSON.stringify(user,null,2)}
  // the key "sub" has a user Id

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  console.log(currentUser);
  const navigate = useNavigate();

  // Accessing the country of the first destination
  const country = currentUser.destinations[0].country; // italy

  // Accessing the cityName of the first destination
  const cityName = currentUser.destinations[0].city.cityName; // venise

  const handleNavigate = (country) => {
    navigate(`/profile/${country}`);
  };
  return (
    <>
      {currentUser ? (
        <>
          <h1>hey {currentUser.firstName}, </h1>
          <p>Here's your adventures' information : </p>
          <Ul>
            {currentUser.destinations.map(destination => (
              <Li key={destination.country}>
                <Button onClick={() => handleNavigate(destination.country)}>
                  {destination.country}
                </Button>
              </Li>
            ))}
          </Ul>
        </>
      ) : (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      )}
    </>
  );
};

const Button = styled.button`
width:500px;
`

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
const Li = styled.li`
padding:10px;
`
const Ul = styled.ul`
padding:10px;
list-style-type: none;
`
export default Profile;
