import Link from "next/link";

const primaryButtonClass =
  "inline-flex cursor-pointer items-center justify-center rounded border border-[#1b1d22] px-4 py-2.5 text-sm font-semibold text-[#1b1d22] no-underline md:px-5 md:py-3 md:text-base";

export function PricingPage() {
  return (
    <div className="p-4 md:p-6">
      <article className="mx-auto max-w-3xl rounded-xl border border-[#d5d7dc] p-4 md:p-8">
        <p className="m-0 text-xl font-semibold md:text-3xl">$25 / month</p>
        <ul className="mt-4 mb-6 list-disc space-y-2 pl-5 text-base leading-relaxed md:mt-6 md:mb-8 md:space-y-3 md:pl-7 md:text-xl">
          <li>20 seats for your team.</li>
          <li>Chat widget on your storefront</li>
          <li>Unlimited live conversations</li>
          <li>Chat history with 1 year data retention</li>
          <li>Custom AI agent with knowledge base</li>
          <li>Shopify integrations to handle orders and refunds</li>
          <li>Ticketing system</li>
          <li>Dedicated support channel</li>
        </ul>
        <Link className={primaryButtonClass} href="/contact">
          Request Demo
        </Link>
      </article>
    </div>
  );
}
