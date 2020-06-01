import React from "reactn";
import { Modal, Button, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

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