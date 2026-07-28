'use client';

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { PolarArea } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);

export default function PolarAreaChart() {
  const data = {
    labels: [
      'pH',
      'Sal',
      'DO',
      'Temp',
      'CO2',
    ],
    datasets: [
      {
        label: 'Current Reading',
        data: [7.02, 15.54, 12.55, 31.3, 6.12],
        backgroundColor: [
          'rgba(75,192,192,0.6)',
          'rgba(255,205,86,0.6)',
          'rgba(255,99,132,0.6)',
          'rgba(54,162,235,0.6)',
          'rgba(153,102,255,0.6)',
        ],
        borderColor: [
          'rgb(75,192,192)',
          'rgb(255,205,86)',
          'rgb(255,99,132)',
          'rgb(54,162,235)',
          'rgb(153,102,255)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Polar Area Chart'
      },
    },
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return <PolarArea data={data} options={options} />;
}