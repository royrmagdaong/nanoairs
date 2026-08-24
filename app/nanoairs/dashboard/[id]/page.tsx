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

  if(params.id === 'raceways-1' || params.id === 'raceways-2' || params.id === 'control-pond-1' || params.id === 'control-pond-2'){
    return (
      <div className="">
        
        <NavBar />
        <main className="ml-60 px-8">

          <div className="mt-4 mb-4 text-sm text-gray-500">
            <i className="material-icons">&#xe871;</i>
            <span className='hover:text-cyan-400 hover:underline cursor-pointer' onClick={()=>{router.push('/nanoairs/dashboard')}}>Dashboard</span> &gt; <span className='capitalize'>{activeLink}</span>
          </div>

          <div className=" grid grid-cols-4 grid-row-6">
            <div className="mb-3 mr-3 col-span-3 row-span-1 border border-gray-300 rounded-lg">
              <AIDiagnosis />
            </div>
            <div className=" col-span-1 row-span-5 border-gray-300 border rounded-lg">
              <ActivityLogs />
            </div>
            <div className="mr-3 col-span-3 row-span-2 border-gray-300 border rounded-lg">
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