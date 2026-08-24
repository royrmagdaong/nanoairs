'use client'

import { useState } from "react";
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


export default function ChartParamsComparison() {

  const [paramComparison, setParamComparison] = useState(
          {
              labels: ['6:05 am', '6:21 am', '6:46 am', '7:02 am', '7:21 am', '7:42 am', '8:05 am'],
              datasets: [
                  {
                      fill: true,
                      label: 'Temp in °C',
                      data: [2.1,42,23,12,9,5,12],
                      borderColor: '#BB6BD984',
                      backgroundColor: '#BB6BD924',
                      tension: 0.4,
                      pointRadius: 2,
                      hidden: false
                  },
                  {
                      fill: true,
                      label: 'DO in mg/L',
                      data: [2.1,42,23,12,9,5,12].reverse(),
                      borderColor: '#56CCF299',
                      backgroundColor: '#56CCF235',
                      tension: 0.4,
                      pointRadius: 2,
                      hidden: false
                  },
                  {
                      fill: true,
                      label: 'Salinity in ppt',
                      data: [25.2,26,30.5,31.5,28.54,29.93,31.55],
                      borderColor: 'rgba(58, 211, 91, 0.5)',
                      backgroundColor: 'rgba(58, 211, 91, 0.35)',
                      tension: 0.4,
                      pointRadius: 2,
                      hidden: true
                  },
                  {
                      fill: true,
                      label: 'pH',
                      data: [7.66,7.98,8.56,7.43,8.11,8.55,8.97],
                      borderColor: 'rgba(219, 167, 54, 0.5)',
                      backgroundColor: 'rgba(219, 167, 54, 0.35)',
                      tension: 0.4,
                      pointRadius: 2,
                      hidden: true
                  },
              ],
          }
      )

  const [tempWeeklyChart, setTempWeeklyChart] = useState({
    labels: ['6:05 am', '6:21 am', '6:46 am', '7:02 am', '7:21 am', '7:42 am', '8:05 am'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [2.1,42,23,12,9,5,12],
            backgroundColor: '#56CCF299',
        }
    ],
  })
  
  const [DOWeeklyChart, setDOWeeklyChart] = useState({
    labels: ['6:05 am', '6:21 am', '6:46 am', '7:02 am', '7:21 am', '7:42 am', '8:05 am'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [2.1,42,23,12,9,5,12],
            backgroundColor: '#BB6BD994',
        }
    ],
  })

    const options = {
      responsive: true,
      plugins: {
          legend: {
          position: 'bottom' as const,
          labels: {
              boxWidth: 12,
              boxHeight: 12,
              padding: 16
          }
  
          },
          title: {
          display: true,
          text: 'Parameters Comparison',
          },
      },
    };

  const options_bar_temp = {
    responsive: true,
    plugins: {
        legend: {
        display: false,
        position: 'bottom' as const,
        labels: {
            boxWidth: 12,
            boxHeight: 12
        }
        },
        title: {
        display: true,
        text: 'Dissolved Oxygen',
        },
    }, 
  };

  const options_bar_do = {
    responsive: true,
    plugins: {
        legend: {
        display: false,
        position: 'bottom' as const,
        labels: {
            boxWidth: 12,
            boxHeight: 12
        }
        },
        title: {
        display: true,
        text: 'Temperature',
        },
    },
  };

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 border-gray-300 border-r py-4 px-6">
        <Line options={options} data={paramComparison} />
      </div>
      <div className="col-span-1 p-4">
        <Bar options={options_bar_temp} data={tempWeeklyChart} />
        <Bar options={options_bar_do} data={DOWeeklyChart} />
      </div>
    </div>
  );
}
