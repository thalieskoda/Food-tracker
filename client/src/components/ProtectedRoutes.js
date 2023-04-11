import { withAuthenticationRequired } from "@auth0/auth0-react";

//Used to protect the routes if the user is not logged in and try to navigate the website.
const ProtectedRoutes = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component {...args} />;
};

export default ProtectedRoutes;
