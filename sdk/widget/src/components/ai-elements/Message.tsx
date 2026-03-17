import * as React from "react";
import { cn } from "../../utils/classNames";

type MessageProps = {
  from: "assistant" | "user";
  avatar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function Message({ from, avatar, children, className }: MessageProps) {
  const isUser = from === "user";

  return (
    <div
      className={cn(
        "ocw:flex ocw:w-full",
        isUser ? "ocw:justify-end" : "ocw:justify-start",
        className,
      )}
    >
      <div
        className={cn(
          "ocw:flex ocw:max-w-full",
          isUser ? "ocw:justify-end" : "ocw:items-start ocw:gap-3",
        )}
      >
        {!isUser && avatar ? (
          <div className="ocw:flex ocw:h-8 ocw:w-8 ocw:shrink-0 ocw:items-center ocw:justify-center ocw:overflow-hidden ocw:rounded-full ocw:bg-slate-200">
            {avatar}
          </div>
        ) : null}
        <div
          className={cn(
            "ocw:flex ocw:min-w-0 ocw:flex-col",
            isUser
              ? "ocw:max-w-[86%] ocw:items-end"
              : "ocw:max-w-[90%] ocw:items-start",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
