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
          <h1>Hey {user.given_name},</h1>
          <p>Here are your favorite restaurants:</p>
          {favoriteRestaurant.map((restaurant) => {
           
            return (
              <Wrapper key={restaurant.place_id}>
                <Ul>
                  <li>Name: {restaurant.name}</li>
                  <li>Address: {restaurant.address}</li>
                  <li>Rating: {restaurant.rating}/5</li>
                  <li>Price level: {restaurant.price_level}/5</li>
                 {/* <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`} alt="allo"/> */}
                 {restaurant.photos.map((photo) => {
                    const photoUrl = `${photo.html_attribution}?maxwidth=400&photo_reference=${photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
                    return (
                      <div key={photo.photo_reference}>
                        <img
                          alt={`${restaurant.name}'s pictures`}
                          src={photoUrl}
                        />
                      </div>
                    );
                  })}
                  <li>Added to your favorites on {restaurant.date_added}</li>
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

const Wrapper = styled.div`
  display: flex;
  border: 2px red solid;
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
