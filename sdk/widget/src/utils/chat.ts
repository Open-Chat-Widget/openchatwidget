import {
  getToolOrDynamicToolName,
  isToolUIPart,
  type DynamicToolUIPart,
  type UIDataTypes,
  type UIMessagePart,
  type ToolUIPart,
  type UIMessage,
  type UITools,
} from "ai";

type WidgetPart = UIMessage["parts"][number];

type TextPart = Extract<WidgetPart, { type: "text" }>;
type ReasoningPart = Extract<WidgetPart, { type: "reasoning" }>;
export type WidgetToolPart = ToolUIPart<UITools> | DynamicToolUIPart;

export function isTextPart(part: unknown): part is TextPart {
  if (!part || typeof part !== "object") {
    return false;
  }

  const typedPart = part as { type?: unknown; text?: unknown };
  return typedPart.type === "text" && typeof typedPart.text === "string";
}

export function isReasoningPart(part: unknown): part is ReasoningPart {
  if (!part || typeof part !== "object") {
    return false;
  }

  const typedPart = part as { type?: unknown; text?: unknown };
  return typedPart.type === "reasoning" && typeof typedPart.text === "string";
}

export function extractRenderableUserText(parts: ReadonlyArray<unknown>) {
  return parts
    .filter(isTextPart)
    .map((part) => part.text.trim())
    .filter(Boolean)
    .join("\n\n");
}

export function hasRenderableAssistantParts(parts: ReadonlyArray<unknown>) {
  return parts.some(
    (part) => isTextPart(part) || isReasoningPart(part) || isToolPart(part),
  );
}

export function hasStreamingAssistantParts(parts: ReadonlyArray<unknown>) {
  return parts.some((part) => {
    if (isTextPart(part) || isReasoningPart(part)) {
      return part.state === "streaming";
    }

    if (isToolPart(part)) {
      return part.state === "input-streaming";
    }

    return false;
  });
}

export function isToolPart(part: unknown): part is WidgetToolPart {
  return isToolUIPart(part as UIMessagePart<UIDataTypes, UITools>);
}

function humanizeToolName(toolName: string) {
  return toolName
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function toGerund(toolName: string) {
  const normalized = toolName.replace(/[_-]+/g, " ").trim().toLowerCase();

  const replacements: Array<[RegExp, string]> = [
    [/^fetch\b/, "Fetching"],
    [/^get\b/, "Getting"],
    [/^search\b/, "Searching"],
    [/^find\b/, "Finding"],
    [/^read\b/, "Reading"],
    [/^load\b/, "Loading"],
    [/^list\b/, "Listing"],
    [/^create\b/, "Creating"],
    [/^update\b/, "Updating"],
    [/^delete\b/, "Deleting"],
    [/^send\b/, "Sending"],
    [/^run\b/, "Running"],
    [/^check\b/, "Checking"],
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(normalized)) {
      return normalized.replace(pattern, replacement);
    }
  }

  return `Running ${normalized}`;
}

export function getToolDisplayName(part: WidgetToolPart) {
  return part.title?.trim() || humanizeToolName(getToolOrDynamicToolName(part));
}

export function getToolSummary(part: WidgetToolPart) {
  const toolName = getToolOrDynamicToolName(part);
  const action = toGerund(toolName);

  switch (part.state) {
    case "approval-requested":
      return `${action} requires approval`;
    case "approval-responded":
      return part.approval.approved
        ? `${action} approved`
        : `${action} denied`;
    case "output-available":
      return `${action} complete`;
    case "output-error":
      return `${action} failed`;
    case "output-denied":
      return `${action} denied`;
    case "input-available":
    case "input-streaming":
    default:
      return action;
  }
}
