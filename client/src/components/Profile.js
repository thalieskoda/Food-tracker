import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CurrentUserContext from "./CurrentUserContext";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import Comments from "./Comments";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  // Get the user's information with the following line: {JSON.stringify(user,null,2)}
  // the key "sub" has a user Id
  console.log(user);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [favoriteRestaurant, setFavoriteRestaurant] = useState([]);
  const [reload, setReload] = useState(false);

  console.log(currentUser);

  // useEffect(() => {
  //   fetch("/favorite-restaurants")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFavoriteRestaurant(data.data.favorites);
  //         console.log(data.data.favorites);

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [currentUser.email, reload ]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/get-user/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("here", data);
          setFavoriteRestaurant(data.data.favorites);
        });
    }
  }, [isAuthenticated]);
  console.log("favoriteRestaurant", favoriteRestaurant);
  return (
    <>
      {currentUser && favoriteRestaurant ? (
        <>
          <h1>hey {currentUser.firstName}, </h1>
          <p>Here's your favorite restaurants : </p>
          {favoriteRestaurant.map((restaurant) => {
            return (
              <Wrapper key={restaurant.place_id}>
                <Ul>
                  <li>{restaurant.name}</li>
                  <li>{restaurant.address}</li>
                  <li>{restaurant.rating}</li>
                </Ul>
                <Comments
                  setReload={setReload}
                  place_id={restaurant.place_id}
                  reload={reload}
                />
              </Wrapper>
            );
          })}
        </>
      ) : (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  border: 2px red solid;
`;

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
  padding: 10px;
`;
const Ul = styled.ul`
  padding: 10px;
  list-style-type: none;
`;
export default Profile;
