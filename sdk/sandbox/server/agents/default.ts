import {
  convertToModelMessages,
  createOpenAI,
  streamText,
  type UIMessage,
} from "../../../widget/src/index";

export async function runDefaultAgent(messages: UIMessage[]) {
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  return streamText({
    model: openai("gpt-5-mini"),
    system:
      "You are the OpenChatWidget example assistant. Keep answers concise and useful.",
    messages: await convertToModelMessages(messages),
    providerOptions: {
      openai: {
        reasoningEffort: "medium",
        reasoningSummary: "detailed",
      },
    },
  });
}
