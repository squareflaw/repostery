import React, {useGlobal} from "reactn";
import styled from 'styled-components'
// import { Input } from 'antd';
import Autocomplete from '../Autocomplete'

const SearchBox = ({placeholder}) => { 
  const [searchInput, setSearchInput] = useGlobal('searchInput')
  return (
    <Autocomplete placeholder={placeholder} onSearch={value => setSearchInput(value)} enterButton />
  )
}

export default SearchBox;