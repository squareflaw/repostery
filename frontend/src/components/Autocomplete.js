import React, { useState, useGlobal } from 'reactn';
import styled from 'styled-components'
import { Input, AutoComplete as AutoComp } from 'antd';
import {getUsernameSuggestions} from '../helpers/githubAPI'

const SearchBoxStyled = styled(Input.Search)`
  max-width: 800px;
  padding: 0 20px;

  input, button {
    height: 40px;
  }
`;

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const AutoComplete = () => {
  const [searchInput, setSearchInput] = useGlobal('searchInput')
  const [options, setOptions] = useState([]);

  const onSearch = async searchText => {
    let suggestions = [];
    if (searchText) suggestions = await getUsernameSuggestions(searchText);
    console.log(suggestions)
    setOptions(suggestions);
  };

  const onSelect = data => {
    setSearchInput(data);
  };

  return (
    <AutoComp
      options={options}
      style={{
        width: 600,
      }}
      onSelect={onSelect}
      onSearch={onSearch}
    >
      <SearchBoxStyled size="large" placeholder="Search Github user" enterButton />
    </AutoComp>
  );
};

export default AutoComplete;
