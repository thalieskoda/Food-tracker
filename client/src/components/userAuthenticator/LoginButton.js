import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import styled from "styled-components";


//Login component - using a button "get Started" for the user to login
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      transition={{ ease: "easeOut", duration: 1 }}
    >
      Get started
    </Button>
  );
};

const Button = styled(motion.button)`
  height: 50px;
  border: none;
  background-color: #dfcabb;
  font-size: 18px;
  font-weight: bold;
  color: white;
  padding: 10px;
  margin: 10px 0 0 0;
  position: relative; 
  cursor: pointer;

  &:hover {
    /* Underline styles */
    &:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px; 
      background-color: #dfcabb; 
    }
  }

  &:disabled {
    background-color: #10355f;
    color: white;
    cursor: not-allowed;
  }
`;

export default LoginButton;
