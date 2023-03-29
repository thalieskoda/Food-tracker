import {FiSearch} from "react-icons/fi"
import styled from "styled-components"

const SearchBar = () => {
    return (
<Wrapper>
    <P>Explore new places</P>
        <Input placeholder="Where's your next destination?"></Input>
        <FiSearch/>
</Wrapper>
    )
}

const P = styled.p`
padding: 10px;
`


const Input = styled.input`
width:250px;
padding:5px;
margin:10px;
`

const Wrapper = styled.div`
display:flex;
align-items:center;
padding:30px;
`

export default SearchBar