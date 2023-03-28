import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./userAuthenticator/LogoutButton";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth0();
const navigate = useNavigate();
  //Get the user's information with the following line: {JSON.stringify(user,null,2)}
  //the key "sub" has a user Id
  return (
    <>
      {!user ? (
        navigate("/")
      ) : (
        <>
          <h1>profile only</h1>
        </>
      )}
    </>
  );
};
export default Profile;
