import styled from "styled-components";

const AboutUs = () => {
  return (
    <>
    <Title>About Us</Title>
    <Wrapper>
        <Box>
       
      <P>
        Welcome to TRVL-UP! We are here to make your dining experience on
        your travels as smooth and enjoyable as possible. Our website allows you
        to easily search for restaurants in any city that you'll be visiting.
      </P>
      <P>
        With just a few clicks, you can find the perfect place to dine. One of
        the best features of our website is the ability to save your favorite
        restaurants in your personal profile. This way, you can easily access
        the address and other details of your favorite restaurants anytime you
        want.
      </P>
      <P>
        No more searching through your notes or emails to find that one special
        restaurant you loved. We understand that dining is an important part of
        any trip, and we want to help you make the most of it. Our website is
        designed to be user-friendly and easy to navigate.
      </P>
      <P>
        We hope that you find everything you need here and that we can help make
        your travels even more enjoyable. Thank you for using our website, and
        happy dining!
      </P>
      </Box>
    </Wrapper>
    </>
  );
};

const Box = styled.div`
border: 1px solid black;
border-radius: 2px;
padding: 24px;
max-width: 600px;
`;
const Title = styled.h1`
font-size: 36px;
align-items:center;
margin:auto;
`;

const Wrapper = styled.div`
   display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
    `;

const P = styled.p`
padding: 20px;
`;
export default AboutUs;
