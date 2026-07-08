'use client'

import NavBar from "../components/navbar";
import SensorCard from "../components/sensor-card";
import AIDiagnosis from "../components/ai-diagnosis";
import ChartParamsComparison from "../components/chart-params-comparison";
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
import { useState } from "react";

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

export default function Dashboard() {
  const [tempWeeklyChart, setTempWeeklyChart] = useState({
    labels: ['6:05 am', '6:21 am', '6:46 am', '7:02 am', '7:21 am', '7:42 am', '8:05 am'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [2.1,42,23,12,9,5,12],
            backgroundColor: 'rgba(255, 99, 132, 0.9)',
        }
    ],
  })
  
  const [DOWeeklyChart, setDOWeeklyChart] = useState({
    labels: ['6:05 am', '6:21 am', '6:46 am', '7:02 am', '7:21 am', '7:42 am', '8:05 am'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [2.1,42,23,12,9,5,12],
            backgroundColor: 'rgba(56, 179, 216, 0.9)',
        }
    ],
  })
  
    const [paramComparison, setParamComparison] = useState(
        {
            labels: ['6:05 am', '6:21 am', '6:46 am', '7:02 am', '7:21 am', '7:42 am', '8:05 am'],
            datasets: [
                {
                    fill: true,
                    label: 'Temp in °C',
                    data: [2.1,42,23,12,9,5,12],
                    borderColor: 'rgba(255, 99, 132, 0.5)',
                    backgroundColor: 'rgba(255, 99, 132, 0.35)',
                    tension: 0.4,
                    pointRadius: 2,
                    hidden: false
                },
                {
                    fill: true,
                    label: 'DO in mg/L',
                    data: [2.1,42,23,12,9,5,12].reverse(),
                    borderColor: 'rgba(56, 179, 216, 0.5)',
                    backgroundColor: 'rgba(56, 179, 216, 0.35)',
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
                    hidden: false
                },
                {
                    fill: true,
                    label: 'pH',
                    data: [7.66,7.98,8.56,7.43,8.11,8.55,8.97],
                    borderColor: 'rgba(219, 167, 54, 0.5)',
                    backgroundColor: 'rgba(219, 167, 54, 0.35)',
                    tension: 0.4,
                    pointRadius: 2,
                    hidden: false
                },
            ],
        }
    )

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
        text: 'Temperature',
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
        text: 'Dissolved Oxygen',
        },
    },
  };

  return (
    <div className="">
      
      <NavBar />
      <main className="">
        <div className="text-cyan-500">Dashboard</div>
        
        <div className="ml-60 px-8 grid grid-cols-4 grid-row-6">
          {/* <AIDiagnosis />
          <ChartParamsComparison /> */}
          <div className=" col-span-3 row-span-1 border border-gray-300 m-1 rounded-lg">
            {/* <AIDiagnosis /> */}
            <div className="p-4">
              <div>AI Diagnosis</div>
              <ul className="list-disc ml-10">
                <li>Water condition is chemically unstable due to low alkalinity, and DO data is unreliable due to sensor error.</li>
                <li>The farm is not in immediate collapse condition, but if alkalinity is not corrected, pH crash risk is high.</li>
              </ul>
            </div>
          </div>
          <div className=" col-span-1 row-span-5 border-gray-300 border m-1 rounded-lg">
            
          </div>
          <div className=" col-span-3 row-span-2 border-gray-300 border m-1 grid grid-cols-3 rounded-lg">
            {/* <ChartParamsComparison /> */}
            <div className="col-span-2 border-gray-300 border-r py-4 px-6">
              <Line options={options} data={paramComparison} />
            </div>
            <div className="col-span-1 p-4">
              <Bar options={options_bar_temp} data={tempWeeklyChart} />
              <Bar options={options_bar_do} data={DOWeeklyChart} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 ml-60 px-8">
          <SensorCard title={'Temperature'} value={'32.3'} average={'32.1'} units={'ºC'}/>
          <SensorCard title={'pH'} value={'8.4'} average={'8.1'} units={''}/>
          <SensorCard title={'Salinity'} value={'24.13'} average={'21.5'} units={'ppt'}/>
          <SensorCard title={'Dissolved Oxygen'} value={'15.5'} average={'12.54'} units={'mg/L'}/>
          <SensorCard title={'Alkalinity'} value={'11.46'} average={'16.48'} units={'mg/L'}/>
          <SensorCard title={'Dissolved CO2'} value={'8.47'} average={'10.24'} units={'mg/L'}/>
        </div>
      </main>
    </div>
  );
}
