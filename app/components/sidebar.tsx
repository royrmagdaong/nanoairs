
'use client'
export default function Sidebar() {


  return (
    <nav className="fixed left-2 top-3 bottom-4 w-[15%] flex flex-col py-8 pl-6 rounded-sm z-50 text-gray-500 text-sm" style={{background: '#00000045', lineHeight: '2.5', letterSpacing: '1.5px'}}>
        <div className="cursor-pointer hover:text-white">Dashboard</div>
        <div className="text-white cursor-pointer">Prototypes</div>
        <div className=" cursor-pointer hover:text-white ml-4">All</div>
        <div className="text-white cursor-pointer ml-4">Tank 1</div>
        <div className="cursor-pointer hover:text-white ml-4">Tank 2</div>
        <div className="cursor-pointer hover:text-white">Reports</div>
        <div className="cursor-pointer hover:text-white">Logout</div>
    </nav>
  );
}
