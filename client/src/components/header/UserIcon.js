import { useState } from "react";
import { FiUser,FiChevronUp, FiChevronDown} from "react-icons/fi";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
const UserIcon = () => {

  const navigate = useNavigate()
  const {logout} = useAuth0()
  const [showDropdown, setShowDropdown] = useState(false);
  
const handleProfileOptions = () => {
    setShowDropdown(!showDropdown);

}

const handleClick = () => {
navigate("/profile")
setShowDropdown(!showDropdown)

}
  return (
    <Wrapper>
      <Options onClick={handleProfileOptions}>
        <FiUser />
      {showDropdown ? <FiChevronUp /> : <FiChevronDown />}
      </Options>
      {showDropdown && (
        <Dropdown>
          <DropdownOption onClick={handleClick}>My profile</DropdownOption>
          <DropdownOption onClick={()=> logout()}>Log out</DropdownOption>
        </Dropdown>
      )}
    </Wrapper>
  );
};

const Wrapper =styled.div`
position:relative;
padding: 0 40px;

`;

const Options = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:40px;
height:40px;
border-radius:50%;
cursor: pointer;
font-size:100px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  left: -40px;
  width: 150px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  z-index:9999;

  &:hover {
    border-radius:5px;
  }
  `;

const DropdownOption = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }`;

export default UserIcon;
