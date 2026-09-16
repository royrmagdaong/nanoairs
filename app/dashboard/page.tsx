'use client'

import NavBar from "../components/navbar";
import SensorCard from "../components/sensor-card";
import AIDiagnosis from "../components/ai-diagnosis";
import ChartParamsComparison from "../components/chart-params-comparison";


export default function Dashboard() {

  return (
    <div className="">
      
      <NavBar />
      <main className="ml-60 px-8">

        <div className="mt-4 mb-3">
          Dashboard &gt; Raceways 1
        </div>

        <div className=" grid grid-cols-4 grid-row-6">
          <div className="mb-3 mr-3 col-span-3 row-span-1 border border-gray-300 rounded-lg">
            <AIDiagnosis />
          </div>
          <div className=" col-span-1 row-span-5 border-gray-300 border rounded-lg">
            
          </div>
          <div className="mr-3 col-span-3 row-span-2 border-gray-300 border rounded-lg">
            <ChartParamsComparison />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-3">
          <SensorCard title={'Temperature'} value={0} average={0} units={'ºC'}/>
          <SensorCard title={'pH'} value={0} average={0} units={''}/>
          <SensorCard title={'Salinity'} value={0} average={0} units={'ppt'}/>
          <SensorCard title={'Dissolved Oxygen'} value={0} average={0} units={'mg/L'}/>
          <SensorCard title={'Alkalinity'} value={0} average={0} units={'mg/L'}/>
          <SensorCard title={'Dissolved CO2'} value={0} average={0} units={'mg/L'}/>
        </div>
      </main> 
    </div>
  );
}