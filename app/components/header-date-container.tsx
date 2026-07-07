
'use client'
import {useState, useEffect} from "react";
import moment from "moment"
export default function HeaderDateContainer() {

    useEffect(() => {
        
    },[]);

  return (
    <nav className="fixed top-3 left-1/3 w-1/3 bg-gray-900 text-white flex flex-col justify-center items-center py-3 text-xs italic" style={{letterSpacing: '1px', background: 'linear-gradient(to right,transparent 0%,rgba(0,0,0,.55) 55%,rgba(0,0,0,.55) 55%,transparent 100%)'}}>
        {moment().format('YYYY/MM/DD HH:mm:ss dddd')}
    </nav>
  );
}
