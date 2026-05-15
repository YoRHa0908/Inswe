"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  active: "orders" | "profile";
};

export default function AccountHeader({ active }: Props) {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/sign-out", { method: "POST" });
    router.push("/auth/login");
  };

  return (
    <header className="shrink-0 border-b border-[#e8e8e8] bg-white">
      <div className="mx-auto flex h-12 w-full max-w-[900px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[15px] font-semibold tracking-[-0.03em] text-[#1a1a1a] no-underline">
            Inswè
          </Link>
          <nav className="flex items-center gap-5">
            <Link
              href="/account"
              className={`text-[13px] transition ${
                active === "orders"
                  ? "font-medium text-[#1a1a1a] underline underline-offset-[3px]"
                  : "text-[#666] no-underline hover:text-[#1a1a1a]"
              }`}
            >
              Orders
            </Link>
            <Link
              href="/account/addresses"
              className={`text-[13px] transition ${
                active === "profile"
                  ? "font-medium text-[#1a1a1a] underline underline-offset-[3px]"
                  : "text-[#666] no-underline hover:text-[#1a1a1a]"
              }`}
            >
              Profile
            </Link>
          </nav>
        </div>

        <Link
          href="/account/addresses"
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 border-[#5A31F4] bg-[#ede9ff] transition hover:opacity-80"
          aria-label="Go to profile"
          title="Profile"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5A31F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
