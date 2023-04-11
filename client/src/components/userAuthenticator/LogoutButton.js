import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

//Logout component for the user to logout
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <>
      <button onClick={() => logout()}>log out</button>
    </>
  );
};

export default LogoutButton;
