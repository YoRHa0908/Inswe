"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Mail } from "lucide-react";

export default function ShopAuthPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleContinue() {
    try {
      setLoading(true);
      setError("");

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      localStorage.setItem("pending_email", email);

      window.location.href = "/auth/verify";
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] px-4">
      <div className="w-full max-w-[380px] rounded-[28px] bg-white px-7 pb-8 pt-8 shadow-sm">
        {/* TOP */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#5A31F4] text-[18px] font-semibold text-white">
            shop
          </div>

          <div className="text-[#d0d0d0]">•••</div>

          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#e4e4e4] bg-[#f7f7f7] text-[24px] font-medium">
            I
          </div>
        </div>

        {/* TITLE */}
        <div className="mt-8 text-center">
          <h1 className="text-[22px] font-semibold tracking-[-0.04em] text-black">
            Sign in to Shop
          </h1>

          <p className="mt-2 text-[15px] text-[#6d6d6d]">
            To continue to <span className="font-medium text-black">Inswè</span>
          </p>
        </div>

        {/* INPUT */}
        <div className="mt-8">
          <div className="flex h-[56px] items-center rounded-full border border-black/60 bg-white px-5">
            <Mail size={18} className="mr-3 text-[#666]" />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent text-[15px] outline-none"
            />
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <p className="mt-3 text-center text-[13px] text-red-500">
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleContinue}
          disabled={loading || !email}
          className="mt-5 flex h-[56px] w-full items-center justify-center rounded-full bg-[#5A31F4] text-[16px] font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Continue"}
        </button>

        {/* FOOTER */}
        <div className="mt-12 text-center text-[13px] text-[#767676]">
          By continuing, you agree to the terms.
        </div>
      </div>
    </div>
  );
}