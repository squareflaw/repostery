import React, { useState, useEffect, useGlobal } from 'reactn';
import styled from 'styled-components'
import Donut from './Donut';
import Profile from './Profile';
import Timeline from './Timeline';

const MainDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 50px;
`;

const ChartsDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const Dashboard = ({ dataSet, profile, starsCount}) => {
  return (
    <MainDiv>
      <Profile profile={profile} starsCount={starsCount}/>
      <ChartsDiv>
        <Donut title='Latest stars by Language 🌟🎨' data={dataSet.languagesDonut}/>
        <Timeline data={dataSet.timelineData}/>
      </ChartsDiv>
    </MainDiv>
  )
}

export default Dashboard;