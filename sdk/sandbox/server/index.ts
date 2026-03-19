import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { config as loadEnv } from "dotenv";
import type { UIMessage } from "../../widget/src/index";
import { runDefaultAgent } from "./agents/default";
import { runNotionAgent } from "./agents/notion";

const sandboxEnvLocal = fileURLToPath(new URL("../.env.local", import.meta.url));
const sandboxEnv = fileURLToPath(new URL("../.env", import.meta.url));

if (existsSync(sandboxEnv)) {
  loadEnv({ path: sandboxEnv });
}

if (existsSync(sandboxEnvLocal)) {
  loadEnv({ path: sandboxEnvLocal, override: true });
}

const app = new Hono();
const port = Number(process.env.PORT || 8787);

app.use("/*", cors());

app.get("/api/chat", (c) =>
  c.json({
    defaultAgentId: "default",
    routes: {
      default: "/api/chat/default",
      notion: "/api/chat/notion",
    },
  }),
);

app.post("/api/chat/default", async (c) => {
  const body = (await c.req.json()) as { messages?: UIMessage[] };
  const messages = body.messages ?? [];
  const result = await runDefaultAgent(messages);

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
});

app.post("/api/chat/notion", async (c) => {
  const body = (await c.req.json()) as { messages?: UIMessage[] };
  const messages = body.messages ?? [];

  try {
    const result = await runNotionAgent(messages);

    return result.toUIMessageStreamResponse({
      sendReasoning: true,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to start Notion agent. Check NOTION_TOKEN.";
    return c.json({ error: message }, 500);
  }
});

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Hono agent listening on http://localhost:${info.port}`);
    console.log(
      "Available chat routes: GET /api/chat, POST /api/chat/default, POST /api/chat/notion",
    );
  },
);
