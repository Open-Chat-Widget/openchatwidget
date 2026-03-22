# Next.js Landing Page Example

This example wires `@openchatwidget/sdk` into a Next.js App Router project.
The chat route uses OpenRouter with `openai/gpt-5-mini:online` (web search enabled).

It includes:

- a landing page with `OpenChatWidget`
- a client wrapper for the widget
- a serverless `POST /api/chat` route handler

## Install

```bash
cd /Users/matt8p/Desktop/openchatwidget/examples/nextjs-landing-page
npm install
```

## Configure environment variables

Create a local env file:

```bash
cp .env.example .env.local
```

Set your OpenRouter API key in `.env.local`:

```env
OPENROUTER_API_KEY=your_key_here
```

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The widget is mounted on the page and sends requests to `/api/chat`.
