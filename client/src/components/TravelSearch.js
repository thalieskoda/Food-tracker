
import styled from "styled-components"

const TravelSearch = ({ name, onClose, address, rating, ratingNumber }) => {
  return (
    <>
    {name ? (
      <Wrapper>
      <CloseButton onClick={onClose}>Close</CloseButton>
      <Info>
        <H2>Name{name}</H2>
        <H2>{rating}stars - {ratingNumber}</H2>
        <H2>Price</H2>

        <H2>{address}</H2>
        <H2>Phone number</H2>
        <H2>Website</H2>

      </Info>
    </Wrapper> 
    ) : (
<>
<h1>Enter a city that you would like to visit</h1>
<h1>Select your favorite restaurants</h1>
<h1>Add them to your profile</h1>
<h1>Check the address of the restaurant you'd like to go directly from your profile when the time comes</h1>


</>

    )}
    
    </>
  );
};

const Info = styled.div`
display:flex;
flex-direction:column;
`

const H2 = styled.h2`
/* border-bottom:1px black solid; */
`
const Wrapper = styled.div`

  position: relative;
  left: 20px;
  top: 80px;
  padding: 10px;
  z-index: 1;
`;

const CloseButton = styled.button`
  margin-bottom: 20px;
`;
export default TravelSearch