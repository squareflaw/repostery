import React from 'reactn';
import styled from 'styled-components'
import { Tabs as TabsANTD } from 'antd';
import { HomeOutlined, UserOutlined} from '@ant-design/icons'
import TopRepositories from './Repositories/TopRepositories'

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
  <TabsMainDiv defaultActiveKey="2" size='large' animated={false}>
    <TabPane key="1" tab={
      <span>
        <HomeOutlined />
        Feed
      </span>
    }>
    </TabPane>
    <TabPane key="2" tab={
      <span>
        <UserOutlined />
        Your Profile
      </span>
    }>
      <TopRepositories username='squareflaw'/>
    </TabPane>
  </TabsMainDiv>
);

export default Tabs;