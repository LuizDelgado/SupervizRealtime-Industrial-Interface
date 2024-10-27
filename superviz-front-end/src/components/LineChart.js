import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement);

const LineChart = ({ data, avgTime, width, height }) => {
  const chartData = {
    labels: data.map((_, index) => `Production ${index + 1}`),
    datasets: [
      {
        label: 'Production Time(s)',
        data: data,
        borderColor: '#42A5F5',
        fill: false,
      },
      {
        label: 'Average production time',
        data: new Array(data.length).fill(avgTime),
        borderColor: '#FF7043',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  return <Line data={chartData} width={width} height={height} />;
};

export default LineChart;
