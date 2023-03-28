import UserLogin from "./UserLogin";
import UserSignIn from "./NewUser";
import GlobalStyles from "../GlobalStyles";
import styled from "styled-components";
import {TbLineDotted} from "react-icons/tb"
import LoginButton from "./LoginButton";
import Profile from "../Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const UserAuthenticator = () => {
    const navigate = useNavigate();
    const {user} = useAuth0();
  return (
    <>
    {!user ? (
        <>
      <h1> TRVL-UP</h1>
      <p>
        Welcome to our personalized travel planner, where we help you find the
        hidden gems and create unforgettable memories. With us, you can create
        your own travel story by exploring unique destinations, tasting local
        cuisine, and discovering the world's best-kept secrets. Let us be your
        guide to an unforgettable adventure.
      </p>
<Buttons>
      {/* <Button onClick={handleClickNewUser}>join now</Button> */}
      <LoginButton/>
     
</Buttons>
<Icons>

<TbLineDotted/>
</Icons>
</>
    ) : (
        <>
        {navigate("/profile")}
        </>
    )
}
    </>
  );
};

const Icons =styled.p`
font-size : 300px;

`
const Button = styled.button`
color:white;
border:2px pink solid;
width:100px;
padding:10px;
background-color:black; 

&:hover {
    cursor: pointer;
    background-color:transparent;
    color:black;
}
`
const Buttons = styled.div`
display:flex;

`
export default UserAuthenticator;
