'use client'

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function NavBar() {
  const router = useRouter()
  const pathname = usePathname()
  
  const [activeLink, setActiveLink] = useState('')

  useEffect(()=>{
    console.log(pathname)

    if(pathname.includes('raceways-1')){
      setActiveLink('raceways-1')
    }else if(pathname.includes('raceways-2')){
      setActiveLink('raceways-2')
    }else if(pathname.includes('control-pond-1')){
      setActiveLink('control-pond-1')
    }else if(pathname.includes('control-pond-2')){
      setActiveLink('control-pond-2')
    }
    
  },[])

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-60 bg-white text-gray-600 border-r border-gray-300 shadow-lg shadow-gray-500 flex flex-col py-4">
      <div className='flex mt-6'>
        <Image
          src="/globe.svg"
          alt="Logo"
          width={24}
          height={0}
          className='mr-2 ml-4'
        />
        <span className='text-lg uppercase text-gray-500 font-bold'>Nano Airs</span>
      </div>
      <div className='ml-4 mt-6 h-full relative'>
        <div onClick={()=>{router.push('/nanoairs/dashboard')}} className={`${pathname.includes('dashboard')?'text-cyan-400 bg-gray-200':''} py-2 hover:text-cyan-400 cursor-pointer hover:bg-gray-200 pl-2`}>Dashboard</div>
        <div onClick={()=>{router.push('/nanoairs/dashboard/raceways-1')}} className={`${activeLink==='raceways-1'?'text-black bg-gray-200 border-l-cyan-400 ':'text-gray-400 border-l-white'} ml-3 py-1 cursor-pointer hover:text-black hover:bg-gray-200 hover:border-l-cyan-400 pl-2 border-l-3`}>Raceways 1</div>
        <div onClick={()=>{router.push('/nanoairs/dashboard/raceways-2')}} className={`${activeLink==='raceways-2'?'text-black bg-gray-200 border-l-cyan-400 ':'text-gray-400 border-l-white'} ml-3 py-1 cursor-pointer hover:text-black hover:bg-gray-200 hover:border-l-cyan-400 pl-2 border-l-3`}>Raceways 2</div>
        <div onClick={()=>{router.push('/nanoairs/dashboard/control-pond-1')}} className={`${activeLink==='control-pond-1'?'text-black bg-gray-200 border-l-cyan-400 ':'text-gray-400 border-l-white'} ml-3 py-1 cursor-pointer hover:text-black hover:bg-gray-200 hover:border-l-cyan-400 pl-2 border-l-3`}>Control Pond 1</div>
        <div onClick={()=>{router.push('/nanoairs/dashboard/control-pond-2')}} className={`${activeLink==='control-pond-2'?'text-black bg-gray-200 border-l-cyan-400 ':'text-gray-400 border-l-white'} ml-3 py-1 cursor-pointer hover:text-black hover:bg-gray-200 hover:border-l-cyan-400 pl-2 border-l-3`}>Control Pond 2</div>
        
        <div onClick={()=>{router.push('/nanoairs/dashboard')}} className={`${pathname.includes('users')?'text-cyan-400 bg-gray-200':''} py-2 mt-4 hover:text-cyan-400 cursor-pointer hover:bg-gray-200 pl-2`}>Users</div>
        <div onClick={()=>{router.push('/nanoairs/dashboard')}} className={`${pathname.includes('settings')?'text-cyan-400 bg-gray-200':''} py-2 hover:text-cyan-400 cursor-pointer hover:bg-gray-200 pl-2`}>Settings</div>

        <div onClick={()=>{router.push('/nanoairs/dashboard')}} className={`${pathname.includes('settings')?'text-cyan-400 bg-gray-200':''} py-2 hover:text-cyan-400 cursor-pointer hover:bg-gray-200 pl-2`}>Logout</div>

        <div>
          <div className='flex mt-2'>
            <Image
              src="/globe.svg"
              alt="Logo"
              width={24}
              height={0}
              className='ml-1'
            />
            <div className='relative' style={{top: '2px', left: '8px'}}>
              <span className='uppercase text-gray-500 font-bold'>Roy M.</span>
              <p className='relative bottom-1 text-xs text-gray-400 hover:text-cyan-400 cursor-pointer'>Account Settings</p>
            </div>
          </div>
        </div>

        <div className='bg-cyan-400 ml-2 h-12 w-48 bottom-10 absolute rounded-sm flex items-center justify-center font-bold text-sm text-white hover:text-cyan-400 hover:bg-gray-200 cursor-pointer'>
          <p>Download Report</p>
          <Image
              src="/globe.svg"
              alt="Logo"
              width={15}
              height={0}
              className='ml-2'
            />
        </div>

      </div>
    </nav>
  );
}
