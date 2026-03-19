import { MCPClientManager } from "@mcpjam/sdk";
import {
  convertWidgetMessagesToModelMessages,
  createOpenAI,
  stepCountIs,
  streamText,
  type UIMessage,
} from "../../../widget/src/index";

function getNotionConfig() {
  const notionToken = process.env.NOTION_TOKEN;
  const serverUrl = process.env.NOTION_MCP_SERVER_URL || "https://mcp.notion.com/mcp";

  if (!notionToken) {
    throw new Error(
      "Missing NOTION_TOKEN. Add it to sdk/sandbox/.env to enable the Notion agent.",
    );
  }

  return { notionToken, serverUrl };
}

export async function runNotionAgent(messages: UIMessage[]) {
  const modelId = "gpt-4o-mini";
  const baseSystemPrompt =
    process.env.OPENCHAT_PROMPT ||
    "You are the OpenChatWidget Notion assistant. Keep answers concise and useful.";
  const { notionToken, serverUrl } = getNotionConfig();

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const manager = new MCPClientManager();
  await manager.connectToServer("notion", {
    url: serverUrl,
    requestInit: {
      headers: { Authorization: `Bearer ${notionToken}` },
    },
  });

  const notionTools = await manager.getToolsForAiSdk(["notion"]);
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
      "You can use Notion MCP tools for Notion operations. " +
      "Use the native web_search tool for current events or up-to-date web information. " +
      "If a tool execution is denied or fails, explain what happened and suggest the next action.",
    messages: await convertWidgetMessagesToModelMessages(messages),
    stopWhen: stepCountIs(10),
    tools: {
      ...notionTools,
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
