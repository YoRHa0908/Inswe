"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/lib/CartContext";
import { useUserStore } from "@/lib/useUserStore";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Collection", href: "/collection" },
];

export default function Header() {
  const router = useRouter();
  const [openAccount, setOpenAccount] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { totalCount } = useCart();

  // Read session from cookie — re-check on focus and storage events
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  const readSession = () => {
    try {
      // Read the plain readable cookie (not the httpOnly JWT)
      const match = document.cookie.match(/(?:^|;\s*)inswe_user=([^;]+)/);
      if (match) {
        const email = decodeURIComponent(match[1]);
        if (email) { setSessionEmail(email); return; }
      }
    } catch {}
    setSessionEmail(null);
  };

  useEffect(() => {
    readSession(); // read on mount

    // Re-read when window regains focus (popup closed, tab switched back)
    window.addEventListener("focus", readSession);

    // Re-read on storage changes — triggered by login page writing inswe_auth_ts
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "inswe_auth_ts" || e.key === null) {
        readSession();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("focus", readSession);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Listen for popup login success message
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "SHOP_LOGIN_SUCCESS") {
        readSession();
        setOpenAccount(false);
        router.refresh();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  // Get saved profile name for the signed-in user
  const { profile } = useUserStore(sessionEmail ?? "");
  const displayFirst = profile.firstName || (sessionEmail ? sessionEmail.split("@")[0] : "");
  const initial = displayFirst.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenAccount(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await fetch("/api/sign-out", { method: "POST" });
    setSessionEmail(null);
    setOpenAccount(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e5e5e5] bg-[#f5f5f5]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1920px] items-center justify-between px-6 lg:px-10">

        {/* LEFT NAV */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-[14px] font-normal tracking-[-0.02em] text-[#2b2b2b] transition hover:opacity-60">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* MOBILE */}
        <button className="block md:hidden">Menu</button>

        {/* LOGO */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold tracking-[-0.04em]">
          Inswè
        </Link>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5">

          {/* ACCOUNT */}
          <div className="relative" ref={dropdownRef}>

            {/* Avatar button — shows initial when signed in, user icon when not */}
            <button
              type="button"
              aria-label="Account"
              onClick={() => setOpenAccount((prev) => !prev)}
              className="transition hover:opacity-80"
            >
              {sessionEmail ? (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1a1a] text-[15px] font-semibold text-white">
                  {initial}
                </div>
              ) : (
                <User size={22} strokeWidth={1.8} />
              )}
            </button>

            {/* DROPDOWN */}
            {openAccount && (
              <div className="absolute right-0 top-[48px] w-[320px] rounded-[20px] border border-[#e8e8e8] bg-white p-5 shadow-xl">

                {sessionEmail ? (
                  /* ── SIGNED IN STATE ── */
                  <>
                    <div className="flex gap-3">
                      <Link
                        href="/account"
                        onClick={() => setOpenAccount(false)}
                        className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[16px] bg-[#f4f4f4] text-[15px] text-[#222] transition hover:bg-[#ececec]"
                      >
                        <ShoppingBag size={17} strokeWidth={1.8} />
                        Orders
                      </Link>
                      <Link
                        href="/account/addresses"
                        onClick={() => setOpenAccount(false)}
                        className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[16px] bg-[#f4f4f4] text-[15px] text-[#222] transition hover:bg-[#ececec]"
                      >
                        <User size={17} strokeWidth={1.8} />
                        Profile
                      </Link>
                    </div>

                    <button
                      onClick={handleSignOut}
                      className="mt-4 w-full text-center text-[13px] text-[#888] transition hover:text-[#1a1a1a]"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  /* ── SIGNED OUT STATE ── */
                  <>
                    <div className="mb-5">
                      <h3 className="text-[18px] font-medium tracking-[-0.03em] text-[#1f1f1f]">
                        Account
                      </h3>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => {
                          window.open(
                            "/auth/shop-login",
                            "ShopLogin",
                            "width=440,height=600,left=400,top=100,resizable=yes,scrollbars=yes"
                          );
                          setOpenAccount(false);
                        }}
                        className="flex h-[52px] w-full items-center justify-center rounded-[16px] bg-[#5A31F4] text-[15px] font-medium text-white transition hover:opacity-90"
                      >
                        Sign in with shop
                      </button>
                      <button
                        onClick={() => { window.location.href = "/auth/login"; setOpenAccount(false); }}
                        className="flex h-[45px] w-full items-center justify-center rounded-[16px] bg-black text-[15px] font-medium text-white transition hover:opacity-90"
                      >
                        Other sign in options
                      </button>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link href="/account" className="flex h-[45px] flex-1 items-center justify-center gap-2 rounded-[16px] bg-[#f4f4f4] text-[15px] text-[#222] transition hover:bg-[#ececec]">
                        <ShoppingBag size={17} strokeWidth={1.8} />
                        Orders
                      </Link>
                      <Link href="/account/addresses" className="flex h-[45px] flex-1 items-center justify-center gap-2 rounded-[16px] bg-[#f4f4f4] text-[15px] text-[#222] transition hover:bg-[#ececec]">
                        <User size={17} strokeWidth={1.8} />
                        Profile
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* CART */}
          <button onClick={() => setCartOpen(true)} className="relative transition hover:opacity-60" aria-label="Open cart">
            <ShoppingBag size={24} strokeWidth={1.8} />
            {totalCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* CART DRAWER */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
