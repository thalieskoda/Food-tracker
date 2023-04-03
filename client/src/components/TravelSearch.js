import { useState, useContext } from "react";
import styled from "styled-components";
import CurrentUserContext from "./CurrentUserContext";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const TravelSearch = ({
  name,
  onClose,
  address,
  rating,
  ratingNumber,
  price,
  photos,
  id,
}) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const { user } = useAuth0();
  const [isAdded, setIsAdded] = useState(false);
  const [favoriteRestaurant, setFavoriteRestaurant] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);

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
  }, [user.email, name, id]); //Everytime it's a new restaurant or a new user, we fetch different favorite restaurants

  const handleDelete = (ev) => {
    ev.preventDefault();
    setIsAdded(false);
    setIsAvailable(true);
    console.log(favoriteRestaurant);
    fetch("/update-favorites", {
      method: "PATCH",
      body: JSON.stringify({
        place_id: id,
        isAvailble: isAvailable,
        email: currentUser.email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {});
  };

  const handleClick = (ev) => {
    ev.preventDefault();

    setIsAdded(true);
    fetch("/add-restaurant", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
        rating: rating,
        place_id: id,
        email: user.email,
        isAvailable: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFavoriteRestaurant([...favoriteRestaurant, data]);
        setIsAvailable(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {name ? (
        <Wrapper>
          {favoriteRestaurant && (
            <Buttons>
              <CloseButton onClick={onClose}>Close</CloseButton>
              <AddButton
                onClick={handleClick}
                isAdded={isAdded}
                isAvailable={isAvailable}
                disabled={
                  favoriteRestaurant.some(
                    (restaurant) => restaurant.place_id === id
                  ) || !isAvailable
                }
              >
                {!favoriteRestaurant.some(
                  (restaurant) => restaurant.place_id === id
                ) && isAvailable
                  ? "Add to my favorites"
                  : "Already in my favorites"}
              </AddButton>
            </Buttons>
          )}
          <Info>
            <Li>Name : {name}</Li>
            <Li>
              {rating} stars - numbers of ratings: {ratingNumber}
            </Li>
            <Li>Price level : {price}/5</Li>

            <Li>{address}</Li>
            {photos.map((photo, id) => {
              return <img alt={`${name}'s pictures`} src={photo} key={id} />;
            })}
          </Info>
          {isAdded ? (
            <DeleteLink onClick={(ev) => handleDelete(ev)}>
              Remove from favorites
            </DeleteLink>
          ) : null}
        </Wrapper>
      ) : null}
    </>
  );
};

const Buttons = styled.div``;
const AddButton = styled.button`
  width: 280px;
  margin: 10px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const Info = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Li = styled.li`
  /* border-bottom:1px black solid; */
`;
const Wrapper = styled.div`
  position: relative;
  left: 20px;
  top: 80px;
  padding: 10px;
  z-index: 1;
`;

const CloseButton = styled.button`
  margin-bottom: 20px;
`;

const DeleteLink = styled.a`
  text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
`;
export default TravelSearch;
