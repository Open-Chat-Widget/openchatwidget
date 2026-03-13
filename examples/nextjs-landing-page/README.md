# Next.js Landing Page Example

This example wires `@openchatwidget/sdk` into a Next.js App Router project.

It includes:

- a landing page with `OpenChatWidget`
- a client wrapper for the widget
- a serverless `POST /api/chat` route handler

## Getting started

Install dependencies:

```bash
npm install
```

Create a local env file:

```bash
cp .env.example .env.local
```

Add your OpenAI API key:

```env
OPENAI_API_KEY=your_key_here
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The widget is mounted on the page and sends requests to `/api/chat`.
