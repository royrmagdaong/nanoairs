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
          <AIDiagnosis />
          <ChartParamsComparison />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 ml-60 px-8">
          <SensorCard />
          <SensorCard />
          <SensorCard />
          <SensorCard />
          <SensorCard />
          <SensorCard />
        </div>
      </main>
    </div>
  );
}
