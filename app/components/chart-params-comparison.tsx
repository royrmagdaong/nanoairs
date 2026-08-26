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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ChartParamsComparison() {
  const [pHLabel, setPHLabel] = useState(false)
  const [tempLabel, setTempLabel] = useState(true)
  const [DOLabel, setDOLabel] = useState(true)
  const [salLabel, setSalLabel] = useState(false)
  const [kHLabel, setKHLabel] = useState(false)
  const [co2Label, setCO2Label] = useState(false)

  const [paramComparison, setParamComparison] = useState(
          {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [
                {
                    fill: true,
                    label: 'Temp',
                    data: [
                      27.1,  // Jan
                      27.8,  // Feb
                      28.9,  // Mar
                      30.2,  // Apr
                      31.4,  // May
                      32.1,  // Jun
                      31.8,  // Jul
                      31.2,  // Aug
                      30.5,  // Sep
                      29.4,  // Oct
                      28.3,  // Nov
                      27.5,  // Dec
                    ],
                    borderColor: '#BB6BD984',
                    backgroundColor: '#BB6BD924',
                    tension: 0.4,
                    pointRadius: 2,
                    hidden: false
                },
                {
                    fill: true,
                    label: 'DO',
                    data: [
                      7.8,  // Jan
                      7.6,  // Feb
                      7.3,  // Mar
                      6.9,  // Apr
                      6.5,  // May
                      6.2,  // Jun
                      6.4,  // Jul
                      6.7,  // Aug
                      7.0,  // Sep
                      7.3,  // Oct
                      7.6,  // Nov
                      7.9,  // Dec
                    ],
                    borderColor: '#56CCF299',
                    backgroundColor: '#56CCF235',
                    tension: 0.4,
                    pointRadius: 2,
                    hidden: false
                },
                {
                    fill: true,
                    label: 'Sal',
                    data: [
                      12.4,  // Jan
                      13.1,  // Feb
                      14.2,  // Mar
                      15.6,  // Apr
                      17.1,  // May
                      18.4,  // Jun
                      17.8,  // Jul
                      16.9,  // Aug
                      15.2,  // Sep
                      14.0,  // Oct
                      13.2,  // Nov
                      12.6,  // Dec
                    ],
                    borderColor: '#FFA82F',
                    backgroundColor: '#FFA82F55',
                    tension: 0.4,
                    pointRadius: 2,
                    hidden: true
                },
                {
                    fill: true,
                    label: 'pH',
                    data: [
                      7.2,  // Jan
                      7.4,  // Feb
                      7.6,  // Mar
                      7.8,  // Apr
                      8.0,  // May
                      8.2,  // Jun
                      8.1,  // Jul
                      7.9,  // Aug
                      7.7,  // Sep
                      7.5,  // Oct
                      7.3,  // Nov
                      7.1,  // Dec
                    ],
                    borderColor: '#DA4131',
                    backgroundColor: '#DA413156',
                    tension: 0.4,
                    pointRadius: 2,
                    hidden: true
                },
                {
                    fill: true,
                    label: 'kH',
                    data: [
                      10.8,  // Jan
                      11.2,  // Feb
                      11.7,  // Mar
                      12.4,  // Apr
                      13.1,  // May
                      13.8,  // Jun
                      13.5,  // Jul
                      13.0,  // Aug
                      12.6,  // Sep
                      12.0,  // Oct
                      11.4,  // Nov
                      11.0,  // Dec
                    ],
                    borderColor: '#5950D5',
                    backgroundColor: '#5950D556',
                    tension: 0.4,
                    pointRadius: 2,
                    hidden: true
                },
                {
                    fill: true,
                    label: 'CO2',
                    data: [
                      4.2,  // Jan
                      4.6,  // Feb
                      5.1,  // Mar
                      5.8,  // Apr
                      6.4,  // May
                      7.1,  // Jun
                      6.8,  // Jul
                      6.3,  // Aug
                      5.7,  // Sep
                      5.2,  // Oct
                      4.7,  // Nov
                      4.3,  // Dec
                    ],
                    borderColor: '#84CD7A',
                    backgroundColor: '#84CD7A56',
                    tension: 0.4,
                    pointRadius: 2,
                    hidden: true
                },
            ]
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
        display: false,
        position: 'bottom' as const,
        labels: {
            boxWidth: 12,
            boxHeight: 12,
            padding: 16
        }
      },
      title: {
        display: false,
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

  const handleChange = () => {
    console.log('clicked!')
  }

  const handleClick = (param:string) => {
    if(param==="kH") { 
      setKHLabel(!kHLabel);
      setParamComparison((prev)=> ({
        ...prev,
        labels: [...prev.labels],
        datasets: prev.datasets.map((dataset) =>
          dataset.label === param
          ? {
              ...dataset,
              hidden: kHLabel,
            }
          : dataset
        )
      }))
    }
    if(param==="CO2") {
      setCO2Label(!co2Label)
      setParamComparison((prev)=> ({
        ...prev,
        labels: [...prev.labels],
        datasets: prev.datasets.map((dataset) =>
          dataset.label === param
          ? {
              ...dataset,
              hidden: co2Label,
            }
          : dataset
        )
      }))
    }
    if(param==="DO") {
      setDOLabel(!DOLabel)
      setParamComparison((prev)=> ({
        ...prev,
        labels: [...prev.labels],
        datasets: prev.datasets.map((dataset) =>
          dataset.label === param
          ? {
              ...dataset,
              hidden: DOLabel,
            }
          : dataset
        )
      }))
    }
    if(param==="Temp") {
      setTempLabel(!tempLabel)
      setParamComparison((prev)=> ({
        ...prev,
        labels: [...prev.labels],
        datasets: prev.datasets.map((dataset) =>
          dataset.label === param
          ? {
              ...dataset,
              hidden: tempLabel,
            }
          : dataset
        )
      }))
    }
    if(param==="Sal") {
      setSalLabel(!salLabel)
      setParamComparison((prev)=> ({
        ...prev,
        labels: [...prev.labels],
        datasets: prev.datasets.map((dataset) =>
          dataset.label === param
          ? {
              ...dataset,
              hidden: salLabel,
            }
          : dataset
        )
      }))
    }
    if(param==="pH") {
      setPHLabel(!pHLabel)
      setParamComparison((prev)=> ({
        ...prev,
        labels: [...prev.labels],
        datasets: prev.datasets.map((dataset) =>
          dataset.label === param
          ? {
              ...dataset,
              hidden: pHLabel,
            }
          : dataset
        )
      }))
    }
  }

  return (
    <div className="grid grid-cols-3 h-full">
      <div className="col-span-2 border-gray-300 border-r pb-4 px-6 flex flex-col justify-center">
        <div className="flex justify-between pb-2 pt-4">
          <div>
            <p>Parameters</p>
            <p>Comparison</p>
          </div>
          <div className='flex justify-center text-sm mt-1 pb-2'>
            <div className='flex justify-around flex-col mr-8'>
              <div className='flex items-center cursor-pointer' onClick={()=>{handleClick('kH')}}>
                <div style={{height: '8px', width: '8px', background: '#5950D5'}} className='mr-1 rounded-full'></div>
                <span className={`${kHLabel?'':'line-through'}`}>kH</span>
              </div>
              <div className='flex items-center cursor-pointer' onClick={()=>{handleClick('CO2')}}>
                <div style={{height: '8px', width: '8px', background: '#84CD7A'}} className='mr-1 rounded-full'></div>
                <span className={`${co2Label?'':'line-through'}`}>CO2</span>
              </div>
            </div>
            <div className='flex justify-around flex-col mr-8'>
              <div className='flex items-center cursor-pointer' onClick={()=>{handleClick('DO')}}>
                <div style={{height: '8px', width: '8px', background: '#00C2FF'}} className='mr-1 rounded-full'></div>
                <span className={`${DOLabel?'':'line-through'}`}>DO</span>
              </div>
              <div className='flex items-center cursor-pointer' onClick={()=>{handleClick('Temp')}}>
                <div style={{height: '8px', width: '8px', background: '#BB6BD9'}} className='mr-1 rounded-full'></div>
                <span className={`${tempLabel?'':'line-through'}`}>Temp</span>
              </div>
            </div>
            <div className='flex justify-around flex-col '>
              <div className='flex items-center cursor-pointer' onClick={()=>{handleClick('Sal')}}>
                <div style={{height: '8px', width: '8px', background: '#FFA82F'}} className='mr-1 rounded-full'></div>
                <span className={`${salLabel?'':'line-through'}`}>Sal</span>
              </div>
              <div className='flex items-center cursor-pointer' onClick={()=>{handleClick('pH')}}>
                <div style={{height: '8px', width: '8px', background: '#DA4131'}} className='mr-1 rounded-full'></div>
                <span className={`${pHLabel?'':'line-through'}`}>pH</span>
              </div>
            </div>
          </div>
          <div>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <InputLabel id={`1-label`}>Jan 2026 - Dec 2026</InputLabel>
              <Select
                aria-describedby={`1-helper-text`}
                labelId={`1-label`}
                id={"1"}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Jan 2026 - Dec 2026</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              {/* <FormHelperText id={`1-helper-text`}>
                Visible label and helper text
              </FormHelperText> */}
            </FormControl>
          </div>
        </div>
        <div className="w-full h-100 flex justify-center-safe">
          <Line
            options={options}
            data={paramComparison}
          />
        </div>
      </div>
      <div className="col-span-1 p-4 flex flex-col justify-center">
        <Bar options={options_bar_temp} data={tempWeeklyChart} />
        <Bar options={options_bar_do} data={DOWeeklyChart} />
      </div>
    </div>
  );
}
