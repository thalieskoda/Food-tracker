import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

//Login component - using a button "get Started" for the user to login
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <motion.button
      onClick={() => loginWithRedirect()}
      transition={{ ease: "easeOut", duration: 1 }}
    >
      get started
    </motion.button>
  );
};

export default LoginButton;
