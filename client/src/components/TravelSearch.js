import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment"
import { images } from "../images/someImages"


const TravelSearch = ({
  name,
  onClose,
  address,
  rating,
  ratingNumber,
  price,
  photos,
  id,
  icon
}) => {

  const { user } = useAuth0();
  const [isAdded, setIsAdded] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [favoriteRestaurant, setFavoriteRestaurant] = useState(null);

  const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
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
    if (favoriteRestaurant.length > 0) {
    fetch("/update-favorites", {
      method: "PATCH",
      body: JSON.stringify({
        place_id: id,
        isAvailble: isAvailable,
        email: user.email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      setIsAdded(false);
      setIsAvailable(true);
    });
  } else {
    console.log("favoriteRestaurant is empty");
  }
};

const handleClick = (ev) => {
  ev.preventDefault();

  setIsAdded(true);
  const image = images[Math.floor(Math.random() * images.length)]; // Select a random photo from the array
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
      price_level: price,
      image:image,
      place_id: id,
      email: user.email,
      isAvailable: false,
      date_added: currentDate
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
  width: 240px;
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
list-style-type:none;
`;
const Wrapper = styled.div`
  position: relative;
  left: -420px;
  top: -600px;
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
