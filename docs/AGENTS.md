> Keep this Mintlify site focused on the public Open Chat Widget setup flow.
> Use the Mintlify skill or current Mintlify docs when you need component or configuration details.

# Documentation project instructions

## About this project

- This is a documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Site configuration lives in `docs/docs.json`
- The primary getting-started flow is `index`, `installation`, and `create-an-agent`
- The building-agents section currently contains `agent-use-cases` and `compatibility`
- The examples section currently contains `examples`, `example-nextjs-landing-page`, `example-nextjs-portfolio-chat`, and `example-basic-react-express-app`
- The public package name is `@openchatwidget/sdk`
- The main example apps live in `examples/basic-react-express-app`, `examples/nextjs-landing-page`, and `examples/nextjs-portfolio-chat`

## Terminology

- Use "Open Chat Widget" as the product name and "widget" on second reference
- Use "agent" for the AI backend and "streaming endpoint" for the HTTP route the widget calls
- Use "mount the widget" instead of "inject" or "drop in"
- Use "React app" and "Next.js app" when referring to the supported repo examples

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise and concrete
- Lead with the next action the reader should take
- Prefer code that matches this repo over invented abstractions
- Use exact package names, env vars, and endpoint paths from the repo: `@openchatwidget/sdk`, `OPENAI_API_KEY`, and `/api/chat`
- When referencing examples, use the actual folder names in this repo

## Content boundaries

- Document the public SDK, setup flow, and example apps
- Favor Vercel AI SDK patterns that match the existing repo examples
- Do not document roadmap items as shipped features
- Do not document internal-only experiments or unpublished APIs
- Avoid compatibility claims that are not backed by the code in this repo
