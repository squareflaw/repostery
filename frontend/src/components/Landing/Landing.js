import React from 'reactn';
import styled from 'styled-components'
import AutocompleteSearch from '../Nav/AutocompleteSearch'
import SocialLogin from '../SocialLogin/SocialLogin';

const MainDiv = styled.div`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Landing = () => {
  return (
    <MainDiv>
      <h3>Here goes the super kick-ass Landing</h3>
    </MainDiv>
  )
}

export default Landing;