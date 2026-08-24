'use client'

import GaugeComponent from 'react-gauge-component';

interface SensorCardProps {
  title: string;
  value: string;
  average: string;
  units: string;
}

export default function SensorCard({
  title = "No Data",
  value = "--",
  average = "--",
  units = "",
}: SensorCardProps) {

  type Range = {
    minValue: number;
    maxValue: number;
  };

  type ParamRange = {
    tooLow_upper_limit: number,
    low_upper_limit: number,
    ok_upper_limit: number,
    high_upper_limit: number,
    tooHigh_upper_limit: number
  };

  const ranges: Record<string, Range> = {
    pH: {
      minValue: 1,
      maxValue: 12,
    },
    Temperature: {
      minValue: 10,
      maxValue: 50,
    },
    Salinity: {
      minValue: 0,
      maxValue: 35,
    },
    "Dissolved Oxygen": {
      minValue: 0,
      maxValue: 20,
    },
    Alkalinity: {
      minValue: 0,
      maxValue: 30,
    },
    "Dissolved CO2": {
      minValue: 0,
      maxValue: 30,
    },
  };

  const paramRanges: Record<string, ParamRange> = {
    pH: {
      tooLow_upper_limit: 2,
      low_upper_limit: 4,
      ok_upper_limit: 9,
      high_upper_limit: 11,
      tooHigh_upper_limit: 12
    },
    Temperature: {
      tooLow_upper_limit: 17,
      low_upper_limit: 22,
      ok_upper_limit: 38,
      high_upper_limit: 42,
      tooHigh_upper_limit: 50
    },
    Salinity: {
      tooLow_upper_limit: 4,
      low_upper_limit: 8,
      ok_upper_limit: 28,
      high_upper_limit: 31,
      tooHigh_upper_limit: 35
    },
    "Dissolved Oxygen": {
      tooLow_upper_limit: 2,
      low_upper_limit: 4,
      ok_upper_limit: 16,
      high_upper_limit: 18,
      tooHigh_upper_limit: 20
    },
    Alkalinity: {
      tooLow_upper_limit: 4,
      low_upper_limit:8,
      ok_upper_limit: 22,
      high_upper_limit: 26,
      tooHigh_upper_limit: 30
    },
    "Dissolved CO2": {
      tooLow_upper_limit: 4,
      low_upper_limit:8,
      ok_upper_limit: 22,
      high_upper_limit: 26,
      tooHigh_upper_limit: 30
    },
  };

  const range = ranges[title] ?? {
    minValue: 0,
    maxValue: 50,
  };

  const paramRange = paramRanges[title] ?? {
    tooLow_upper_limit: 10,
    low_upper_limit: 15,
    ok_upper_limit: 40,
    high_upper_limit: 45,
    tooHigh_upper_limit: 50
  };

  return (
    <div className=" text-gray-600">
      <div className=" px-8 py-4 outline-gray-300 outline rounded-lg  mb-2">
        <div>
          <GaugeComponent
            type="semicircle"
            marginInPercent={0.7}
            arc={{
            width: 0.52,
            padding: 0.012,
            cornerRadius: 2.2,
            subArcs: [
                {
                  limit: paramRange.tooLow_upper_limit,
                  color: '#B9C5A7',
                  // showTick: true,
                  tooltip: {
                      text: `Too low ${title}`
                  },
                },
                {
                  limit: paramRange.low_upper_limit,
                  color: '#FFA82F',
                  // showTick: true,
                  tooltip: {
                      text: `Low ${title}`
                  }
                },
                {
                  limit: paramRange.ok_upper_limit,
                  color: '#0E9E0E',
                  // showTick: true,
                  tooltip: {
                      text: `OK ${title}`
                  }
                },
                {
                  limit: paramRange.high_upper_limit, 
                  color: '#FFA82F', 
                  // showTick: true,
                  tooltip: {
                      text: `High ${title}`
                  }
                },
                {
                  color: '#EA4228',
                  tooltip: {
                      text: `Too high ${title}`
                  }
                }
            ]
            }}
            pointer={{
                color: '#345243',
                baseColor: '#345243',
                length: 0.50,
                width: 15,
                elastic: true,
            }}
            labels={{
              valueLabel: { formatTextValue: value => value + '', style: {display:'none'}, hide: true },
              tickLabels: {
                hideMinMax: true,
                type: 'inner',
                defaultTickValueConfig: { 
                    formatTextValue: (value) => value + '' ,
                    style: {fontSize: 12},
                    hide: true
                },
              }
            }}
            value={Number(value)}
            minValue={range.minValue}
            maxValue={range.maxValue}
          />
        </div>
        <div className='text-center mb-1'>
            <div className='text-2xl font-bold'>{value} {units}</div>
            <div className='text-xs text-gray-500 relative' style={{letterSpacing: '1px', top: '-3px'}}>{title}</div>
        </div>
        <div className='flex justify-center text-sm mt-1 pb-2'>
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
      <div className="outline-gray-300 px-4 py-2 outline rounded-lg mt-3">
          <div className='' style={{letterSpacing:'1px', fontSize: '11px'}}>Average {title}</div>
          <div className='text-lg font-bold '>{average} {units}</div>
      </div>
    </div>
  );
}
