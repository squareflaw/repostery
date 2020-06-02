import React from "reactn";
import Chart from "react-apexcharts";
import styled from 'styled-components'

const MainDiv = styled.div`
  max-width: 600px;
  margin: 20px 0;
  background: var(--full-white);
  border-radius: 5px;
  @media (min-width: 700px) {
    margin: 20px;
  }
  @media (min-width: 1440px) {
    max-width: 700px;
  }
`;

export const LineChart = (props) => {
  const options = {
    xaxis: {
      type: props.xaxisType ? props.xaxisType : 'numeric'  
    }, 
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 0,
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
      <Chart
        options={options}
        series={series}
        type='line'
      />
    </MainDiv>
  );
}

export default LineChart;