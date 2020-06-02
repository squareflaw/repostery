import React from 'reactn'
import styled from 'styled-components'
import NavUserBox from './NavUserBox'
import AutocompleteSearch from './AutocompleteSearch'

const MainDiv = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`

const Nav = () => {
  return (
    <MainDiv>
      <a href='./'><Logo src='pie-logo.svg' alt='App logo' /></a>
      <AutocompleteSearch/>
      <NavUserBox/>
    </MainDiv>
  )
};

export default Nav;