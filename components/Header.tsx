"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, User, Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { totalCount } = useCart();

  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  const readSession = () => {
    try {
      const match = document.cookie.match(/(?:^|;\s*)inswe_user=([^;]+)/);
      if (match) {
        const email = decodeURIComponent(match[1]);
        if (email) { setSessionEmail(email); return; }
      }
    } catch {}
    setSessionEmail(null);
  };

  useEffect(() => {
    readSession();
    window.addEventListener("focus", readSession);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "inswe_auth_ts" || e.key === null) readSession();
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("focus", readSession);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

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

  const { profile } = useUserStore(sessionEmail ?? "");
  const displayFirst = profile.firstName || (sessionEmail ? sessionEmail.split("@")[0] : "");
  const initial = displayFirst.charAt(0).toUpperCase();

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
    <>
      <header className="fixed top-0 z-50 w-full border-b border-[#e5e5e5] bg-[#f5f5f5] dark:border-[#2a2a2a] dark:bg-[#111]">
        <div className="mx-auto flex h-[72px] w-full max-w-[1920px] items-center justify-between px-4 lg:px-10">

          {/* MOBILE: hamburger */}
          <button
            className="flex items-center text-[#2b2b2b] dark:text-[#d0d0d0] md:hidden"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
          </button>

          {/* DESKTOP: left nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] font-normal tracking-[-0.02em] text-[#2b2b2b] transition hover:opacity-60 dark:text-[#d0d0d0]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* LOGO — centered absolutely */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold tracking-[-0.04em] text-[#1a1a1a] dark:text-white"
          >
            Inswè
          </Link>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">
            {/* ACCOUNT */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-label="Account"
                onClick={() => setOpenAccount((prev) => !prev)}
                className="text-[#1a1a1a] transition hover:opacity-80 dark:text-white"
              >
                {sessionEmail ? (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1a1a] text-[15px] font-semibold text-white dark:bg-white dark:text-[#1a1a1a]">
                    {initial}
                  </div>
                ) : (
                  <User size={22} strokeWidth={1.8} />
                )}
              </button>

              {openAccount && (
                <div className="absolute right-0 top-[48px] w-[min(320px,90vw)] rounded-[20px] border border-[#e8e8e8] bg-white p-5 shadow-xl dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
                  {sessionEmail ? (
                    <>
                      <div className="mb-5">
                        <h3 className="text-[20px] font-bold tracking-[-0.02em] text-[#1a1a1a] dark:text-white">
                          Account
                        </h3>
                        <p className="mt-1 truncate text-[14px] text-[#888]">{sessionEmail}</p>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href="/account"
                          onClick={() => setOpenAccount(false)}
                          className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[16px] bg-[#f4f4f4] text-[15px] text-[#222] transition hover:bg-[#ececec] dark:bg-[#2a2a2a] dark:text-white dark:hover:bg-[#333]"
                        >
                          <ShoppingBag size={17} strokeWidth={1.8} /> Orders
                        </Link>
                        <Link
                          href="/account/addresses"
                          onClick={() => setOpenAccount(false)}
                          className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[16px] bg-[#f4f4f4] text-[15px] text-[#222] transition hover:bg-[#ececec] dark:bg-[#2a2a2a] dark:text-white dark:hover:bg-[#333]"
                        >
                          <User size={17} strokeWidth={1.8} /> Profile
                        </Link>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="mt-4 w-full text-center text-[13px] text-[#888] transition hover:text-[#1a1a1a] dark:hover:text-white"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mb-5">
                        <h3 className="text-[18px] font-medium tracking-[-0.03em] text-[#1f1f1f] dark:text-white">
                          Account
                        </h3>
                      </div>
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => {
                            window.open("/auth/shop-login", "ShopLogin", "width=440,height=600,left=400,top=100,resizable=yes,scrollbars=yes");
                            setOpenAccount(false);
                          }}
                          className="flex h-[52px] w-full items-center justify-center rounded-[16px] bg-[#5A31F4] text-[15px] font-medium text-white transition hover:opacity-90"
                        >
                          Sign in with shop
                        </button>
                        <button
                          onClick={() => { window.location.href = "/auth/login"; setOpenAccount(false); }}
                          className="flex h-[45px] w-full items-center justify-center rounded-[16px] bg-[#1a1a1a] text-[15px] font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-[#1a1a1a]"
                        >
                          Other sign in options
                        </button>
                      </div>
                      <div className="mt-5 flex gap-3">
                        <Link
                          href="/account"
                          className="flex h-[45px] flex-1 items-center justify-center gap-2 rounded-[16px] bg-[#f4f4f4] text-[15px] text-[#222] transition hover:bg-[#ececec] dark:bg-[#2a2a2a] dark:text-white dark:hover:bg-[#333]"
                        >
                          <ShoppingBag size={17} strokeWidth={1.8} /> Orders
                        </Link>
                        <Link
                          href="/account/addresses"
                          className="flex h-[45px] flex-1 items-center justify-center gap-2 rounded-[16px] bg-[#f4f4f4] text-[15px] text-[#222] transition hover:bg-[#ececec] dark:bg-[#2a2a2a] dark:text-white dark:hover:bg-[#333]"
                        >
                          <User size={17} strokeWidth={1.8} /> Profile
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* CART */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#1a1a1a] transition hover:opacity-60 dark:text-white"
              aria-label="Open cart"
            >
              <ShoppingBag size={24} strokeWidth={1.8} />
              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#1a1a1a] text-[10px] text-white dark:bg-white dark:text-[#1a1a1a]">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="border-t border-[#e5e5e5] bg-[#f5f5f5] px-4 py-4 dark:border-[#2a2a2a] dark:bg-[#111] md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] text-[#2b2b2b] transition hover:bg-[#ececec] dark:text-[#d0d0d0] dark:hover:bg-[#222]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </header>
      <div className="h-[72px]" />
    </>
  );
}
