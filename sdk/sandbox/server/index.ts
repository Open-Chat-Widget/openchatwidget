import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import cors from "cors";
import { config as loadEnv } from "dotenv";
import express from "express";
import {
  convertToModelMessages,
  createOpenAI,
  streamText,
  type UIMessage,
} from "../../widget/src/index";

const sandboxEnvLocal = fileURLToPath(new URL("../.env.local", import.meta.url));
const sandboxEnv = fileURLToPath(new URL("../.env", import.meta.url));

if (existsSync(sandboxEnv)) {
  loadEnv({ path: sandboxEnv });
}

if (existsSync(sandboxEnvLocal)) {
  loadEnv({ path: sandboxEnvLocal, override: true });
}

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
