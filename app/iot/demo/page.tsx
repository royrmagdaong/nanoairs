'use client'
import mqtt from "mqtt";
import { useEffect, useState, useRef } from "react";

export default function nanoairs() {
   const clientRef = useRef<any>(null);

  useEffect(()=>{
    const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_URL!, {
      // optional auth
      username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
      password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
      clientId: "react_" + Math.random().toString(16).slice(2, 10),
      // reconnectPeriod: 2000,
    });

    client.on("connect", () => {
      console.log("MQTT connected");

      client.publish('home/esp32/commands', 'publish on my web app 3', { qos: 0, retain: false });
    });

    client.on("error", (err) => {
      console.error("MQTT error:", err);
    });

    console.log('test')

    clientRef.current = client;

    return () => {
      client.end(true); // clean up on unmount
    };
    
  },[])

  return (
    <div className="h-screen flex items-center justify-center">
      <main className="flex gap-6">
        <div>
          <button className="cursor-pointer outline px-4 py-2 rounded-sm bg-green-300" onClick={()=>{clientRef.current.publish('home/esp32/commands', 'mcu1-LED-ON', { qos: 1 })}}>LED 1</button>
        </div>
        <div>
          <button className="cursor-pointer outline px-4 py-2 rounded-sm bg-green-300" onClick={()=>{clientRef.current.publish('home/esp32/commands', 'mcu2-LED-ON', { qos: 1 })}}>LED 2</button>
        </div>
        <div>
          <button className="cursor-pointer outline px-4 py-2 rounded-sm bg-green-300" onClick={()=>{clientRef.current.publish('home/esp32/commands', 'mcu3-LED-ON', { qos: 1 })}}>LED 3</button>
        </div>
      </main>
    </div>
  );
}
