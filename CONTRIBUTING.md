# Contributing

Hey, it's Matt. I maintain the Open Chat Widget repo. Thanks for considering contributing. People like you make the project better. 

Please consider joining the [Discord](https://discord.gg/jA4vcJKECy), that's where contributors and I hang out. 

## Finding issues to work on

If you're interested in contributing, please take a look at the project's [issues tab](https://github.com/Open-Chat-Widget/openchatwidget/issues) to see what work needs to be done. Issues labeled `good first issue` are a great place to start.

## Local setup

### 1. Fork and clone the repo
Fork the `openchatwidget` repo, then clone your fork. 

```bash
git clone git@github.com:<your-github-username>/openchatwidget.git
cd openchatwidget
```

### 2. Install SDK dependencies

```bash
cd sdk
npm install
```

### 3. Start the local dev environment

```bash
npm run dev
```

This starts:

- the Vite sandbox app on `http://127.0.0.1:5173`
- the local Express agent on `http://localhost:8787`

The sandbox renders the widget directly
 from the local SDK source, so changes inside `sdk/widget/src` should show up there while you develop.

## Opening a pull request

1. Create a branch for your work.

```bash
git checkout -b my-feature-branch
```

2. Make your changes.
3. Run the checks in `sdk/`:

```bash
npm run lint
npm run format:check
```

4. Commit your changes with a clear message.
5. Push your branch to GitHub.
6. Open a pull request against `main`.

Before opening a PR, please make sure to:

- keep changes focused
- update docs when behavior changes
- verify relevant checks and builds still pass
- explain the reasoning behind non-trivial changes
- include screenshots or short videos for UI changes when helpful

If you are proposing a larger feature, open an issue first so the scope can be discussed before implementation.
