import React, {useState} from "reactn";
import Chart from "react-apexcharts";
import styled from 'styled-components'

const MainDiv = styled.div`
  margin: 20px;
  background: var(--full-white);
  border-radius: 5px;
`;

export const LineBarChart = ({type="line"}) => {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 65]
    }
  ]);

  return (
    <MainDiv className="mixed-chart">
      <Chart
        options={options}
        series={series}
        type={type}
        width='600'
      />
    </MainDiv>
  );
}

export default LineBarChart;