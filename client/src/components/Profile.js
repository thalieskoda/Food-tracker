import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLoader } from "react-icons/fi";
import styled from "styled-components";
import Comments from "./Comments";


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const [favoriteRestaurant, setFavoriteRestaurant] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
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

  useEffect(() => {
    fetch("/favorite-restaurants")
      .then((res) => res.json())
      .then((data) => {
        setFavoriteRestaurant(data.data.favorites);
        console.log(data.data.favorites);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.email, favoriteRestaurant.name, favoriteRestaurant.place_idid]); //Everytime it's a new restaurant or a new user, we fetch different favorite restaurants

  const handleDelete = (ev) => {
    ev.preventDefault();
    setIsAdded(false);
    setIsAvailable(true);
    console.log(favoriteRestaurant);
    fetch("/update-favorites", {
      method: "PATCH",
      body: JSON.stringify({
        place_id: favoriteRestaurant.place_id,
        isAvailble: isAvailable,
        email: user.email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {});
  };

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
                <SmallContainer>
                <Ul>
                  <Li>
                    <Span>Name:</Span> {restaurant.name}
                  </Li>
                  <Li>
                    <Span>Address: </Span>
                    {restaurant.address}
                  </Li>
                  <Li>
                    <Span>Rating: </Span>
                    {restaurant.rating}/5
                  </Li>
                  <Li>
                    <Span>Price level:</Span> {restaurant.price_level}/5
                  </Li>
                </Ul>
                <Small>
                  <Date>
                    <Span>Added to your favorites on </Span>
                    {restaurant.date_added}
                  </Date>
                  <DeleteLink onClick={(ev) => handleDelete(ev)}>
                    Remove from favorites
                  </DeleteLink>
                </Small>
                </SmallContainer>
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

const SmallContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:space-around;
align-items:center;
`;
const Small = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DeleteLink = styled.a`
  text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
`;

const Date = styled.p`
  font-size: 0.6em;
`;
const Container = styled.div`
  padding: 30px;
`;
const H1 = styled.h1``;

const P = styled.p``;
const Span = styled.span`
  font-weight: bold;
  padding: 0 0 0 20px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: space-evenly;
  border: 2px blue solid;
`;

const Li = styled.li`
  padding: 10px;
`;
const Ul = styled.ul`
  padding: 10px;
  list-style-type: none;
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

export default Profile;
