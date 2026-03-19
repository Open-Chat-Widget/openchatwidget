import * as React from "react";
import { cn } from "../../utils/classNames";

type ApprovalState =
  | "approval-requested"
  | "approval-responded"
  | "output-available"
  | "output-denied"
  | "output-error";

type Approval = {
  id: string;
  approved?: boolean;
  reason?: string;
};

type ConfirmationProps = {
  approval?: Approval;
  state: ApprovalState;
  children: React.ReactNode;
  className?: string;
};

type ConfirmationContextValue = {
  approval?: Approval;
  state: ApprovalState;
};

const ConfirmationContext =
  React.createContext<ConfirmationContextValue | null>(null);

function useConfirmationContext() {
  const context = React.useContext(ConfirmationContext);

  if (!context) {
    throw new Error(
      "Confirmation components must be used inside Confirmation.",
    );
  }

  return context;
}

export function Confirmation({
  approval,
  state,
  children,
  className,
}: ConfirmationProps) {
  if (!approval) {
    return null;
  }

  return (
    <ConfirmationContext.Provider value={{ approval, state }}>
      <div
        className={cn(
          "ocw:flex ocw:flex-col ocw:gap-3 ocw:rounded-2xl ocw:border ocw:border-slate-200 ocw:bg-slate-50/85 ocw:px-4 ocw:py-3",
          className,
        )}
      >
        {children}
      </div>
    </ConfirmationContext.Provider>
  );
}

export function ConfirmationTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ocw:text-sm ocw:font-semibold ocw:text-slate-900",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ConfirmationRequest({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { state } = useConfirmationContext();

  if (state !== "approval-requested") {
    return null;
  }

  return (
    <div
      className={cn("ocw:text-sm ocw:leading-6 ocw:text-slate-600", className)}
    >
      {children}
    </div>
  );
}

export function ConfirmationAccepted({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { approval, state } = useConfirmationContext();

  if (
    !approval?.approved ||
    (state !== "approval-responded" &&
      state !== "output-available" &&
      state !== "output-error")
  ) {
    return null;
  }

  return (
    <div
      className={cn(
        "ocw:text-sm ocw:leading-6 ocw:text-emerald-700",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ConfirmationRejected({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { approval, state } = useConfirmationContext();

  if (approval?.approved !== false || state !== "output-denied") {
    return null;
  }

  return (
    <div
      className={cn("ocw:text-sm ocw:leading-6 ocw:text-rose-700", className)}
    >
      {children}
    </div>
  );
}

export function ConfirmationActions({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { state } = useConfirmationContext();

  if (state !== "approval-requested") {
    return null;
  }

  return (
    <div className={cn("ocw:flex ocw:flex-wrap ocw:gap-2", className)}>
      {children}
    </div>
  );
}

export function ConfirmationAction({
  children,
  className,
  variant = "secondary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      type="button"
      className={cn(
        "ocw:inline-flex ocw:items-center ocw:justify-center ocw:rounded-full ocw:border ocw:px-3.5 ocw:py-2 ocw:text-sm ocw:font-medium ocw:transition-colors",
        variant === "primary"
          ? "ocw:border-slate-900 ocw:bg-slate-900 ocw:text-white hover:ocw:bg-slate-800"
          : "ocw:border-slate-200 ocw:bg-white ocw:text-slate-700 hover:ocw:bg-slate-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
