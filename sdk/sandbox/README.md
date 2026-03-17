# OpenChatWidget Examples

This folder contains a minimal Vite + Express app wired to `OpenChatWidget`.
The local Express agent uses a reasoning-capable OpenAI model so the widget's
collapsible chain-of-thought UI is visible in the sandbox by default.

## Run it

1. Install dependencies:

```bash
cd /Users/matt8p/Desktop/openchatwidget/sdk
npm install
```

2. Add env vars for the Express agent:

```bash
cp .env.example .env
```

3. Start both the frontend and backend:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
API: `http://localhost:8787/api/chat`

Named agent API: `http://localhost:8787/api/chat/default`

The landing page mounts `<OpenChatWidget />`, and the widget streams responses
from the Express sandbox API, including AI SDK `reasoning` parts.

## Add another agent

Each sandbox agent now lives in its own file under
`sdk/sandbox/server/agents/`.

1. Add a new agent file that exports a handler.
2. Register it in `sdk/sandbox/server/agents/index.ts`.
3. Point the widget at `POST /api/chat/<agent_id>` to test it.

`POST /api/chat` still routes to the default agent for backwards
compatibility.
