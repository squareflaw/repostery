import React from 'reactn'
import { Statistic } from 'antd';
import styled from "styled-components";

const MainDiv = styled.div`
  min-width: 150px;
  min-height: 150px;
  padding: 20px;
  display: flex;
  align-items: center;
  background: var(--full-white);

  @media (max-width: 600px){
    width: 150px;
  }
  
  .ant-statistic-title {
    color: var(--black);
  }
`;


const Stat = ({title, value}) => {
  return (
    <MainDiv>
      <Statistic title={title} value={value} />
    </MainDiv>
  )
}

export default Stat