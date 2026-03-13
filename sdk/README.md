# OpenChatWidget

OpenChatWidget is a minimal, open-source React chat widget for any website.
It uses Vercel AI SDK streaming end-to-end and intentionally ships only the essentials:

- floating bottom-right widget UI
- text streaming support via `streamText`
- Node backend `/api/chat` endpoint

Live chat, Convex, and dashboard features are intentionally excluded.

## Install the widget

```bash
cd /Users/matt8p/Desktop/openchatwidget/sdk
npm install
```

## Use the component (React)

```jsx
import { OpenChatWidget } from "openchatwidget";

export default function App() {
  return <OpenChatWidget url={"http://localhost:3001"} />;
}
```

`url` is the only configurable React prop and should point to your chat backend root URL.

## Run the local streaming backend

```bash
cd /Users/matt8p/Desktop/openchatwidget/sdk
cp .env.example .env
npm install
npm run dev:server
```

Required environment variables:

- `OPENAI_API_KEY`
- optional `OPENAI_MODEL` (defaults to `gpt-4o-mini`)
- optional `OPENCHAT_PROMPT`
- optional `PORT` (defaults to `3001`)

Backend health check:

```bash
curl http://localhost:3001/health
```

## Backend contract

`POST /api/chat` expects:

```json
{
  "messages": [
    { "role": "user", "content": "Hello" }
  ]
}
```

and streams a Vercel AI SDK-compatible response.

## Build

```bash
npm run build
```

This outputs:

- `dist/index.js` (widget bundle)
- `dist/server/index.js` (node backend)
