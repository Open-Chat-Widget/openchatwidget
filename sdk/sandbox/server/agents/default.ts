import {
  convertWidgetMessagesToModelMessages,
  createOpenAI,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from "../../../widget/src/index";
import { z } from "zod";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runDefaultAgent(messages: UIMessage[]) {
  const modelId = "gpt-5-mini";
  const baseSystemPrompt =
    process.env.OPENCHAT_PROMPT ||
    "You are the OpenChatWidget example assistant. Keep answers concise and useful.";

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return streamText({
    model: openai(modelId),
    system:
      `${baseSystemPrompt} ` +
      "Use the weather tool for any weather question. Use the run_command tool only when the user explicitly asks to run a command. " +
      "If a tool execution is denied, do not retry it. When you use a tool, briefly summarize the result for the user.",
    messages: await convertWidgetMessagesToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      fetch_weather_data: tool({
        description: "Fetch mock weather data for a city or location.",
        inputSchema: z.object({
          location: z.string().describe("City or location to look up."),
          units: z
            .enum(["fahrenheit", "celsius"])
            .default("fahrenheit")
            .describe("Temperature unit preference."),
        }),
        needsApproval: true,
        execute: async ({ location, units }) => {
          await wait(900);

          const conditions = ["Sunny", "Cloudy", "Windy", "Light rain"];
          const selectedCondition =
            conditions[location.length % conditions.length] ?? "Clear";
          const baseTemperature = 68 + (location.length % 7);
          const temperature =
            units === "celsius"
              ? `${Math.round(((baseTemperature - 32) * 5) / 9)}C`
              : `${baseTemperature}F`;

          return {
            location,
            temperature,
            conditions: selectedCondition,
            humidity: `${48 + (location.length % 18)}%`,
            windSpeed:
              units === "celsius"
                ? `${8 + (location.length % 10)} km/h`
                : `${5 + (location.length % 8)} mph`,
            fetchedAt: new Date().toLocaleString("en-US", {
              timeZone: "America/Los_Angeles",
            }),
          };
        },
      }),
      run_command: tool({
        description:
          "Preview a shell command that would run in the sandbox. Requires approval before execution.",
        inputSchema: z.object({
          command: z.string().describe("The shell command to run."),
          reason: z
            .string()
            .describe("Why the command is needed for the user request."),
        }),
        needsApproval: true,
        execute: async ({ command, reason }) => {
          await wait(600);

          return {
            command,
            reason,
            status: "approved-and-simulated",
            output:
              "Sandbox demo only. Replace this tool with your real command runner.",
          };
        },
      }),
    },
    providerOptions: {
      openai: {
        reasoningEffort: "medium",
        reasoningSummary: "detailed",
      },
    },
  });
}
