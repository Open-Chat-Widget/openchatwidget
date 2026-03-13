import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ChatToggleButton } from "./components/ChatToggleButton";
import { WidgetPanel } from "./components/WidgetPanel";
import { MessageList } from "./components/MessageList";
import { Composer } from "./components/Composer";
import { MarkdownMessage } from "./components/MarkdownMessage";
import { extractMessageText, normalizeChatApiUrl } from "./utils/chat";

const MOBILE_BREAKPOINT_PX = 768;

export type OpenChatWidgetProps = {
  url: string;
};

const WIDGET_STYLE = `
[data-openchatwidget-root],
[data-openchatwidget-root] *,
[data-openchatwidget-root] *::before,
[data-openchatwidget-root] *::after {
  box-sizing: border-box;
}

[data-openchatwidget-root] {
  font-size: 16px;
  color: #1b1d22;
  line-height: 1.4;
  font-family: "Segoe UI", "Avenir Next", sans-serif;
}

@keyframes openchatwidgetDotPulse {
  0%, 100% {
    opacity: 0.2;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-2px);
  }
}
`;

export function OpenChatWidget({ url }: OpenChatWidgetProps) {
  const [input, setInput] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobileViewport, setIsMobileViewport] = React.useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.innerWidth <= MOBILE_BREAKPOINT_PX;
  });
  const messageListRef = React.useRef<HTMLDivElement | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const panelRef = React.useRef<HTMLElement | null>(null);
  const toggleRef = React.useRef<HTMLButtonElement | null>(null);

  const apiUrl = React.useMemo(() => normalizeChatApiUrl(url), [url]);
  const transport = React.useMemo(
    () =>
      new DefaultChatTransport({
        api: apiUrl,
      }),
    [apiUrl],
  );

  const {
    messages,
    sendMessage,
    status,
    error,
    stop,
  } = useChat<UIMessage>({
    transport,
  });

  const isGenerating = status === "submitted" || status === "streaming";
  const canSend = input.trim().length > 0 && !isGenerating;

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= MOBILE_BREAKPOINT_PX);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (!isMobileViewport || !isOpen || typeof document === "undefined") {
      return;
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousOverscroll = body.style.overscrollBehavior;
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    return () => {
      body.style.overflow = previousOverflow;
      body.style.overscrollBehavior = previousOverscroll;
    };
  }, [isMobileViewport, isOpen]);

  React.useEffect(() => {
    const scrollToBottom = () => {
      const container = messageListRef.current;
      if (!container) {
        return;
      }
      container.scrollTo({
        top: container.scrollHeight,
        behavior: isGenerating ? "auto" : "smooth",
      });
    };
    scrollToBottom();
  }, [messages, isGenerating]);

  React.useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const clickedPanel = panelRef.current?.contains(target) ?? false;
      const clickedToggle = toggleRef.current?.contains(target) ?? false;
      if (!clickedPanel && !clickedToggle) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const toggleOpen = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeChat = React.useCallback(() => {
    textareaRef.current?.blur();
    setIsOpen(false);
  }, []);

  const submitMessage = React.useCallback(() => {
    const nextInput = input.trim();
    if (!nextInput || isGenerating) {
      return;
    }
    void sendMessage({
      text: nextInput,
    });
    setInput("");
    textareaRef.current?.focus();
  }, [sendMessage, input, isGenerating, setInput]);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      submitMessage();
    },
    [submitMessage],
  );

  const handleInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== "Enter") {
        return;
      }

      if (event.shiftKey || event.nativeEvent.isComposing) {
        return;
      }

      event.preventDefault();
      submitMessage();
    },
    [submitMessage],
  );

  const panelStyle: React.CSSProperties = isMobileViewport
    ? {
        position: "fixed",
        top: "0px",
        left: "0",
        right: "0",
        bottom: "0",
        width: "100vw",
        height: "100dvh",
        borderRadius: "0",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 1001,
      }
    : {
        position: "fixed",
        right: "16px",
        bottom: "96px",
        width: "min(700px, calc(100vw - 20px))",
        height: "min(820px, calc(100vh - 116px))",
        borderRadius: "20px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 1000,
        boxShadow:
          "0 20px 48px rgba(15, 23, 42, 0.16), 0 3px 10px rgba(15, 23, 42, 0.08)",
      };

  return (
    <div data-openchatwidget-root="">
      <style>{WIDGET_STYLE}</style>
      <ChatToggleButton
        ref={toggleRef}
        isOpen={isOpen}
        isMobile={isMobileViewport}
        onToggle={toggleOpen}
        unreadCount={0}
      />
      <WidgetPanel
        isOpen={isOpen}
        isMobileViewport={isMobileViewport}
        title="OpenChatWidget"
        onClose={closeChat}
        panelStyle={panelStyle}
        panelRef={panelRef}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
          }}
        >
          <MessageList
            messages={messages}
            isGenerating={isGenerating}
            error={error}
            isMobileViewport={isMobileViewport}
            messageContainerRef={messageListRef}
            getMessageText={(message) => extractMessageText(message)}
            renderMarkdown={(text) => <MarkdownMessage text={text} />}
            emptyState={
              <p style={{ color: "#64748b", textAlign: "center", margin: 0, padding: "8px 10px" }}>
                Start a conversation by sending a message.
              </p>
            }
          />
          <Composer
            input={input}
            setInput={setInput}
            isGenerating={isGenerating}
            canSend={canSend}
            isMobileViewport={isMobileViewport}
            textareaRef={textareaRef}
            onSubmit={handleSubmit}
            onStop={stop}
            onInputKeyDown={handleInputKeyDown}
            onFocus={() => {}}
            onBlur={() => {}}
          />
        </div>
      </WidgetPanel>
    </div>
  );
}

export default OpenChatWidget;
