import React from "reactn";
import styled from 'styled-components'
import { Input } from 'antd';

const { Search } = Input;
const SearchBoxStyled = styled(Search)`
  max-width: 800px;
  padding: 0 20px;

  input, button {
    height: 40px;
  }
`;

const SearchBox = ({placeholder}) => { 
  return (
    <SearchBoxStyled placeholder={placeholder} onSearch={value => alert(`You search for ${value}`)} enterButton />
  )
}

export default SearchBox;