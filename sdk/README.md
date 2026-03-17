<img src="../public/open-chat-widget-banner.png" alt="OpenChatWidget banner" width="100%" />

OpenChatWidget lets you embed a ChatGPT-like AI chat widget into your website. Connect it to any AI agent you build and any LLM model that can stream AI SDK UI messages. It's free, open source, and self hosted. You own the entire stack. 

If you want to bring agentic chat to your product, this is it. Get started with only a few lines of code. 

### Example use cases

- **AI customer service agent** - 
  Help customers get instant answers, resolve common support questions, and reduce ticket volume. Open source free alternative to Intercom's Fin Agent.\

- **Knowledge base and documentation search** -
  Let users ask questions about your docs, product guides, or internal knowledge base in natural language.

- **In-product onboarding** -
  Add a chat assistant that helps users navigate your dashboard, learn features, and get unstuck faster.

- **Bookings and task automation** -
  Power flows like scheduling meetings, tracking orders, booking appointments, and triggering simple actions.

## 🚀 Quick Start

### 1. Install the chat widget 
Install the widget in your React app:

```bash
npm install @openchatwidget/sdk
```

Embed the component anywhere in your project. A common pattern is to mount it in your main app layout so it appears across your site. The packaged widget ships with its own bundled CSS, so you do not need to configure Tailwind in your app to use it.

```tsx
import { OpenChatWidget } from "@openchatwidget/sdk";

export default function App() {
  return (
    <>
      <main>
        ...
      </main>

      <OpenChatWidget url="<YOUR_AGENT_STREAMING_ENDPOINT>" /> // Fill out streaming endpoint in Step 3.
    </>
  );
}
```

### 2. Build your first agent

The next step is to set up your AI agent backend. Create an API endpoint with your favorite Node backend framework, such as Express or Hono.

Here's a simple AI SDK UI stream agent:
```tsx
app.use(express.json());
app.post("/api/chat", async (request, response) => {
  const { messages } = request.body as { messages: UIMessage[] };

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const result = streamText({
    model: openai("gpt-5-mini"),
    system: "You are the OpenChatWidget example assistant. Keep answers concise and useful.",
    messages: await convertToModelMessages(messages),
  });

  result.pipeUIMessageStreamToResponse(response);
});
```

### 3. Connect the widget to the agent. 

Grab the exact URL of your agent endpoint and paste it into `<YOUR_AGENT_STREAMING_ENDPOINT>`, for example `http://localhost:8787/api/chat`. Make sure to start both your front end and Node backend. You should be able to start chatting.

For a working basic example, check out [`examples/vite-express-app`](./examples/vite-express-app/).

## ✨ Features

| Feature | Details |
| --- | --- |
| Embeddable widget | Add a bottom-right AI chat widget to any React / Next app with a single component. |
| Custom AI agent | Create your own AI agent hosted on any Node backend framework |
| 🚧 Live chat |  Chat with users in real time, just like Intercom but free |
| 🚧 Support for voice and image uploading |  Be able to talk to engage and upload photos in the chat widget |
| 🚧 Support for MCP and MCP apps | Connect to MCP servers and render UI from MCP apps  |
| 🚧 Client side tools |  Be able to call tools on the UI client side, WebMCP style. |

<img src="public/product-demo-filler.png" alt="OpenChatWidget product demo" width="100%" />

## Stack 
Open Chat Widget is a simple UI wrapper around [Vercel AI-SDK](https://ai-sdk.dev/docs/introduction). When building your backend AI agent, all capabilities from AI-SDK are compatible with Open Chat Widget. 

- Front end is written in React / Typescript
- Chat UI is styled with bundled Tailwind 4 CSS
- Agentic chat is powered by Vercel AI SDK UI message streams

## 📦 Examples

- [`examples/vite-express-app`](./examples/vite-express-app): Vite frontend with an Express backend and OpenAI streaming


## 🛣️ Roadmap

[See ROADMAP.md](../ROADMAP.md)
## 🤝 Community

- [Discord](https://discord.gg/jA4vcJKECy)
- [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT. See [LICENSE](./LICENSE).
