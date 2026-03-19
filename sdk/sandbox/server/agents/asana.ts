import { MCPClientManager } from "@mcpjam/sdk";
import {
  convertWidgetMessagesToModelMessages,
  createOpenAI,
  stepCountIs,
  streamText,
  type UIMessage,
} from "../../../widget/src/index";

function getAsanaConfig() {
  const asanaToken = process.env.ASANA_TOKEN || process.env.ASANA_MCP_ACCESS_TOKEN;
  const serverUrl = process.env.ASANA_MCP_SERVER_URL || "https://mcp.asana.com/sse";

  if (!asanaToken) {
    throw new Error(
      "Missing ASANA_TOKEN. Add it to sdk/sandbox/.env to enable the Asana agent.",
    );
  }

  return { asanaToken, serverUrl };
}

export async function runAsanaAgent(messages: UIMessage[]) {
  const modelId = "gpt-4o-mini";
  const baseSystemPrompt =
    process.env.OPENCHAT_PROMPT ||
    "You are the OpenChatWidget Asana assistant. Keep answers concise and useful.";
  const { asanaToken, serverUrl } = getAsanaConfig();

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const manager = new MCPClientManager();
  await manager.connectToServer("asana", {
    url: serverUrl,
    requestInit: {
      headers: { Authorization: `Bearer ${asanaToken}` },
    },
  });

  const asanaTools = await manager.getToolsForAiSdk(["asana"]);
  let isClosed = false;

  const closeManager = async () => {
    if (isClosed) return;
    isClosed = true;
    await manager.disconnectAllServers();
  };

  return streamText({
    model: openai(modelId),
    system:
      `${baseSystemPrompt} ` +
      "You can use Asana MCP tools for Asana operations. " +
      "Use the native web_search tool for current events or up-to-date web information. " +
      "If a tool execution is denied or fails, explain what happened and suggest the next action.",
    messages: await convertWidgetMessagesToModelMessages(messages),
    stopWhen: stepCountIs(10),
    tools: {
      ...asanaTools,
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
    onFinish: async () => {
      await closeManager();
    },
    onAbort: async () => {
      await closeManager();
    },
    onError: async () => {
      await closeManager();
    },
  });
}
