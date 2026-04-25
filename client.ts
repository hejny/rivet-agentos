import { createClient } from "rivetkit/client";
import type { registry } from "./server";

const client = createClient<typeof registry>("http://localhost:6420");

const agent = client.vm.getOrCreate(["my-agent"]);

// DŮLEŽITÉ: eventy poslouchej přes connection, ne přes agent.on(...)
const conn = agent.connect();

conn.on("sessionEvent", (data) => {
  console.log("[event]", data.event);
});

const session = await conn.createSession("pi", {
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY!,
  },
});

const response = await conn.sendPrompt(
  session.sessionId,
  "Write a Python script that calculates pi",
);

console.log("[response]", response);

await conn.closeSession(session.sessionId);