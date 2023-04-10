import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import { someImages } from "../../images/someImages";

const TravelSearch = ({ name, onClose, address, rating, ratingNumber, id }) => {
  const { user } = useAuth0();
  const [isAdded, setIsAdded] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [favoriteRestaurant, setFavoriteRestaurant] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");

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
        image: newImage,
        place_id: id,
        email: user.email,
        isAvailable: false,
        date_added: currentDate,
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
          <Info>
            <Li>
              <Span>Name :</Span> {name}
            </Li>
            <Li>
              <Span>Rating: </Span>
              {rating} stars
            </Li>
            <Li>
              <Span>Numbers of ratings:</Span> {ratingNumber}
            </Li>
            <Li>
              <Span>Address: </Span>
              {address}
            </Li>
            {someImages.length > 0 && (
              <Img alt={`${name}'s pictures`} src={newImage} />
            )}
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
            {isAdded ? (
              <DeleteLink onClick={(ev) => handleDelete(ev)}>
                Remove from favorites
              </DeleteLink>
            ) : null}
          </Info>
        </Wrapper>
      ) : null}
    </>
  );
};

const Span = styled.span`
  font-weight: bold;
`;
const Img = styled.img`
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
`;
const Buttons = styled.div`
  align-items: center;
`;
const AddButton = styled.button`
  width: 240px;
  margin: 10px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const Info = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 600px;
  padding: 10px;
`;

const Li = styled.li`
  list-style-type: none;
`;
const Wrapper = styled.div`
  position: relative;
  left: -480px;
  top: -750px;
  padding: 10px;
  z-index: 1;
`;

const CloseButton = styled.button`
  margin-bottom: 20px;
`;

const DeleteLink = styled.a`
  text-decoration: underline;
  font-size: 0.8em;
  cursor: pointer;
`;

export default TravelSearch;
