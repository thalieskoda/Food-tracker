
import { withAuthenticationRequired } from "@auth0/auth0-react";

const ProtectedRoutes = ({ component, ...args }) => {
    const Component = withAuthenticationRequired(component, args);
    return <Component />;
};

export default ProtectedRoutes