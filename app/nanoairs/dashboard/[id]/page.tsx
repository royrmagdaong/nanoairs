'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';


import NavBar from "@/app/components/navbar";
import SensorCard from "@/app/components/sensor-card"
import AIDiagnosis from "@/app/components/ai-diagnosis"
import ChartParamsComparison from "@/app/components/chart-params-comparison"
import ActivityLogs from "@/app/components/activity-logs"


export default function Dashboard() {
const params = useParams()
const router = useRouter()
const [activeLink, setActiveLink] = useState('')
const [windowSize, setWindowSize] = useState({
  width: 0,
  height: 0,
});


useEffect(()=>{
  if(params.id === 'raceways-1'){
      setActiveLink('raceways 1')
    }else if(params.id === 'raceways-2'){
      setActiveLink('raceways 2')
    }else if(params.id === 'control-pond-1'){
      setActiveLink('control pond 1')
    }else if(params.id === 'control-pond-2'){
      setActiveLink('control pond 2')
    }
}, [])

useEffect(() => {
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  handleResize();

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  if(params.id === 'raceways-1' || params.id === 'raceways-2' || params.id === 'control-pond-1' || params.id === 'control-pond-2'){
    return (
      // <div className="3xl:bg-red-100 2xl:bg-blue-100">
      <div className="bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100">
        <NavBar />
        <main className="ml-70 px-6 mt-3">

          {/* <div className="mt-4 mb-4 text-sm text-gray-500 dark:text-gray-100">
            <i className="material-icons">&#xe871;</i>
            <span>width: {windowSize.width}</span>
            <span>height: {windowSize.height}</span>
            <span className='hover:text-cyan-400 hover:underline cursor-pointer' onClick={()=>{router.push('/nanoairs/dashboard')}}>Dashboard</span> &gt; <span className='capitalize'>{activeLink}</span>
          </div> */}

          <div className=" grid grid-cols-5 grid-row-6">
            <div className="mb-3 mr-3 col-span-4 row-span-1 border border-gray-300 dark:border-gray-600 rounded-lg">
              <AIDiagnosis />
            </div>
            <div className=" col-span-1 row-span-6 border-gray-300 dark:border-gray-700 border rounded-lg">
              <ActivityLogs />
            </div>
            <div className="mr-3 col-span-4 row-span-5 border-gray-300 dark:border-gray-600 border rounded-lg">
              <ChartParamsComparison />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-3">
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
  }else{
    return (
      <div>error 404</div>
    );
  }

  
}