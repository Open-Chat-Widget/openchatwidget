import * as React from "react";

type WidgetPanelProps = {
  isOpen: boolean;
  isMobileViewport: boolean;
  title: string;
  onClose: () => void;
  panelStyle: React.CSSProperties;
  panelRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
};

export function WidgetPanel({
  isOpen,
  isMobileViewport,
  title,
  onClose,
  panelStyle,
  panelRef,
  children,
}: WidgetPanelProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <section ref={panelRef} style={panelStyle} aria-label={title}>
      <header
        style={{
          padding: isMobileViewport
            ? "calc(12px + env(safe-area-inset-top, 0px)) 14px 10px"
            : "14px 16px 8px",
          display: "grid",
          gridTemplateColumns: "36px 1fr 36px",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px solid #e5e7eb",
          background: "#ffffff",
        }}
      >
        <span />
        <p
          style={{
            margin: 0,
            textAlign: "center",
            fontWeight: 700,
            color: "#0f172a",
            fontSize: isMobileViewport ? "15px" : "14px",
          }}
        >
          {title}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          style={{
            width: isMobileViewport ? "36px" : "32px",
            height: isMobileViewport ? "36px" : "32px",
            borderRadius: "9999px",
            border: "none",
            background: "transparent",
            color: "#4b5563",
            cursor: "pointer",
            fontSize: "20px",
            lineHeight: 1,
          }}
        >
          x
        </button>
      </header>
      {children}
    </section>
  );
}
