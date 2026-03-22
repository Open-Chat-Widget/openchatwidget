import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { messages: UIMessage[] };

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamText({
    model: openrouter("openai/gpt-5-mini:online"),
    system:
      "You are the OpenChatWidget example assistant. Keep answers concise and useful. " +
      "Use web search when a question needs up-to-date information.",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
