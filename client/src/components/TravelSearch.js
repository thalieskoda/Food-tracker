
import styled from "styled-components"
import SearchBar from "./SearchBar"

const TravelSearch = ({ name, address, rating, onClose }) => {
    // console.log(setCoordinates);

    //Will be adding places that the user's adding to his "trip"

return (
    <>
    <SearchBar />
    <div>
    <h2>Restaurant's name: {name}</h2>
    <p>Address: {address}</p>
    <p>Rating: {rating}</p>
    <button onClick={onClose}>Add it</button>
  </div>
    </>
)

}

export default TravelSearch