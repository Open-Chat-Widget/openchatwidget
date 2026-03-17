import type { UIMessage } from "../../../widget/src/index";
import { runDefaultAgent } from "./default";

export type SandboxAgentResult = Awaited<ReturnType<typeof runDefaultAgent>>;
export type SandboxAgentHandler = (messages: UIMessage[]) => Promise<SandboxAgentResult>;

export const DEFAULT_AGENT_ID = "default";

export const sandboxAgents: Record<string, SandboxAgentHandler> = {
  [DEFAULT_AGENT_ID]: runDefaultAgent,
};

export function getSandboxAgent(agentId?: string) {
  if (!agentId) {
    return sandboxAgents[DEFAULT_AGENT_ID];
  }

  return sandboxAgents[agentId];
}

export function listSandboxAgentIds() {
  return Object.keys(sandboxAgents);
}
