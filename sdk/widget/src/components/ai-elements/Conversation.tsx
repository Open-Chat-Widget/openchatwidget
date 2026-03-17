import * as React from "react";
import { cn } from "../../utils/classNames";

export const Conversation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function Conversation({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "ocw:flex ocw:min-h-0 ocw:flex-1 ocw:flex-col ocw:overflow-y-auto ocw:overscroll-contain",
        className,
      )}
      {...props}
    />
  );
});
