'use client'

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import moment from 'moment'

export default function NavBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const [currentRaceway, setCurrentRaceway] = useState('');
  const [sensorTime, setSensorTime] = useState<String|null>('')
  
  const [activeLink, setActiveLink] = useState('')

  useEffect(()=>{
    console.log(pathname)

    if(pathname.includes('raceways-1')){
      setActiveLink('raceways-1')
      setCurrentRaceway('Pond 1')
    }else if(pathname.includes('raceways-2')){
      setActiveLink('raceways-2')
      setCurrentRaceway('Pond 2')
    }else if(pathname.includes('control-pond-1')){
      setActiveLink('control-pond-1')
      setCurrentRaceway('Control Pond 1')
    }else if(pathname.includes('control-pond-2')){
      setActiveLink('control-pond-2')
      setCurrentRaceway('Control Pond 2')
    }
    
  },[])

  useEffect(()=>{
    
    async function loadSensorTimer(){
      console.log(localStorage.getItem('latestSensorReadingTime'))
      setSensorTime(moment(localStorage.getItem('latestSensorReadingTime')).format('h:mm:ss a'))
    }

    loadSensorTimer()
    const intervalId = setInterval(loadSensorTimer, 5_000);

    return () => clearInterval(intervalId)
  },[])

  return (
    <>
      <nav className='bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-100 shadow-gray-500 dark:shadow-gray-600 border-gray-300 dark:border-gray-700 fixed top-0 left-0 right-0 h-15 shadow-sm
      lg:hidden flex justify-between items-center  pl-4 z-50'>
        <div className='flex items-center'>
          <MenuIcon onClick={() => setIsOpen(true)} sx={{ fontSize: 38 }} />
          <h2 className='text-xl ml-2 font-medium'>NanoAirs </h2>
          <span className='mx-2'>&gt; </span>
          <span style={{fontSize: 16}}>{currentRaceway}</span>
        </div>
        <p className='mr-2'>{sensorTime}</p>
      </nav>

      {/* Backdrop */}
      <div
        
        className={`lg:hidden fixed inset-0 z-40 bg-black/40
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* Sidebar */}
      <aside
        aria-label="Sidebar"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white p-6 shadow-xl
          transition-[transform,opacity] duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
      >
        <CloseIcon onClick={() => setIsOpen(false)} sx={{ fontSize: 36, color:'#676767aa' }} className='absolute right-2 top-2'/>

        <nav className="flex flex-col gap-4">
          <div className='flex mt-6'>
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
            <div className=''>
              <div 
                onClick={()=>{router.push('/nanoairs/dashboard')}} 
                className={`${pathname.includes('dashboard')?'text-cyan-400':''} py-2 hover:text-cyan-400 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-600 pl-2`}
                >Dashboard
              </div>
              <div 
                onClick={()=>{router.push('/nanoairs/dashboard/raceways-1')}} 
                className={`${activeLink==='raceways-1'?'text-black bg-gray-100 dark:text-gray-100 dark:bg-gray-600 border-l-cyan-400 ':'text-gray-400 border-l-white dark:border-l-gray-800'} py-1 cursor-pointer hover:text-black hover:bg-gray-100 hover:dark:text-gray-100 hover:dark:bg-gray-600 hover:border-l-cyan-400 pl-2 border-l-3`}
                >Pond 1
                </div>
              <div 
                onClick={()=>{router.push('/nanoairs/dashboard/raceways-2')}} 
                className={`${activeLink==='raceways-2'?'text-black bg-gray-100 dark:text-gray-100 dark:bg-gray-600 border-l-cyan-400 ':'text-gray-400 border-l-white dark:border-l-gray-800'} py-1 cursor-pointer hover:text-black hover:bg-gray-100 hover:dark:text-gray-100 hover:dark:bg-gray-600 hover:border-l-cyan-400 pl-2 border-l-3`}
                >Pond 2
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

            <div className=''>
              <div className='flex mt-2'>
                <Image
                  src="/globe.svg"
                  alt="Logo"
                  width={24}
                  height={0}
                  className=''
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
      </aside>

      <nav className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-100 shadow-gray-500 dark:shadow-gray-600 border-gray-300 dark:border-gray-700 fixed left-0 top-0 bottom-0 w-68 border-r  shadow-lg flex-col py-4 hidden lg:flex">
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
              >Pond 1
              </div>
            <div 
              onClick={()=>{router.push('/nanoairs/dashboard/raceways-2')}} 
              className={`${activeLink==='raceways-2'?'text-black bg-gray-100 dark:text-gray-100 dark:bg-gray-600 border-l-cyan-400 ':'text-gray-400 border-l-white dark:border-l-gray-800'} py-1 cursor-pointer hover:text-black hover:bg-gray-100 hover:dark:text-gray-100 hover:dark:bg-gray-600 hover:border-l-cyan-400 pl-2 border-l-3`}
              >Pond 2
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
    </>
  );
}
