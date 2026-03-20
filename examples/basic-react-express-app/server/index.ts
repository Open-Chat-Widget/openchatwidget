import "dotenv/config";
import cors from "cors";
import express from "express";
import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";

const app = express();
const REQUEST_BODY_LIMIT = "20mb";

function stripDataUrlPrefix(dataUrl: string) {
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) {
    return dataUrl;
  }

  const metadata = dataUrl.slice(0, commaIndex).toLowerCase();
  const payload = dataUrl.slice(commaIndex + 1);

  if (!metadata.includes(";base64")) {
    return dataUrl;
  }

  return payload;
}

function normalizeWidgetMessages(messages: UIMessage[]) {
  return messages.map((message) => ({
    ...message,
    parts: message.parts.map((part) => {
      if (part.type !== "file") {
        return part;
      }

      if (!part.url.startsWith("data:")) {
        return part;
      }

      return {
        ...part,
        url: stripDataUrlPrefix(part.url),
      };
    }),
  }));
}

app.use(cors());
app.use(express.json({ limit: REQUEST_BODY_LIMIT }));

app.post("/api/chat", async (request, response) => {
  const { messages } = request.body as { messages: UIMessage[] };
  const modelId = "gpt-5-mini";
  const baseSystemPrompt =
    "You are an advanced assistant: helpful, accurate, and conversational. " +
    "Answer directly with clear structure, adapt tone to the user, and keep responses concise unless detail is needed. " +
    "Explain complex topics simply, use examples when helpful, and ask follow-up questions only when they materially improve the answer. " +
    "If unsure, say so; do not fabricate facts, sources, or capabilities. " +
    "For image inputs, describe objectively, make reasonable inferences, and clearly label assumptions. " +
    "Be polite, calm, and neutral; avoid filler, excessive emojis, and unnecessary repetition. " +
    "Refuse or redirect harmful/illegal requests and provide safer alternatives. " +
    "For medical, legal, or financial topics, provide general informational guidance rather than definitive instructions.";

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const result = streamText({
    model: openai(modelId),
    system:
      `${baseSystemPrompt} ` +
      "Use the native web_search tool for questions that require current events or up-to-date web information. " +
      "If you use web_search, briefly summarize what you found.",
    messages: await convertToModelMessages(normalizeWidgetMessages(messages)),
    stopWhen: stepCountIs(5),
    tools: {
      web_search: openai.tools.webSearch({
        externalWebAccess: true,
        searchContextSize: "medium",
      }),
    },
    providerOptions: {
      openai: {
        reasoningEffort: "medium",
        reasoningSummary: "detailed",
      },
    },
  });

  result.pipeUIMessageStreamToResponse(response);
});

app.use(
  (
    error: Error & { type?: string; status?: number },
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    if (error.type === "entity.too.large" || error.status === 413) {
      response.status(413).json({
        error: `Request payload is too large. Max body size is ${REQUEST_BODY_LIMIT}.`,
      });
      return;
    }

    response.status(500).json({ error: "Unexpected server error." });
  },
);

app.listen(8787, () => {
  console.log("Express agent listening on http://localhost:8787");
});
