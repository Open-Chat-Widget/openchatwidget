import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatRequestBody = {
  messages?: UIMessage[];
};

const app = new Hono();
const port = Number(process.env.PORT ?? 8787);
const modelName = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const systemPrompt =
  process.env.OPENCHAT_PROMPT ??
  "You are the OpenChatWidget example assistant. Keep answers concise and useful.";

app.use("/api/*", cors());

app.get("/health", (context) => {
  return context.json({
    ok: true,
    message: "OpenChatWidget example Hono server is running.",
  });
});

app.post("/api/chat", async (context) => {
  if (!process.env.OPENAI_API_KEY) {
    return context.json(
      { error: "Missing OPENAI_API_KEY environment variable." },
      500,
    );
  }

  let body: ChatRequestBody | null = null;
  try {
    body = await context.req.json<ChatRequestBody>();
  } catch {
    body = null;
  }

  if (!body || !Array.isArray(body.messages)) {
    return context.json(
      { error: "Request body must include `messages` as an array." },
      400,
    );
  }

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const result = streamText({
    model: openai(modelName),
    system: systemPrompt,
    messages: await convertToModelMessages(body.messages),
  });

  return result.toUIMessageStreamResponse({
    headers: {
      "cache-control": "no-store",
      "x-powered-by": "openchatwidget-examples",
    },
  });
});

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Hono agent listening on http://localhost:${info.port}`);
  },
);
