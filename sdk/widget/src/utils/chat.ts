import type { UIMessage } from "ai";

type WidgetPart = UIMessage["parts"][number];

type TextPart = Extract<WidgetPart, { type: "text" }>;
type ReasoningPart = Extract<WidgetPart, { type: "reasoning" }>;

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
  return parts.some((part) => isTextPart(part) || isReasoningPart(part));
}

export function hasStreamingAssistantParts(parts: ReadonlyArray<unknown>) {
  return parts.some((part) => {
    if (!isTextPart(part) && !isReasoningPart(part)) {
      return false;
    }

    return part.state === "streaming";
  });
}
