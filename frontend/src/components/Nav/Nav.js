import React, {useGlobal} from 'reactn'
import styled from 'styled-components'
import SocialLogin from '../SocialLogin/SocialLogin'
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
  const [user] = useGlobal('user');
  return (
    <MainDiv>
      <a href='./'><Logo src='pie-logo.svg' alt='App logo' /></a>
      <AutocompleteSearch/>
      {user
        ? <NavUserBox/>
        : <SocialLogin/>
      }
    </MainDiv>
  )
};

export default Nav;