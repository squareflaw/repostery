import React, {useState} from 'react';
import styled from "styled-components";
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import SoialLoginButtons from "./SocialLoginButtons/SocialLoginButtons";
import api from '../api'

const MainDiv = styled.div`
  min-height: ${window.innerHeight}px;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
`;

const Paragraph = styled.p`
  max-width: 730px;
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
      setUser({username: data.username, token: data.token });
    }
  }
  
  const handleLogout = () => {
    api.setToken(null);
    window.localStorage.setItem('jwt', '');
    setUser({username: '', token: ''});
  }

  const UserView = () => (
    <React.Fragment>
      {user.username && <h2>Username: {user.username}</h2>}
      {inProgress && <h3>loading...</h3> }
      {!inProgress && <Button icon={<LogoutOutlined/>} onClick={handleLogout}>Log out</Button>}
    </React.Fragment>
  )

  return (
    <MainDiv>
    {user.username || inProgress
      ? <UserView/> 
      : <SoialLoginButtons handleLogin={handleLogin} />
    }
    <h2>Long Ass Title</h2>
    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Paragraph>
    </MainDiv>
  );
}

export default App;
