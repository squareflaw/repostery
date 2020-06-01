import React, {useGlobal} from 'reactn'
import styled from 'styled-components'
import { Popover, Menu, message, Dropdown, Button as btn } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { showLogoutConfirm } from "./Modals";

const MainDiv = styled.div`
  padding: 20px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const Button = styled(btn)`
  width: 50px;
  height: 50px;
  margin-left: 20px;
  border-radius: 10px;
  &:hover {
    color: var(--primary-color);
    cursor: pointer;
  }
`;

const Nav = ({user, logout}) => {
  const [width] = useGlobal('width')

  const menu = () => (
    <Menu>
      <Menu.ItemGroup title={user.username}>
        <Menu.Item key="1" onClick={() => showLogoutConfirm(logout)}>Log out</Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  if (width < 700) {
    return (
      <MainDiv>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Avatar src={user.profile.image} />
        </Dropdown>
      </MainDiv>
    )
  }

  return (
    <MainDiv>
      <Popover placement="bottomRight" content={user.username}>
        <Avatar src={user.profile.image} />
      </Popover>
      <Popover placement="bottomRight" content='Log out'>
        <Button onClick={() => showLogoutConfirm(logout)}><LogoutOutlined /></Button>
      </Popover>
    </MainDiv>
  )
};

export default Nav;