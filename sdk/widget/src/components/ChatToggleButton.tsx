import * as React from "react";

type OpenChatWidgetToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  logoSrc?: string;
  unreadCount?: number;
};

const DEFAULT_LOGO_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='24' fill='%2300E46A'/%3E%3Ctext x='50' y='64' text-anchor='middle' font-family='Arial' font-size='56' font-weight='700' fill='white'%3EOC%3C/text%3E%3C/svg%3E";
const BUTTON_SIZE_PX = 68;
const ICON_SIZE_PX = 54;
const CLOSE_ICON_SIZE_PX = 22;
const MOBILE_BUTTON_SIZE_PX = 56;
const MOBILE_ICON_SIZE_PX = 42;
const MOBILE_CLOSE_ICON_SIZE_PX = 18;

function CloseIcon({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const ChatToggleButton = React.forwardRef<
  HTMLButtonElement,
  OpenChatWidgetToggleProps
>(function ChatToggleButton(
  isOpen,
  onToggle,
  isMobile = false,
  logoSrc = DEFAULT_LOGO_SRC,
  unreadCount = 0,
}: OpenChatWidgetToggleProps,
  ref,
) {
  const [logoLoadFailed, setLogoLoadFailed] = React.useState(false);
  const buttonSize = isMobile ? MOBILE_BUTTON_SIZE_PX : BUTTON_SIZE_PX;
  const iconSize = isMobile ? MOBILE_ICON_SIZE_PX : ICON_SIZE_PX;
  const closeIconSize = isMobile ? MOBILE_CLOSE_ICON_SIZE_PX : CLOSE_ICON_SIZE_PX;
  const offset = isMobile ? "12px" : "16px";
  const showUnread = !isOpen && unreadCount > 0;
  const unreadLabel = unreadCount > 99 ? "99+" : String(unreadCount);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      style={{
        position: "fixed",
        right: offset,
        bottom: offset,
        borderRadius: "9999px",
        border: "none",
        width: `${buttonSize}px`,
        height: `${buttonSize}px`,
        padding: "0",
        background: isOpen ? "#111827" : "#00e46a",
        color: "#ffffff",
        cursor: "pointer",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {showUnread ? (
        <span
          aria-label={`${unreadCount} unread message${unreadCount === 1 ? "" : "s"}`}
          style={{
            position: "absolute",
            top: isMobile ? "-2px" : "0px",
            right: isMobile ? "-2px" : "0px",
            minWidth: isMobile ? "18px" : "20px",
            height: isMobile ? "18px" : "20px",
            borderRadius: "9999px",
            padding: "0 5px",
            background: "#ef4444",
            color: "#ffffff",
            fontSize: isMobile ? "10px" : "11px",
            fontWeight: 700,
            lineHeight: 1,
            border: "1.5px solid #ffffff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {unreadLabel}
        </span>
      ) : null}
      {isOpen ? (
        <CloseIcon size={closeIconSize} />
      ) : !logoLoadFailed ? (
        <img
          src={logoSrc}
          alt=""
          aria-hidden="true"
          width={iconSize}
          height={iconSize}
          onError={() => setLogoLoadFailed(true)}
          style={{
            display: "block",
            filter: "brightness(0) invert(1)",
          }}
        />
      ) : (
        <span aria-hidden="true" style={{ fontSize: "24px", lineHeight: 1 }}>
          +
        </span>
      )}
    </button>
  );
});
