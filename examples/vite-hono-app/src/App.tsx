import { OpenChatWidget } from "openchatwidget";

const chatApiUrl = import.meta.env.VITE_CHAT_API_URL ?? "http://localhost:8787";

export default function App() {
  return (
    <main className="page">
      <section className="card">
        <h1>OpenChatWidget + Vite + Hono</h1>
        <p>
          This page mounts the SDK client widget and points it at a local Hono
          agent endpoint.
        </p>
        <p>
          Frontend: <code>http://localhost:5173</code>
        </p>
        <p>
          Agent API: <code>{chatApiUrl}/api/chat</code>
        </p>
      </section>
      <OpenChatWidget url={chatApiUrl} />
    </main>
  );
}
