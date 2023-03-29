import {FiSearch} from "react-icons/fi"
import styled from "styled-components"
import { Autocomplete } from "@react-google-maps/api"
import { useState } from "react"


const SearchBar = () => {

    const [autoComplete, setAutoComplete] = useState(null);

// const onLoad = (autoComplete) => {
//     setAutoComplete(autoComplete)
// }

// const onPlaceChanged = () => {
//     const lat = autoComplete.getPlace().geometry.location.lalt()
//     const lng = autoComplete.getPlace().geometry.location.lng()

//     setCoordinates ({lat,lng})
// }

    return (
<Wrapper>
    <P>Explore new places</P>
    <div >

        <Input placeholder="Where's your next destination?"></Input>
        <FiSearch/>

    </div>
</Wrapper>
    )
}

const P = styled.p`
padding: 10px;
`


const Input = styled.input`
width:250px;
padding:5px;
margin:10px;
`

const Wrapper = styled.div`
display:flex;
align-items:center;
padding:30px;
`

export default SearchBar