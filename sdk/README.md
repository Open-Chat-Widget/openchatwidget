# OpenChatWidget

OpenChatWidget is a minimal, open-source React chat widget for any website.
It intentionally ships only the client widget:

- floating bottom-right widget UI
- AI SDK chat streaming client

Live chat, Convex, dashboard, and backend hosting are intentionally excluded.

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

`url` is the only configurable React prop and should point to your backend root URL.
The widget sends requests to `${url}/api/chat` (or uses `url` as-is when it already ends in `/api/chat`).

## Example backend and app

A Vite + Hono example app lives in:

`/Users/matt8p/Desktop/openchatwidget/examples`

It includes:

- Vite landing page with `OpenChatWidget`
- Hono `POST /api/chat` endpoint
- AI SDK streaming response from the backend endpoint

## Build

```bash
npm run build
```

This outputs:

- `dist/index.js` (widget bundle)
