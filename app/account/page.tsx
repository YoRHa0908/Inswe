import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">

      {/* ── HEADER ── */}
      <header className="shrink-0 border-b border-[#e8e8e8] bg-white">
        <div className="mx-auto flex h-12 w-3/5 items-center justify-between px-6">

          {/* Left: logo + nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[15px] font-semibold tracking-[-0.03em] text-[#1a1a1a] no-underline">
              Inswè
            </Link>
            <nav className="flex items-center gap-5">
              <Link
                href="/account"
                className="text-[13px] font-medium text-[#1a1a1a] underline underline-offset-[3px]"
              >
                Orders
              </Link>
              <Link
                href="/account/addresses"
                className="text-[13px] text-[#666] no-underline transition hover:text-[#1a1a1a]"
              >
                Profile
              </Link>
            </nav>
          </div>

          {/* Right: avatar */}
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 border-[#5A31F4] bg-[#ede9ff]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5A31F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="mx-auto w-3/5 flex-1 px-6 py-8">
        <h1 className="mb-5 text-[21px] font-semibold tracking-[-0.02em] text-[#1a1a1a]">
          Orders
        </h1>

        {/* Empty state card */}
        <div className="rounded-2xl border border-[#e5e5e5] bg-white px-6 py-12 text-center">
          <p className="mb-1.5 text-[16px] font-medium text-[#1a1a1a]">No orders yet</p>
          <p className="text-[14px] text-[#888]">
            Go to store to place an order.
          </p>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="shrink-0 border-t border-[#e5e5e5] py-5">
        <div className="mx-auto flex w-3/5 items-center justify-center gap-5 px-6">
          <Link href="/refund-policy" className="text-[11px] text-[#aaa] no-underline transition hover:text-[#555]">
            Refund policy
          </Link>
          <Link href="/privacy-policy" className="text-[11px] text-[#aaa] no-underline transition hover:text-[#555]">
            Privacy policy
          </Link>
          <Link href="/terms-of-service" className="text-[11px] text-[#aaa] no-underline transition hover:text-[#555]">
            Terms of service
          </Link>
        </div>
      </footer>

    </div>
  );
}
