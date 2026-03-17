import * as React from "react";

type ReasoningPanelProps = {
  text: string;
  isStreaming: boolean;
  renderMarkdown: (text: string) => React.ReactNode;
};

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      width="10"
      height="10"
      style={{
        display: "block",
        color: "#9ca3af",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 160ms ease",
        flexShrink: 0,
      }}
    >
      <path
        d="M3 4.5 6 7.5l3-3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function ReasoningPanel({
  text,
  isStreaming,
  renderMarkdown,
}: ReasoningPanelProps) {
  const [userOpen, setUserOpen] = React.useState<boolean | null>(null);
  const [durationMs, setDurationMs] = React.useState<number | null>(null);
  const startedAtRef = React.useRef<number | null>(
    isStreaming ? Date.now() : null,
  );
  const isOpen = userOpen ?? isStreaming;
  const hasText = text.trim().length > 0;

  React.useEffect(() => {
    if (isStreaming) {
      startedAtRef.current ??= Date.now();
      return;
    }

    if (startedAtRef.current === null || durationMs !== null) {
      return;
    }

    setDurationMs(Date.now() - startedAtRef.current);
    startedAtRef.current = null;
  }, [durationMs, isStreaming]);

  const closedLabel =
    durationMs === null
      ? "Thought"
      : `Thought for ${Math.max(1, Math.round(durationMs / 1000))}s...`;

  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <button
        type="button"
        onClick={() => setUserOpen((current) => !(current ?? isStreaming))}
        aria-expanded={isOpen}
        style={{
          border: "none",
          background: "transparent",
          padding: "0",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          width: "fit-content",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            lineHeight: 1.35,
            fontWeight: 500,
            color: "#6b7280",
          }}
        >
          <span
            style={{
              backgroundImage: isStreaming
                ? "linear-gradient(90deg, #9ca3af 0%, #d1d5db 45%, #6b7280 100%)"
                : undefined,
              backgroundSize: isStreaming ? "200% 100%" : undefined,
              color: isStreaming ? "transparent" : "#9ca3af",
              backgroundClip: isStreaming ? "text" : undefined,
              WebkitBackgroundClip: isStreaming ? "text" : undefined,
              animation: isStreaming
                ? "helpfulChatReasoningShimmer 1.8s linear infinite"
                : undefined,
            }}
          >
            {isStreaming ? "Thinking..." : `(${closedLabel})`}
          </span>
        </span>
        <Caret open={isOpen} />
      </button>

      {isOpen ? (
        <div
          style={{
            paddingLeft: "14px",
            color: "#6b7280",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          {hasText ? (
            renderMarkdown(text)
          ) : (
            <p style={{ margin: 0, color: "#9ca3af" }}>Thinking...</p>
          )}
        </div>
      ) : null}
    </section>
  );
}
