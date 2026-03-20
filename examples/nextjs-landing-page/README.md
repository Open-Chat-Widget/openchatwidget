# Next.js Landing Page Example

This example wires `@openchatwidget/sdk` into a Next.js App Router project.
The chat route uses `gpt-5-mini` without web search.

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

Set your OpenAI API key in `.env.local`:

```env
OPENAI_API_KEY=your_key_here
```

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The widget is mounted on the page and sends requests to `/api/chat`.
