import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "../../utils/classNames";

type ResponseProps = {
  text: string;
  className?: string;
};

export function Response({ text, className }: ResponseProps) {
  return (
    <div
      className={cn(
        "ocw:max-w-none ocw:text-[15px] ocw:leading-7 ocw:text-slate-800",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="ocw:mb-3 ocw:last:mb-0">{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className="ocw:mb-3 ocw:font-display ocw:text-xl ocw:font-semibold ocw:leading-tight ocw:text-slate-950">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="ocw:mb-3 ocw:font-display ocw:text-lg ocw:font-semibold ocw:leading-tight ocw:text-slate-950">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="ocw:mb-2 ocw:text-base ocw:font-semibold ocw:leading-tight ocw:text-slate-950">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="ocw:mb-3 ocw:list-disc ocw:space-y-1.5 ocw:pl-5 ocw:last:mb-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="ocw:mb-3 ocw:list-decimal ocw:space-y-1.5 ocw:pl-5 ocw:last:mb-0">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="ocw:mb-3 ocw:border-l-2 ocw:border-slate-200 ocw:pl-4 ocw:text-slate-600 ocw:last:mb-0">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="ocw:font-medium ocw:text-slate-950 ocw:underline ocw:underline-offset-4"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="ocw:rounded-md ocw:bg-slate-100 ocw:px-1.5 ocw:py-0.5 ocw:font-mono ocw:text-[0.92em] ocw:text-slate-900">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="ocw:mb-3 ocw:overflow-x-auto ocw:rounded-2xl ocw:border ocw:border-slate-200 ocw:bg-slate-950 ocw:px-4 ocw:py-3 ocw:text-sm ocw:leading-6 ocw:text-slate-50 ocw:last:mb-0">
              {children}
            </pre>
          ),
          hr: () => <hr className="ocw:my-4 ocw:border-0 ocw:border-t ocw:border-slate-200" />,
          table: ({ children }) => (
            <div className="ocw:mb-3 ocw:overflow-x-auto ocw:last:mb-0">
              <table className="ocw:min-w-full ocw:border-collapse ocw:text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="ocw:border-b ocw:border-slate-200 ocw:px-3 ocw:py-2 ocw:text-left ocw:font-semibold ocw:text-slate-950">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="ocw:border-b ocw:border-slate-100 ocw:px-3 ocw:py-2 ocw:align-top">
              {children}
            </td>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
