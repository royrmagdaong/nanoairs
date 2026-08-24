'use client'

import Status from "./status-badge"
import Pagination from '@mui/material/Pagination';
import logs from "@/app/static-json/logs.json"
import { useState, useEffect } from "react";

export default function AIDiagnosis() {
  const [logsData, setLogsData] = useState(logs)
  
  useEffect(()=>{
    console.log(logs)
  }, [])

  return (
    <div className="">

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="">
              <th className="px-4 pt-5 pb-3 text-left text-xs uppercase font-semibold">Component</th>
              <th className=" pt-3 pb-2 text-center text-xs uppercase font-semibold">Status</th>
              <th className="pl-3 pt-3 pb-2 text-left text-xs uppercase font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="">
            {
              logsData.slice(0, 11).map((log, index) => 
                <tr key={index} className="odd:bg-white even:bg-secondary text-xs">
                  <td className="pl-4 py-3">{log.component}</td>
                  <td className="text-center">
                    <Status name={log.status}/>
                  </td>
                  <td className="pl-3">{log.date}</td>
                </tr>
              )
            }
          </tbody>
        </table>

        <div className="flex justify-center pt-3">
          <Pagination count={5} variant="outlined" shape="rounded" />
        </div>
      </div>

    </div>
  );
}
