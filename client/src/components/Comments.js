import { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import CurrentUserContext from "./CurrentUserContext";
import { useAuth0 } from "@auth0/auth0-react";


const Comments = ({setReload, reload}) => {

    const { currentUser} = useContext(CurrentUserContext);
    const [characterCount, setcharacterCount] = useState(280);
    const [value, setValue] = useState("");
  const {user} = useAuth0()
    const maxLength = 280;
    const restCharacters = maxLength - value.length;
  
    const handleChange = (event) => {
      setValue(event.target.value);
      setcharacterCount(280 - event.target.value.length);
    };
  
    const inputColor =
      restCharacters < 0 ? "red" 
      : restCharacters < maxLength * 0.2 
      ? "gold" : "";
  
    const handleSumbit = (event) => {
      event.preventDefault();

      fetch("/new-comment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: value }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  
          if (data.status === 400 || data.status === 500) {
            throw new Error("Error");
          } else {
            setReload(!reload);
            setValue("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    return (
      <>
        {!currentUser ? (
          <LoadingIcon>
            <FiLoader />
          </LoadingIcon>
        ) : (
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
                  submit
                </Button>
              </Container>
            </Form>
          </Wrapper>
        )}
      </>
    );
  };
  
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
    border-radius: 100%;
    width: 50px;
    height: 50px;
  `;
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
  `;
  const Wrapper = styled.div`
    padding: 20px;
    width:50%;
  `;
  
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `;
  
  const Input = styled.textarea`
    width: 100%;
    height: 200px;
    font-size: 18px;
    border: 1px black solid;
    overflow: auto;
    resize: none;
    word-wrap: break-word;
    padding: 10px 0px 0px 10px;
  
    font-family: Arial, Helvetica, sans-serif;
  
    ::placeholder {
      padding: 10px 0px 0px 10px;
      font-family: Arial, Helvetica, sans-serif;
    }
  `;
  
  const Count = styled.span`
    margin-left: 10px;
    color: ${({ inputColor }) => inputColor || "grey"};
    font-weight: bold;
    padding: 10px;
  `;
  
  const Button = styled.button`
   
    height: 50px;
    border: none;
    border-radius: 35px;
    background-color: black;
    font-size: 18px;
    font-weight: bold;
    color: white;
  
    opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  `;
export default Comments