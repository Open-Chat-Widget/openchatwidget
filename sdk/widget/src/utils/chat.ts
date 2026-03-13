export function extractMessageText(message: {
  content?: unknown;
  parts?: unknown;
}) {
  if (typeof message?.content === "string") {
    return message.content;
  }

  if (!Array.isArray(message.parts)) {
    return "";
  }

  const textChunks = message.parts
    .map((part) => {
      if (!part || typeof part !== "object") {
        return "";
      }

      const typedPart = part as { type?: unknown; text?: unknown };
      if (typedPart.type !== "text" || typeof typedPart.text !== "string") {
        return "";
      }

      return typedPart.text;
    })
    .filter(Boolean);

  return textChunks.join("");
}
