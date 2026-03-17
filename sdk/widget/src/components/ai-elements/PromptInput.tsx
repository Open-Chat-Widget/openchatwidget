import * as React from "react";
import { HELPFUL_CHAT_LOGO_DATA_URI } from "../../theme";
import { cn } from "../../utils/classNames";

type PromptInputProps = {
  input: string;
  setInput: (nextInput: string) => void;
  placeholder: string;
  isGenerating: boolean;
  canSend: boolean;
  isMobileViewport: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onSubmit: (event: React.FormEvent) => void;
  onStop: () => void;
  onInputKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  logoSrc?: string;
};

const POWERED_BY_LOGO_SRC = HELPFUL_CHAT_LOGO_DATA_URI;

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
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
      className="ocw:block ocw:h-2.5 ocw:w-2.5 ocw:rounded-[3px] ocw:bg-current"
    />
  );
}

export function PromptInput({
  input,
  setInput,
  placeholder,
  isGenerating,
  canSend,
  isMobileViewport,
  textareaRef,
  onSubmit,
  onStop,
  onInputKeyDown,
  logoSrc = POWERED_BY_LOGO_SRC,
}: PromptInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 168)}px`;
  }, [input, textareaRef]);

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "ocw:flex ocw:flex-col ocw:gap-2 ocw:bg-white",
        isMobileViewport
          ? "ocw:px-3 ocw:pt-2 ocw:pb-[calc(12px+env(safe-area-inset-bottom,0px))]"
          : "ocw:px-4 ocw:pt-1 ocw:pb-4",
      )}
    >
      <div
        className={cn(
          "ocw:flex ocw:min-h-14 ocw:items-end ocw:gap-3 ocw:rounded-[28px] ocw:border ocw:bg-white ocw:px-4 ocw:py-2 ocw:transition-shadow",
          isFocused
            ? "ocw:border-slate-300 ocw:shadow-[0_0_0_4px_rgba(15,23,42,0.05)]"
            : "ocw:border-slate-200",
        )}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onInputKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={1}
          enterKeyHint="send"
          className="ocw:max-h-42 ocw:min-h-[28px] ocw:flex-1 ocw:resize-none ocw:border-0 ocw:bg-transparent ocw:py-2 ocw:text-[15px] ocw:leading-6 ocw:text-slate-950 ocw:outline-none placeholder:ocw:text-slate-400"
        />
        <button
          type={isGenerating ? "button" : "submit"}
          onClick={isGenerating ? onStop : undefined}
          disabled={isGenerating ? false : !canSend}
          aria-label={
            isGenerating ? "Stop generating response" : "Send message"
          }
          className={cn(
            "ocw:flex ocw:h-10 ocw:w-10 ocw:shrink-0 ocw:items-center ocw:justify-center ocw:rounded-full ocw:border-0 ocw:text-white ocw:transition-colors",
            isGenerating || canSend
              ? "ocw:bg-slate-950 hover:ocw:bg-slate-800"
              : "ocw:cursor-not-allowed ocw:bg-slate-300",
          )}
        >
          {isGenerating ? <StopIcon /> : <SendIcon />}
        </button>
      </div>

      <a
        href="https://openchatwidget.com"
        target="_blank"
        rel="noreferrer"
        className="ocw:flex ocw:w-full ocw:items-center ocw:justify-center ocw:gap-1.5 ocw:text-[10px] ocw:font-medium ocw:text-slate-400 ocw:no-underline"
      >
        <img
          src={logoSrc}
          alt=""
          width={10}
          height={10}
          className="ocw:block ocw:opacity-50"
        />
        <span>Powered by Open Chat Widget</span>
      </a>
    </form>
  );
}
