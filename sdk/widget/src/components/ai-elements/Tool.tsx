import * as React from "react";
import { Check, ChevronDown, Copy, CornerDownLeft } from "lucide-react";
import { cn } from "../../utils/classNames";
import {
  getToolDisplayName,
  getToolSummary,
  type WidgetToolPart,
} from "../../utils/chat";

type ToolProps = {
  part: WidgetToolPart;
  onRespondToApproval?: (approval: {
    id: string;
    approved: boolean;
    reason?: string;
  }) => void;
  className?: string;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <ChevronDown
      size={14}
      aria-hidden="true"
      className={cn(
        "ocw:text-slate-500 ocw:transition-transform ocw:duration-200",
        open ? "ocw:rotate-180" : "",
      )}
      strokeWidth={1.75}
    />
  );
}

function CopyIcon({ copied }: { copied: boolean }) {
  if (copied) {
    return <Check size={12} aria-hidden="true" strokeWidth={2} />;
  }

  return <Copy size={12} aria-hidden="true" strokeWidth={1.75} />;
}

function getSummaryClassName(part: WidgetToolPart) {
  const isStreaming =
    part.state === "input-streaming" || part.state === "input-available";

  return cn(
    "ocw:text-[13px] ocw:font-medium ocw:leading-[1.35] ocw:text-slate-500",
    isStreaming
      ? "ocw:[background-image:linear-gradient(90deg,#9ca3af_0%,#d1d5db_45%,#6b7280_100%)] ocw:[background-size:200%_100%] ocw:text-transparent ocw:bg-clip-text ocw:[-webkit-background-clip:text] ocw:animate-[helpfulChatReasoningShimmer_1.8s_linear_infinite]"
      : "ocw:text-slate-500",
  );
}

function formatContent(value: unknown) {
  if (value == null) {
    return "null";
  }

  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function CodePane({
  label,
  value,
  tone = "default",
  copyable = true,
  className,
  showHeader = true,
}: {
  label: string;
  value: unknown;
  tone?: "default" | "error" | "warning";
  copyable?: boolean;
  className?: string;
  showHeader?: boolean;
}) {
  const [copyState, setCopyState] = React.useState<"idle" | "copied">("idle");
  const resetTimerRef = React.useRef<number | null>(null);
  const content = formatContent(value);

  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current != null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopyState("copied");
      if (resetTimerRef.current != null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(() => {
        setCopyState("idle");
      }, 1800);
    } catch {
      setCopyState("idle");
    }
  }

  return (
    <section className={cn("ocw:flex ocw:flex-col ocw:gap-1", className)}>
      {showHeader ? (
        <div className="ocw:flex ocw:items-center ocw:justify-between ocw:gap-3">
          <span className="ocw:text-[10px] ocw:font-medium ocw:uppercase ocw:tracking-[0.14em] ocw:text-slate-400">
            {label}
          </span>
          {copyable ? (
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "ocw:flex ocw:h-5 ocw:w-5 ocw:cursor-pointer ocw:items-center ocw:justify-center ocw:rounded-full ocw:bg-transparent ocw:text-slate-400 ocw:transition-colors hover:ocw:text-slate-700",
                copyState === "copied" ? "ocw:text-slate-700" : "",
              )}
              aria-label={`Copy ${label.toLowerCase()}`}
            >
              <CopyIcon copied={copyState === "copied"} />
            </button>
          ) : null}
        </div>
      ) : null}
      <pre
        className={cn(
          "ocw:my-0 ocw:max-h-[220px] ocw:overflow-auto ocw:py-0.5 ocw:text-[11px] ocw:leading-[1.55] ocw:select-text",
          tone === "error"
            ? "ocw:text-rose-700"
            : tone === "warning"
              ? "ocw:text-amber-700"
              : "ocw:text-slate-600",
        )}
      >
        <code
          style={{
            fontFamily:
              '"SFMono-Regular", SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: "11px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            tabSize: 2,
          }}
        >
          {content}
        </code>
      </pre>
    </section>
  );
}

function ApprovalCard({
  part,
  title,
  onRespondToApproval,
  onClose,
}: {
  part: WidgetToolPart;
  title: string;
  onRespondToApproval?: ToolProps["onRespondToApproval"];
  onClose?: () => void;
}) {
  if (!part.approval || part.state !== "approval-requested") {
    return null;
  }

  const [submissionState, setSubmissionState] = React.useState<
    "idle" | "approving" | "rejecting"
  >("idle");
  const promptId = React.useId();
  const isSubmitting = submissionState !== "idle";

  React.useEffect(() => {
    if (part.state !== "approval-requested") {
      setSubmissionState("idle");
      return;
    }

    setSubmissionState("idle");
  }, [part.approval.id, part.state]);

  async function submitApproval(approved: boolean) {
    if (isSubmitting) {
      return;
    }

    setSubmissionState(approved ? "approving" : "rejecting");

    try {
      await onRespondToApproval?.({
        id: part.approval!.id,
        approved,
        reason: approved
          ? "User approved the tool request."
          : "User denied the tool request.",
      });
      onClose?.();
    } catch {
      setSubmissionState("idle");
    }
  }

  function handleApprovalRowKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
      return;
    }

    const target = event.target;
    const closestButton =
      target instanceof Element ? target.closest("button") : null;

    if (event.key === "Enter") {
      // When a button has focus, Enter will already trigger its native click.
      if (closestButton) {
        return;
      }

      event.preventDefault();
      void submitApproval(true);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      void submitApproval(false);
    }
  }

  return (
    <section className="ocw:flex ocw:flex-col ocw:gap-2 ocw:rounded-2xl ocw:border ocw:border-slate-200/80 ocw:bg-white/70 ocw:p-4">
      <div
        role="group"
        aria-labelledby={promptId}
        tabIndex={0}
        onKeyDown={handleApprovalRowKeyDown}
        className="ocw:rounded-xl ocw:outline-none focus-visible:ocw:ring-2 focus-visible:ocw:ring-slate-300 focus-visible:ocw:ring-offset-2"
      >
        <p
          id={promptId}
          className="ocw:my-0 ocw:px-1 ocw:py-0.5 ocw:text-[14px] ocw:font-normal ocw:leading-[1.35] ocw:text-slate-800"
        >
          Allow {title} to run
        </p>

        <div className="ocw:mt-1.5 ocw:flex ocw:items-center ocw:gap-1.5">
          <button
            type="button"
            disabled={isSubmitting}
            aria-label="Approve tool request"
            className="ocw:inline-flex ocw:min-h-[26px] ocw:cursor-pointer ocw:items-center ocw:justify-center ocw:gap-1 ocw:rounded-md ocw:border ocw:border-slate-900 ocw:bg-slate-900 ocw:px-2 ocw:py-1.5 ocw:text-[9px] ocw:font-normal ocw:text-white ocw:transition-colors hover:ocw:bg-slate-800 disabled:ocw:cursor-not-allowed disabled:ocw:opacity-60 focus-visible:ocw:outline-none focus-visible:ocw:ring-2 focus-visible:ocw:ring-slate-300 focus-visible:ocw:ring-offset-2"
            onClick={() => void submitApproval(true)}
          >
            Approve
            <CornerDownLeft
              size={11}
              aria-hidden="true"
              strokeWidth={1.75}
              className="ocw:shrink-0"
            />
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            aria-label="Deny tool request"
            className="ocw:inline-flex ocw:min-h-[26px] ocw:cursor-pointer ocw:items-center ocw:justify-center ocw:rounded-md ocw:border ocw:border-slate-200 ocw:bg-white ocw:px-2 ocw:py-1.5 ocw:text-[9px] ocw:font-normal ocw:text-slate-700 ocw:transition-colors hover:ocw:border-slate-300 hover:ocw:bg-slate-50 disabled:ocw:cursor-not-allowed disabled:ocw:opacity-60 focus-visible:ocw:outline-none focus-visible:ocw:ring-2 focus-visible:ocw:ring-slate-300 focus-visible:ocw:ring-offset-2"
            onClick={() => void submitApproval(false)}
          >
            <span>Deny</span>
            <span className="ocw:ml-1 ocw:text-[7px] ocw:text-slate-500">
              Esc
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function getResponsePane(part: WidgetToolPart) {
  if (part.state === "output-error") {
    return <CodePane label="Response" value={part.errorText} tone="error" />;
  }

  if (part.state === "output-denied") {
    return (
      <CodePane
        label="Response"
        value={part.approval?.reason ?? "Tool execution was denied."}
        tone="warning"
      />
    );
  }

  if (part.state === "output-available") {
    return <CodePane label="Response" value={part.output} />;
  }

  if (part.state === "approval-requested") {
    return null;
  }

  return null;
}

export function Tool({ part, onRespondToApproval, className }: ToolProps) {
  const defaultOpen =
    part.state === "approval-requested" ||
    part.state === "output-available" ||
    part.state === "output-error" ||
    part.state === "output-denied";
  const [open, setOpen] = React.useState(defaultOpen);
  const title = getToolDisplayName(part);
  const summary = getToolSummary(part);
  const requestPane =
    part.state !== "approval-requested" ? (
      <CodePane label="Request" value={part.input ?? {}} />
    ) : null;
  const responsePane = getResponsePane(part);
  const parameterCard =
    requestPane || responsePane ? (
      <div className="ocw:mt-1 ocw:flex ocw:flex-col ocw:gap-2 ocw:rounded-xl ocw:border ocw:border-slate-200/70 ocw:bg-white/60 ocw:p-3">
        {requestPane}
        {responsePane}
      </div>
    ) : null;

  // Ensure tool approval requests are shown immediately when the part
  // transitions into the "approval-requested" state.
  React.useEffect(() => {
    if (part.state === "approval-requested") {
      setOpen(true);
    }
  }, [part.state]);

  return (
    <section className={cn("ocw:w-full", className)}>
      <button
        type="button"
        onClick={() => {
          setOpen((current) => !current);
        }}
        aria-expanded={open}
        className="ocw:inline-flex ocw:max-w-full ocw:cursor-pointer ocw:items-center ocw:gap-1.5 ocw:bg-transparent ocw:px-0 ocw:py-0.5 ocw:text-left"
      >
        <span className="ocw:min-w-0">
          <span className={getSummaryClassName(part)}>{summary}</span>
        </span>
        <Chevron open={open} />
      </button>

      {open ? (
        <div className="ocw:mt-2 ocw:flex ocw:flex-col ocw:gap-2.5">
          <div className="ocw:text-[11px] ocw:font-medium ocw:leading-[1.35] ocw:text-slate-500">
            {title}
          </div>
          <ApprovalCard
            part={part}
            title={title}
            onRespondToApproval={onRespondToApproval}
            onClose={() => setOpen(false)}
          />
          {parameterCard}
        </div>
      ) : null}
    </section>
  );
}

export default Tool;
