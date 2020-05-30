import React from 'react';
import styled from "styled-components";
import GithubSocialButton from './GithubSocialButton'
import GoogleSocialButton from './GoogleSocialButton'

const MainDiv = styled.div`
  > button {
    height: auto;
    width: auto;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    &:hover {
      color: var(--primary-color);
    }

    .logo {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
`;

const SoialLoginButtons = (props) => {
  const handleGithubLogin = (code) => props.handleLogin('github', code);
  const handleGoogleLogin = (access_token) => props.handleLogin('google', access_token);

  return (
    <MainDiv>
      <GithubSocialButton login={handleGithubLogin}/>
      <GoogleSocialButton login={handleGoogleLogin}/>
    </MainDiv>
  )
}

export default SoialLoginButtons;