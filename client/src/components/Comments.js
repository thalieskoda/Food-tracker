import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment"

const Comments = ({ setReload, reload, place_id }) => {
  const { user } = useAuth0();

  const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');

  const [characterCount, setcharacterCount] = useState(280);
  const [value, setValue] = useState("");
  const [comment, setComment] = useState("");

  const maxLength = 280;
  const restCharacters = maxLength - value.length;

  const handleChange = (event) => {
    setValue(event.target.value);
    setcharacterCount(280 - event.target.value.length);
  };

  const inputColor =
    restCharacters < 0 ? "red" : restCharacters < maxLength * 0.2 ? "gold" : "";

  const handleSumbit = (event) => {
    event.preventDefault();

    fetch(`/add-comments/${place_id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, comments: value, createdAt: currentDate }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        } else {
          setReload(!reload);
          setValue("");
          setComment(value)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      fetch(`/get-comments`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data[0]);
          setComment(data.data[0]);
        });
    }
  }, [user, reload]);

  const handleDelete = (ev) => {
    ev.preventDefault();
    fetch("/update-comments", {
      method: "PATCH",
      body: JSON.stringify({
        email: user.email,
        _id: comment.comments[0]._id
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
    setComment("")

    });
  };

  return (
    <>
      {!user || comment === null ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : !comment || !comment.comments || !comment.comments.some(comment => comment.place_id === place_id) ? (
        <Wrapper>
          <Form onSubmit={handleSumbit}>
            <Img src={user.picture} alt={`${user}'s picture`} />
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
      ) : (
        <>
          {comment.comments &&
            comment.comments
              .filter((comment) => comment.place_id === place_id)
              .map((comment) => (
                <div key={comment._id}>
                  <div>
                    <p>My review: {comment.comments}</p>
                    <p>added on {currentDate}</p>
                    <DeleteLink onClick={(ev) => handleDelete(ev)}>
                      Delete my review
                    </DeleteLink>
                  </div>
                </div>
              ))}
        </>
      )}
    </>
  );
};

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
border:1px red solid;
margin: 0 0 10px 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 50%;
  border: 1px red solid;
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
border-radius:5px;
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
  background-color: black;
  font-size: 18px;
  font-weight: bold;
  color: white;
  padding:10px;
  margin:10px 0 0 0;

  opacity: ${({ disabled }) => (disabled ? "0.8" : "1")};
  cursor: pointer;
  &:disabled {
    background-color:black;
    color:white;
    cursor: not-allowed;
  }
`;
export default Comments;
