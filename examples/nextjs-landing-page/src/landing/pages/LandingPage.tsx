const inputClassName =
  "w-full min-w-0 flex-1 rounded-none border border-[#222222] bg-white px-4 py-3 text-base font-medium text-[#111111] outline-none placeholder:font-normal placeholder:text-[#111111] focus:ring-0 sm:text-lg";

const buttonClassName =
  "inline-flex min-h-[50px] w-full shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-none border-2 border-[#111111] bg-[#111111] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:min-h-[56px] sm:w-auto sm:px-6 sm:text-base";

export function LandingPage() {
  return (
    <div className="grid min-h-[calc(100vh-140px)] place-items-start pt-2 sm:place-items-center sm:pt-0">
      <>
        <section
          className="reveal mx-auto w-full max-w-6xl bg-white px-4 pt-6 pb-10 text-center sm:px-6 sm:pt-10 sm:pb-14"
          style={{ animationDelay: "40ms" }}
        >
          <h1 className="mx-auto m-0 max-w-[20ch] text-[clamp(1.95rem,8.8vw,3.8rem)] leading-[1.08] tracking-[-0.03em]">
            Bring ChatGPT into your site.
          </h1>
          <p className="mx-auto mt-5 max-w-[66ch] text-base leading-relaxed text-[#4b5563] sm:mt-6 sm:text-lg">
            Open Chat Widget lets you embed AI chat directly into your product. Connect the widget to agents you build, with any LLM model. It's free, open source, and self hosted. 
          </p>

          <form
            className="mx-auto mt-8 flex w-full max-w-[620px] flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:gap-3"
            action="/contact"
            method="GET"
          >
            <label className="sr-only" htmlFor="landing-email">
              Work email
            </label>
            <input
              id="landing-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Enter email"
              className={inputClassName}
            />
            <button className={buttonClassName} type="submit">
              Request Demo
            </button>
          </form>

          <div className="mx-auto mt-10 flex w-full max-w-[560px] flex-col items-center gap-3 sm:mt-12">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9ca3af]">
              Works with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 opacity-70 sm:gap-5">
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
            right: 56px;
            bottom: 42px;
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
              right: 70px;
              bottom: 55px;
              width: 140px;
            }
          }
        `}</style>
      </>
    </div>
  );
}
