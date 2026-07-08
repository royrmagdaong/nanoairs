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
                      text: 'Too low Temperature!'
                  },
                },
                {
                  limit: tempRange.low_upper_limit,
                  color: '#FFA82F',
                  showTick: true,
                  tooltip: {
                      text: 'Low Temperature!'
                  }
                },
                {
                  limit: tempRange.ok_upper_limit,
                  color: '#0E9E0E',
                  showTick: true,
                  tooltip: {
                      text: 'OK Temperature!'
                  }
                },
                {
                  limit: tempRange.high_upper_limit, color: '#FFA82F', showTick: true,
                  tooltip: {
                      text: 'High Temperature!'
                  }
                },
                {
                  color: '#EA4228',
                  tooltip: {
                      text: 'Too high Temperature!'
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
            valueLabel: { formatTextValue: value => value + 'ºC', style: {display:'none'} },
            tickLabels: {
                type: 'outer',
                defaultTickValueConfig: { 
                formatTextValue: (value) => value + 'ºC' ,
                style: {fontSize: 12}
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
            <div className='text-sm'>{props.title}</div>
        </div>
        <div className='grid grid-cols-2 text-sm mt-2'>
            <div className='flex items-center'>
              <div style={{height: '8px', width: '8px', background: '#0E9E0E'}} className='mr-1 rounded-full'></div>
              <span>Normal</span>
            </div>
            <div className='flex items-center'>
              <div style={{height: '8px', width: '8px', background: '#FFA82F'}} className='mr-1 rounded-full'></div>
              <span>Warning</span>
            </div>
            <div className='flex items-center'>
              <div style={{height: '8px', width: '8px', background: '#B9C5A7'}} className='mr-1 rounded-full'></div>
              <span>Low</span>
            </div>
            <div className='flex items-center'>
              <div style={{height: '8px', width: '8px', background: '#DA4131'}} className='mr-1 rounded-full'></div>
              <span>Danger</span>
            </div>
        </div>
      </div>
      <div className="outline-gray-300 px-4 py-3 outline rounded-lg ">
          <div className='text-xs mb-1' style={{letterSpacing:'1px'}}>Average {props.title}</div>
          <div className='text-2xl font-bold '>{props.average} {props.units}</div>
      </div>
    </div>
  );
}
