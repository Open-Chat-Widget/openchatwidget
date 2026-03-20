# React + Express Example

This example runs Open Chat Widget in a Vite frontend with an Express backend.
The backend uses `gpt-5-mini` and enables the native OpenAI `web_search` tool.

## Install

```bash
cd /Users/matt8p/Desktop/openchatwidget/examples/basic-react-express-app
npm install
```

## Configure environment variables

Create a local env file:

```bash
cp .env.example .env
```

Set your OpenAI API key in `.env`:

```env
OPENAI_API_KEY=your_key_here
```

## Run locally

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:8787/api/chat`

The widget sends chat requests to the Express `POST /api/chat` endpoint and streams responses back to the UI.
