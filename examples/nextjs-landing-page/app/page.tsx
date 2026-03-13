import OpenChatWidgetClient from "./widget-client";

export default function Home() {
  return (
    <>
      <div className="landing-page">
        <main className="landing-main">
          <div className="landing-eyebrow">
            Next.js landing page example
          </div>

          <section className="landing-hero">
            <div className="landing-copy">
              <h1 className="landing-title">
                A real Next.js page with OpenChatWidget already wired in.
              </h1>
              <p className="landing-description">
                This example mounts the widget on the client and handles chat
                completions through a Next.js route handler at{" "}
                <code className="inline-code">
                  /api/chat
                </code>
                .
              </p>
              <div className="landing-actions">
                <a
                  className="landing-button landing-button-primary"
                  href="https://www.npmjs.com/package/@openchatwidget/sdk"
                  target="_blank"
                  rel="noreferrer"
                >
                  View package
                </a>
                <a
                  className="landing-button landing-button-secondary"
                  href="https://github.com/Open-Chat-Widget/openchatwidget"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open repository
                </a>
              </div>
            </div>

            <div className="landing-card">
              <p className="landing-card-label">
                What this demo includes
              </p>
              <ul className="landing-card-list">
                <li className="landing-card-item">
                  Client-side widget mounted through a small App Router wrapper.
                </li>
                <li className="landing-card-item">
                  A serverless route handler that streams AI responses back to
                  the widget.
                </li>
                <li className="landing-card-item">
                  A minimal install path you can copy into a real Next.js app.
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>

      <OpenChatWidgetClient />
    </>
  );
}
