<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/open-chat-widget-logo-dark-mode.svg" />
    <source media="(prefers-color-scheme: light)" srcset="public/open-chat-widget-logo-light-mode.svg" />
    <img src="public/open-chat-widget-logo-light-mode.svg" alt="OpenChatWidget logo" width="50%" />
  </picture>

  <p>
    <a href="https://www.npmjs.com/package/@openchatwidget/sdk">
      <img src="https://img.shields.io/npm/v/%40openchatwidget%2Fsdk?style=for-the-badge&color=blue" alt="npm version" />
    </a>
    <a href="./LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License: MIT" />
    </a>
    <a href="https://discord.gg/jA4vcJKECy">
      <img src="https://img.shields.io/badge/Discord-Join%20Server-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" />
    </a>
  </p>
</div>

Open Chat Widget is an embeddable AI chat client for your product. You build the backend agent, and Open Chat Widget handles the frontend UI and chat plumbing.

- Works with all major model providers (OpenAI, Anthropic, Gemini, Ollama, Mistral, OpenRouter, and more)
- Streaming UI with reasoning and tool-call rendering
- Attachments support (images, PDFs, SVGs, model-dependent)
- MCP support, web search, and human-in-the-loop tool approvals

### Why Open Chat Widget

You came here because you want a working chat bot, not another framework to learn. We give you feature-rich chat out of the box:

- **Plug and play** - Add one component and connect your streaming endpoint.
- **Works with AI SDK** — Build custom agents with [Vercel AI SDK](https://ai-sdk.dev/) and plug them in directly.
- **Framework-agnostic** — Use it with React, Next.js, Vue, WordPress, Shopify, Wix, and more.
- **Open source** — MIT licensed. You own your data and infrastructure.

<div align="center">
  <img src="public/demo-gif.gif" alt="Open Chat Widget product demo — product identification and customer service chat" width="100%" />
</div> 

## 🚀 Quick Start - React / Next.js

### Step 1: Install the SDK
Install the widget in your React app:

```bash
npm i @openchatwidget/sdk
```

Then embed the component anywhere in your project. A common pattern is to mount it in your main app layout so it appears across your site.

```tsx
import { OpenChatWidget } from "@openchatwidget/sdk";

export default function MySite() {
  return (
    <>
      ...
      <OpenChatWidget url="<YOUR_AGENT_STREAMING_ENDPOINT>" /> 
    </>
  );
}
```

<details>
<summary><span style="font-size: 1.25em; font-weight: 600;">Step 2: Build an AI agent</span></summary>
The next step is to set up your AI agent backend. Create an API endpoint with your favorite Node backend framework, such as Express or Hono.

Here's a simple text stream agent: 
```tsx
import {
  convertToModelMessages,
  createOpenAI,
  streamText,
  type UIMessage,
} from "@openchatwidget/sdk";
import express from "express";

const app = express();
app.use(express.json());

app.post("/api/chat", async (request, response) => {
  const { messages } = request.body as { messages: UIMessage[] };

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: "You are the OpenChatWidget example assistant. Keep answers concise and useful.",
    messages: await convertToModelMessages(messages),
  });

  result.pipeUIMessageStreamToResponse(response);
});
```
</details>

<details>
<summary><span style="font-size: 1.25em; font-weight: 600;">Step 3: Connect widget to agent</span></summary>

Paste the streaming URL endpoint into the `<OpenChatWidget />` UI component:

```tsx
<OpenChatWidget url="http://localhost:8787/api/chat" /> 
```

You should now be ready to chat!
</details> 

## Examples
We've included some examples of Open Chat Widget installed in web app projects as reference: 


- [`examples/vite-express-app`](./examples/vite-express-app): Open Chat Widget installed in a React + Vite frontend with an Express backend. 
- [`examples/nextjs-landing-page`](./examples/nextjs-landing-page): Open Chat Widget installed on a Next.js app with API Routes. This is the live landing page too. 

## [Roadmap](./ROADMAP.md)

Read our roadmap to see what features are coming next. If you're interested in contributing, this is a great place to start to see what work needs to be done. 

## [Community](https://discord.gg/jA4vcJKECy)

Join us on Discord—share what you're building, get help, or just say hi. We'd love to have you. 

## [License](./LICENSE)

Open source MIT license. 
