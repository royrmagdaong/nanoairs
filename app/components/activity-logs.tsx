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
  const [darkMode, setDarkMode] = useState<boolean>(false)
  
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
                <tr key={index} className="odd:bg-white even:bg-secondary odd:dark:bg-gray-800 even:dark:bg-gray-700 text-xs">
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

      <div className="flex justify-center pt-3 ">
        <Pagination count={5} variant="outlined" shape="rounded" 
          sx={{
            '& .MuiPaginationItem-root': {
              color: darkMode ? '#9ca3af' : '#4b5563', // gray-400 / gray-600
              backgroundColor: darkMode ? '#1f2937' : 'transparent', // gray-800
              borderColor: darkMode ? '#4b5564' : '#bbbfc4',
              '&:hover': {
                backgroundColor: darkMode ? '#bbbfc4' : '#e2e2e2', // gray-700 / gray-100
                color: '#181818'
              },
            },
            // Active/Selected page styles
            '& .MuiPaginationItem-root.Mui-selected': {
              color: darkMode ? '#181818' : '#181818',
              backgroundColor: darkMode ? '#bbbfc4' : '#e2e2e2', // indigo-600 / indigo-500
              '&:hover': {
                // backgroundColor: darkMode ? 'red' : '#e2e2e2',
              },
            },
          }}
        />
      </div>

    </div>
  );
}
