import * as React from "react";
import type { UIMessage } from "ai";

type MessageListMessage = UIMessage & {
  id: string;
  role: string;
};

type WidgetMessageListProps = {
  messages: ReadonlyArray<MessageListMessage>;
  isGenerating: boolean;
  error?: Error;
  messageContainerRef: React.RefObject<HTMLDivElement | null>;
  isMobileViewport: boolean;
  getMessageText: (message: MessageListMessage) => string;
  renderMarkdown: (text: string) => React.ReactNode;
  emptyState?: React.ReactNode;
};

export function MessageList({
  messages,
  isGenerating,
  error,
  messageContainerRef,
  isMobileViewport,
  getMessageText,
  renderMarkdown,
  emptyState,
}: WidgetMessageListProps) {
  return (
    <div
      ref={messageContainerRef}
      style={{
        padding: isMobileViewport ? "12px 14px 12px" : "10px 18px 14px",
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
        const text = getMessageText(message);
        if (!text.trim()) {
          return null;
        }

        const isUser = message.role === "user";

        return (
          <article
            key={message.id}
            style={{
              alignSelf: isUser ? "flex-end" : "flex-start",
              maxWidth: isUser ? "90%" : "92%",
              color: "#111827",
              background: isUser ? "#f1f5f9" : "transparent",
              borderRadius: isUser ? "20px" : "0",
              padding: isUser
                ? isMobileViewport
                  ? "11px 14px"
                  : "10px 14px"
                : "0",
              fontSize: isMobileViewport ? "16px" : "15px",
              lineHeight: 1.5,
              fontStyle: "normal",
            }}
          >
            {renderMarkdown(isUser ? text : text)}
          </article>
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
              animation: "openchatwidgetDotPulse 1.1s ease-in-out infinite",
            }}
          />
        </div>
      ) : null}

      {error ? <p style={{ margin: 0, color: "#b91c1c", fontSize: "14px" }}>{error.message}</p> : null}
    </div>
  );
}
