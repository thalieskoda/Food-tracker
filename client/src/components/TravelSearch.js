
import styled from "styled-components"

const TravelSearch = ({ name }) => {
  return (
    <Wrapper>
     
        <>
        <div>
        <h2>{name}</h2>
      </div>
        </>
      
    </Wrapper>
  );
};

const Wrapper = styled.div`
display:flex;
flex-direction:column;
`
export default TravelSearch