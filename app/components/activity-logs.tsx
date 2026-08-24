'use client'

import Status from "./status-badge"
import Pagination from '@mui/material/Pagination';
import logs from "@/app/static-json/logs.json"
import logs2 from "@/app/static-json/logs-2.json"
import logs3 from "@/app/static-json/logs-3.json"
import logs4 from "@/app/static-json/logs-4.json"
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'

export default function AIDiagnosis() {
  interface Log {
    component: string;
    status: string;
    value: number;
    unit: string;
    date: string;
  }
  
  const [logsData, setLogsData] = useState<Log[]>([]);
  const pathname = usePathname()
  
  useEffect(()=>{
    // console.log(logs)
    setLogsData(logs2)

    if(pathname.includes('raceways-1')){
      setLogsData(logs)
    }else if(pathname.includes('raceways-2')){
      setLogsData(logs2)
    }else if(pathname.includes('control-pond-1')){
      setLogsData(logs3)
    }else if(pathname.includes('control-pond-2')){
      setLogsData(logs4)
    }
  }, [])

  return (
    <div className="">

      {/* <div className="max-h-full overflow-y-auto"> */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="">
              <th className="pl-3 pt-5 pb-3 text-left text-xs uppercase font-semibold">Component</th>
              <th className=" pt-3 pb-2 text-center text-xs uppercase font-semibold">Status</th>
              <th className="pl-3 pt-3 pb-2 text-left text-xs uppercase font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="">
            {
              logsData.slice(0, 11).map((log, index) => 
                <tr key={index} className="odd:bg-white even:bg-secondary text-xs">
                  <td className="pl-3 py-3">{log.component}</td>
                  <td className="text-center">
                    <Status name={log.status}/>
                  </td>
                  <td className="pl-4">{log.date}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      <div className="flex justify-center pt-3">
        <Pagination count={5} variant="outlined" shape="rounded" />
      </div>

    </div>
  );
}
