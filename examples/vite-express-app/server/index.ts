import "dotenv/config";
import cors from "cors";
import express from "express";
import {
  convertToModelMessages,
  createOpenAI,
  streamText,
  type UIMessage,
} from "openchatwidget";

type ChatRequestBody = {
  messages?: UIMessage[];
};

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (request, response) => {
  if (!process.env.OPENAI_API_KEY) {
    response.status(500).json(
      { error: "Missing OPENAI_API_KEY environment variable." },
    );
    return;
  }

  const body = request.body as ChatRequestBody | undefined;
  if (!body || !Array.isArray(body.messages)) {
    response.status(400).json(
      { error: "Request body must include `messages` as an array." },
    );
    return;
  }

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: "You are the OpenChatWidget example assistant. Keep answers concise and useful.",
    messages: await convertToModelMessages(body.messages),
  });

  result.pipeUIMessageStreamToResponse(response, {
    headers: {
      "cache-control": "no-store",
      "x-powered-by": "openchatwidget-examples",
    },
  });
});

app.listen(8787, () => {
  console.log("Express agent listening on http://localhost:8787");
});
