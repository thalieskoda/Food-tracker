import styled from "styled-components";
import road from "./images/1.jpeg"
import image from "./images/2.jpeg"
import thailand from "./images/3.jpeg"

const Picture = () => {
  return (
    <>
      <Wrapper>
        <Img src={road} alt="My Image" />
        <Img src={image} alt="My Image" />
        <Img src={thailand} alt="My Image" />
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
