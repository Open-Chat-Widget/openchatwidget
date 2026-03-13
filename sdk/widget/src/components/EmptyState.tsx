import * as React from "react";

type EmptyStateProps = {
  isMobileViewport: boolean;
  children?: React.ReactNode;
};

export function EmptyState({ isMobileViewport, children }: EmptyStateProps) {
  return (
    <section
      aria-label="Conversation introduction"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: isMobileViewport ? "110px" : "124px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          width: "100%",
          animation: "helpfulChatEmptyFadeIn 240ms ease-out both",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#0f172a",
            fontSize: isMobileViewport ? "17px" : "18px",
            lineHeight: 1.25,
            fontWeight: 500,
            letterSpacing: "-0.005em",
            textAlign: "center",
          }}
        >
          What can I help you with today?
        </h2>
        {children ? <div style={{ width: "100%" }}>{children}</div> : null}
      </div>
    </section>
  );
}
