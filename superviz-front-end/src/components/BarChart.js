import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BarChart = ({ data, width, height }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Produced pieces',
        data: Object.values(data),
        backgroundColor: ['#b0bec5', '#ef5350', '#263238'],
      },
    ],
  };

  return <Bar data={chartData} width={width} height={height} />;
};

export default BarChart;
