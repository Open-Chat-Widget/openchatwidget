import * as React from "react";
import type { UIMessage } from "ai";
import { ReasoningPanel } from "./ReasoningPanel";
import { Tool } from "./ai-elements/Tool";
import {
  extractRenderableUserText,
  hasStreamingAssistantParts,
  isReasoningPart,
  isTextPart,
  isToolPart,
  type WidgetToolPart,
} from "../utils/chat";

type WidgetMessageListProps = {
  messages: ReadonlyArray<UIMessage>;
  isGenerating: boolean;
  error?: Error;
  messageContainerRef: React.RefObject<HTMLDivElement | null>;
  isMobileViewport: boolean;
  disableReasoning?: boolean;
  renderMarkdown: (text: string) => React.ReactNode;
  emptyState?: React.ReactNode;
  onRespondToToolApproval?: (approval: {
    id: string;
    approved: boolean;
    reason?: string;
  }) => void;
};

type RenderableAssistantPart =
  | {
      kind: "reasoning";
      key: string;
      text: string;
      isStreaming: boolean;
    }
  | {
      kind: "text";
      key: string;
      text: string;
    }
  | {
      kind: "tool";
      key: string;
      part: WidgetToolPart;
    };

function getRenderableAssistantParts(
  message: UIMessage,
  disableReasoning: boolean,
) {
  const renderableParts: RenderableAssistantPart[] = [];

  message.parts.forEach((part, index) => {
    if (!disableReasoning && isReasoningPart(part)) {
      renderableParts.push({
        kind: "reasoning",
        key: `${message.id}-reasoning-${index}`,
        text: part.text,
        isStreaming: part.state === "streaming",
      });
      return;
    }

    if (isTextPart(part) && part.text.trim()) {
      renderableParts.push({
        kind: "text",
        key: `${message.id}-text-${index}`,
        text: part.text,
      });
      return;
    }

    if (isToolPart(part)) {
      renderableParts.push({
        kind: "tool",
        key: `${message.id}-tool-${part.toolCallId}-${index}`,
        part,
      });
    }
  });

  return renderableParts;
}

export function MessageList({
  messages,
  isGenerating,
  error,
  messageContainerRef,
  isMobileViewport,
  disableReasoning = false,
  renderMarkdown,
  emptyState,
  onRespondToToolApproval,
}: WidgetMessageListProps) {
  const visibleMessages = messages.filter((message) => {
    if (message.role === "user") {
      return extractRenderableUserText(message.parts).trim().length > 0;
    }

    if (message.role === "assistant") {
      return getRenderableAssistantParts(message, disableReasoning).length > 0;
    }

    return false;
  });

  const hasStreamingAssistantMessage = messages.some(
    (message) =>
      message.role === "assistant" && hasStreamingAssistantParts(message.parts),
  );
  const showPendingIndicator = isGenerating && !hasStreamingAssistantMessage;

  return (
    <div
      ref={messageContainerRef}
      style={{
        padding: isMobileViewport ? "10px 14px 12px" : "8px 18px 14px",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        overscrollBehaviorY: "contain",
        display: "flex",
        flexDirection: "column",
        gap: isMobileViewport ? "16px" : "14px",
        flex: 1,
      }}
    >
      {visibleMessages.length === 0 ? (
        <div
          style={{
            padding: isMobileViewport ? "4px 2px 2px" : "2px 2px 4px",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {emptyState ?? null}
        </div>
      ) : null}

      {visibleMessages.map((message) => {
        if (message.role === "user") {
          const text = extractRenderableUserText(message.parts);
          if (!text.trim()) {
            return null;
          }

          return (
            <article
              key={message.id}
              style={{
                alignSelf: "flex-end",
                background: "#f3f4f6",
                border: "none",
                borderRadius: "20px",
                padding: isMobileViewport ? "11px 14px" : "10px 14px",
                maxWidth: isMobileViewport ? "90%" : "86%",
                color: "#111827",
                fontSize: isMobileViewport ? "16px" : "15px",
                lineHeight: 1.5,
                boxShadow: "none",
              }}
            >
              <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{text}</p>
            </article>
          );
        }

        const assistantParts = getRenderableAssistantParts(
          message,
          disableReasoning,
        );
        if (assistantParts.length === 0) {
          return null;
        }

        return (
          <div
            key={message.id}
            style={{
              alignSelf: "flex-start",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: isMobileViewport ? "100%" : "100%",
              }}
            >
              {assistantParts.map((part) => {
                if (part.kind === "reasoning") {
                  return (
                    <ReasoningPanel
                      key={part.key}
                      text={part.text}
                      isStreaming={part.isStreaming}
                      renderMarkdown={renderMarkdown}
                    />
                  );
                }

                if (part.kind === "tool") {
                  return (
                    <Tool
                      key={part.key}
                      part={part.part}
                      onRespondToApproval={onRespondToToolApproval}
                    />
                  );
                }

                return (
                  <article
                    key={part.key}
                    style={{
                      alignSelf: "flex-start",
                      background: "transparent",
                      border: "none",
                      borderRadius: "0",
                      padding: "0",
                      maxWidth: "100%",
                      color: "#111827",
                      fontSize: isMobileViewport ? "16px" : "15px",
                      lineHeight: 1.5,
                      boxShadow: "none",
                    }}
                  >
                    {renderMarkdown(part.text)}
                  </article>
                );
              })}
            </div>
          </div>
        );
      })}

      {showPendingIndicator ? (
        <div
          aria-label="Assistant is responding"
          style={{
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "18px",
            height: "18px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "9999px",
              background: "#9ca3af",
              animation: "helpfulChatDotPulse 1.1s ease-in-out infinite",
            }}
          />
        </div>
      ) : null}

      {error ? (
        <p style={{ margin: 0, color: "#b91c1c", fontSize: "14px" }}>
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
