import React from 'reactn'
import { Statistic } from 'antd';
import styled from "styled-components";

const MainDiv = styled.div`
  min-width: 150px;
  min-height: 150px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: .7rem;
  background: var(--full-white);
  box-shadow: 3px 3px 3px #888;

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
      <p>{title}</p>
      <h5>{value}</h5>
      {/* <Statistic title={title} value={value} decimalSeparator=''/> */}
    </MainDiv>
  )
}

export default Stat