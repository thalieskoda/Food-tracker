import { useState } from "react";
import { FiUser,FiChevronUp, FiChevronDown} from "react-icons/fi";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
const UserIcon = () => {
  const {logout} = useAuth0()
  const [showDropdown, setShowDropdown] = useState(false);
const handleProfileOptions = () => {
    setShowDropdown(!showDropdown);

}
  return (
    <Wrapper>
      <Options onClick={handleProfileOptions}>
        <FiUser />
      {showDropdown ? <FiChevronUp /> : <FiChevronDown />}
      </Options>
      {showDropdown && (
        <Dropdown>
          <DropdownOption>My profile</DropdownOption>
          <DropdownOption onClick={()=> logout()}>Log out</DropdownOption>
        </Dropdown>
      )}
    </Wrapper>
  );
};

const Wrapper =styled.div`
position:relative;
`;

const Options = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:40px;
height:40px;
border-radius:50%;
cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 150px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);`;

const DropdownOption = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }`;

export default UserIcon;
