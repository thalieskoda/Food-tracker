import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLoader } from "react-icons/fi";
import styled, { keyframes } from "styled-components";
import Comments from "./Comments";
import { someImages } from "../images/someImages";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const [favoriteRestaurant, setFavoriteRestaurant] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [reload, setReload] = useState(false);
  const [currentImage, setCurrentImage] = useState(someImages[0]);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * someImages.length);
      setCurrentImage(someImages[randomIndex]);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (someImages.length > 0) {
      const randomImage =
        someImages[Math.floor(Math.random() * someImages.length)];
      setNewImage(randomImage);
    }
  }, []);

  useEffect(() => {
    fetch("/favorite-restaurants")
      .then((res) => res.json())
      .then((data) => {
        const favorites = data.data.favorites.map((favorite) => {
          const randomImage =
            someImages[Math.floor(Math.random() * someImages.length)];
          return {
            ...favorite,
            image: randomImage,
          };
        });
        setFavoriteRestaurant(favorites);
        console.log("FAV", favorites);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.email]);

  const handleDelete = (ev) => {
    ev.preventDefault();

    if (favoriteRestaurant.length > 0) {
      fetch("/update-favorites", {
        method: "PATCH",
        body: JSON.stringify({
          place_id: favoriteRestaurant[0].place_id,

          email: user.email,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(() => {
        setIsAvailable(true);
        setIsAdded(false);
      });
    } else {
      console.log("favoriteRestaurant is empty");
    }
  };

  return (
    <>
      {user && favoriteRestaurant.length > 0 ? (
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
                      <ImgResto src={restaurant.image} alt="restaurant" />
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
        <>
          <Wrapper>
            <H1>Hey {user.given_name},</H1>
            <P>
              You should probably go back in the home page to add your favorite
              restaurants!
            </P>
          </Wrapper>
          <ImageContainer>
            <RandomImage src={someImages[currentImage]} alt="random" />
          </ImageContainer>
        </>
      )}
    </>
  );
};

const ImgResto = styled.img`
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
`;

const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px pink solid;
  border-left: 1px pink solid;
  padding: 0 0 30px 30px;
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
  padding: 0 0 0 40px;
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
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 70vh;
`;

const Li = styled.li`
  padding: 10px;
`;
const Ul = styled.ul`
  padding: 0 0 10px 0px;
  list-style-type: none;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 100vh;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RandomImage = styled.img`
  opacity: 0;
  animation: ${rotate} 1s ease-out forwards;
  position: absolute;
  top: ${(props) => Math.random() * 80 + 10}vh;
  left: ${(props) => Math.random() * 80 + 10}vw;
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
