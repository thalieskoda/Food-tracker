import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  //Get the user's information with the following line: {JSON.stringify(user,null,2)}
  //the key "sub" has a user Id
  return (
    <>
    {user ? (
      <>
      <h1>hey {user.given_name}, </h1>
      <p> Where's your next adventure ?</p>
</>
    ) : (null)}
    </>
  );
};
export default Profile;
