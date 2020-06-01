import React from "reactn";
import { Modal} from 'antd';
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