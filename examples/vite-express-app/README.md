# OpenChatWidget Examples

This folder contains a minimal Vite + Express app wired to `OpenChatWidget`.

## Run it

1. Install dependencies:

```bash
cd /Users/matt8p/Desktop/openchatwidget/examples/vite-express-app
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

The landing page mounts `<OpenChatWidget />`, and the widget streams responses
from the Express `POST /api/chat` endpoint.
