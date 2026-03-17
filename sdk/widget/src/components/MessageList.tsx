import * as React from "react";
import type { UIMessage } from "ai";
import { HELPFUL_CHAT_LOGO_DATA_URI } from "../theme";
import {
  extractRenderableUserText,
  hasStreamingAssistantParts,
  isReasoningPart,
  isTextPart,
} from "../utils/chat";

type WidgetMessageListProps = {
  messages: ReadonlyArray<UIMessage>;
  isGenerating: boolean;
  error?: Error;
  messageContainerRef: React.RefObject<HTMLDivElement | null>;
  isMobileViewport: boolean;
  renderMarkdown: (text: string) => React.ReactNode;
  emptyState?: React.ReactNode;
  logoSrc?: string;
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
    };

function getRenderableAssistantParts(message: UIMessage) {
  const renderableParts: RenderableAssistantPart[] = [];

  message.parts.forEach((part, index) => {
    if (isReasoningPart(part)) {
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
    }
  });

  return renderableParts;
}

function ReasoningPanel({
  text,
  isStreaming,
  renderMarkdown,
}: {
  text: string;
  isStreaming: boolean;
  renderMarkdown: (text: string) => React.ReactNode;
}) {
  const [userOpen, setUserOpen] = React.useState<boolean | null>(null);
  const isOpen = userOpen ?? isStreaming;

  return (
    <section
      style={{
        width: "100%",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        background: "#f8fafc",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setUserOpen((current) => !(current ?? isStreaming))}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          border: "none",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          padding: "10px 12px",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: 0,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "9999px",
              background: isStreaming ? "#10b981" : "#94a3b8",
            }}
          />
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              minWidth: 0,
            }}
          >
            <span
              style={{
                margin: 0,
                color: "#0f172a",
                fontSize: "13px",
                lineHeight: 1.2,
                fontWeight: 600,
              }}
            >
              Chain of thought
            </span>
            <span
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "11px",
                lineHeight: 1.2,
              }}
            >
              {isStreaming ? "Streaming reasoning summary" : "Reasoning summary"}
            </span>
          </span>
        </span>
        <span
          style={{
            color: "#64748b",
            fontSize: "11px",
            lineHeight: 1.2,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {isOpen ? "Hide" : "Show"}
        </span>
      </button>

      {isOpen ? (
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            padding: "10px 12px 12px",
            color: "#475569",
            fontSize: "13px",
            lineHeight: 1.45,
          }}
        >
          {text.trim() ? renderMarkdown(text) : <p style={{ margin: 0 }}>Thinking...</p>}
        </div>
      ) : null}
    </section>
  );
}

export function MessageList({
  messages,
  isGenerating,
  error,
  messageContainerRef,
  isMobileViewport,
  renderMarkdown,
  emptyState,
  logoSrc = HELPFUL_CHAT_LOGO_DATA_URI,
}: WidgetMessageListProps) {
  const visibleMessages = messages.filter((message) => {
    if (message.role === "user") {
      return extractRenderableUserText(message.parts).trim().length > 0;
    }

    if (message.role === "assistant") {
      return getRenderableAssistantParts(message).length > 0;
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

        const assistantParts = getRenderableAssistantParts(message);
        if (assistantParts.length === 0) {
          return null;
        }

        return (
          <div
            key={message.id}
            style={{
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "9999px",
                background: "#e2e8f0",
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#334155",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              <img
                src={logoSrc}
                alt=""
                aria-hidden="true"
                width={26}
                height={26}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: isMobileViewport ? "88%" : "84%",
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
