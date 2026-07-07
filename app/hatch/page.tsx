'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import HeaderDateContainer from '../components/header-date-container'
import Sidebar from '../components/sidebar'
import StatusDataBox from '../components/status-data-box'

export default function Home() {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageWidth, setImageWidth] = useState(1600)
  const [imageHeight, setImageHeight] = useState(1600*9/16)
  const [imagePrototypeWidth, setImagePrototypeWidth] = useState(1300)
  const mouseCursorTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [tooltipLeftPos, setTooltipLeftPos] = useState(0)
  const [tooltipTopPos, setTooltipTopPos] = useState(0)

  const [displayContainer1, setDisplayContainer1] = useState(false)
  const [displayContainer2, setDisplayContainer2] = useState(false)
  const [displayContainer3, setDisplayContainer3] = useState(false)
  const [displayContainer4, setDisplayContainer4] = useState(false)
  const [displayContainer5, setDisplayContainer5] = useState(false)
  const [displayContainer6, setDisplayContainer6] = useState(false)
  const [displayContainer7, setDisplayContainer7] = useState(false)
  const [displayContainer8, setDisplayContainer8] = useState(false)
  const [displayContainer9, setDisplayContainer9] = useState(false)
  const [displayContainer10, setDisplayContainer10] = useState(false)
  const [displayContainer11, setDisplayContainer11] = useState(false)
  const [displayT1, setDisplayT1] = useState(false)
  const [displayTank1, setDisplayTank1] = useState(false)
  const [displaySensorNode, setDisplaySensorNode] = useState(false)
  const [displaySensors, setDisplaySensors] = useState(false)
  const [displayHeater, setDisplayHeater] = useState(false)
  const [displayControlPanel, setDisplayControlPanel] = useState(false)


  const heightMultiplier = 0.058

useEffect(() => {
  const update = () => {
    if (!imageRef.current) return

    const width =
      imageRef.current.clientWidth

    const height =
      imageRef.current.clientHeight

    setImageWidth(width)
    setImageHeight(height)
  }

  update()

  window.addEventListener(
    'resize',
    update
  )

  return () => {
    window.removeEventListener(
      'resize',
      update
    )
  }
}, [])


// zoom in - zoom out functionality ----------------------------------------------------------------
let timeout: ReturnType<typeof setTimeout>
let timeout2: ReturnType<typeof setTimeout>

const handleScroll = (e:any) => {
  clearTimeout(timeout)
  clearTimeout(timeout2)
  timeout = setTimeout(() => {
    // console.log(e.deltaY)
    if (e.deltaY > 0) {
      if(imagePrototypeWidth > 600) {
        setImagePrototypeWidth(prev => prev -  (10*5))
      } else {
        console.log('max scroll down reached')
      }
    }else{
      if(imagePrototypeWidth < 1800) {
        setImagePrototypeWidth(prev => prev +  (10*5))
      } else {
        console.log('max scroll up reached')
      }
    }
    // console.log('image width', imagePrototypeWidth)

    // update size of all images
    timeout2 = setTimeout(()=>{
      const update = () => {
        if (!imageRef.current) return
          const width = imageRef.current.clientWidth
          const height = imageRef.current.clientHeight
          setImageWidth(width)
          setImageHeight(height)
      }
      update()

      // console.log('update images width')
    },800)
  }, 5)
}

useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  return () => {
    clearTimeout(timeout)
    window.removeEventListener('scroll', handleScroll)
  }
}, [])
// end of zoom in zoom out ----------------------------------------------------------------

// start of get mouse cursor position --------------------------------------------------------------
 useEffect(() => {
    const handleMouseCursor = (e: MouseEvent) => {
      if (mouseCursorTimeout.current) {
        clearTimeout(mouseCursorTimeout.current)
      }

      mouseCursorTimeout.current = setTimeout(() => {
        // console.log('mouse x position:', e.clientX)
        // console.log('mouse y position:', e.clientY)
        setTooltipLeftPos(e.clientX + 20)
        setTooltipTopPos(e.clientY + 50)
      }, 20)
    }

    window.addEventListener('mousemove', handleMouseCursor)

    return () => {
      window.removeEventListener('mousemove', handleMouseCursor)

      if (mouseCursorTimeout.current) {
        clearTimeout(mouseCursorTimeout.current)
      }
    }
  }, [])


// end of get mouse cursor position ----------------------------------------------------------------

  
  return (
    <div className="bg-gray-700 overflow-hidden" onWheel={handleScroll}>

      <HeaderDateContainer />
      <Sidebar />
      <StatusDataBox />

      <main className="flex h-screen items-center justify-center " >
         <div className='relative'>
            {/* images */}
            <div>
              <Image
              ref={imageRef}
              src="/images/green/prototype.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
            />
            <Image
              src="/images/green/C11.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayContainer11?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              src="/images/green/C10.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayContainer10?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              src="/images/green/C9.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayContainer9?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              src="/images/green/C8.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayContainer8?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              src="/images/green/C7.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayContainer7?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              src="/images/green/C6.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayContainer6?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              src="/images/green/C5.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayContainer5?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              src="/images/green/C4.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayContainer4?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              src="/images/green/C3.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayContainer3?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              src="/images/green/C2.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayContainer2?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              src="/images/green/C1.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayContainer1?'':'hidden'} absolute z-index-30 top-0`}
            />
          
            {/* T-1 */}
            <Image
              src="/images/green/T1.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayT1?'':'hidden'} absolute z-index-30 top-0`}
            />
            {/* Tank 1 */}
            <Image
              src="/images/green/Tank1.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayTank1?'':'hidden'} absolute z-index-30 top-0`}
            />
            {/* Sensors */}
            <Image
              src="/images/green/sensors.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displaySensors?'':'hidden'} absolute z-index-30 top-0`}
            />
            {/* Sensor node */}
            <Image
              src="/images/green/sensor-node.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displaySensorNode?'':'hidden'} absolute z-index-30 top-0`}
            />
            {/* Control panel */}
            <Image
              src="/images/green/control-panel.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayControlPanel?'':'hidden'} absolute z-index-30 top-0`}
            />
            {/* Heater */}
            <Image
              src="/images/green/heater.PNG"
              alt="Logo"
              width={imagePrototypeWidth}
              height={0}
              loading='eager'
              className={`${displayHeater?'':'hidden'} absolute z-index-30 top-0`}
            />
            </div>
            <div className='w-full z-index-20 absolute top-0' style={{height: `${imageHeight}px`}}>

            {/* container 1` */}
              <div className='opacity-0 z-index-20 hover:cursor-pointer  hover:opacity-100 rounded-full absolute top-[68.7%] left-[33.8%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer1(true)}} onMouseLeave={e=>{setDisplayContainer1(false)}}>
              </div>
              
              <div className={`${displayContainer1?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Container 1</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.65 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 8.12</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.1 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.1 °C</p>
                </div>
              </div> 

            {/* container 2 */}
              <div className='opacity-0 z-index-20 hover:cursor-pointer  hover:opacity-100 rounded-full absolute top-[72.5%] left-[36.9%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer2(true)}} onMouseLeave={e=>{setDisplayContainer2(false)}}></div>

              <div className={`${displayContainer2?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Container 2</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>


            {/* container 3 */}
              <div className='opacity-0 z-index-20 hover:cursor-pointer hover:opacity-100 rounded-full absolute top-[70%] left-[41.3%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer3(true)}} onMouseLeave={e=>{setDisplayContainer3(false)}}></div>

              <div className={`${displayContainer3?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Container 3</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

            {/* container 4 */}
              <div className='opacity-0 z-index-20 hover:cursor-pointer hover:opacity-100 rounded-full absolute top-[67.6%] left-[45.7%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer4(true)}} onMouseLeave={e=>{setDisplayContainer4(false)}}></div>

              <div className={`${displayContainer4?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Container 4</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

            {/* container 5 */}
              <div className='opacity-0 z-index-20 hover:cursor-pointer hover:opacity-100 rounded-full absolute top-[65.1%] left-[50.3%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer5(true)}} onMouseLeave={e=>{setDisplayContainer5(false)}}></div>

              <div className={`${displayContainer5?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Container 5</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

            {/* container 6 */}
              <div className='opacity-0 z-index-20 hover:cursor-pointer hover:opacity-100 rounded-full absolute top-[62.5%] left-[54.8%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer6(true)}} onMouseLeave={e=>{setDisplayContainer6(false)}}></div>

              <div className={`${displayContainer6?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Container 6</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

            {/* container 7 */}
              <div className='opacity-0 z-index-20 hover:cursor-pointer hover:opacity-100 rounded-full absolute top-[59.9%] left-[59.1%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*0.061}px`}} onMouseEnter={e=>{setDisplayContainer7(true)}} onMouseLeave={e=>{setDisplayContainer7(false)}}></div>

              <div className={`${displayContainer7?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Container 7</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

            {/* container 8 */}
              <div className='opacity-0 z-index-20 hover:cursor-pointer hover:opacity-100 rounded-full absolute top-[57.8%] left-[63.6%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer8(true)}} onMouseLeave={e=>{setDisplayContainer8(false)}}></div>

              <div className={`${displayContainer8?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Container 8</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

            {/* container 9 */}
              <div className='opacity-0 z-index-20 hover:cursor-pointer hover:opacity-100 rounded-full absolute top-[55.5%] left-[68%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer9(true)}} onMouseLeave={e=>{setDisplayContainer9(false)}}></div>

              <div className={`${displayContainer9?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Container 9</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

            {/* container 10 */}
              <div className='opacity-0 z-index-20 hover:cursor-pointer hover:opacity-100 rounded-full absolute top-[52.9%] left-[72.5%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer10(true)}} onMouseLeave={e=>{setDisplayContainer10(false)}}></div>

              <div className={`${displayContainer10?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Container 10</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

            {/* container 11 */}
              <div className='opacity-0 b z-index-20 hover:cursor-pointer  hover:opacity-100 rounded-full absolute top-[50.4%] left-[77.2%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer11(true)}} onMouseLeave={e=>{setDisplayContainer11(false)}}></div>
              
              <div className={`${displayContainer11?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Container 11</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

              {/* Tank 1 */}
              <div className='opacity-0 bg-red-900 b z-index-1 hover:cursor-pointer absolute top-[16%] left-[17.4%]' style={{borderRadius:'38%', width: `${imageWidth*0.347}px`, height:`${imageWidth*0.295}px`}} onMouseEnter={e=>{setDisplayTank1(true)}} onMouseLeave={e=>{setDisplayTank1(false)}}>
              </div>

              <div className={`${displayTank1?'inline':'hidden'} text-white hidden  fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Tank 1</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

              {/* T-1 */}
              <div className='opacity-0 bg-red-900 b z-index-20 hover:cursor-pointer  rounded-full absolute top-[47%] left-[39.9%]' style={{width: `${imageWidth*0.055}px`, height:`${imageWidth*0.074}px`}} onMouseEnter={e=>{setDisplayT1(true)}} onMouseLeave={e=>{setDisplayT1(false)}}>
              </div>

              <div className={`${displayT1?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Component 1</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

              {/* sensor node */}
              <div className='opacity-0 bg-red-900 b z-index-20 hover:cursor-pointer  absolute top-[19%] left-[42%]' style={{borderRadius:'30%', transform:'rotate(154deg)', width: `${imageWidth*0.035}px`, height:`${imageWidth*0.03}px`}} onMouseEnter={e=>{setDisplaySensorNode(true)}} onMouseLeave={e=>{setDisplaySensorNode(false)}}>
              </div>

              <div className={`${displaySensorNode?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Sensor Node</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

              {/* sensors */}
              <div className='opacity-0 bg-red-900 b z-index-20 hover:cursor-pointer  absolute top-[31.8%] left-[40.8%]' style={{borderRadius:'30%', width: `${imageWidth*0.024}px`, height:`${imageWidth*0.029}px`}} onMouseEnter={e=>{setDisplaySensors(true)}} onMouseLeave={e=>{setDisplaySensors(false)}}>
              </div>

              <div className={`${displaySensors?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Sensors</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

              {/* Heater */}
              <div className='opacity-0 bg-red-900 b z-index-20 hover:cursor-pointer  absolute top-[47.8%] left-[58%]' style={{borderRadius:'40%', transform:'rotate(160deg)', width: `${imageWidth*0.085}px`, height:`${imageWidth*0.079}px`}} onMouseEnter={e=>{setDisplayHeater(true)}} onMouseLeave={e=>{setDisplayHeater(false)}}>
              </div>

              <div className={`${displayHeater?'inline':'hidden'} text-white hidden fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Heater</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

              {/* Control panel */}
              <div className='opacity-0 bg-red-900 b z-index-20 hover:cursor-pointer  absolute top-[47.2%] left-[65.5%] rounded-bl-3xl rounded-tr-3xl' style={{ transform:'rotate(30deg)', width: `${imageWidth*0.07}px`, height:`${imageWidth*0.042}px`}} onMouseEnter={e=>{setDisplayControlPanel(true)}} onMouseLeave={e=>{setDisplayControlPanel(false)}}>
              </div>

              <div className={`${displayControlPanel?'inline':'hidden'} text-white hidden  fixed`} style={{top:`${tooltipTopPos}px`, left:`${tooltipLeftPos}px`}}>
                <div className='w-full px-4 py-2 absolute uppercase italic bottom-[104%] bg-amber-600 border-dashed border-gray-200 border' style={{fontSize: '13px', letterSpacing: '1px'}}>Control Panel</div>
                <div className='py-3 px-4 relative border border-gray-400' style={{backgroundColor: '#545454be', fontSize: '14px', }}>
                  <p className='pt-1'>Dissolved Oxygen: 5.59 mg/L</p>
                  <hr className='my-1'/>
                  <p className=''>pH: 7.89</p>
                  <hr className='my-1'/>
                  <p className=''>Salinity: 22.4 ppt</p>
                  <hr className='my-1'/>
                  <p className=''>Temperature: 30.5 °C</p>
                </div>
              </div>

          </div>
         </div>
      </main>
    </div>
  )
}
