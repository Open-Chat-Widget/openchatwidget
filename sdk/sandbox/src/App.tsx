import { OpenChatWidget } from "../../widget/src";

const chatApiUrl =
  import.meta.env.VITE_CHAT_API_URL ?? "http://localhost:8787/api/chat/notion";

export default function App() {
  return (
    <main className="page">
      <section className="card">
        <h1>OpenChatWidget + Vite + Hono</h1>
        <p>
          This sandbox mounts the local widget source from this repo and points
          it at a local Hono agent endpoint.
        </p>
        <p>
          Frontend: <code>http://localhost:5173</code>
        </p>
        <p>
          Agent API: <code>{chatApiUrl}</code>
        </p>
      </section>
      <OpenChatWidget url={chatApiUrl} />
    </main>
  );
}
