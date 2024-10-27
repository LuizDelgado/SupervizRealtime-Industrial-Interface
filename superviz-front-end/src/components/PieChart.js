import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, width, height }) => {
  const chartData = {
    labels: ['Silver', 'Red', 'Black'],
    datasets: [
      {
        data,
        backgroundColor: ['#b0bec5', '#ef5350', '#263238'],
        hoverBackgroundColor: ['#90a4ae', '#e57373', '#37474f'],
      },
    ],
  };

  return <Pie data={chartData} width={width} height={height} />;
};

export default PieChart;
