import React from "react"
import { useAuth0} from "@auth0/auth0-react"


const LoginButton = () => {

    // const helloAuth0 = useAuth0()
    // console.log(helloAuth0);
    const {loginWithRedirect} = useAuth0();

return(
    <button onClick={()=> loginWithRedirect()}>get started</button>
)
}

export default LoginButton