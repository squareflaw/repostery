import React, { useState } from 'reactn';
import styled from 'styled-components'
import Chart from 'react-apexcharts'
import CharTitle from './CharTitle';

const MainDiv = styled.div`
  width: 100vw;
  max-width: 500px;
  min-width: 300px;
  margin: 20px 0;
  border-radius: 5px;
  @media (min-width: 700px) {
    margin: 20px;
  }
`;

const Donut = ({data, title}) => {
  const [state, setState] = useState({
    options: { 
      labels: data.labels,
    },
    series: data.series
  })

  return (
    <MainDiv>
      {title && <CharTitle title={title}/>}
      <Chart 
        options={state.options} 
        series={state.series}
        type="donut" 
      />
    </MainDiv>
  )
}

export default Donut;