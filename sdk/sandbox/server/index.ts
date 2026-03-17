import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import cors from "cors";
import { config as loadEnv } from "dotenv";
import express from "express";
import type { UIMessage } from "../../widget/src/index";
import {
  DEFAULT_AGENT_ID,
  getSandboxAgent,
  listSandboxAgentIds,
} from "./agents";

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

async function handleChatRequest(
  request: express.Request<{ agentId?: string }, unknown, { messages: UIMessage[] }>,
  response: express.Response,
) {
  const { messages } = request.body as { messages: UIMessage[] };
  const agentId = request.params.agentId ?? DEFAULT_AGENT_ID;
  const agent = getSandboxAgent(request.params.agentId);

  if (!agent) {
    response.status(404).json({
      error: `Unknown agent '${agentId}'. Available agents: ${listSandboxAgentIds().join(", ")}`,
    });
    return;
  }

  const result = await agent(messages);

  result.pipeUIMessageStreamToResponse(response, {
    sendReasoning: true,
  });
}

app.get("/api/chat", (_request, response) => {
  response.json({
    defaultAgentId: DEFAULT_AGENT_ID,
    agents: listSandboxAgentIds(),
    routes: {
      default: "/api/chat",
      byAgent: "/api/chat/:agentId",
    },
  });
});

app.post("/api/chat", handleChatRequest);
app.post("/api/chat/:agentId", handleChatRequest);

app.listen(8787, () => {
  console.log("Express agent listening on http://localhost:8787");
  console.log(
    `Available chat routes: /api/chat and /api/chat/:agentId (${listSandboxAgentIds().join(", ")})`,
  );
});
