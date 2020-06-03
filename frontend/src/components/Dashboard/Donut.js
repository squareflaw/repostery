import React, { useState } from 'reactn';
import styled from 'styled-components'
import Chart from 'react-apexcharts'
import CharTitle from './CharTitle';

const MainDiv = styled.div`
  width: 100vw;
  max-width: 500px;
  margin: 20px 0;
  padding: 10px;
  border-radius: 5px;
  @media (min-width: 700px) {
    margin: 20px;
  }
`;

const Donut = ({data}) => {
  const [state, setState] = useState({
    options: { 
      labels: data.labels,
    },
    series: data.series
  })

  return (
    <MainDiv>
      <CharTitle title='Stars by Language 🌟🎨'/>
      <Chart 
        options={state.options} 
        series={state.series}
        type="donut" 
      />
    </MainDiv>
  )
}

export default Donut;