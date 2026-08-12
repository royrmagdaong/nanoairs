'use client'

export default function MQTT() {
  const publish = async (topic: string, message: string) => {
    await fetch("/api/mqtt/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, message, qos: 1 }),
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <main className="flex gap-6">
        <div>
          <button
            className="cursor-pointer outline px-4 py-2 rounded-sm bg-green-300"
            onClick={() => publish("home/esp32/commands", "mcu1-LED-ON")}
          >
            LED 1
          </button>
        </div>
        <div>
          <button
            className="cursor-pointer outline px-4 py-2 rounded-sm bg-green-300"
            onClick={() => publish("home/esp32/commands", "mcu2-LED-ON")}
          >
            LED 2
          </button>
        </div>
        <div>
          <button
            className="cursor-pointer outline px-4 py-2 rounded-sm bg-green-300"
            onClick={() => publish("home/esp32/commands", "mcu3-LED-ON")}
          >
            LED 3
          </button>
        </div>
      </main>
    </div>
  );
}