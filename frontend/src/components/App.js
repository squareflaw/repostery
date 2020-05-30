import React, {useState} from 'react';
import styled from "styled-components";
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import GithubSocialButton from './GithubSocialButton'
import GoogleSocialButton from './GoogleSocialButton'
import api from '../api'

const MainDiv = styled.div`
  min-height: ${window.innerHeight}px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;

  > button {
    margin: 10px;
    height: 50px;
  }
`;

const App = () => {
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    username:'', 
    loading: false
  });
  
  const handleLogin = async (provider, key) => {
    setInProgress(true);
    const data = await api.auth.socialLogin(provider, key)
    setInProgress(false);
    if (data.error) {
      setError(data.error);
    } else {
      window.localStorage.setItem('jwt', data.token);
      setUser({
        username: data.username,
        token: data.token
      });
    }
  }
  
  const handleLogout = () => {
    api.setToken('');
    window.localStorage.setItem('jwt', '');
    setUser({
      username: '',
      token: ''
    });
  }

  const Landing = () => (
    <React.Fragment>
      {error ? <h2>{error}</h2> : null}
      <GithubSocialButton login={code => handleLogin('github', code)} />
      <GoogleSocialButton login={access_token => handleLogin('google', access_token)} />
    </React.Fragment>
  )

  const UserView = () => (
    <React.Fragment>
      {user.username ? <h2>Username: {user.username}</h2> : null}
      {inProgress ? 
        <h3>loading...</h3> 
      : 
        <Button icon={<LogoutOutlined />} onClick={handleLogout}>Log out</Button>
      }
    </React.Fragment>
  )

  return (
    <MainDiv>
    {user.username || inProgress? 
      <UserView/> 
    : 
      <Landing/> 
    }
    </MainDiv>
  );
}


export default App;
