import styled from "styled-components";

//About us page
const AboutUs = () => {
  return (
    <>
      <Container>
        <Title>About Us</Title>
        <Wrapper>
          <P>
            Welcome to Food tracker! We are here to make your dining experience
            on your travels as smooth and enjoyable as possible. Our website
            allows you to easily search for restaurants in any city that you'll
            be visiting.
          </P>
          <P>
            With just a few clicks, you can find the perfect place to dine. One
            of the best features of our website is the ability to save your
            favorite restaurants in your personal profile. This way, you can
            easily access the address and other details of your favorite
            restaurants anytime you want.
          </P>
          <P>
            No more searching through your notes or emails to find that one
            special restaurant you loved. We understand that dining is an
            important part of any trip, and we want to help you make the most of
            it. Our website is designed to be user-friendly and easy to
            navigate.
          </P>
          <P>
            We hope that you find everything you need here and that we can help
            make your travels even more enjoyable. Thank you for using our
            website, and happy dining!
          </P>
        </Wrapper>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin: 30px;
 
  
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  padding: 20px;
  max-width: 60%;
  color: black;

  &:hover {
    background: radial-gradient(circle, #dfcabb, #c2b1a9) no-repeat;
    color: white;
  }
`;

const P = styled.p`
  padding: 20px;
`;
export default AboutUs;
