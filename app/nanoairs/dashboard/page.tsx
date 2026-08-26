'use client'

import NavBar from "@/app/components/navbar";
import SensorCardGauge from "@/app/components/sensor-card-gauge"
import PolarAreaChart from '@/app/components/polar-area';
import { useRouter, usePathname } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="">
      
      <NavBar />
      <main className="ml-70 p-6 ">

        <div className="grid grid-cols-1 gap-3">
          <div className="hover:bg-cyan-100 cursor-pointer" onClick={()=>{router.push('/nanoairs/dashboard/raceways-1')}}>
            <div className="outline outline-gray-300 rounded-t-md p-2 mb-2 uppercase font-bold text-gray-500 pl-4">Raceways 1</div>
            <div className="grid grid-cols-6 gap-2">
              <SensorCardGauge title={'Temperature'} value={'32.3'} average={'32.1'} units={'ºC'}/>
              <SensorCardGauge title={'pH'} value={'8.4'} average={'8.1'} units={''}/>
              <SensorCardGauge title={'Salinity'} value={'24.13'} average={'21.5'} units={'ppt'}/>
              <SensorCardGauge title={'Dissolved Oxygen'} value={'32.3'} average={'32.1'} units={'ºC'}/>
              <SensorCardGauge title={'Alkalinity'} value={'8.4'} average={'8.1'} units={''}/>
              <SensorCardGauge title={'Dissolved CO2'} value={'24.13'} average={'21.5'} units={'ppt'}/>
            </div>
          </div>
          <div className="hover:bg-cyan-100 cursor-pointer" onClick={()=>{router.push('/nanoairs/dashboard/raceways-2')}}>
            <div className="outline outline-gray-300 rounded-t-md p-2 mb-2 uppercase font-bold text-gray-500 pl-4">Raceways 2</div>
            <div className="grid grid-cols-6 gap-2">
              <SensorCardGauge title={'Temperature'} value={'32.3'} average={'32.1'} units={'ºC'}/>
              <SensorCardGauge title={'pH'} value={'8.4'} average={'8.1'} units={''}/>
              <SensorCardGauge title={'Salinity'} value={'24.13'} average={'21.5'} units={'ppt'}/>
              <SensorCardGauge title={'Dissolved Oxygen'} value={'32.3'} average={'32.1'} units={'ºC'}/>
              <SensorCardGauge title={'Alkalinity'} value={'8.4'} average={'8.1'} units={''}/>
              <SensorCardGauge title={'Dissolved CO2'} value={'24.13'} average={'21.5'} units={'ppt'}/>
            </div>
          </div>
          <div className="hover:bg-cyan-100 cursor-pointer" onClick={()=>{router.push('/nanoairs/dashboard/control-pond-1')}}>
            <div className="outline outline-gray-300 rounded-t-md p-2 mb-2 uppercase font-bold text-gray-500 pl-4">Control Pond 1</div>
            <div className="grid grid-cols-6 gap-2">
              <SensorCardGauge title={'Temperature'} value={'32.3'} average={'32.1'} units={'ºC'}/>
              <SensorCardGauge title={'pH'} value={'8.4'} average={'8.1'} units={''}/>
              <SensorCardGauge title={'Salinity'} value={'24.13'} average={'21.5'} units={'ppt'}/>
              <SensorCardGauge title={'Dissolved Oxygen'} value={'32.3'} average={'32.1'} units={'ºC'}/>
              <SensorCardGauge title={'Alkalinity'} value={'8.4'} average={'8.1'} units={''}/>
              <SensorCardGauge title={'Dissolved CO2'} value={'24.13'} average={'21.5'} units={'ppt'}/>
            </div>
          </div>
          <div className="hover:bg-cyan-100 cursor-pointer" onClick={()=>{router.push('/nanoairs/dashboard/control-pond-2')}}>
            <div className="outline outline-gray-300 rounded-t-md p-2 mb-2 uppercase font-bold text-gray-500 pl-4">Control Pond 2</div>
            <div className="grid grid-cols-6 gap-2">
              <SensorCardGauge title={'Temperature'} value={'32.3'} average={'32.1'} units={'ºC'}/>
              <SensorCardGauge title={'pH'} value={'8.4'} average={'8.1'} units={''}/>
              <SensorCardGauge title={'Salinity'} value={'24.13'} average={'21.5'} units={'ppt'}/>
              <SensorCardGauge title={'Dissolved Oxygen'} value={'32.3'} average={'32.1'} units={'ºC'}/>
              <SensorCardGauge title={'Alkalinity'} value={'8.4'} average={'8.1'} units={''}/>
              <SensorCardGauge title={'Dissolved CO2'} value={'24.13'} average={'21.5'} units={'ppt'}/>
            </div>
          </div>
        </div>
        
      </main> 
    </div>
  );
}