import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLoader } from "react-icons/fi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { CiStar } from "react-icons/ci";
import styled from "styled-components";
import Comments from "./Comments";
import { someImages } from "../../images/someImages";
import Sort from "./Sort";
import NoFavorite from "./NoFavorite";

//Profile component
const Profile = () => {
  const { user } = useAuth0();
  //Using the same variable from Map - FavoriteRestaurant, isAdded, isAvailable, newImage, Comment
  const [favoriteRestaurant, setFavoriteRestaurant] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [reload, setReload] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  //sorting the date and rating
  const [sort, setSort] = useState([]);

  //Getting the comments to sent it to the Sort.js
  useEffect(() => {
    if (user) {
      fetch(`/get-comments`)
        .then((res) => res.json())
        .then((data) => {
          setComment(data.data[0].comments);
          setIsLoading(false);
        });
    }
  }, [user, reload]);

  //Random image display for each favorite restaurant.
  useEffect(() => {
    if (someImages.length > 0) {
      const randomImage =
        someImages[Math.floor(Math.random() * someImages.length)];
      setNewImage(randomImage);
    }
  }, []);

  //Fetching the favorite restaurant.
  useEffect(() => {
    if (user) {
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
          setIsLoading(false);
          setFavoriteRestaurant(favorites);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [user.email, reload]);

  //Patch to update the Favorite's restaurant Array when the user deletes a restaurant from his favorite
  const handleDelete = (ev, placeId) => {
    ev.preventDefault();

    if (favoriteRestaurant.length > 0) {
      fetch("/update-favorites", {
        method: "PATCH",
        body: JSON.stringify({
          place_id: placeId,
          email: user.email,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(() => {
        setIsAvailable(true);
        setIsAdded(false);
        setReload((previousState) => !previousState);
        setIsLoading(false);
      });
    } else {
      console.log("favoriteRestaurant is empty");
    }
  };

  //Sorting  for the rating and date
  useEffect(() => {
    let sorted = [...favoriteRestaurant];

    if (sort === "ascending rating") {
      sorted.sort((a, b) => a.rating - b.rating);
    } else if (sort === "descending rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sort === "oldest added restaurant") {
      sorted.sort((a, b) => {
        if (a.date_added < b.date_added) return -1;
        if (a.date_added > b.date_added) return 1;
        return 0;
      });
    } else if (sort === "recent added restaurant") {
      sorted.sort((a, b) => {
        if (a.date_added < b.date_added) return 1;
        if (a.date_added > b.date_added) return -1;
        return 0;
      });
    } else {
      sorted = favoriteRestaurant;
    }
    setFavoriteRestaurant(sorted);
  }, [sort]);

  //If there's no user, return Loading
  //Else, show the favorite restaurant
  //If there's no favorite restaurant, show text to help the user get started.
  return (
    <>
      {isLoading ? (
        <LoadingIcon />
      ) : favoriteRestaurant.length > 0 ? (
        <Container>
          <H1>Hey {user.given_name},</H1>
          {favoriteRestaurant.length === 1 ? (
            <P>Here is the restaurant you have favorited.</P>
          ) : (
            <P>
              Here are the {favoriteRestaurant.length} restaurants you have
              favorited.
            </P>
          )}
          <Sort setSort={setSort} />
          {favoriteRestaurant.map((restaurant) => (
            <Wrapper key={restaurant.place_id}>
              <SmallContainer>
                <Ul>
                  <Li>
                    <Span>
                      <MdOutlineDriveFileRenameOutline size={23} />
                    </Span>{" "}
                    {restaurant.name}
                  </Li>
                  <Li>
                    <Span>
                      <TfiLocationPin size={23} />
                    </Span>
                    {restaurant.address}
                  </Li>
                  <Li>
                    <Span>
                      <CiStar size={23} />
                    </Span>
                    {restaurant.rating} / 5
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
                  <DeleteLink
                    onClick={(ev) => handleDelete(ev, restaurant.place_id)}
                  >
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
          ))}
        </Container>
      ) : (
        <NoFavorite />
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
  padding: 0 0 5px 10px;
  width: 30vw;
  max-height: 65vh;
`;
const Small = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0 8px;
`;
const DeleteLink = styled.a`
  text-decoration: underline;
  font-size: 0.8em;
  cursor: pointer;
  margin: 10px 0 0 0;
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
  padding: 0 20px 0 0;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 65vh;
  background-color: #f9f9f8;
  margin: 50px 200px;
  border: 3px rgba(59, 89, 123, 0.5) solid;
`;

const Li = styled.li`
  padding: 10px;
  display: flex;
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
