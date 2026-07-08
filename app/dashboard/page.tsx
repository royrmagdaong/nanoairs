'use client'

import NavBar from "../components/navbar";
import SensorCard from "../components/sensor-card";
import AIDiagnosis from "../components/ai-diagnosis";
import ChartParamsComparison from "../components/chart-params-comparison";

export default function Dashboard() {

  return (
    <div className="">
      
      <NavBar />
      <main className="">
        <div className="text-cyan-500">Dashboard</div>
        
        <div className="ml-60 px-8">
          {/* <AIDiagnosis />
          <ChartParamsComparison /> */}
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
