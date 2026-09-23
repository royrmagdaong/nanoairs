'use client'

import { useState, useEffect } from "react";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Line, Bar } from 'react-chartjs-2';
import moment from 'moment';
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
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<string>('')

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
    labels: [
      '6:00 am',
      '7:00 am',
      '8:00 am',
      '9:00 am',
      '10:00 am',
      '11:00 am',
      '12:00 pm',
      '1:00 pm',
      '2:00 pm',
      '3:00 pm',
      '4:00 pm',
      '5:00 pm',
    ],
    datasets: [
        {
            label: 'Temperature',
            data: [
              26.4,
              26.9,
              27.8,
              28.6,
              29.7,
              30.5,
              31.2,
              31.8,
              32.1,
              31.7,
              30.9,
              30.2,
            ],
            backgroundColor: '#BB6BD994',
            borderColor: '#BB6BD9',
            // backgroundColor: 'transparent',

            // Line only
            fill: false,
            pointRadius: 2,
            pointHoverRadius: 0,

            // Smoothness
            tension: 0.1,
        }
    ],
  })
  
  const [DOWeeklyChart, setDOWeeklyChart] = useState({
    labels: [
      '6:00 am',
      '7:00 am',
      '8:00 am',
      '9:00 am',
      '10:00 am',
      '11:00 am',
      '12:00 pm',
      '1:00 pm',
      '2:00 pm',
      '3:00 pm',
      '4:00 pm',
      '5:00 pm',
    ],
    datasets: [
        {
            label: 'Dissolved Oxygen',
            data: [
              6.82,
              6.95,
              7.18,
              7.42,
              7.76,
              8.12,
              8.45,
              8.62,
              8.48,
              8.21,
              7.94,
              7.68,
            ],
            backgroundColor: '#56CCF299',
            barThickness: 6,
        }
    ],
  })

  useEffect(()=>{
    const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    setDarkMode(isDarkMode)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        console.log("Browser changed to dark mode");
      } else {
        console.log("Browser changed to light mode");
      }

      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      setDarkMode(isDarkMode)
      console.log(darkMode)
    };

    // Listen for changes
    mediaQuery.addEventListener("change", handleThemeChange);

    // Cleanup listener
    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#bbbfc4" : "#4b5564",
        },
        grid: {
          color: darkMode ? "#4b5564" : "#d2d2d2",
        },
      },

      y: {
        ticks: {
          color: darkMode ? "#bbbfc4" : "#4b5564",
        },
        grid: {
          color: darkMode ? "#4b5564" : "#d2d2d2",
        },
      },
    },
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
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#bbbfc4" : "#4b5564",
        },
        grid: {
          color: darkMode ? "#4b5564" : "#d2d2d2",
        },
      },

      y: {
        ticks: {
          color: darkMode ? "#bbbfc4" : "#4b5564",
        },
        grid: {
          color: darkMode ? "#4b5564" : "#d2d2d2",
        },
      },
    },
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
        display: false,
        text: 'Dissolved Oxygen',
        },
    }, 
  };

  const options_bar_do = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#bbbfc4" : "#4b5564",
        },
        grid: {
          color: darkMode ? "#4b5564" : "#d2d2d2",
        },
      },

      y: {
        ticks: {
          color: darkMode ? "#bbbfc4" : "#4b5564",
        },
        grid: {
          color: darkMode ? "#4b5564" : "#d2d2d2",
        },
      },
    },
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
        display: false,
        text: 'Temperature',
        },
    },
  };

  const handleChange = () => {
    console.log('clicked!')
  }

  // fetch sensors latest 20 readings
  // useEffect(()=>{
  //   async function getLatestReadings() {
  //     try {
  //       const res = await fetch("http://localhost:3005/sensor/sensors?siteName=UPV&pondNumber=1&limit=20&skip=0&sort=desc");
  
  //       if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  //       type SensorReading = {
  //         dissolved_oxygen: number;
  //         salinity: number;
  //         temperature: number;
  //         pH: number;
  //         alkalinity: number;
  //         co2: number;
  //         created_at: string;
  //       };
  
  //       const result = await res.json();
  //       const data: SensorReading[] = result.data;
  //       console.log('latest sensor data',data)

  //       const dox: number[] = [];
  //       const sal: number[] = [];
  //       const temp: number[] = [];
  //       const pH: number[] = [];
  //       const alkalinity: number[] = [];
  //       const co2: number[] = [];
  //       const time_label: string[] = [];

  //       // {
  //       //     fill: true,
  //       //     label: 'Temp',
  //       //     data: [
  //       //       27.1,  // Jan
  //       //       27.8,  // Feb
  //       //       28.9,  // Mar
  //       //       30.2,  // Apr
  //       //       31.4,  // May
  //       //       32.1,  // Jun
  //       //       31.8,  // Jul
  //       //       31.2,  // Aug
  //       //       30.5,  // Sep
  //       //       29.4,  // Oct
  //       //       28.3,  // Nov
  //       //       27.5,  // Dec
  //       //     ],
  //       //     borderColor: '#BB6BD984',
  //       //     backgroundColor: '#BB6BD924',
  //       //     tension: 0.4,
  //       //     pointRadius: 2,
  //       //     hidden: false
  //       // },

  //       data.forEach(sensor => {
  //         dox.push(sensor.dissolved_oxygen)
  //         sal.push(sensor.salinity)
  //         temp.push(sensor.temperature)
  //         pH.push(sensor.pH)
  //         alkalinity.push(sensor.alkalinity)
  //         co2.push(sensor.co2)
  //         time_label.push(moment(sensor.created_at).format('h:mma'))
  //       });

  //       // populate kH
  //       setParamComparison((prev)=> ({
  //         ...prev,
  //         labels: [...time_label],
  //         datasets: prev.datasets.map((dataset) =>
  //           dataset.label === 'kH'
  //           ? {
  //               ...dataset,
  //               data: alkalinity,
  //             }
  //           : dataset
  //         )
  //       }))
  //       // populate ph
  //       setParamComparison((prev)=> ({
  //         ...prev,
  //         labels: [...time_label],
  //         datasets: prev.datasets.map((dataset) =>
  //           dataset.label === 'pH'
  //           ? {
  //               ...dataset,
  //               data: pH,
  //             }
  //           : dataset
  //         )
  //       }))
  //       // populate co2
  //       setParamComparison((prev)=> ({
  //         ...prev,
  //         labels: [...time_label],
  //         datasets: prev.datasets.map((dataset) =>
  //           dataset.label === 'CO2'
  //           ? {
  //               ...dataset,
  //               data: co2,
  //             }
  //           : dataset
  //         )
  //       }))
  //       // populate DO
  //       setParamComparison((prev)=> ({
  //         ...prev,
  //         labels: [...time_label],
  //         datasets: prev.datasets.map((dataset) =>
  //           dataset.label === 'DO'
  //           ? {
  //               ...dataset,
  //               data: dox,
  //             }
  //           : dataset
  //         )
  //       }))
  //       // populate Temp
  //       setParamComparison((prev)=> ({
  //         ...prev,
  //         labels: [...time_label],
  //         datasets: prev.datasets.map((dataset) =>
  //           dataset.label === 'Temp'
  //           ? {
  //               ...dataset,
  //               data: temp,
  //             }
  //           : dataset
  //         )
  //       }))
  //       // populate Sal
  //       setParamComparison((prev)=> ({
  //         ...prev,
  //         labels: [...time_label],
  //         datasets: prev.datasets.map((dataset) =>
  //           dataset.label === 'Sal'
  //           ? {
  //               ...dataset,
  //               data: sal,
  //             }
  //           : dataset
  //         )
  //       }))

  //       // console.log('dox', dox)
  //       // console.log('sal', sal)
  //       // console.log('temp', temp)
  //       // console.log('ph', pH)
  //       // console.log('alkalinity', alkalinity)
  //       // console.log('co2', co2)
  //       console.log('time label', time_label)
  //     } catch (err:any) {
  //       // setError(err.message);
  //       console.log(err.message)
  //     }
  //   }
  //   getLatestReadings()
  
  // }, [])


  // fetch charts latest data 20
  // useEffect(()=>{
  //   async function getLatestSensorData(){
  //     type SensorReading = {
  //       dissolved_oxygen: number;
  //       salinity: number;
  //       temperature: number;
  //       pH: number;
  //       alkalinity: number;
  //       co2: number;
  //       created_at: string;
  //     };

  //     type SensorField = Exclude<keyof SensorReading, "created_at">;

  //     const sensorFields: Record<string, SensorField | undefined> = {
  //       kH: "alkalinity",
  //       pH: "pH",
  //       CO2: "co2",
  //       DO: "dissolved_oxygen",
  //       Temp: "temperature",
  //       Sal: "salinity",
  //     };

  //     const params = new URLSearchParams({
  //       siteName: "UPV",
  //       pondNumber: "1",
  //       limit: "20",
  //       skip: "0",
  //       sort: 'asc'
  //     });

  //     const res = await fetch(
  //       `http://localhost:3005/sensor/sensors?${params}`
  //     );

  //     if (!res.ok) {
  //       throw new Error(`Request failed: ${res.status}`);
  //     }

  //     const result: {
  //       error: boolean;
  //       message?: string;
  //       data?: SensorReading[];
  //     } = await res.json();

  //     if (result.error || !Array.isArray(result.data)) {
  //       throw new Error(result.message || "Invalid sensor response");
  //     }

  //     // API returns newest first; display oldest to newest on the chart.
  //     const readings = [...result.data].reverse();

  //     console.log('readings', readings)

  //     const labels = readings.map((sensor) =>
  //       moment(sensor.created_at).format("h:mma")
  //     );

  //     setParamComparison((prev) => ({
  //       ...prev,
  //       labels,
  //       datasets: prev.datasets.map((dataset) => {
  //         const field = sensorFields[dataset.label ?? ""];

  //         if (!field) return dataset;

  //         return {
  //           ...dataset,
  //           data: readings.map((sensor) => sensor[field]),
  //         };
  //       }),
  //     }));
  //   }

  //   getLatestSensorData();
  // }, [])

  useEffect(() => {
    const controller = new AbortController();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    type SensorReading = {
      dissolved_oxygen: number;
      salinity: number;
      temperature: number;
      pH: number;
      alkalinity: number;
      co2: number;
      created_at: string;
    };

    type SensorField = Exclude<keyof SensorReading, "created_at">;

    const sensorFields: Record<string, SensorField | undefined> = {
      kH: "alkalinity",
      pH: "pH",
      CO2: "co2",
      DO: "dissolved_oxygen",
      Temp: "temperature",
      Sal: "salinity",
    };

    async function refreshChart() {
      try {
        const params = new URLSearchParams({
          siteName: "UPV",
          pondNumber: "1",
          limit: "30",
          skip: "0",
          sort: 'asc'
        });

        const res = await fetch(
          `http://localhost:3005/sensor/sensors?${params}`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const result: {
          error: boolean;
          message?: string;
          data?: SensorReading[];
        } = await res.json();

        if (result.error || !Array.isArray(result.data)) {
          throw new Error(result.message || "Invalid sensor response");
        }

        if (controller.signal.aborted) return;

        // Latest 20 readings, displayed oldest to newest.
        const readings = [...result.data].reverse();

        const labels = readings.map((sensor) =>
          moment(sensor.created_at).format("h:mma")
        );

        setParamComparison((prev) => ({
          ...prev,
          labels,
          datasets: prev.datasets.map((dataset) => {
            const field = sensorFields[dataset.label ?? ""];

            if (!field) return dataset;

            return {
              ...dataset,
              data: readings.map((sensor) => sensor[field]),
            };
          }),
        }));
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to refresh chart:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          timeoutId = setTimeout(refreshChart, 40_000);
        }
      }
    }

    void refreshChart(); // Load immediately.
    const intervalId = setInterval(() => {
      void refreshChart();
      console.log('refresh chart')
    }, 20_000);

    return () => {
      clearInterval(intervalId);
      controller.abort();
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

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
      <div className="md:col-span-2 col-span-3 border-gray-300 dark:border-gray-600 border-r px-6 flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row justify-center md:justify-between mt-3 md:mt-0">
          <div className="hidden md:block">
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
          <div className="flex justify-center">{moment(Date.now()).format('DD MMM YYYY')}</div>
          <div className="hidden ">
            <FormControl sx={{ 
              m: 1, 
              minWidth: 200,
              "& .MuiInputLabel-root": {
                color: darkMode? '#bbbfc4':'#4b5564',
              },

              "& .MuiOutlinedInput-root": {
                color: darkMode ? '#bbbfc4':'#4b5564',

                "& fieldset": {
                  borderColor: darkMode ? "#4b5564" : "#bbbfc4",
                },

                "&:hover fieldset": {
                  borderColor: darkMode ? '#bbbfc4':'#4b5564',
                },

                "&.Mui-focused fieldset": {
                  borderColor: darkMode ? '#bbbfc4':'#4b5564',
                },
              },

              "& .MuiSvgIcon-root": {
                color: darkMode ? '#bbbfc4':'#4b5564',
              },
             }} size="small">
              <InputLabel id={`1-label`}>Jan 2026 - Dec 2026</InputLabel>
              <Select
                aria-describedby={`1-helper-text`}
                labelId={`1-label`}
                id={"1"}
                label="Age"
                value={dateRange}
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
        <div className="h-90 flex justify-center-safe">
          <Line
            options={options}
            data={paramComparison}
          />
        </div>
      </div>
      <div className="md:col-span-1 col-span-3 flex flex-col justify-center">
        <div className="px-4 py-3">
           <div>
            <p className="text-xs text-gray-600 dark:text-gray-300">12 hour window</p>
            <div className="flex items-center-safe">
              <p className="mr-4 text-xl font-semibold text-gray-600 dark:text-gray-300">7.68 mg/L</p>
              <div className="flex items-center-safe bg-green-200 outline-green-400 outline text-green-600 rounded px-2 text-xs">
                <span>5.2%</span>
                <ArrowOutwardIcon
                    sx={{
                      fontSize: 14,
                    }}
                  />
              </div>
            </div>
          </div>
          <div className=" h-32 flex justify-center-safe">
            <Bar options={options_bar_temp} data={DOWeeklyChart} />
          </div>
          <div className="flex justify-between items-center-safe capitalize border-t border-gray-300 dark:border-gray-600 pt-2 mt-2 ">
            <div className="flex">
              <div className="mr-4 bg-green-200 text-green-600 px-2 rounded outline outline-green-400  flex items-center-safe text-xs">
                <div style={{height: '6px', width: '6px'}} className="bg-green-500 rounded mr-1"></div>
                <p>Live</p>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">Dissolved Oxygen</p>
            </div>
            <p className="text-xs text-cyan-400">view report</p>
          </div>
        </div>
        <div className="px-4 py-3 border-t border-gray-300 dark:border-gray-600">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-300">12 hour window</p>
            <div className="flex items-center-safe">
              <p className="mr-4 text-xl font-semibold text-gray-600 dark:text-gray-300">30.23 °C</p>
              <div className="flex items-center-safe bg-green-200 outline-green-400 outline text-green-600 rounded px-2 text-xs">
                <span>3.1%</span>
                <ArrowOutwardIcon
                    sx={{
                      fontSize: 14,
                    }}
                  />
              </div>
            </div>
          </div>
          <div className=" h-32 flex justify-center-safe">
            <Line options={options_bar_do} data={tempWeeklyChart} />
          </div>
          <div className="flex justify-between items-center-safe capitalize border-t border-gray-300 dark:border-gray-600 pt-2 mt-2 ">
            <div className="flex">
              <div className="mr-4 bg-green-200 text-green-600 px-2 rounded outline outline-green-400 flex items-center-safe text-xs">
                <div style={{height: '6px', width: '6px'}} className="bg-green-500 rounded mr-1"></div>
                <p>Live</p>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">temperature</p>
            </div>
            <p className="text-xs text-cyan-400">view report</p>
          </div>
        </div>
      </div>
    </div>
  );
}
