import styled from "styled-components";
import restaurant1 from "../images/image12.webp"
import restaurant2 from "../images/image6.jpeg"
import restaurant3 from "../images/image14.webp"

const Picture = () => {
  return (
    <>
      <Wrapper>
        <Img src={restaurant1} alt="My Image" />
        <Img src={restaurant2} alt="My Image" />
        <Img src={restaurant3} alt="My Image" />
      </Wrapper>
    </>
  );
};

const Img = styled.img`
  height: 100%;
  width: 290px;
  object-fit: none;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
  &:hover {
    filter: grayscale(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 90vh;

`;
export default Picture;
