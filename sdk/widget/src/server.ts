import {
  convertToModelMessages,
  type ModelMessage,
  type UIMessage,
} from "ai";

function stripDataUrlPrefix(dataUrl: string) {
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) {
    return dataUrl;
  }

  const metadata = dataUrl.slice(0, commaIndex).toLowerCase();
  const payload = dataUrl.slice(commaIndex + 1);

  if (!metadata.includes(";base64")) {
    return dataUrl;
  }

  return payload;
}

export function normalizeWidgetMessages(messages: UIMessage[]) {
  return messages.map((message) => ({
    ...message,
    parts: message.parts.map((part) => {
      if (part.type !== "file") {
        return part;
      }

      if (!part.url.startsWith("data:")) {
        return part;
      }

      return {
        ...part,
        url: stripDataUrlPrefix(part.url),
      };
    }),
  }));
}

export async function convertWidgetMessagesToModelMessages(
  messages: UIMessage[],
): Promise<ModelMessage[]> {
  return convertToModelMessages(normalizeWidgetMessages(messages));
}

