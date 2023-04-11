import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ReactStars from "react-rating-stars-component";
import { FiLoader } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import Rating from "./Rating";

//Comments component for the user to add a review on his favorite restaurant
const Comments = ({ setReload, reload, place_id }) => {
  const { user } = useAuth0();
  //Setting the state for the character count and the value's input
  const [characterCount, setcharacterCount] = useState(280);
  const [value, setValue] = useState("");
  //setting the comment
  const [comment, setComment] = useState("");
  //Setting the rating from 1-5
  const [rating, setRating] = useState(0);

  const maxLength = 280;
  const restCharacters = maxLength - value.length;

  //Setting the character count to the user's input value
  const handleChange = (event) => {
    setValue(event.target.value);
    setcharacterCount(280 - event.target.value.length);
  };

  const inputColor =
    restCharacters < 0 ? "red" : restCharacters < maxLength * 0.2 ? "gold" : "";

  //When the user clicks on Add review, POSTing the info through the comment's array
  const handleSumbit = (event) => {
    event.preventDefault();

    const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");

    fetch(`/add-comments/${place_id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        comments: value,
        createdAt: currentDate,
        rating: rating,
        place_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        } else {
          setReload(!reload);
          setValue("");
          setComment(value);
          setRating(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //When the user chooses a rating 1-5
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  //Fetching the comments to access the comment id in order to delete the right one with the right place_id.
  useEffect(() => {
    if (user) {
      fetch(`/get-comments`)
        .then((res) => res.json())
        .then((data) => {
          setComment(data.data[0]);
        });
    }
  }, [user, reload]);

  //Patch to update the comment's array when a user delete a review.
  const handleDelete = (ev, commentId, placeId) => {
    ev.preventDefault();
    fetch("/update-comments", {
      method: "PATCH",
      body: JSON.stringify({
        email: user.email,
        _id: commentId,
        place_id: placeId,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setComment("");
        setRating(0);
        setValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //If there's no user or no comment in the comment's array, show loading icon
  //else, show the comments.
  return (
    <>
      {!user || comment.length < 0 ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : comment.comments &&
        comment.comments.some((comment) => comment.place_id === place_id) ? (
        <>
          {comment.comments
            .filter((comment) => comment.place_id === place_id)
            .map((comment) => (
              <div key={comment._id}>
                <CommentReview>
                  <Rating rating={comment.rating} />
                  <P>
                    <Span>My review: </Span>
                    {comment.comments}
                  </P>
                  <Small>
                    <Date>
                      <Span>reviewed on</Span>
                      {comment.createdAt}
                    </Date>
                    <DeleteLink
                      onClick={(ev) =>
                        handleDelete(ev, comment._id, comment.place_id)
                      }
                    >
                      Delete my review
                    </DeleteLink>
                  </Small>
                </CommentReview>
              </div>
            ))}
          {!comment.comments.some(
            (comment) => comment.place_id === place_id
          ) && (
            <Wrapper>
              <Form onSubmit={handleSumbit}>
                <Div>
                  <Img src={user.picture} alt={`${user}'s picture`} />
                  <Stars>
                    <ReactStars
                      count={5}
                      onChange={handleRatingChange}
                      size={24}
                      activeColor="#3b597b"
                    />
                  </Stars>
                </Div>
                <Input
                  value={value}
                  placeholder="What's your review?"
                  onChange={handleChange}
                  maxLength="400"
                  inputColor={inputColor}
                />
                <Container>
                  <Count inputColor={inputColor}>
                    {restCharacters < 0
                      ? "-" + Math.abs(restCharacters)
                      : restCharacters}{" "}
                  </Count>
                  <Button
                    type="submit"
                    disabled={!value || restCharacters < -0}
                  >
                    add a review
                  </Button>
                </Container>
              </Form>
            </Wrapper>
          )}
        </>
      ) : (
        <Wrapper>
          <Form onSubmit={handleSumbit}>
            <Div>
              <Img src={user.picture} alt={`${user}'s picture`} />
              <Stars>
                <ReactStars
                  count={5}
                  onChange={handleRatingChange}
                  size={24}
                  activeColor="#3b597b"
                />
              </Stars>
            </Div>
            <Input
              value={value}
              placeholder="What's your review?"
              onChange={handleChange}
              maxLength="400"
              inputColor={inputColor}
            />
            <Container>
              <Count inputColor={inputColor}>
                {restCharacters < 0
                  ? "-" + Math.abs(restCharacters)
                  : restCharacters}{" "}
              </Count>
              <Button type="submit" disabled={!value || restCharacters < -0}>
                add a review
              </Button>
            </Container>
          </Form>
        </Wrapper>
      )}
    </>
  );
};

const Small = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Date = styled.p`
  font-size: 0.6em;
  padding: 0 30px 0 0;
`;
const Span = styled.span`
  font-weight: bold;
  padding: 0 10px 0 0;
`;
const P = styled.p`
  font-weight: 200;
`;
const CommentReview = styled.div`
  /* border-top: 3px #3b597b solid;
  border-right: 3px #3b597b solid; */
  padding: 60px 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 400px;
  align-items: center;
`;
const Stars = styled.div`
  padding: 0 0 0 30px;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
`;
const DeleteLink = styled.a`
  text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
`;
const Loading = keyframes`
  from{
  transform:rotate(0deg);
  }
  
  to{
  transform:rotate(360deg);
  }
  `;

const LoadingIcon = styled(FiLoader)`
  animation: ${Loading} 1s linear infinite;
  position: relative;
  left: 50%;
  top: 200px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 3px;
  margin: 0 0 10px 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
`;
const Wrapper = styled.div`
  width: 50%;
  /* border-top: 3px #3b597b solid;
  border-right: 3px #3b597b solid; */
  padding: 60px 60px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Input = styled.textarea`
  width: 100%;
  height: 150px;
  font-size: 18px;
  border: 1px black solid;
  overflow: auto;
  resize: none;
  word-wrap: break-word;
  padding: 10px 0px 0px 10px;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;

  ::placeholder {
    padding: 10px 0px 0px 10px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const Count = styled.span`
  margin-left: 10px;
  color: ${({ inputColor }) => inputColor || "black"};
  font-weight: bold;
  padding: 10px;
`;

const Button = styled.button`
  height: 50px;
  border: none;
  background-color: #10355f;
  font-size: 18px;
  font-weight: bold;
  color: white;
  padding: 10px;
  margin: 10px 0 0 0;

  opacity: ${({ disabled }) => (disabled ? "0.8" : "1")};
  cursor: pointer;
  &:disabled {
    background-color: #10355f;
    color: white;
    cursor: not-allowed;
  }
`;
export default Comments;
