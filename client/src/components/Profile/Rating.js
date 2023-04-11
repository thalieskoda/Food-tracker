import styled from "styled-components";
import ReactStars from "react-rating-stars-component";

//rating component with 5 stars
const Rating = ({ rating }) => {
  return (
    <StyledReactStars
      count={5}
      size={24}
      value={rating}
      edit={false}
      activeColor="#3b597b"
      isHalf={false}
    />
  );
};

const StyledReactStars = styled(ReactStars)`
  .react-stars {
    display: flex;
    align-items: center;
  }
  .react-stars > .react-stars__star {
    margin-right: 8px;
  }
`;

export default Rating;
