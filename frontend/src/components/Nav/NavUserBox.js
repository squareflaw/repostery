import React, { useGlobal } from 'reactn'
import styled from 'styled-components'
import { Popover, Menu, Dropdown, Button as btn } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
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

  const handleLogout = () => {
    window.localStorage.setItem('jwt', '');
    api.setToken(null);
    setUser(null);
  }

  const menu = () => (
    <Menu>
      <Menu.ItemGroup title={user.username}>
        <Menu.Item key="1" onClick={() => showLogoutConfirm(handleLogout)} icon={<LogoutOutlined />}>
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
        <Popover placement="bottomRight" content={user.username}>
          <Avatar src={user.profile.image} wWidth={width} />
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