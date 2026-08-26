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
    <nav className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-100 shadow-gray-500 dark:shadow-gray-600 border-gray-300 dark:border-gray-700 fixed left-0 top-0 bottom-0 w-68 border-r  shadow-lg  flex flex-col py-4">
      <div className='flex mt-6 ml-4'>
        <Image
          src="/globe.svg"
          alt="Logo"
          width={24}
          height={0}
          className='mr-2'
        />
        <span className='text-lg uppercase text-gray-700 dark:text-gray-100 font-semibold'>Nano Airs</span>
      </div>
      <div className='mt-6 h-full relative'>
        <div className='ml-4'>
          <div 
            onClick={()=>{router.push('/nanoairs/dashboard')}} 
            className={`${pathname.includes('dashboard')?'text-cyan-400':''} py-2 hover:text-cyan-400 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-600 pl-2`}
            >Dashboard
          </div>
          <div 
            onClick={()=>{router.push('/nanoairs/dashboard/raceways-1')}} 
            className={`${activeLink==='raceways-1'?'text-black bg-gray-100 dark:text-gray-100 dark:bg-gray-600 border-l-cyan-400 ':'text-gray-400 border-l-white dark:border-l-gray-800'} py-1 cursor-pointer hover:text-black hover:bg-gray-100 hover:dark:text-gray-100 hover:dark:bg-gray-600 hover:border-l-cyan-400 pl-2 border-l-3`}
            >Raceways 1
            </div>
          <div 
            onClick={()=>{router.push('/nanoairs/dashboard/raceways-2')}} 
            className={`${activeLink==='raceways-2'?'text-black bg-gray-100 dark:text-gray-100 dark:bg-gray-600 border-l-cyan-400 ':'text-gray-400 border-l-white dark:border-l-gray-800'} py-1 cursor-pointer hover:text-black hover:bg-gray-100 hover:dark:text-gray-100 hover:dark:bg-gray-600 hover:border-l-cyan-400 pl-2 border-l-3`}
            >Raceways 2
          </div>
          <div 
            onClick={()=>{router.push('/nanoairs/dashboard/control-pond-1')}} 
            className={`${activeLink==='control-pond-1'?'text-black bg-gray-100 dark:text-gray-100 dark:bg-gray-600 border-l-cyan-400 ':'text-gray-400 border-l-white dark:border-l-gray-800'} py-1 cursor-pointer hover:text-black hover:bg-gray-100 hover:dark:text-gray-100 hover:dark:bg-gray-600 hover:border-l-cyan-400 pl-2 border-l-3`}
            >Control Pond 1
          </div>
          <div 
            onClick={()=>{router.push('/nanoairs/dashboard/control-pond-2')}} 
            className={`${activeLink==='control-pond-2'?'text-black bg-gray-100 dark:text-gray-100 dark:bg-gray-600 border-l-cyan-400 ':'text-gray-400 border-l-white dark:border-l-gray-800'} py-1 cursor-pointer hover:text-black hover:bg-gray-100 hover:dark:text-gray-100 hover:dark:bg-gray-600 hover:border-l-cyan-400 pl-2 border-l-3`}
          >Control Pond 2
          </div>
          
          <div 
            onClick={()=>{router.push('/nanoairs/dashboard')}} 
            className={`${pathname.includes('users')?'text-cyan-400 bg-gray-100':''} py-2 mt-4 hover:text-cyan-400 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-600 pl-2`}
            >Users
          </div>
          <div 
            onClick={()=>{router.push('/nanoairs/dashboard')}} 
            className={`${pathname.includes('settings')?'text-cyan-400 bg-gray-100':''} py-2 hover:text-cyan-400 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-600 pl-2`}
            >Settings
          </div>

          <div 
            onClick={()=>{router.push('/nanoairs/dashboard')}} 
            className={`${pathname.includes('settings')?'text-cyan-400 bg-gray-100':''} py-2 hover:text-cyan-400 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-600 pl-2`}
            >Logout
          </div>
        </div>

        <div className='ml-4'>
          <div className='flex mt-2'>
            <Image
              src="/globe.svg"
              alt="Logo"
              width={24}
              height={0}
              className='ml-1'
            />
            <div className='relative' style={{top: '2px', left: '8px'}}>
              <span className='uppercase text-gray-600 dark:text-gray-100 font-bold'>Roy M.</span>
              <p className='relative bottom-1 text-xs text-gray-500 dark:text-gray-300 hover:text-cyan-400 cursor-pointer'>Account Settings</p>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='bg-cyan-600 h-12 w-48 mt-12 rounded-sm flex items-center justify-center font-semibold text-sm text-white hover:text-cyan-400 hover:bg-gray-200 hover:dark:bg-gray-600 cursor-pointer'>
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

      </div>
    </nav>
  );
}
