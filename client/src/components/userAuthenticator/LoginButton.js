import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

//Login component - using a button "get Started" for the user to login
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>get started</button>;
};

export default LoginButton;
