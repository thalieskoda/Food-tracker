import styled from "styled-components";

//Contact us page with email info
const ContactUs = () => {
  return (
    <Wrapper>
      <Title>Contact Us</Title>
      <Box>
        <Section>
          <SectionTitle>Customer Service</SectionTitle>
          <SectionText>
            For any questions you might have, please reach out to our customer
            service team at the following email address:
          </SectionText>
          <SectionLink href="mailto:info@foodtracker.com">
            info@foodtracker.com
          </SectionLink>
        </Section>
        <Section>
          <SectionTitle>Careers</SectionTitle>
          <SectionText>
            If you would like to work with us, please send us your CV at the
            following email address:
          </SectionText>
          <SectionLink href="mailto:career@foodtracker.com">
            career@foodtracker.com
          </SectionLink>
        </Section>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  border-radius: 5px;
  height: 70vh;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin: 48px;
`;

const Box = styled.div`
  padding: 24px;
  max-width: 50%;
  color: black;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);

  &:hover {
    &:hover {
    background: radial-gradient(circle, #dfcabb, #c2b1a9) no-repeat;
    color: white;
  }
  }
`;

const Section = styled.div`
  margin-bottom: 32px;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 16px;
`;

const SectionText = styled.p`
  font-size: 1em;
  margin-bottom: 20px;
`;

const SectionLink = styled.a`
  background-color: #c2b1a9;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 1em;
  font-weight: 100;
  padding: 12px 50px;
  transition: all 0.3s ease;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  width: 10%;

  &:hover {
    background-color: white;
    color: black;
  }
`;
export default ContactUs;
