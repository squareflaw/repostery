import React, { useGlobal } from 'reactn'
import styled from 'styled-components'
import { Popover, Menu, Dropdown, Button as btn } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { showLogoutConfirm } from "../Modals"
import api from '../../api'

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
`

const Button = styled(btn)`
  width: 40px;
  height: 40px;
  margin-left: 20px;
  border-radius: 10px;
  &:hover {
    color: var(--primary-color);
    cursor: pointer;
  }
`;

const NavUserBox = () => {
  const [width] = useGlobal('width')
  const [user, setUser] = useGlobal('user');
  const [searchInput, setSearchInput] = useGlobal('searchInput');

  const searchProfile = () => setSearchInput(user.username)

  const handleLogout = () => {
    window.localStorage.setItem('jwt', '');
    api.setToken(null);
    setUser(null);
  }

  const menu = () => (
    <Menu style={{ 
      width: 250, 
      padding:30, 
      boxShadow: '3px 3px 3px #aaa',
      fontSize: '1.2rem' 
    }}>
      <Menu.ItemGroup title={user.username}>
        <Menu.Item key="1" onClick={searchProfile} icon={<UserOutlined />}>
          See your profile
        </Menu.Item>
        <Menu.Item key="2" onClick={() => showLogoutConfirm(handleLogout)} icon={<LogoutOutlined />}>
          Log out
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  if (width < 700) {
    return (
      <MainDiv>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Avatar src={user.profile.image} wWidth={width} />
        </Dropdown>
      </MainDiv>
    )
  } else {
    return (
      <MainDiv>
        <Popover placement="bottomRight" content={`Click to search your profile ${user.username}`}>
          <Avatar src={user.profile.image} wWidth={width} onClick={searchProfile} />
        </Popover>
        <Popover placement="bottomRight" content='Log out'>
          <Button onClick={() => showLogoutConfirm(handleLogout)}>
            <LogoutOutlined />
          </Button>
        </Popover>
      </MainDiv>
    )
  }
};

export default NavUserBox;