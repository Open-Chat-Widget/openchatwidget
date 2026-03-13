import "dotenv/config";
import express from "express";
import cors from "cors";
import { Readable } from "node:stream";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const app = express();
const port = Number(process.env.PORT ?? 3001);
const modelName = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

type ChatRequestBody = {
  messages?: unknown[];
};

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_request, response) => {
  response.status(200).json({
    ok: true,
    message: "OpenChatWidget backend is running",
  });
});

function streamToExpress(response: Response, res: express.Response) {
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  if (!response.body) {
    res.end();
    return;
  }

  Readable.fromWeb(response.body).pipe(res);
}

app.post("/api/chat", async (request, response) => {
  if (!process.env.OPENAI_API_KEY) {
    response.status(500).json({
      error: "Missing OPENAI_API_KEY environment variable.",
    });
    return;
  }

  const body = request.body as ChatRequestBody;
  if (!body || !Array.isArray(body.messages)) {
    response.status(400).json({
      error: "Request body must include `messages` as an array.",
    });
    return;
  }

  try {
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const result = streamText({
      model: openai(modelName),
      messages: body.messages as Parameters<typeof streamText>[0]["messages"],
      system:
        process.env.OPENCHAT_PROMPT ??
        "You are OpenChatWidget, a helpful and concise assistant.",
    });

    const streamResponse = result.toUIMessageStreamResponse({
      headers: {
        "x-powered-by": "openchatwidget",
        "cache-control": "no-store",
      },
    });

    streamToExpress(streamResponse, response);
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : "Could not generate a response.",
    });
  }
});

app.listen(port, () => {
  console.log(`OpenChatWidget backend listening on http://localhost:${port}`);
});
