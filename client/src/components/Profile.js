import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import Comments from "./Comments";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const [favoriteRestaurant, setFavoriteRestaurant] = useState([]);
  const [reload, setReload] = useState(false);

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
      {user && favoriteRestaurant ? (
        <>
        <Container>

          <H1>Hey {user.given_name},</H1>
          <P>Here are your favorite restaurants:</P>
        </Container>
          {favoriteRestaurant.map((restaurant) => {
           
            return (
              <Wrapper key={restaurant.place_id}>
                <Ul>
                  <Li><Span>Name:</Span> {restaurant.name}</Li>
                  <Li><Span>Address: </Span>{restaurant.address}</Li>
                  <Li><Span>Rating: </Span>{restaurant.rating}/5</Li>
                  <Li><Span>Price level:</Span> {restaurant.price_level}/5</Li>             
                  <Date><Span>Added to your favorites on </Span>{restaurant.date_added}</Date>
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

const Date = styled.p`
font-size:0.6em;
padding:0 0 0 10px;
`
const Container = styled.div`
padding:30px;
`
const H1 = styled.h1`

`;

const P = styled.p`
`;
const Span = styled.span`
font-weight:bold;
padding:0 0 0 20px;
`
const Wrapper = styled.div`
  display: flex;
  align-items:center;
  justify-content:space-evenly;
  border: 1px blue solid;
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
