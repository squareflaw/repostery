import React, { useState, useGlobal } from 'reactn';
import styled from 'styled-components'
import { Input, AutoComplete } from 'antd';
import {getUsernameSuggestions} from '../../github/githubAPI'

const SearchBoxStyled = styled(Input.Search)`
  max-width: 800px;
  padding: 0 20px;

  input, button {
    height: 40px;
    box-shadow: 3px 3px 3px #aaa;
  }
`;

const AutocompleteSearch = (props) => {
  const [searchInput, setSearchInput] = useGlobal('searchInput')
  const [options, setOptions] = useState([]);

  const onSearch = async searchText => {
    let suggestions = [];
    if (searchText) suggestions = await getUsernameSuggestions(searchText);
    setOptions(suggestions);
  };

  const onSelect = data => {
    setSearchInput(data);
  };

  return (
    <AutoComplete
      options={options}
      style={{
        width: props.width? props.width : 700,
      }}
      onSelect={onSelect}
      onSearch={onSearch}
    >
      <SearchBoxStyled size="large" placeholder="Search Github user" onSearch={value => onSelect(value)} enterButton />
    </AutoComplete>
  );
};

export default AutocompleteSearch;
