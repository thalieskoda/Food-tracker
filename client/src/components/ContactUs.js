import styled from "styled-components";

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
            <SectionLink href="mailto:info@trvlup.com">
              info@trvlup.com
            </SectionLink>
          </Section>
          <Section>
            <SectionTitle>Careers</SectionTitle>
            <SectionText>
              If you would like to work with us, please send us your CV at the
              following email address:
            </SectionText>
            <SectionLink href="mailto:career@trvlup.com">
              career@trvlup.com
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
    border-radius:5px;
    height:70vh;
  `;
  
  const Title = styled.h1`
    font-size: 36px;
    margin: 48px;
  `;
  
  const Box = styled.div`
    border: 1px solid black;
    border-radius: 2px;
    padding: 24px;
    max-width: 600px;
   color:black;
box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);

    &:hover {
      background: radial-gradient(circle, #3b597b, #030e1b) no-repeat;
      color:white;
      font-weight:200;
 } 
  `;
  
  const Section = styled.div`
    margin-bottom: 32px;
    padding: 20px;
  `;
  
  const SectionTitle = styled.h2`
    font-size: 28px;
    margin-bottom: 16px;
  `;
  
  const SectionText = styled.p`
    font-size: 16px;
    margin-bottom: 20px;
  `;
  
  const SectionLink = styled.a`
     background-color:black;
     border-radius:5px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: 100;
    padding: 12px 50px;
    transition: all 0.3s ease;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px black solid;
    width:150px;

    &:hover {
        background-color:transparent;
        color:black;
        transition:0.5s;
    }
  `;
  export default ContactUs