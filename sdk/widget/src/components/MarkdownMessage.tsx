import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownMessage({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p style={{ margin: "0 0 10px", lineHeight: 1.5 }}>{children}</p>,
        h1: ({ children }) => (
          <h1 style={{ margin: "0 0 10px", fontSize: "1.2rem", lineHeight: 1.3 }}>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 style={{ margin: "0 0 10px", fontSize: "1.1rem", lineHeight: 1.3 }}>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 style={{ margin: "0 0 10px", fontSize: "1rem", lineHeight: 1.3 }}>{children}</h3>
        ),
        ul: ({ children }) => <ul style={{ margin: "0 0 10px", paddingLeft: "20px" }}>{children}</ul>,
        ol: ({ children }) => <ol style={{ margin: "0 0 10px", paddingLeft: "20px" }}>{children}</ol>,
        li: ({ children }) => <li style={{ marginBottom: "6px" }}>{children}</li>,
        a: ({ href, children }) => (
          <a href={href} style={{ color: "#0f172a", textDecoration: "underline" }} target="_blank" rel="noreferrer">
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code
            style={{
              background: "#f3f4f6",
              borderRadius: "6px",
              padding: "2px 6px",
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: "0.9em",
            }}
          >
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre
            style={{
              margin: "0 0 10px",
              background: "#f9fafb",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              padding: "10px 12px",
              overflowX: "auto",
            }}
          >
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote
            style={{
              margin: "0 0 10px",
              paddingLeft: "12px",
              borderLeft: "2px solid #e5e7eb",
              color: "#374151",
            }}
          >
            {children}
          </blockquote>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
