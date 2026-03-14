export function ProductPage() {
  return (
    <div className="grid gap-12 pt-8 pb-10 md:pt-14">
      <section className="reveal mx-auto w-full max-w-5xl" style={{ animationDelay: "40ms" }}>
        <h1 className="m-0 text-center text-[clamp(1.85rem,4.2vw,3rem)] leading-[1.08] tracking-[-0.01em] text-[#1b1d22]">
          Turn conversations into conversions.
        </h1>
      </section>

      <section className="reveal grid gap-14" style={{ animationDelay: "100ms" }}>
        <article className="mx-auto grid w-full max-w-5xl gap-2">
          <img
            src="/assets/widget_screenshot.png"
            alt="HelpfulChat storefront widget shown to customers"
            className="w-full rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_16px_32px_-24px_rgba(17,24,39,0.4)]"
            loading="eager"
          />
        </article>
      </section>
    </div>
  );
}
