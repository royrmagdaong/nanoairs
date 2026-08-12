'use client'

import {useState} from "react"

export default function MQTT() {

  const [LED1, setLED1] = useState(false)
  const [LED2, setLED2] = useState(false)
  const [LED3, setLED3] = useState(false)



  const publish = async (topic: string, message: string) => {
    await fetch("/api/mqtt/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, message, qos: 1 }),
    });
  };

  const toggleMCU1LED = async () => {
    if(!LED1) publish("home/esp32/commands", "mcu1-LED-ON")
    else publish("home/esp32/commands", "mcu1-LED-OFF")
    setLED1(!LED1)
  }
  
  const toggleMCU2LED = async () => {
    if(!LED2) publish("home/esp32/commands", "mcu2-LED-ON")
    else publish("home/esp32/commands", "mcu2-LED-OFF")
    setLED2(!LED2)
  } 

  const toggleMCU3LED = async () => {
    if(!LED3) publish("home/esp32/commands", "mcu3-LED-ON")
    else publish("home/esp32/commands", "mcu3-LED-OFF")
    setLED3(!LED3)
  }


  return (
    <div className="h-screen flex items-center justify-center">
      <main className="flex gap-6">
        <div>
          <button
            className={`cursor-pointer outline px-4 py-2 rounded-sm ${LED1 ? "bg-green-300":"bg-red-300"}`}
            onClick={() => toggleMCU1LED()}
          >
            LED 1
          </button>
        </div>
        <div>
          <button
            className={`cursor-pointer outline px-4 py-2 rounded-sm ${LED2 ? "bg-green-300":"bg-red-300"}`}
            onClick={() => toggleMCU2LED()}
          >
            LED 2
          </button>
        </div>
        <div>
          <button
            className={`cursor-pointer outline px-4 py-2 rounded-sm ${LED3 ? "bg-green-300":"bg-red-300"}`}
            onClick={() => toggleMCU3LED()}
          >
            LED 3
          </button>
        </div>
      </main>
    </div>
  );
}