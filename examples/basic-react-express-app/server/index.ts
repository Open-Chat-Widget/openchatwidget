import "dotenv/config";
import cors from "cors";
import express from "express";
import {
  convertToModelMessages,
  createOpenAI,
  streamText,
  type UIMessage,
} from "@openchatwidget/sdk";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (request, response) => {
  const { messages } = request.body as { messages: UIMessage[] };

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: "You are the OpenChatWidget example assistant. Keep answers concise and useful.",
    messages: await convertToModelMessages(messages),
  });

  result.pipeUIMessageStreamToResponse(response);
});

app.listen(8787, () => {
  console.log("Express agent listening on http://localhost:8787");
});
