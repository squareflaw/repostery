import React from "reactn";
import Chart from "react-apexcharts";
import styled from 'styled-components'
import CharTitle from "./CharTitle";

const MainDiv = styled.div`
  width: 100vw;
  max-width: 800px;
  margin: 20px 0;
`;
const ChartDiv = styled.div`
  background: var(--full-white);
  box-shadow: 3px 3px 3px #888;
  
`;

const Timeline = (props) => {
  const state = {
    series: props.data,
    options: {
      chart: {
        height: 450,
        type: 'rangeBar'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%'
        }
      },
      xaxis: {
        type: 'datetime'
      },
      stroke: {
        width: 1
      },
      fill: {
        type: 'solid',
        opacity: 0.6
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    },
  }; 

  return (
    <MainDiv>
      <CharTitle title='Repositories Lifetime ⌛🌱'/>
      <ChartDiv>
        <Chart options={state.options} series={state.series} type="rangeBar" height='1000'/>
      </ChartDiv>
    </MainDiv>
  )
}

export default Timeline;