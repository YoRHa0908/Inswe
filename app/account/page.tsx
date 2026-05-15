import Link from "next/link";
import AccountHeader from "@/components/AccountHeader";

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AccountHeader active="orders" />

      {/* ── MAIN ── */}
      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-8 sm:px-6">
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
        <div className="mx-auto flex w-full max-w-[900px] flex-wrap items-center justify-center gap-3 px-4 sm:gap-5 sm:px-6">
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
