
'use client'
export default function StatusDataBox() {


  return (
    <nav className="fixed right-3 top-3 w-[15%] text-white flex flex-col rounded-sm z-50 italic" >
      <div className="p-3 text-xs" style={{background: '#00000035', letterSpacing: '1.5px', lineHeight: '1.5'}}>
        <div className="text-sm uppercase">Weather</div>
        <div>BAC UPV Leganes Iloilo</div>
        <div>Temperature: 31.8°C</div>
        <div>Humidity: 71.2%</div>
        <div>Sunny</div>
      </div>
      
      <div className="pb-2 px-2" style={{background: '#00000035', letterSpacing: '1.5px', lineHeight: '1.5'}}><hr/></div>

      <div className="px-3 pb-3 text-xs" style={{background: '#00000035', letterSpacing: '1.5px', lineHeight: '1.5'}}>
        <div className="text-sm uppercase">tank 1</div>
        <div>Dissolved Oxygen: 5.2 mg/L</div>
        <div>Temperature: 31.8°C</div>
        <div>pH: 8.21</div>
        <div>Salinity: 31.5 ppt</div>
      </div>
    </nav>
  );
}
