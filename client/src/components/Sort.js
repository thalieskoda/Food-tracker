
import styled from "styled-components";

const Sort = ({ setSort }) => {
    
    const handleChange = (e) => {
      setSort(e.target.value);

      }
  
    return (
      <>
        <Select onChange={(e) => handleChange(e)}>
          <Option value="sort by">Sort by</Option>
          <Option value="ascending rating">ascending rating</Option>
          <Option value="descending rating">descending rating</Option>
          <Option value="oldest added restaurant">oldest added restaurant</Option>
          <Option value="newest added restaurant">newest added restaurant</Option>
        </Select>
      </>
    );
  };

const Select = styled.select`
  font-size: 1em;
  padding: 8px;
  margin: 30px 0 0 0 ;
  border: none;
  border-radius: 4px;
  background-color: #f8f8f8;
  color: #333;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  }
`;
const Option = styled.option`
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

export default Sort;
