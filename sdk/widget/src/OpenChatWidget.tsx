import * as React from "react";
import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithApprovalResponses,
  type UIMessage,
} from "ai";
import { ChatToggleButton } from "./components/ChatToggleButton";
import { WidgetPanel } from "./components/WidgetPanel";
import { MessageList } from "./components/MessageList";
import { Composer } from "./components/Composer";
import { MarkdownMessage } from "./components/MarkdownMessage";
import { EmptyState } from "./components/EmptyState";
import {
  HELPFUL_CHAT_LOGO_DATA_URI,
  buildOpenChatWidgetThemeCss,
} from "./theme";

const MOBILE_BREAKPOINT_PX = 768;
const DEFAULT_TITLE = "Helpful Chat";
const DEFAULT_PLACEHOLDER = "Ask a question...";

export type OpenChatWidgetProps = {
  url: string;
  disableReasoning?: boolean;
};

export function OpenChatWidget({
  url,
  disableReasoning = false,
}: OpenChatWidgetProps) {
  const [input, setInput] = React.useState("");
  const [attachments, setAttachments] = React.useState<File[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const [isMobileViewport, setIsMobileViewport] = React.useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.innerWidth <= MOBILE_BREAKPOINT_PX;
  });
  const [visualViewportHeight, setVisualViewportHeight] = React.useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }
    return window.visualViewport?.height ?? window.innerHeight;
  });
  const [visualViewportOffsetTop, setVisualViewportOffsetTop] = React.useState(
    () => {
      if (typeof window === "undefined") {
        return 0;
      }
      return window.visualViewport?.offsetTop ?? 0;
    },
  );
  const messageListRef = React.useRef<HTMLDivElement | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const panelRef = React.useRef<HTMLElement | null>(null);
  const toggleRef = React.useRef<HTMLButtonElement | null>(null);

  const transport = React.useMemo(
    () =>
      new DefaultChatTransport({
        api: url,
      }),
    [url],
  );
  const themeCss = React.useMemo(() => buildOpenChatWidgetThemeCss(), []);

  const {
    messages,
    sendMessage,
    status,
    error,
    stop,
    addToolApprovalResponse,
  } = useChat<UIMessage>({
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
  });

  const isGenerating = status === "submitted" || status === "streaming";
  const canSend =
    (input.trim().length > 0 || attachments.length > 0) && !isGenerating;

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
    const handleViewportChange = () => {
      if (typeof window === "undefined") {
        return;
      }
      setVisualViewportHeight(
        window.visualViewport?.height ?? window.innerHeight,
      );
      setVisualViewportOffsetTop(window.visualViewport?.offsetTop ?? 0);
    };

    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);
    window.visualViewport?.addEventListener("resize", handleViewportChange);
    window.visualViewport?.addEventListener("scroll", handleViewportChange);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.visualViewport?.removeEventListener(
        "resize",
        handleViewportChange,
      );
      window.visualViewport?.removeEventListener(
        "scroll",
        handleViewportChange,
      );
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
    if ((nextInput.length === 0 && attachments.length === 0) || isGenerating) {
      return;
    }

    if (attachments.length > 0) {
      const transfer = new DataTransfer();
      attachments.forEach((file) => {
        transfer.items.add(file);
      });

      if (nextInput.length > 0) {
        void sendMessage({
          text: nextInput,
          files: transfer.files,
        });
      } else {
        void sendMessage({
          files: transfer.files,
        });
      }
    } else {
      void sendMessage({
        text: nextInput,
      });
    }

    setInput("");
    setAttachments([]);
    textareaRef.current?.focus();
  }, [attachments, sendMessage, input, isGenerating, setInput]);

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

  const handleFocusInput = React.useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const handleBlurInput = React.useCallback(() => {
    setIsInputFocused(false);
  }, []);

  const mobilePanelHeight =
    visualViewportHeight > 0
      ? `${Math.round(visualViewportHeight)}px`
      : "100dvh";
  const mobilePanelTop =
    visualViewportOffsetTop > 0
      ? `${Math.round(visualViewportOffsetTop)}px`
      : "0px";

  const panelStyle: React.CSSProperties = isMobileViewport
    ? {
        position: "fixed",
        top: mobilePanelTop,
        left: "0",
        right: "0",
        width: "100vw",
        height: mobilePanelHeight,
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

  const emptyState = <EmptyState isMobileViewport={isMobileViewport} />;

  return (
    <div data-openchatwidget-root="">
      <style>{themeCss}</style>
      <ChatToggleButton
        ref={toggleRef}
        isOpen={isOpen}
        isMobile={isMobileViewport}
        onToggle={toggleOpen}
        unreadCount={0}
        logoSrc={HELPFUL_CHAT_LOGO_DATA_URI}
      />
      <WidgetPanel
        isOpen={isOpen}
        isMobileViewport={isMobileViewport}
        title={DEFAULT_TITLE}
        onClose={closeChat}
        panelStyle={panelStyle}
        panelRef={panelRef}
        logoSrc={HELPFUL_CHAT_LOGO_DATA_URI}
      >
        <div
          style={{
            position: "relative",
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
            disableReasoning={disableReasoning}
            renderMarkdown={(text) => <MarkdownMessage text={text} />}
            emptyState={emptyState}
            onRespondToToolApproval={(approval) =>
              void addToolApprovalResponse(approval)
            }
          />
          <Composer
            input={input}
            setInput={setInput}
            attachments={attachments}
            onAddAttachments={(nextFiles) => {
              const deduped = new Map<string, File>();
              for (const file of attachments) {
                deduped.set(
                  `${file.name}:${file.size}:${file.lastModified}`,
                  file,
                );
              }
              for (const file of nextFiles) {
                deduped.set(
                  `${file.name}:${file.size}:${file.lastModified}`,
                  file,
                );
              }
              setAttachments(Array.from(deduped.values()));
            }}
            onRemoveAttachment={(fileIndex) => {
              setAttachments((prev) =>
                prev.filter((_, index) => index !== fileIndex),
              );
            }}
            placeholder={DEFAULT_PLACEHOLDER}
            isGenerating={isGenerating}
            canSend={canSend}
            isMobileViewport={isMobileViewport}
            isInputFocused={isInputFocused}
            textareaRef={textareaRef}
            onSubmit={handleSubmit}
            onStop={() => void stop()}
            onInputKeyDown={handleInputKeyDown}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            logoSrc={HELPFUL_CHAT_LOGO_DATA_URI}
          />
        </div>
      </WidgetPanel>
    </div>
  );
}

export default OpenChatWidget;
