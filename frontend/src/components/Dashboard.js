import React, { useState, useEffect, useGlobal } from 'reactn';
import styled from 'styled-components'
import LineChart from './Charts/LineChart';

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
`;

const Dashboard = (props) => {
  return (
    <MainDiv>
      <LineChart
        xaxisType='category'
        seriesName='Open Issues'
        data={props.dataSet}
      />
    </MainDiv>
  )
}

export default Dashboard;