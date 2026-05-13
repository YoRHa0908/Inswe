"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle auth
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f5] px-4">

      {/* Card */}
      <div className="w-full max-w-[450px] rounded-2xl border border-[#e5e5e5] bg-white px-10 py-10">

        {/* Brand */}
        <p className="mb-8 text-center text-[28px] font-bold tracking-[-0.03em] text-[#1a1a1a]">
          Inswè
        </p>

        {/* Title + subtitle */}
        <h1 className="mb-1 text-[21px] font-bold tracking-[-0.02em] text-[#1a1a1a]">
          Sign in
        </h1>
        <p className="mb-7 text-[14px] text-[#888]">
          Sign in or create an account
        </p>

        {/* Continue with shop */}
        <button
          type="button"
          className="mb-5 flex h-14 w-full items-center justify-center rounded-xl bg-[#6B46F5] text-[14px] font-bold text-white transition hover:opacity-90"
        >
          Continue with shop
        </button>

        {/* Divider */}
        <div className="mb-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#e0e0e0]" />
          <span className="text-[14px] text-[#aaa]">or</span>
          <div className="h-px flex-1 bg-[#e0e0e0]" />
        </div>

        {/* Email + Continue */}
        <form onSubmit={handleContinue} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            className="h-14 w-full rounded-xl border-2 border-[#d0d0d0] bg-white px-4 text-[14px] text-[#222] outline-none placeholder:text-[#aaa] focus:border-[#2563EB]"
          />
          <button
            type="submit"
            className="flex h-14 w-full items-center justify-center rounded-xl bg-[#2563EB] text-[14px] font-bold text-white transition hover:opacity-90"
          >
            Continue
          </button>
        </form>

        {/* Terms */}
        <p className="mt-6 text-center text-[13px] text-[#aaa]">
          By continuing, you agree to our{" "}
          <Link
            href="/terms-of-service"
            className="text-[#aaa] underline underline-offset-2 transition hover:text-[#555]"
          >
            Terms of service
          </Link>
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8">
        <Link
          href="/privacy-policy"
          className="text-[13px] text-[#4a90e2] no-underline transition hover:opacity-70"
        >
          Privacy policy
        </Link>
      </div>

    </div>
  );
}
