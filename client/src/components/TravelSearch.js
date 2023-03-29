import { useState } from "react"
import styled from "styled-components"
import SearchBar from "./SearchBar"

const TravelSearch = ({setCoordinates}) => {

    const [type, setType] = useState("restaurants")
    const [rating, setRating] = useState("")
return (
    <>
    <SearchBar setCoordinates={setCoordinates}/>
    <Select value={type} onChange={(e)=> setType(e.target.value)}>
<ItemMenu value="restaurants">Restaurants</ItemMenu>
<ItemMenu value="attractions">Attractions</ItemMenu>
<ItemMenu value="hotels">Hotels</ItemMenu>
    </Select>
    <Select value={rating} onChange={(e)=> setRating(e.target.value)}>
<ItemMenu value={0}>all</ItemMenu>
<ItemMenu value={3}>above 3.0</ItemMenu>
<ItemMenu value={4}>above 4.0</ItemMenu>
<ItemMenu value={5}>above 4.5</ItemMenu>

    </Select>
    
    </>
)

}
const Input = styled.input``

const Select = styled.select`

`

const ItemMenu = styled.option`
`
export default TravelSearch