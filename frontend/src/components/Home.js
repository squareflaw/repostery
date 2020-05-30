import React, { useGlobal} from 'reactn';
import styled from 'styled-components'
import { Button as btn } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import api from '../api'

const MainDiv = styled.div`
  min-height: ${window.innerHeight}px;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
`;

const Avatar = styled.img`
  max-width: 200px;
  margin: 20px;
  border-radius: 10px;
`;

const Button = styled(btn)`
  border-radius: 10px;
  &:hover {
    color: var(--primary-color);
  }
`;

export const Home = () => {
  const [user, setUser] = useGlobal('user');

  const handleLogout = () => {
    api.setToken(null);
    window.localStorage.setItem('jwt', '');
    setUser(null);
  }

  return (
    <MainDiv>
      <Avatar src={user.image}/>
      <h2>{user.username}</h2>
      <Button icon={<LogoutOutlined />} onClick={handleLogout}>Log out</Button>
    </MainDiv>
  )
}

export default Home;