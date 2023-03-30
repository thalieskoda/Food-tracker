import { useState } from "react"
import styled from "styled-components"
import SearchBar from "./SearchBar"

const TravelSearch = ({setCoordinates}) => {
    // console.log(setCoordinates);

    //Will be adding places that the user's adding to his "trip"

    //Passing the props to the searchBar component to make use of the setCoordinates
return (
    <>
    <SearchBar setCoordinates={setCoordinates} />
    </>
)

}
const Input = styled.input``

const Select = styled.select`

`

const ItemMenu = styled.option`
`
export default TravelSearch