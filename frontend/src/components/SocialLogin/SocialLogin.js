import React, { useState, useGlobal } from 'reactn';
import styled from "styled-components";
import { Spin} from 'antd';
import GithubSocialButton from './GithubSocialButton'
import GoogleSocialButton from './GoogleSocialButton'
import api from '../../api'

const MainDiv = styled.div`
  min-height: ${window.innerHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

const SocialLogin = () => {
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useGlobal('responseError');
  const [user, setUser] = useGlobal('user');

  const handleLogin = async (provider, key) => {
    setInProgress(true);
    const data = await api.auth.socialLogin(provider, key)
    setInProgress(false);
    
    if (data.error) {
      setError(data.error);
    } else {
      window.localStorage.setItem('jwt', data.token);
      setUser({...data});
    }
  }

  const handleGithubLogin = (code) => handleLogin('github', code);
  const handleGoogleLogin = (access_token) => handleLogin('google', access_token);

  return (
    <MainDiv>
      {inProgress ? <Spin size="large" />
      :
        <React.Fragment>
          <GithubSocialButton login={handleGithubLogin}/>
          <GoogleSocialButton login={handleGoogleLogin}/>
        </React.Fragment>
      }
    </MainDiv>
  )
}

export default SocialLogin;