# OpenChatWidget Examples

This folder contains a minimal Vite + Hono app wired to `OpenChatWidget`.
The local Hono agent uses a reasoning-capable OpenAI model so the widget's
collapsible chain-of-thought UI is visible in the sandbox by default.

## Run it

1. Install dependencies:

```bash
cd /Users/matt8p/Desktop/openchatwidget/sdk
npm install
```

2. Add env vars for the Hono agents:

```bash
cp .env.example .env
```

Set at least:

```bash
OPENAI_API_KEY=...
NOTION_TOKEN=...
```

3. Start both the frontend and backend:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
API info: `http://localhost:8787/api/chat`
Chat endpoint: `http://localhost:8787/api/chat/default`
Notion endpoint: `http://localhost:8787/api/chat/notion`

The landing page mounts `<OpenChatWidget />`, and the widget streams responses
from the Hono sandbox API, including AI SDK `reasoning` parts.
