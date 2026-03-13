<img src="public/open-chat-widget-banner.png" alt="OpenChatWidget banner" width="100%" />

OpenChatWidget lets you embed a ChatGPT-like AI chat experience into your website. Build your own AI agent and customize the chat UI. You own the entire experience. It's free, open source, and self hosted. You own the entire stack. 

If you want to bring agentic chat to your product, this is it. Get started with only a few lines of code. 

### 💡 Example use cases

- **AI customer service agent:** a free alternative to tools like Intercom Fin AI or Tidio chat
- **Knowledge base and documentation search:** help users answer questions about your docs or internal knowledge base
- **In-product onboarding:** add a chat assistant to guide users through your dashboard or product
- **Bookings and task automation:** schedule meetings, track orders, book appointments, and more

## 🚀 Quick Start

Install the widget in your React app:

```bash
npm install openchatwidget
```

Embed the component anywhere in your project. A common pattern is to mount it in your main app layout so it appears across your site.

```tsx
import { OpenChatWidget } from "openchatwidget";

export default function App() {
  return (
    <>
      <main>
        <h1>Your Landing Page</h1>
        ...
      </main>

      <OpenChatWidget url="<YOUR_AGENT_STREAMING_ENDPOINT>" />
    </>
  );
}
```

The next step is to set up your AI agent backend. Create an API endpoint with your favorite Node backend framework, such as Express or Hono.

For a working Express backend example, see [`examples/vite-express-app/server`](./examples/vite-express-app/server/index.ts).

## ✨ Features

| Feature | Details |
| --- | --- |
| Embeddable widget | Add a bottom-right AI chat widget to any React / Next app with a single component. |
| Streaming responses | Uses the Vercel AI SDK client flow for streamed assistant replies. |
| Build your own agent | Point the widget at any Node backend that implements `POST /api/chat`. |
| Minimal API surface | One required prop today: `url`. |

## 📦 Examples

- [`examples/vite-express-app`](./examples/vite-express-app): Vite frontend with an Express backend and OpenAI streaming


## 🛣️ Roadmap

- [ ] Tighten installation docs and add framework-specific setup guides
- [ ] Add more backend examples for common Node stacks
- [ ] Add basic theming and branding configuration
- [ ] Add conversation persistence examples
- [ ] Support richer message types beyond plain text
- [ ] Add production deployment guides

## 🤝 Community

OpenChatWidget is early and intentionally focused.

If you want to help shape it:

- open an issue: [GitHub Issues](https://github.com/Open-Chat-Widget/openchatwidget/issues)
- open a pull request: [GitHub Pull Requests](https://github.com/Open-Chat-Widget/openchatwidget/pulls)
- read the guide: [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📄 License

MIT. See [LICENSE](./LICENSE).
