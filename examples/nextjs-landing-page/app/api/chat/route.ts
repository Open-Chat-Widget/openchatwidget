import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { messages: UIMessage[] };

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamText({
    model: openrouter("openai/gpt-4o-mini"),
    system: "You are the OpenChatWidget example assistant. Keep answers concise and useful.",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
