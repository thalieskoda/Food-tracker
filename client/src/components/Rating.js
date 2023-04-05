import styled from "styled-components";
import ReactStars from "react-rating-stars-component";

const Rating = ({ rating }) => {
    return (
      <StyledReactStars
        count={5}
        size={24}
        value={rating}
        edit={false}
        activeColor="#ffd700"
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

  export default Rating