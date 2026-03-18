import * as React from "react";
import { HELPFUL_CHAT_LOGO_DATA_URI } from "../theme";

type WidgetComposerProps = {
  input: string;
  setInput: (nextInput: string) => void;
  attachments: File[];
  onAddAttachments: (nextFiles: File[]) => void;
  onRemoveAttachment: (attachmentIndex: number) => void;
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

function formatFileSize(sizeInBytes: number) {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  }
  if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  }
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
}

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

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Composer({
  input,
  setInput,
  attachments,
  onAddAttachments,
  onRemoveAttachment,
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
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = React.useState(false);
  const [isDraggingFiles, setIsDraggingFiles] = React.useState(false);
  const attachmentMenuRef = React.useRef<HTMLDivElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const dragDepthRef = React.useRef(0);

  const imagePreviewUrls = React.useMemo(
    () =>
      attachments.map((file) =>
        file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      ),
    [attachments],
  );

  React.useEffect(() => {
    return () => {
      imagePreviewUrls.forEach((previewUrl) => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      });
    };
  }, [imagePreviewUrls]);

  const resizeTextarea = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      if (!node) {
        return;
      }
      const computedStyle = window.getComputedStyle(node);
      const lineHeight = Number.parseFloat(computedStyle.lineHeight) || 22;
      const paddingTop = Number.parseFloat(computedStyle.paddingTop) || 0;
      const paddingBottom = Number.parseFloat(computedStyle.paddingBottom) || 0;
      const maxHeight = lineHeight * 10 + paddingTop + paddingBottom;

      node.style.height = "auto";
      node.style.height = `${Math.min(node.scrollHeight, maxHeight)}px`;
      node.style.overflowY = node.scrollHeight > maxHeight ? "auto" : "hidden";
    },
    [],
  );

  React.useEffect(() => {
    resizeTextarea(textareaRef.current);
  }, [input, textareaRef, resizeTextarea]);

  React.useEffect(() => {
    if (!isAttachmentMenuOpen || typeof document === "undefined") {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (!attachmentMenuRef.current?.contains(target)) {
        setIsAttachmentMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isAttachmentMenuOpen]);

  return (
    <form
      onSubmit={onSubmit}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        dragDepthRef.current += 1;
        setIsDraggingFiles(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
        if (dragDepthRef.current === 0) {
          setIsDraggingFiles(false);
        }
      }}
      onDrop={(event) => {
        event.preventDefault();
        dragDepthRef.current = 0;
        setIsDraggingFiles(false);

        const droppedFiles = Array.from(event.dataTransfer.files ?? []);
        if (droppedFiles.length > 0) {
          onAddAttachments(droppedFiles);
        }
      }}
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
          borderRadius: "16px",
          border: isDraggingFiles
            ? "1px solid #94a3b8"
            : isInputFocused
              ? "1px solid #cbd5e1"
              : "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          padding: isMobileViewport ? "8px" : "6px",
          boxShadow: isInputFocused
            ? "0 0 0 3px rgba(15, 23, 42, 0.06)"
            : "none",
          transition: "box-shadow 120ms ease, border-color 120ms ease",
          background: isDraggingFiles ? "#f8fafc" : "#ffffff",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          style={{ display: "none" }}
          onChange={(event) => {
            const selectedFiles = Array.from(event.target.files ?? []);
            if (selectedFiles.length > 0) {
              onAddAttachments(selectedFiles);
            }

            // Allow selecting the same file again after removing it.
            event.currentTarget.value = "";
            setIsAttachmentMenuOpen(false);
          }}
        />

        {isDraggingFiles ? (
          <div
            style={{
              margin: isMobileViewport ? "6px 8px 2px" : "4px 8px 2px",
              borderRadius: "8px",
              border: "1px dashed #94a3b8",
              background: "#f1f5f9",
              color: "#334155",
              fontSize: "12px",
              padding: "6px 8px",
            }}
          >
            Drop files to attach
          </div>
        ) : null}

        {attachments.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              padding: isMobileViewport ? "6px 8px 2px" : "4px 8px 2px",
            }}
          >
            {attachments.map((file, index) => {
              const imagePreviewUrl = imagePreviewUrls[index];
              return (
                <div
                  key={`${file.name}:${file.size}:${file.lastModified}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "9999px",
                    padding: "2px 6px 2px 2px",
                    maxWidth: isMobileViewport ? "100%" : "240px",
                    background: "#ffffff",
                  }}
                >
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt={file.name}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "9999px",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "9999px",
                        background: "#f3f4f6",
                        color: "#4b5563",
                        fontSize: "11px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {file.type === "application/pdf" ? "PDF" : "FILE"}
                    </span>
                  )}

                  <span
                    title={file.name}
                    style={{
                      fontSize: "11px",
                      color: "#111827",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {file.name}
                  </span>

                  <span
                    style={{
                      fontSize: "10px",
                      color: "#6b7280",
                      flexShrink: 0,
                    }}
                  >
                    {formatFileSize(file.size)}
                  </span>

                  <button
                    type="button"
                    onClick={() => onRemoveAttachment(index)}
                    aria-label={`Remove ${file.name}`}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#6b7280",
                      width: "16px",
                      height: "16px",
                      borderRadius: "9999px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        ) : null}

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            resizeTextarea(event.currentTarget);
          }}
          onKeyDown={onInputKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={2}
          enterKeyHint="send"
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            width: "100%",
            padding: isMobileViewport ? "8px 8px 10px" : "8px 8px 12px",
            fontSize: isMobileViewport ? "16px" : "15px",
            lineHeight: 1.45,
            color: "#111827",
            resize: "none",
            minHeight: isMobileViewport ? "48px" : "44px",
            overflowY: "hidden",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 4px 2px",
          }}
        >
          <div
            ref={attachmentMenuRef}
            style={{ position: "relative" }}
          >
            <button
              type="button"
              onClick={() => setIsAttachmentMenuOpen((prev) => !prev)}
              aria-label="Open attachment menu"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "9999px",
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                color: "#374151",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <PlusIcon />
            </button>

            {isAttachmentMenuOpen ? (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "38px",
                  width: isMobileViewport ? "168px" : "180px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  background: "#ffffff",
                  boxShadow: "0 8px 20px rgba(15, 23, 42, 0.12)",
                  padding: "6px",
                  zIndex: 5,
                }}
              >
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    textAlign: "left",
                    padding: "7px 8px",
                    borderRadius: "8px",
                    color: "#111827",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Upload file
                </button>
              </div>
            ) : null}
          </div>

          <button
            type={isGenerating ? "button" : "submit"}
            onClick={isGenerating ? onStop : undefined}
            disabled={isGenerating ? false : !canSend}
            aria-label={isGenerating ? "Stop generating response" : "Send message"}
            style={{
              width: isMobileViewport ? "38px" : "36px",
              height: isMobileViewport ? "38px" : "36px",
              borderRadius: "9999px",
              border: "none",
              background: isGenerating ? "#111827" : canSend ? "#111827" : "#d1d5db",
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
