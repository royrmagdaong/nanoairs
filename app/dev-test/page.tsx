'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageWidth, setImageWidth] = useState(1600)
  const [imageHeight, setImageHeight] = useState(1600*9/16)

  const [scrollCounter, setScrollCounter] = useState(0)
  const [imagePrototypeWidth, setImagePrototypeWidth] = useState(1300)

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


  // const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
  //   if (e.deltaY > 0) {
  //     console.log(e.deltaY)
  //     if(scrollCounter <= 20) {
  //       setScrollCounter(prev => prev - 1)
  //       setImagePrototypeWidth(prev => prev + (scrollCounter *5))
  //     } else {
  //       console.log('max scroll up reached')
  //     }
  //   } else {
  //     console.log(e.deltaY)
  //     if(scrollCounter >= -20) {
  //       setScrollCounter(prev => prev + 1)
  //       setImagePrototypeWidth(prev => prev + (scrollCounter *5))
  //     } else {
  //       console.log('max scroll down reached')
  //     }
  //   }
  //   console.log('scroll count', scrollCounter)
  // }

  let timeout: ReturnType<typeof setTimeout>

  const handleScroll = (e:any) => {
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        // console.log(e.deltaY)
        if (e.deltaY > 0) {
          console.log(e.deltaY)
          if(imagePrototypeWidth > 600) {
            setImagePrototypeWidth(prev => prev -  (10*5))
          } else {
            console.log('max scroll down reached')
          }
        }else{
          console.log(e.deltaY)
          if(imagePrototypeWidth < 1800) {
            setImagePrototypeWidth(prev => prev +  (10*5))
          } else {
            console.log('max scroll up reached')
          }
        }
        
        console.log('image width', imagePrototypeWidth)
      }, 30)
    }

  useEffect(() => {

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  
  return (
    <div className="">
      <main className="flex h-screen items-center justify-center bg-blue-100 overflow-hidden" onWheel={handleScroll}>
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
            </div>
         </div>
      </main>
    </div>
  )
}
