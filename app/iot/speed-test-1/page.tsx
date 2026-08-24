'use client'

import {useState, useEffect, useRef} from "react"
import mqtt from "mqtt";


export default function MQTT() {
  const clientRef = useRef<any>(null);
  const [LED1, setLED1] = useState(false)
  const [LED2, setLED2] = useState(false)
  const [LED3, setLED3] = useState(false)


  useEffect(() => {
    const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_URL!, {
      // optional auth
      username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
      password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
      clientId: "react_" + Math.random().toString(16).slice(2, 10),
      reconnectPeriod: 2000,
    });

    client.on("connect", () => {
      console.log("MQTT connected");
      
      // subscribe here
      client.subscribe("home/esp32-1/commands", { qos: 1 })
      client.subscribe("home/esp32-2/commands", { qos: 1 })
      client.subscribe("home/esp32-3/commands", { qos: 1 })
      client.subscribe("home/esp32-1/sensor", { qos: 1 })
      client.subscribe("home/esp32-2/sensor", { qos: 1 })
      client.subscribe("home/esp32-3/sensor", { qos: 1 })
    });

    client.on('message', (topic, payload) => {
      const deviceId = topic.split('/')[1];
      const message = payload.toString();
      console.log(`[${deviceId}] ${message}`);

      if(deviceId === 'esp32-1' && message === 'mcu1-LED-ON') setLED1(true)
      if(deviceId === 'esp32-1' && message === 'mcu1-LED-OFF') setLED1(false)
      if(deviceId === 'esp32-2' && message === 'mcu2-LED-ON') setLED2(true)
      if(deviceId === 'esp32-2' && message === 'mcu2-LED-OFF') setLED2(false)
      if(deviceId === 'esp32-3' && message === 'mcu3-LED-ON') setLED3(true)
      if(deviceId === 'esp32-3' && message === 'mcu3-LED-OFF') setLED3(false)
    })

    client.on("error", (err) => {
      console.error("MQTT error:", err);
    });

    client.on("close", () => {
      console.log("MQTT closed!");
    });

    clientRef.current = client;

    return () => {
      client.end(true); // clean up on unmount
    };
  }, []);


  const publish = async (topic: string, message: string) => {
    clientRef.current.publish(topic, message, { qos: 0, retain: true });
  };

  const toggleMCU1LED = async () => {
    if(!LED1) publish("home/esp32-1/commands", "mcu1-LED-ON",)
    else publish("home/esp32-1/commands", "mcu1-LED-OFF",)
  }
  
  const toggleMCU2LED = async () => {
    if(!LED2) publish("home/esp32-2/commands", "mcu2-LED-ON",)
    else publish("home/esp32-2/commands", "mcu2-LED-OFF",)
  } 

  const toggleMCU3LED = async () => {
    if(!LED3) publish("home/esp32-3/commands", "mcu3-LED-ON",)
    else publish("home/esp32-3/commands", "mcu3-LED-OFF",)
  }


  return (
    <div className="h-screen flex items-center justify-center">
      <main className="flex gap-6">
        <div className="">
          <button
            className={`cursor-pointer outline px-4 py-2 rounded-sm ${LED1 ? "bg-green-300":"bg-red-300"}`}
            onClick={() => toggleMCU1LED()}
          >
            LED 1
          </button>
          <p className="text-center pt-2 text-sm">online</p>
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