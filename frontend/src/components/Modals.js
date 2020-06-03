import React from "reactn";
import { Modal} from 'antd';
import { LogoutOutlined, GithubOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export const showLogoutConfirm = (onConfirm) => {
  confirm({
    title: 'Do you Want to log out?',
    icon: <LogoutOutlined />,
    onOk() {
      onConfirm();
    },
    onCancel() {
      return;
    },
  });
}

export const showGithubLoginConfirm = (onConfirm) => {
  confirm({
    title: 'Do you Want sign up with Gihub?',
    icon: <GithubOutlined />,
    onOk() {
      onConfirm();
    },
    onCancel() {
      return;
    },
  });
}