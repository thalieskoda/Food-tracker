import { useState, useContext } from "react";
import styled from "styled-components";
import CurrentUserContext from "./CurrentUserContext";

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

  const [isAdded, setIsAdded] = useState(false);
const [favoriteRestaurant, setFavoriteRestaurant] = useState({})

  const handleDelete = (ev) => {
    ev.preventDefault();
    setIsAdded(false);
    // fetch(`/delete-restaurant/${restaurant.name}`, {
    //   method: "DELETE",
    //   body: JSON.stringify({ quantity: quantity }),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // }).then(() => {

    // });
  };

  const handleClick = (ev) => {
    
    ev.preventDefault();
    setIsAdded(true);

    fetch("/add-restaurant", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, //sending the new restaurant from the frontend, to the server
      body: JSON.stringify({name: name, address: address, rating: rating, place_id: id, email: currentUser.email}), //convert into a JSON string --> sent as the body of the HTTP request.
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFavoriteRestaurant(data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {name ? (
        <Wrapper>
          <Buttons>
            <CloseButton onClick={onClose}>Close</CloseButton>
            <AddButton
              onClick={handleClick}
              isAdded={isAdded}
            >
              {isAdded ? "Already in my favorites" : "Add to my favorites"}
            </AddButton>
          </Buttons>
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

          ): (null)}
        </Wrapper>
      ) : null}
    </>
  );
};

const Buttons = styled.div``;
const AddButton = styled.button`
  width: 280px;
  margin: 10px;
  opacity: ${(props) => (props.isAdded ? "0.5" : "1")};
  pointer-events: ${(props) => (props.isAdded ? "none" : "auto")};
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
