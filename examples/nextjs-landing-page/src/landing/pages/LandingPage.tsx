"use client";

import { useEffect, useRef, useState } from "react";

const INSTALL_COMMAND = "npm i @openchatwidget/sdk";
const REPO_URL = "https://github.com/Open-Chat-Widget/openchatwidget";

const primaryButtonClassName =
  "inline-flex min-h-[50px] max-w-full cursor-pointer items-center justify-center gap-3 rounded-none border-2 border-[#111111] bg-white px-4 py-3 font-mono text-xs font-semibold text-[#111111] transition-colors hover:bg-[#f3f4f6] sm:min-h-[56px] sm:px-6 sm:text-sm";

const secondaryButtonClassName =
  "inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 bg-transparent px-2 py-2 text-sm font-semibold text-[#111111] transition-opacity hover:opacity-70 sm:text-base";

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="7" y="5" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 12.5H4.5A1.5 1.5 0 0 1 3 11V4.5A1.5 1.5 0 0 1 4.5 3H11a1.5 1.5 0 0 1 1.5 1.5V5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M4.5 10.5 8 14l7.5-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LandingPage() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  async function handleCopyInstallCommand() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
      return;
    }

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  }

  return (
    <div className="h-[calc(100vh-140px)] overflow-hidden pt-12 sm:pt-16">
      <>
        <section
          className="reveal mx-auto w-full max-w-6xl bg-white px-4 pt-8 pb-10 text-center sm:px-6 sm:pt-10 sm:pb-32"
          style={{ animationDelay: "40ms" }}
        >
          <h1 className="mx-auto m-0 max-w-[20ch] text-[clamp(1.95rem,8.8vw,3.8rem)] leading-[1.08] tracking-[-0.03em]">
            Bring AI chat into your site. 
          </h1>
          <p className="mx-auto mt-5 max-w-[66ch] text-base leading-relaxed text-[#4b5563] sm:mt-6 sm:text-lg">
            Open Chat widget lets you embed an AI agent directly into your product. Build customer service assistants, knowldge base agents, onboarding assistants, and more. 
          </p>

          <div className="mx-auto mt-8 mb-24 flex max-w-full flex-col items-center justify-center gap-3 sm:mb-32">
            <button
              className={primaryButtonClassName}
              type="button"
              onClick={handleCopyInstallCommand}
              aria-describedby="landing-copy-status"
            >
              {INSTALL_COMMAND}
              {copyStatus === "copied" ? <CheckIcon /> : <CopyIcon />}
            </button>
            <a
              className={secondaryButtonClassName}
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              See repo
              <ArrowRightIcon />
            </a>
          </div>
          <span
            id="landing-copy-status"
            aria-live="polite"
            className="sr-only"
          >
            {copyStatus === "copied"
              ? "Copied install command."
              : copyStatus === "error"
                ? "Clipboard unavailable. Copy the command manually."
                : ""}
          </span>

          <div className="mx-auto mt-10 flex w-full max-w-[560px] flex-col items-center gap-3 sm:mt-12">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9ca3af]">
              Works with
            </p>
            <div className="flex flex-col items-center gap-4 sm:gap-5">
              <div className="flex flex-wrap items-center justify-center gap-4 opacity-50 sm:gap-5">
                <img src="/assets/nextjs.png" alt="Next.js" className="h-5 w-auto" loading="lazy" />
                <img src="/assets/react.png" alt="React" className="h-7 w-auto" loading="lazy" />
                <img src="/assets/vue-js.svg" alt="Vue" className="h-6 w-auto" loading="lazy" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 opacity-50 sm:gap-5">
                <img src="/assets/shopify-mono-black.png" alt="Shopify" className="h-6 w-auto" loading="lazy" />
                <img
                  src="/assets/squarespace-logo-black.webp"
                  alt="Squarespace"
                  className="h-7 w-auto"
                  loading="lazy"
                />
                <img src="/assets/wix-logo-black.png" alt="Wix" className="h-6 w-auto" loading="lazy" />
                <img src="/assets/wordpress_gray.png" alt="WordPress" className="h-9 w-auto" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <img
          src="/try_it_out_mobile.svg"
          alt=""
          aria-hidden="true"
          className="landing-page-try-it-out landing-page-try-it-out-mobile"
        />
        <img
          src="/try-it-out.svg"
          alt=""
          aria-hidden="true"
          className="landing-page-try-it-out landing-page-try-it-out-desktop"
        />
        <style>{`
          .landing-page-try-it-out {
            pointer-events: none;
            position: fixed;
            z-index: 999;
          }

          .landing-page-try-it-out-mobile {
            right: 80px;
            bottom: 20px;
            width: 100px;
          }

          .landing-page-try-it-out-desktop {
            display: none;
          }

          @media (min-width: 640px) {
            .landing-page-try-it-out-mobile {
              display: none;
            }

            .landing-page-try-it-out-desktop {
              display: block;
              right: 80px;
              bottom: 95px;
              width: 140px;
            }
          }
        `}</style>
      </>
    </div>
  );
}
