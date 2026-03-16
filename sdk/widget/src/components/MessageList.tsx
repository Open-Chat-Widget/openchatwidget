import * as React from "react";

type MessageListMessage = {
  id: string;
  role: string;
  parts: ReadonlyArray<unknown>;
};

type MessageDecoration = {
  isSystem?: boolean;
  avatarUrl?: string;
  avatarFallbackLabel?: string;
  assistantBubble?: boolean;
  messageTimestampLabel?: string;
};

type WidgetMessageListProps = {
  messages: ReadonlyArray<MessageListMessage>;
  isGenerating: boolean;
  error?: Error;
  messageContainerRef: React.RefObject<HTMLDivElement | null>;
  isMobileViewport: boolean;
  getMessageText: (parts: ReadonlyArray<unknown>) => string;
  renderMarkdown: (text: string) => React.ReactNode;
  messageDecorations?: Record<string, MessageDecoration | undefined>;
  hasApiKey?: boolean;
  emptyState?: React.ReactNode;
};

function getAvatarFallback(label?: string) {
  if (!label || label.trim().length === 0) {
    return "S";
  }

  const words = label
    .trim()
    .split(/\s+/)
    .filter((value) => value.length > 0)
    .slice(0, 2);
  if (words.length === 0) {
    return "S";
  }

  return words.map((word) => word[0]?.toUpperCase() ?? "").join("");
}

export function MessageList({
  messages,
  isGenerating,
  error,
  messageContainerRef,
  isMobileViewport,
  getMessageText,
  renderMarkdown,
  messageDecorations,
  hasApiKey = true,
  emptyState,
}: WidgetMessageListProps) {
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
      {messages.length === 0 ? (
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

      {messages.map((message) => {
        const text = getMessageText(message.parts);
        if (!text.trim()) {
          return null;
        }

        const decoration = messageDecorations?.[message.id];
        const isUser = message.role === "user";
        const isSystem = Boolean(decoration?.isSystem);
        const messageTimestampLabel = decoration?.messageTimestampLabel;
        const showAssistantAvatar =
          !isUser && !isSystem && Boolean(decoration?.avatarUrl || decoration?.assistantBubble);
        const article = (
          <article
            style={{
              alignSelf: isSystem ? "center" : isUser ? "flex-end" : "flex-start",
              background: isSystem ? "transparent" : isUser ? "#f3f4f6" : "transparent",
              border: "none",
              borderRadius: isSystem ? "0" : isUser ? "20px" : "0",
              padding: isSystem
                ? "0"
                : isUser
                  ? isMobileViewport
                    ? "11px 14px"
                    : "10px 14px"
                  : "0",
              maxWidth: isSystem
                ? "92%"
                : isUser
                  ? isMobileViewport
                    ? "90%"
                    : "86%"
                  : showAssistantAvatar
                    ? isMobileViewport
                      ? "88%"
                      : "84%"
                    : "100%",
              color: isSystem ? "#64748b" : "#111827",
              fontStyle: isSystem ? "italic" : "normal",
              fontSize: isSystem ? "13px" : isMobileViewport ? "16px" : "15px",
              lineHeight: 1.5,
              boxShadow: "none",
            }}
          >
            {renderMarkdown(text)}
          </article>
        );

        const messageBody = showAssistantAvatar ? (
          <div
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
              {decoration?.avatarUrl ? (
                <img
                  src={decoration.avatarUrl}
                  alt=""
                  aria-hidden="true"
                  width={26}
                  height={26}
                  style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span>{getAvatarFallback(decoration?.avatarFallbackLabel)}</span>
              )}
            </div>
            {article}
          </div>
        ) : (
          article
        );

        return (
          <div
            key={message.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: messageTimestampLabel ? "3px" : "0",
            }}
          >
            {messageBody}
            {messageTimestampLabel ? (
              <p
                style={{
                  margin: 0,
                  alignSelf: isSystem ? "center" : isUser ? "flex-end" : "flex-start",
                  marginLeft: !isSystem && !isUser && showAssistantAvatar ? "34px" : "0",
                  fontSize: "10px",
                  lineHeight: 1.2,
                  color: "#94a3b8",
                  letterSpacing: "0.01em",
                }}
              >
                {messageTimestampLabel}
              </p>
            ) : null}
          </div>
        );
      })}

      {isGenerating ? (
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

      {error ? <p style={{ margin: 0, color: "#b91c1c", fontSize: "14px" }}>{error.message}</p> : null}

      {!hasApiKey ? <p style={{ margin: 0, color: "#b91c1c", fontSize: "14px" }}>Missing apiKey prop.</p> : null}
    </div>
  );
}
