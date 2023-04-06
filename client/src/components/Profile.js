import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLoader } from "react-icons/fi";
import {CgMailForward} from "react-icons/cg"
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

//Random image display for each favorite restaurant.
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
      {!user ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <>
          <Container>
          {favoriteRestaurant.length > 0 &&
          <>
            <H1>Hey {user.given_name},</H1>
            <P>Here are your favorite restaurants:</P>
          </>
}
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
          {favoriteRestaurant.length === 0 && (
           <>
           <ContainerIcon>
             <Icon>
               <CgMailForward size={50}/>
             </Icon>
             <Click>click there to get started! </Click>
           </ContainerIcon>
           <Wrapper>
             <Hey>Hey {user.given_name},</Hey>
             <Text>
               you should probably go back to the home page and add your favorite
               restaurants!
             </Text>
           </Wrapper>
         </>
          )}
        </>
      )}
    </>
  );
};

const Hey = styled.h1`
border-bottom:3px #3b597b solid;
border-left:3px #3b597b solid;
padding:60px 60px;
`

const Text = styled.p`
border-top:3px #3b597b solid;
border-right:3px #3b597b solid;
padding:60px 60px;
`
const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
padding: 0 0 0 15px;
position:relative;
top:-50px;
`;
const Icon = styled.div`
transform: rotate(-90deg);
`
const Click = styled.p`
font-weight:200;
`
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
  border-bottom: 3px #3b597b solid;
  border-left: 3px #3b597b solid;
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
