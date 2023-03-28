import {FiSearch} from "react-icons/fi"
import styled from "styled-components"

const SearchBar = () => {
    return (
<Wrapper>
        <input></input>
        <FiSearch/>
</Wrapper>
    )
}

const Wrapper = styled.div`
align-items:center;
padding:30px;
`

export default SearchBar