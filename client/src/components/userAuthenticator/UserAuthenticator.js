import styled from "styled-components";
import {TbLineDotted} from "react-icons/tb"
import LoginButton from "./LoginButton";
import Profile from "../Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Homefeed from "../Homefeed";
import { FiLoader } from "react-icons/fi";


const UserAuthenticator = () => {
    const {user} = useAuth0();
    const navigate = useNavigate();
    
useEffect(()=> {

},[])


  return (
    <>
    {!user ? (
        <>
      <h1>Hello there ! </h1>
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
        {!Homefeed ? ( 
           <LoadingIcon>
           <FiLoader />
         </LoadingIcon>
        ):(<Homefeed/>)}
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
export default UserAuthenticator;
