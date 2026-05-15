"use client";

import { Suspense, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Step = "email" | "otp";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ── STEP 1: send OTP via our API ─────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Failed to send code. Please try again.");
      return;
    }

    setStep("otp");
    startResendCooldown();
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  // ── STEP 2: verify OTP via our API ───────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setError(null);
    setLoading(true);

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Verification failed. Please try again.");
      return;
    }

    // Success — signal the Header to re-read the session cookie, then redirect
    localStorage.setItem("inswe_auth_ts", Date.now().toString());
    router.push(redirectTo);
    router.refresh();
  };

  // ── OTP input helpers ─────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length > 0) {
      const next = [...otp];
      pasted.split("").forEach((d, i) => { if (i < 6) next[i] = d; });
      setOtp(next);
      const focusIndex = Math.min(pasted.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  // ── Resend cooldown ───────────────────────────────────────────
  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((s) => {
        if (s <= 1) { clearInterval(interval); return 0; }
        return s - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError(null);
    setLoading(true);

    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Failed to resend code.");
      return;
    }

    setOtp(["", "", "", "", "", ""]);
    startResendCooldown();
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f5] px-4">

      <div className="w-full max-w-[450px] rounded-2xl border border-[#e5e5e5] bg-white px-5 py-7 sm:px-10 sm:py-10">

        {/* Brand */}
        <p className="mb-8 text-center text-[28px] font-bold tracking-[-0.03em] text-[#1a1a1a]">
          Inswè
        </p>

        {/* ── EMAIL STEP ── */}
        {step === "email" && (
          <>
            <h1 className="mb-1 text-[21px] font-bold tracking-[-0.02em] text-[#1a1a1a]">
              Sign in
            </h1>
            <p className="mb-7 text-[14px] text-[#888]">
              Sign in or create an account
            </p>

            <button
              type="button"
              onClick={() => {
                const popup = window.open(
                  "/auth/shop-login",
                  "ShopLogin",
                  "width=440,height=600,left=400,top=100,resizable=yes,scrollbars=yes"
                );
                // Listen for success from popup
                const handleMsg = (e: MessageEvent) => {
                  if (e.origin !== window.location.origin) return;
                  if (e.data?.type === "SHOP_LOGIN_SUCCESS") {
                    window.removeEventListener("message", handleMsg);
                    popup?.close();
                    router.push("/");
                    router.refresh();
                  }
                };
                window.addEventListener("message", handleMsg);
              }}
              className="mb-5 flex h-14 w-full items-center justify-center rounded-xl bg-[#6B46F5] text-[14px] font-bold text-white transition hover:opacity-90"
            >
              Continue with shop
            </button>

            <div className="mb-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e0e0e0]" />
              <span className="text-[14px] text-[#aaa]">or</span>
              <div className="h-px flex-1 bg-[#e0e0e0]" />
            </div>

            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="h-14 w-full rounded-xl border-2 border-[#d0d0d0] bg-white px-4 text-[14px] text-[#222] outline-none placeholder:text-[#aaa] focus:border-[#2563EB]"
              />

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-[#2563EB] text-[14px] font-bold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Sending code…" : "Continue"}
              </button>
            </form>

            <p className="mt-6 text-center text-[13px] text-[#aaa]">
              By continuing, you agree to our{" "}
              <Link href="/terms-of-service" className="text-[#aaa] underline underline-offset-2 transition hover:text-[#555]">
                Terms of service
              </Link>
            </p>
          </>
        )}

        {/* ── OTP STEP ── */}
        {step === "otp" && (
          <>
            <h1 className="mb-1 text-[21px] font-bold tracking-[-0.02em] text-[#1a1a1a]">
              Check your email
            </h1>
            <p className="mb-1 text-[14px] text-[#888]">
              We sent a 6-digit code to
            </p>
            <p className="mb-7 text-[14px] font-semibold text-[#1a1a1a]">{email}</p>

            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
              {/* 6 digit boxes */}
              <div className="flex justify-between gap-1.5 sm:gap-2" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`h-11 w-full rounded-xl border-2 bg-white text-center text-[18px] font-semibold text-[#1a1a1a] outline-none transition sm:h-14 sm:text-[22px] ${
                      digit ? "border-[#2563EB]" : "border-[#d0d0d0] focus:border-[#2563EB]"
                    }`}
                  />
                ))}
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || otp.join("").length < 6}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-[#2563EB] text-[14px] font-bold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Verifying…" : "Verify & sign in"}
              </button>
            </form>

            <div className="mt-5 flex items-center justify-between text-[13px]">
              <button
                onClick={() => { setStep("email"); setError(null); setOtp(["","","","","",""]); }}
                className="text-[#555] transition hover:text-[#1a1a1a]"
              >
                ← Change email
              </button>
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0 || loading}
                className="text-[#2563EB] transition hover:opacity-70 disabled:text-[#aaa] disabled:cursor-not-allowed"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <Link href="/privacy-policy" className="text-[13px] text-[#4a90e2] no-underline transition hover:opacity-70">
          Privacy policy
        </Link>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
