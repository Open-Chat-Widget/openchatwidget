import * as React from "react";
import { HELPFUL_CHAT_LOGO_DATA_URI } from "../theme";

type WidgetComposerProps = {
  input: string;
  setInput: (nextInput: string) => void;
  placeholder: string;
  isGenerating: boolean;
  canSend: boolean;
  isMobileViewport: boolean;
  isInputFocused: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onSubmit: (event: React.FormEvent) => void;
  onStop: () => void;
  onInputKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  logoSrc?: string;
};

const POWERED_BY_LOGO_SRC = HELPFUL_CHAT_LOGO_DATA_URI;

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <path
        d="M12 19V5m0 0-5 5m5-5 5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StopIcon() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "block",
        width: "10px",
        height: "10px",
        background: "currentColor",
        borderRadius: "2px",
      }}
    />
  );
}

export function Composer({
  input,
  setInput,
  placeholder,
  isGenerating,
  canSend,
  isMobileViewport,
  isInputFocused,
  textareaRef,
  onSubmit,
  onStop,
  onInputKeyDown,
  onFocus,
  onBlur,
  logoSrc = POWERED_BY_LOGO_SRC,
}: WidgetComposerProps) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: isMobileViewport
          ? "8px 12px calc(10px + env(safe-area-inset-bottom, 0px))"
          : "0 16px 16px",
        background: "#ffffff",
        gap: "6px",
      }}
    >
      <div
        style={{
          flex: 1,
          borderRadius: "9999px",
          border: isInputFocused ? "1px solid #cbd5e1" : "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: isMobileViewport ? "4px 6px 4px 16px" : "4px 6px 4px 14px",
          background: "#ffffff",
          minHeight: isMobileViewport ? "52px" : "44px",
          boxShadow: isInputFocused
            ? "0 0 0 3px rgba(15, 23, 42, 0.06)"
            : "none",
          transition: "box-shadow 120ms ease, border-color 120ms ease",
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onInputKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={1}
          enterKeyHint="send"
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            outline: "none",
            padding: isMobileViewport ? "12px 0 11px" : "10px 0 9px",
            fontSize: isMobileViewport ? "16px" : "15px",
            lineHeight: 1.4,
            color: "#111827",
            resize: "none",
          }}
        />
        <button
          type={isGenerating ? "button" : "submit"}
          onClick={isGenerating ? onStop : undefined}
          disabled={isGenerating ? false : !canSend}
          aria-label={
            isGenerating ? "Stop generating response" : "Send message"
          }
          style={{
            width: isMobileViewport ? "38px" : "36px",
            height: isMobileViewport ? "38px" : "36px",
            borderRadius: "9999px",
            border: "none",
            background: isGenerating
              ? "#111827"
              : canSend
                ? "#111827"
                : "#d1d5db",
            color: "#ffffff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {isGenerating ? <StopIcon /> : <SendIcon />}
        </button>
      </div>
      <a
        href="https://openchatwidget.com"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          color: "#9ca3af",
          fontSize: "10px",
          lineHeight: 1.2,
          userSelect: "none",
          textDecoration: "none",
          width: "100%",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={10}
          height={10}
          style={{
            display: "block",
            opacity: 0.5,
          }}
        />
        <span>Powered by Open Chat Widget</span>
      </a>
    </form>
  );
}
