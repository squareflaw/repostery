import React from 'reactn';
import styled from 'styled-components'
import AutocompleteSearch from '../Nav/AutocompleteSearch'
import SocialLogin from '../SocialLogin/SocialLogin';
import Donut from '../Dashboard/Donut';

const MainDiv = styled.div`
  min-height: 500px;
  padding: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;
const BodyText = styled.p`
  font-size: 1rem;
  font-weight: lighter;
  color: var(--light-black);
`;

const Landing = () => {
  return (
    <MainDiv>
      <Donut data={{
        labels: ['Javascript', 'Python', 'Sql', 'Scala', 'Java'],
        series: [13, 24, 5, 8, 10]
      }}/>
      <div>
        <Title>Analize your Github stars 🌟</Title>
        <BodyText>Search a user or signup and get data visualizations about starred repositories</BodyText>
      </div>
    </MainDiv>
  )
}

export default Landing;