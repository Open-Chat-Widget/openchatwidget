"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

const navLinkBaseClass =
  "rounded-full border px-3.5 py-2 text-base font-medium transition-colors";

const navLinkClass = (isActive: boolean) =>
  isActive
    ? `${navLinkBaseClass} border-[#ddd9cd] bg-white text-[#1b1d22]`
    : `${navLinkBaseClass} border-transparent text-[#575f6b] hover:text-[#1b1d22]`;

const ghostButtonClass =
  "cursor-pointer items-center justify-center rounded-full border border-[#ddd9cd] px-4 py-2 text-base font-medium text-[#1b1d22] transition-transform hover:-translate-y-0.5";

const mobileNavLinkClass = (isActive: boolean) =>
  isActive
    ? "rounded-xl border border-[#ddd9cd] bg-[#f8f8f8] px-3.5 py-2 text-base font-medium text-[#1b1d22] no-underline"
    : "rounded-xl border border-transparent px-3.5 py-2 text-base font-medium text-[#575f6b] no-underline hover:text-[#1b1d22]";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.649.5.5 5.649.5 12c0 5.084 3.292 9.398 7.861 10.919.575.105.786-.25.786-.555 0-.274-.01-1-.015-1.962-3.198.695-3.873-1.541-3.873-1.541-.523-1.328-1.277-1.682-1.277-1.682-1.044-.714.079-.7.079-.7 1.154.081 1.761 1.185 1.761 1.185 1.026 1.759 2.692 1.251 3.348.956.104-.743.402-1.251.731-1.539-2.553-.29-5.238-1.277-5.238-5.684 0-1.255.448-2.282 1.183-3.086-.118-.291-.513-1.462.112-3.049 0 0 .965-.309 3.162 1.179a10.98 10.98 0 0 1 2.879-.387c.977.004 1.962.132 2.879.387 2.195-1.488 3.159-1.179 3.159-1.179.627 1.587.232 2.758.114 3.049.737.804 1.181 1.831 1.181 3.086 0 4.418-2.689 5.391-5.251 5.676.413.355.781 1.059.781 2.135 0 1.542-.014 2.786-.014 3.166 0 .308.207.665.79.553C20.211 21.394 23.5 17.082 23.5 12 23.5 5.649 18.351.5 12 .5Z" />
    </svg>
  );
}

type SiteLayoutProps = {
  children: ReactNode;
};

const DOCS_URL = "https://docs.openchatwidget.com";
const COMMUNITY_URL = "https://discord.gg/jA4vcJKECy";
const REPO_URL = "https://github.com/Open-Chat-Widget/openchatwidget";

export function SiteLayout({ children }: SiteLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen px-4 py-5 sm:px-5">
      <header className="mx-auto max-w-7xl pb-4">
        <div className="flex items-center gap-3 lg:justify-between">
          <Link
            aria-label="Open Chat Widget Home"
            className="inline-flex items-center gap-2 text-base text-[#1b1d22] no-underline"
            href="/"
          >
            <img
              src="/helpfulchat-logo.svg"
              alt=""
              aria-hidden="true"
              className="h-7 w-7"
            />
            <span
              className="text-xl font-semibold tracking-[0.01em]"
              style={{ fontFamily: '"Sora", "Space Grotesk", "Avenir Next", "Segoe UI", sans-serif' }}
            >
              Open Chat Widget
            </span>
          </Link>

          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-0 text-[#1b1d22] lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            {isMenuOpen ? (
              <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
                <path
                  d="M5 5l10 10M15 5 5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
                <path
                  d="M3 5.5h14M3 10h14M3 14.5h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
            <Link
              className={navLinkClass(false)}
              href={DOCS_URL}
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </Link>
            <Link
              className={navLinkClass(false)}
              href={COMMUNITY_URL}
              target="_blank"
              rel="noreferrer"
            >
              Community
            </Link>
          </nav>

          <Link
            className={`${ghostButtonClass} hidden gap-2 lg:inline-flex`}
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
            GitHub
          </Link>
        </div>

        {isMenuOpen ? (
          <div className="mt-3 rounded-2xl border border-[#e5e7eb] bg-white p-3 lg:hidden">
            <nav className="flex flex-col gap-1.5" aria-label="Mobile primary">
              <Link
                className={mobileNavLinkClass(false)}
                href={DOCS_URL}
                target="_blank"
                rel="noreferrer"
              >
                Docs
              </Link>
              <Link
                className={mobileNavLinkClass(false)}
                href={COMMUNITY_URL}
                target="_blank"
                rel="noreferrer"
              >
                Community
              </Link>
            </nav>
            <Link
              className={`${ghostButtonClass} mt-2 flex w-full gap-2`}
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
              GitHub
            </Link>
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-7xl">
        {children}
      </main>
    </div>
  );
}
