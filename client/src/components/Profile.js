import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLoader } from "react-icons/fi";
import { CgMailForward } from "react-icons/cg";
import styled from "styled-components";
import Comments from "./Comments";
import { someImages } from "../images/someImages";
import Sort from "./Sort";

const Profile = () => {
  const { user } = useAuth0();

  const [favoriteRestaurant, setFavoriteRestaurant] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [reload, setReload] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [comment, setComment] = useState("");
  const [sort, setSort] = useState([]);


 
  //Getting the comments to sent it to the Sort.js
  useEffect(() => {
    if (user) {
      fetch(`/get-comments`)
        .then((res) => res.json())
        .then((data) => {
          setComment(data.data[0]);
        });
    }
  }, [user, reload]);
  console.log(comment.comments);
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
  }, [user.email, reload]);

  console.log(favoriteRestaurant);

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
      });
    } else {
      console.log("favoriteRestaurant is empty");
    }
  };
 
  let sorted = [...favoriteRestaurant];

  // This useEffect is looking for changes in ''sort'' which is a string that is changed in Sidebar.js.
  // The four cases are sorting the array ''sorted'', and eventually gets setted backed to state variable
  // ''singleCategory'' which is rendered in JSX

  useEffect(() => {
    if (sort === "ascending rating") {
    favoriteRestaurant.sort((a,b) => {
        return b.rating - a.rating;
      })
    } else if (sort === "descending rating") {
      favoriteRestaurant.sort((b,a) => {
        return a.rating - b.rating;
      })
    } else if (sort === "oldest added restaurant") {
      sorted.sort((a, b) => {
        if (a.date_added < b.date_added) return -1;
        if (a.date_added > b.date_added) return 1;
        return 0;
      });
    }
    else if (sort === "newest added restaurant") {
      sorted.sort((a, b) => {
        if (a.date_added < b.date_added) return 1;
        if (a.date_added > b.date_added) return -1;
        return 0;
      });
    }
   else {
      sorted = favoriteRestaurant;
    }
  setFavoriteRestaurant(sorted)
  }, [sort])


 
  return (
    <>
      {!user ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <>
          <Container>
            {favoriteRestaurant.length > 0 && (
              <>
                <H1>Hey {user.given_name},</H1>
                <P>Here are your favorite restaurants:</P>
                <Sort setSort={setSort} />
              </>
            )}
          </Container>
  
          {favoriteRestaurant.length > 0 ? (
            <>
              {favoriteRestaurant.map((restaurant) => (
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
                      <DeleteLink onClick={(ev) => handleDelete(ev, restaurant.place_id)}>
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
            </>
          ) : (
            <>
              <ContainerIcon>
                <Icon>
                  <CgMailForward size={50} />
                </Icon>
                <Click>click there to get started! </Click>
              </ContainerIcon>
              <Wrapper>
                <Hey>Hey {user.given_name},</Hey>
                <Text>
                  you should probably go back to the home page and add your
                  favorite restaurants!
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
  border-bottom: 3px #3b597b solid;
  border-left: 3px #3b597b solid;
  padding: 60px 60px;
`;

const Text = styled.p`
  border-top: 3px #3b597b solid;
  border-right: 3px #3b597b solid;
  padding: 60px 60px;
`;
const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 0 15px;
  position: relative;
  top: -50px;
`;
const Icon = styled.div`
  transform: rotate(-90deg);
`;
const Click = styled.p`
  font-weight: 200;
`;
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
  font-size: 0.8em;
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
