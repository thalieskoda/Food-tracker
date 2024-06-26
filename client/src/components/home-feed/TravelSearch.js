import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import { someImages } from "../../images/someImages";
import { motion } from "framer-motion";
//TravelSearch component
//Receiving the props from Map.js
const TravelSearch = ({ name, onClose, address, rating, ratingNumber, id }) => {
  const { user } = useAuth0();
  //If the restaurant is added to the Favorite's array
  const [isAdded, setIsAdded] = useState(false);
  //If the restaurant is available to be added in the Favorite's array
  const [isAvailable, setIsAvailable] = useState(true);
  //Show the favorite restaurant array
  const [favoriteRestaurant, setFavoriteRestaurant] = useState(null);
  //Adding a new random image for a new selected restaurant.
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //Current date for the exacte time it's going to be added in the array
  const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");

  //Having a random image
  useEffect(() => {
    if (someImages.length > 0) {
      const randomImage =
        someImages[Math.floor(Math.random() * someImages.length)];
      setNewImage(randomImage);
    }
  }, []);

  //Fetching the favorite's restaurant
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/favorite-restaurants`)
      .then((res) => res.json())
      .then((data) => {
        setFavoriteRestaurant(data.data.favorites);
        setIsLoading(false);
        // console.log('RESTAURANT in TRAVEL', favoriteRestaurant);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.email, name, id]); //Everytime it's a new restaurant or a new user, we fetch different favorite restaurants

  //Patch in order to update the favorite's array when the user deletes a restaurant from the array
  const handleDelete = (ev) => {
    ev.preventDefault();
    if (favoriteRestaurant.length > 0) {
      fetch(`${process.env.REACT_APP_BASE_URL}/update-favorites`, {
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
        setIsLoading(false);
      });
    } else {
      console.log("favoriteRestaurant is empty");
    }
  };

  //Post when the user adds a new restaurant in the favorite's array
  const handleClick = (ev) => {
    ev.preventDefault();

    setIsAdded(true);

    fetch(`${process.env.REACT_APP_BASE_URL}/add-restaurant`, {
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
        setFavoriteRestaurant([...favoriteRestaurant, data]);
        setIsAvailable(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //return the restaurant's information
  return (
    <>
      {name && !isLoading ? (
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
                <CloseButton whileTap={{ scale: 0.3, transition: { duration: 0.2 } }} onClick={onClose}>Close</CloseButton>
                <AddButton
                whileTap={{ scale: 0.3, transition: { duration: 0.2 } }}
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
              <DeleteLink 
              whileTap={{ scale: 0.8, transition: { duration: 0.2 } }}
              onClick={(ev) => handleDelete(ev)}>
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
  align-items: center;
`;
const Buttons = styled.div`
  align-items: center;
  width: 23vw;
`;
const AddButton = styled(motion.button)`
  width: 50%;
  margin: 10px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const CloseButton = styled(motion.button)`
  width: 20%;
`;

const Info = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 600px;
  padding: 10px;
  width: 25vw;
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

const DeleteLink = styled(motion.a)`
  text-decoration: underline;
  font-size: 0.8em;
  cursor: pointer;
`;

export default TravelSearch;
