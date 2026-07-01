'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const imageRef = useRef(null)
  const [imageWidth, setImageWidth] = useState(1600)
  const [imageHeight, setImageHeight] = useState(1600*9/16)
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

    console.log(width)
    console.log(height)
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

  
  return (
    <div className="">
      <main className="flex h-screen items-center justify-center ">
         <div className='relative'>
            <Image
              ref={imageRef}
              src="/images/hatch-1.png"
              alt="Logo"
              width={1600}
              height={0}
              loading='eager'
            />
            <Image
              ref={imageRef}
              src="/images/IMG_0291.PNG"
              alt="Logo"
              width={1600}
              height={0}
              loading='eager'
              className={`${displayContainer11?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              ref={imageRef}
              src="/images/IMG_0292.PNG"
              alt="Logo"
              width={1600}
              height={0}
              loading='eager'
              className={`${displayContainer3?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              ref={imageRef}
              src="/images/IMG_0293.PNG"
              alt="Logo"
              width={1600}
              height={0}
              loading='eager'
              className={`${displayContainer2?'':'hidden'} absolute z-index-30 top-0`}
            />
            <Image
              ref={imageRef}
              src="/images/IMG_0294.PNG"
              alt="Logo"
              width={1600}
              height={0}
              loading='eager'
              className={`${displayContainer1?'':'hidden'} absolute z-index-30 top-0`}
            />
            <div className='w-full z-index-20 absolute top-0' style={{height: `${imageHeight}px`}}>

            {/* container 1` */}
              <div className='opacity-0 z-index-20 hover:cursor-pointer  hover:opacity-100 rounded-full absolute top-[68.5%] left-[33.5%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer1(true)}} onMouseLeave={e=>{setDisplayContainer1(false)}}>
              </div>

              <div className={`${displayContainer1?'inline':'hidden'} text-white hidden  absolute top-[50%] left-[28.9%]`}>
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
              <div className='opacity-0 z-index-20 hover:cursor-pointer  hover:opacity-100 rounded-full absolute top-[72.5%] left-[36.5%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer2(true)}} onMouseLeave={e=>{setDisplayContainer2(false)}}></div>

              <div className={`${displayContainer2?'inline':'hidden'} text-white hidden  absolute top-[54%] left-[32.4%]`}>
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
              <div className='opacity-0 z-index-20 hover:cursor-pointer hover:opacity-100 rounded-full absolute top-[69.8%] left-[40.9%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer3(true)}} onMouseLeave={e=>{setDisplayContainer3(false)}}></div>

              <div className={`${displayContainer3?'inline':'hidden'} text-white hidden  absolute top-[51%] left-[35.9%]`}>
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
              <div className='opacity-0 bg-amber-300 z-index-20 hover:cursor-pointer hover:bg-red-500 hover:opacity-100 rounded-full absolute top-[67%] left-[45.2%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}}></div>

            {/* container 5 */}
              <div className='opacity-0 bg-amber-300 z-index-20 hover:cursor-pointer hover:bg-red-500 hover:opacity-100 rounded-full absolute top-[64%] left-[49.7%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}}></div>

            {/* container 6 */}
              <div className='opacity-0 bg-amber-300 z-index-20 hover:cursor-pointer hover:bg-red-500 hover:opacity-100 rounded-full absolute top-[61%] left-[54.1%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}}></div>

            {/* container 7 */}
              <div className='opacity-0 bg-amber-300 z-index-20 hover:cursor-pointer hover:bg-red-500 hover:opacity-100 rounded-full absolute top-[58.2%] left-[58.3%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*0.061}px`}} ></div>

            {/* container 8 */}
              <div className='opacity-0 bg-amber-300 z-index-20 hover:cursor-pointer hover:bg-red-500 hover:opacity-100 rounded-full absolute top-[55.4%] left-[62.8%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} ></div>

            {/* container 9 */}
              <div className='opacity-0 bg-amber-300 z-index-20 hover:cursor-pointer hover:bg-red-500 hover:opacity-100 rounded-full absolute top-[52.4%] left-[67.2%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} ></div>

            {/* container 10 */}
              <div className='opacity-0 bg-amber-300 z-index-20 hover:cursor-pointer hover:bg-red-500 hover:opacity-100 rounded-full absolute top-[49.6%] left-[71.5%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} ></div>

            {/* container 11 */}
              <div className='opacity-0 b z-index-20 hover:cursor-pointer  hover:opacity-100 rounded-full absolute top-[46.6%] left-[76.1%]' style={{width: `${imageWidth*0.046}px`, height:`${imageWidth*heightMultiplier}px`}} onMouseEnter={e=>{setDisplayContainer11(true)}} onMouseLeave={e=>{setDisplayContainer11(false)}}></div>
              
              <div className={`${displayContainer11?'inline':'hidden'} text-white hidden  absolute top-[28%] left-[71.8%]`}>
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

          </div>
         </div>
      </main>
    </div>
  )
}
