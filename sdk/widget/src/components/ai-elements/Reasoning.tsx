import * as React from "react";
import { cn } from "../../utils/classNames";
import { Response } from "./Response";

type ReasoningProps = {
  text: string;
  isStreaming: boolean;
  className?: string;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="16"
      height="16"
      aria-hidden="true"
      className={cn(
        "ocw:transition-transform ocw:duration-200",
        open ? "ocw:rotate-180" : "",
      )}
    >
      <path
        d="M5.75 7.75 10 12l4.25-4.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function Reasoning({
  text,
  isStreaming,
  className,
}: ReasoningProps) {
  const [userOpen, setUserOpen] = React.useState<boolean | null>(null);
  const isOpen = userOpen ?? isStreaming;
  const hasText = text.trim().length > 0;

  return (
    <section
      className={cn(
        "ocw-reasoning-surface ocw:w-full ocw:overflow-hidden ocw:rounded-2xl ocw:border ocw:border-slate-200/90 ocw:shadow-[0_10px_30px_rgba(15,23,42,0.05)]",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setUserOpen(!isOpen)}
        className="ocw:flex ocw:w-full ocw:items-center ocw:justify-between ocw:gap-3 ocw:bg-transparent ocw:px-4 ocw:py-3 ocw:text-left ocw:transition-colors hover:ocw:bg-white/35"
        aria-expanded={isOpen}
      >
        <span className="ocw:flex ocw:min-w-0 ocw:items-center ocw:gap-2">
          <span className="ocw:flex ocw:h-6 ocw:w-6 ocw:items-center ocw:justify-center ocw:rounded-full ocw:bg-slate-900 ocw:text-[11px] ocw:font-semibold ocw:text-white">
            AI
          </span>
          <span className="ocw:flex ocw:min-w-0 ocw:flex-col">
            <span className="ocw:text-sm ocw:font-semibold ocw:text-slate-950">
              Chain of thought
            </span>
            <span className="ocw:flex ocw:items-center ocw:gap-1.5 ocw:text-xs ocw:text-slate-500">
              {isStreaming ? (
                <>
                  <span className="ocw-thinking-dot ocw:inline-block ocw:h-1.5 ocw:w-1.5 ocw:rounded-full ocw:bg-emerald-500" />
                  <span>Streaming reasoning summary</span>
                </>
              ) : (
                <span>Reasoning summary</span>
              )}
            </span>
          </span>
        </span>
        <span className="ocw:flex ocw:items-center ocw:gap-2 ocw:text-xs ocw:font-medium ocw:text-slate-500">
          <span>{isOpen ? "Hide" : "Show"}</span>
          <Chevron open={isOpen} />
        </span>
      </button>

      {isOpen ? (
        <div className="ocw:border-t ocw:border-slate-200/80 ocw:px-4 ocw:py-3">
          {hasText ? (
            <Response
              text={text}
              className="ocw:text-[13px] ocw:leading-6 ocw:text-slate-600"
            />
          ) : (
            <p className="ocw:my-0 ocw:text-sm ocw:text-slate-500">
              Thinking...
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
}
