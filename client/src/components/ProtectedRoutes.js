import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useLocation } from "react-router-dom"
import UserAuthenticator from "./userAuthenticator/UserAuthenticator";

const ProtectedRoutes = () => {
const location = useLocation();
const isAuth = useAuth0()
return(

    <>
    {isAuth ? <UserAuthenticator/> : <Navigate to="/profile" replace="true" state={{from : location}}/>}
    </>
)

}

export default ProtectedRoutes