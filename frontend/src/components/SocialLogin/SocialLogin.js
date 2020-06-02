import React, { useState, useGlobal } from 'reactn';
import styled from "styled-components";
import { Spin, message} from 'antd';
import GithubSocialButton from './GithubSocialButton'
import GoogleSocialButton from './GoogleSocialButton'
import api from '../../api'
import {setGithubAccessToken} from '../../github/githubAPI'

const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > button {
    height: auto;
    width: auto;
    padding: 10px;
    border-radius: 10px;

    .logo {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
`;

const SocialLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useGlobal('responseError');
  const [user, setUser] = useGlobal('user');

  const handleLogin = async (provider, key) => {
    setError(null);
    setLoading(true);
    const data = await api.auth.socialLogin(provider, key);
    setLoading(false);
    
    if (data.error) {
      setError(data.error);
    } else {
      window.localStorage.setItem('jwt', data.token);
      window.localStorage.setItem('gh_access_token', data.gh_access_token);
      setGithubAccessToken(data.gh_access_token)
      setUser({...data});
    }
  }

  const handleGithubLogin = (code) => handleLogin('github', code);
  const handleGoogleLogin = (access_token) => handleLogin('google', access_token);

  return (
    <MainDiv>
      {loading ? <Spin size="large" />
      :
        <React.Fragment>
          {error && message.error(error, 10)}
          <GithubSocialButton login={handleGithubLogin}/>
          {/* <GoogleSocialButton login={handleGoogleLogin}/> */}
        </React.Fragment>
      }
    </MainDiv>
  )
}

export default SocialLogin;