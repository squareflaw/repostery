import React from "reactn";
import Chart from "react-apexcharts";
import styled from 'styled-components'
import CharTitle from "./CharTitle";

const MainDiv = styled.div`
  width: 100vw;
  max-width: 600px;
  margin: 20px 0;
  @media (min-width: 700px) {
    margin: 20px;
  }
  @media (min-width: 1440px) {
    max-width: 700px;
  }
`;

const CharDiv = styled.div`
  background: var(--full-white);
  border-radius: 5px;
`;

export const LineChart = (props) => {
  const options = {
    xaxis: {
      type: props.xaxisType ? props.xaxisType : 'numeric'  
    }, 
    stroke: {
      curve: 'smooth',
    }
  };
  const series = [
    {
      name: props.seriesName,
      data: props.data
    },
  ];

  return (
    <MainDiv>
      <CharTitle title={props.seriesName}/>
      <CharDiv>
        <Chart
          options={options}
          series={series}
          type='bar'
        />
      </CharDiv>
    </MainDiv>
  );
}

export default LineChart;