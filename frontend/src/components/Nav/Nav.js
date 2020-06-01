import React, {useGlobal} from 'reactn'
import styled from 'styled-components'
import NavUserBox from './NavUserBox'
import SearchBox from './SearchBox'

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

const Nav = ({user, logout}) => {
  return (
    <MainDiv>
      <Logo src='pie-logo.svg' alt='App logo'/>
      <SearchBox placeholder='Search Github user'/>
      <NavUserBox/>
    </MainDiv>
  )
};

export default Nav;