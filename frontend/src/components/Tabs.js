import React from 'reactn';
import { Tabs as TabsANTD } from 'antd';
import { HomeOutlined, UserOutlined} from '@ant-design/icons'
import styled from 'styled-components'

const { TabPane } = TabsANTD;
const TabsMainDiv= styled(TabsANTD)`
  width: 100vw;

  .ant-tabs-bar {
    div {
      font-size: 1rem;
      min-width: 150px;
      text-align: center;
    }
  }
`;

const Tabs = () => (
  <TabsMainDiv defaultActiveKey="1" size='large' animated={false}>
    <TabPane key="1" tab={
      <span>
        <HomeOutlined />
        Feed
      </span>
    }>
      here goes the feed
    </TabPane>
    <TabPane key="2" tab={
      <span>
        <UserOutlined />
        Your Profile
      </span>
    }>
      Here goes your Profile
    </TabPane>
  </TabsMainDiv>
);

export default Tabs;