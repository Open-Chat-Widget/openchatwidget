import { OpenChatWidget } from "../../widget/src";

const chatApiUrl =
  import.meta.env.VITE_CHAT_API_URL ?? "http://localhost:8787/api/chat";

export default function App() {
  const defaultNamedAgentUrl = "http://localhost:8787/api/chat/default";

  return (
    <main className="page">
      <section className="card">
        <h1>OpenChatWidget + Vite + Express</h1>
        <p>
          This sandbox mounts the local widget source from this repo and points
          it at a local Express agent endpoint.
        </p>
        <p>
          Frontend: <code>http://localhost:5173</code>
        </p>
        <p>
          Agent API: <code>{chatApiUrl}</code>
        </p>
        <p>
          Named agent example: <code>{defaultNamedAgentUrl}</code>
        </p>
      </section>
      <OpenChatWidget url={chatApiUrl} />
    </main>
  );
}
