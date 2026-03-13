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
  return <OpenChatWidget url={"http://localhost:3001/api/chat"} />;
}
```

`url` is the only configurable React prop and should point to your exact chat endpoint.

## Example backend and app

A Vite + Express example app lives in:

`/Users/matt8p/Desktop/openchatwidget/examples/vite-express-app`

It includes:

- Vite landing page with `OpenChatWidget`
- Express `POST /api/chat` endpoint
- AI SDK streaming response from the backend endpoint

## Backend helpers

The package also re-exports the backend helpers used by the example server, so a simple OpenAI-backed server can import from `openchatwidget` directly:

```ts
import {
  convertToModelMessages,
  createOpenAI,
  streamText,
  type UIMessage,
} from "openchatwidget";
```

## Build

```bash
npm run build
```

This outputs:

- `dist/index.js` (widget bundle)
