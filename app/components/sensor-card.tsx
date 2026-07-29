'use client'

import GaugeComponent from 'react-gauge-component';
import { useState } from "react";

export default function SensorCard(props:any) {
  const [tempRange, setTempRange] = useState({
    tooLow_upper_limit: 10,
    low_upper_limit: 15,
    ok_upper_limit: 40,
    high_upper_limit: 45,
    tooHigh_upper_limit: 50
  })

  return (
    <div className=" text-gray-600">
      <div className="outline-gray-300 px-4 py-5 outline rounded-lg  mb-2">
        <div>
          <GaugeComponent
            type="semicircle"
            arc={{
            width: 0.5,
            padding: 0.005,
            cornerRadius: 2,
            subArcs: [
                {
                  limit: tempRange.tooLow_upper_limit,
                  color: '#B9C5A7',
                  showTick: true,
                  tooltip: {
                      text: `Too low ${props.title}`
                  },
                },
                {
                  limit: tempRange.low_upper_limit,
                  color: '#FFA82F',
                  showTick: true,
                  tooltip: {
                      text: `Low ${props.title}`
                  }
                },
                {
                  limit: tempRange.ok_upper_limit,
                  color: '#0E9E0E',
                  showTick: true,
                  tooltip: {
                      text: `OK ${props.title}`
                  }
                },
                {
                  limit: tempRange.high_upper_limit, color: '#FFA82F', showTick: true,
                  tooltip: {
                      text: `High ${props.title}`
                  }
                },
                {
                  color: '#EA4228',
                  tooltip: {
                      text: `Too high ${props.title}`
                  }
                }
            ]
            }}
            pointer={{
                color: '#345243',
                length: 0.50,
                width: 15,
                elastic: true,
            }}
            labels={{
              valueLabel: { formatTextValue: value => value + '', style: {display:'none'}, hide: true },
              tickLabels: {
                hideMinMax: false,
                type: 'outer',
                defaultTickValueConfig: { 
                    formatTextValue: (value) => value + '' ,
                    style: {fontSize: 9},
                },
                ticks: [
                  // { value: 5 },
                  // { value: sensorData?.rtd },
                  // { value: 50 }
                ],
              }
            }}
            value={9}
            minValue={5}
            maxValue={50}
          />
        </div>
        <div className='text-center mt-2'>
            <div className='text-xl font-black'>{props.value} {props.units}</div>
            <div className='text-xs text-gray-500' style={{letterSpacing: '1px'}}>{props.title}</div>
        </div>
        <div className='flex justify-center text-sm mt-2'>
          <div className='flex justify-around flex-col mr-8'>
            <div className='flex items-center'>
              <div style={{height: '8px', width: '8px', background: '#0E9E0E'}} className='mr-1 rounded-full'></div>
              <span>Normal</span>
            </div>
            <div className='flex items-center'>
              <div style={{height: '8px', width: '8px', background: '#B9C5A7'}} className='mr-1 rounded-full'></div>
              <span>Low</span>
            </div>
          </div>
          <div className='flex justify-around flex-col '>
            <div className='flex items-center'>
              <div style={{height: '8px', width: '8px', background: '#FFA82F'}} className='mr-1 rounded-full'></div>
              <span>Warning</span>
            </div>
            <div className='flex items-center'>
              <div style={{height: '8px', width: '8px', background: '#DA4131'}} className='mr-1 rounded-full'></div>
              <span>Danger</span>
            </div>
          </div>
        </div>
      </div>
      <div className="outline-gray-300 px-4 py-2 outline rounded-lg mt-4">
          <div className='' style={{letterSpacing:'1px', fontSize: '11px'}}>Average {props.title}</div>
          <div className='text-lg font-bold '>{props.average} {props.units}</div>
      </div>
    </div>
  );
}
