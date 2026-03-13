import * as React from "react";
import { HELPFUL_CHAT_LOGO_DATA_URI } from "../theme";

type WidgetPanelProps = {
  isOpen: boolean;
  isMobileViewport: boolean;
  title: string;
  onClose: () => void;
  panelStyle: React.CSSProperties;
  panelRef: React.RefObject<HTMLElement | null>;
  logoSrc?: string;
  activeSupport?: {
    name: string;
    pictureUrl?: string | null;
    isOnline?: boolean;
    statusLabel?: string;
  } | null;
  children: React.ReactNode;
};

const DEFAULT_LOGO_SRC = HELPFUL_CHAT_LOGO_DATA_URI;

export function WidgetPanel({
  isOpen,
  isMobileViewport,
  title,
  onClose,
  panelStyle,
  panelRef,
  logoSrc = DEFAULT_LOGO_SRC,
  activeSupport,
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
            ? "calc(8px + env(safe-area-inset-top, 0px)) 14px 8px"
            : "14px 16px 8px",
          display: "grid",
          gridTemplateColumns: "36px minmax(0, 1fr) 36px",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          aria-hidden="true"
          width={36}
          height={36}
          style={{ display: "block" }}
        />
        {activeSupport ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              minWidth: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "30px",
                height: "30px",
                borderRadius: "9999px",
                overflow: "hidden",
                background: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#334155",
                fontSize: "11px",
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {activeSupport.pictureUrl ? (
                <img
                  src={activeSupport.pictureUrl}
                  alt=""
                  aria-hidden="true"
                  width={30}
                  height={30}
                  style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span>{activeSupport.name.slice(0, 1).toUpperCase()}</span>
              )}
              {activeSupport.isOnline ? (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: "1px",
                    bottom: "1px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "9999px",
                    background: "#22c55e",
                    border: "1.5px solid #ffffff",
                  }}
                />
              ) : null}
            </div>
            <div
              style={{
                minWidth: 0,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: isMobileViewport ? "12px" : "13px",
                  lineHeight: 1.2,
                  color: "#0f172a",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {activeSupport.name}
              </p>
              <p
                style={{
                  margin: "1px 0 0",
                  fontSize: "11px",
                  lineHeight: 1.2,
                  color: activeSupport.isOnline ? "#166534" : "#64748b",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {activeSupport.statusLabel ?? (activeSupport.isOnline ? "Online now" : "Offline")}
              </p>
            </div>
          </div>
        ) : (
          <div />
        )}
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
