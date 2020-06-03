import React, { useState, useEffect, useGlobal } from 'reactn';
import styled from 'styled-components'
import LineChart from './LineChart';
import Donut from './Donut';
import Profile from './Profile';

const MainDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
`;

const Dashboard = ({ dataSet, profile, starsCount}) => {
  return (
    <MainDiv>
      <Profile profile={profile} starsCount={starsCount}/>
      <LineChart
        xaxisType='category'
        seriesName='Open issues'
        data={dataSet.reposForBars}
      />
      <Donut data={dataSet.languagesDonut}/>
    </MainDiv>
  )
}

export default Dashboard;