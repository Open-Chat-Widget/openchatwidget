# Contributing

Thanks for contributing to OpenChatWidget.

The goal of this project is to keep the core AI chat widget simple, portable, and easy to understand.

## What to work on

Good contributions:

- bug fixes
- documentation improvements
- example app improvements
- small, durable SDK improvements
- backend examples for common Node stacks

Please avoid broadening the project unnecessarily. Features like live chat, dashboards, or Convex-specific product layers should not be added unless they are explicitly part of the roadmap.

## Local setup

Install dependencies:

```bash
cd sdk
npm install
```

```bash
cd examples/vite-express-app
npm install
```

Build the SDK:

```bash
cd sdk
npm run build
```

Build the example app:

```bash
cd examples/vite-express-app
npm run build
```

## Pull requests

Before opening a PR:

- keep changes focused
- update docs when behavior changes
- verify relevant builds still pass
- explain the reasoning behind non-trivial changes

If you are proposing a larger feature, open an issue first so the scope can be discussed before implementation.
