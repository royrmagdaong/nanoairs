import { NextRequest, NextResponse } from "next/server";
import mqtt from "mqtt";

// Reuse a single connection across requests instead of reconnecting every call
let client: mqtt.MqttClient | null = null;

function getClient() {
  if (!client) {
    client = mqtt.connect(process.env.MQTT_URL!, {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      clientId: "nextjs_server_" + Math.random().toString(16).slice(2, 10),
    });

    client.on("connect", () => console.log("Server MQTT connected"));
    client.on("error", (err) => console.error("Server MQTT error:", err));
  }
  return client;
}

export async function POST(req: NextRequest) {
  const { topic, message, qos = 0 } = await req.json();

  if (!topic || !message) {
    return NextResponse.json({ error: "topic and message required" }, { status: 400 });
  }

  const c = getClient();
  c.publish(topic, message, { qos });

  return NextResponse.json({ ok: true });
}