import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useLocation, useNavigate } from "react-router-dom";

const LoginButton = () => {
    const {loginWithRedirect} = useAuth0()

return(
    <button onClick={()=> loginWithRedirect()}>log in</button>
)
}

export default LoginButton