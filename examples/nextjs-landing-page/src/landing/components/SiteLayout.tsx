"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

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

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen px-4 py-5 sm:px-5">
      <header className="mx-auto max-w-7xl pb-4">
        <div className="flex items-center gap-3 lg:justify-between">
          <Link
            aria-label="HelpfulChat Home"
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
              HelpfulChat
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
            <Link className={navLinkClass(isActive("/product"))} href="/product">
              Product
            </Link>
            <Link className={navLinkClass(isActive("/pricing"))} href="/pricing">
              Pricing
            </Link>
            <Link className={navLinkClass(isActive("/contact"))} href="/contact">
              Contact
            </Link>
          </nav>

          <Link className={`${ghostButtonClass} hidden lg:inline-flex`} href="/contact">
            Request Demo
          </Link>
        </div>

        {isMenuOpen ? (
          <div className="mt-3 rounded-2xl border border-[#e5e7eb] bg-white p-3 lg:hidden">
            <nav className="flex flex-col gap-1.5" aria-label="Mobile primary">
              <Link className={mobileNavLinkClass(isActive("/product"))} href="/product">
                Product
              </Link>
              <Link className={mobileNavLinkClass(isActive("/pricing"))} href="/pricing">
                Pricing
              </Link>
              <Link className={mobileNavLinkClass(isActive("/contact"))} href="/contact">
                Contact
              </Link>
            </nav>
            <Link className={`${ghostButtonClass} mt-2 flex w-full`} href="/contact">
              Request Demo
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
