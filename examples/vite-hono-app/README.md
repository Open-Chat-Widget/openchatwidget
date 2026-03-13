# OpenChatWidget Examples

This folder contains a blank Vite + Hono app wired to `OpenChatWidget`.

## Run it

1. Install dependencies:

```bash
cd /Users/matt8p/Desktop/openchatwidget/examples
npm install
```

2. Add env vars for the Hono agent:

```bash
cp .env.example .env
```

3. Start the Hono API server:

```bash
npm run dev:api
```

4. In a second terminal, start Vite:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
API: `http://localhost:8787/api/chat`

The landing page mounts `<OpenChatWidget />`, and the widget streams responses
from the Hono `POST /api/chat` endpoint.
