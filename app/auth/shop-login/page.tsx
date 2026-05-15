"use client";

import { useState, useRef } from "react";

type Step = "email" | "otp";

export default function ShopLoginPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ── STEP 1: send OTP ──────────────────────────────────────────
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

  // ── STEP 2: verify OTP ───────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter the full 6-digit code."); return; }

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

    // ✅ Success — notify parent window and close popup
    localStorage.setItem("inswe_auth_ts", Date.now().toString());
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ type: "SHOP_LOGIN_SUCCESS", email }, window.location.origin);
    }
    window.close();
  };

  // ── OTP helpers ───────────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length > 0) {
      const next = [...otp];
      pasted.split("").forEach((d, i) => { if (i < 6) next[i] = d; });
      setOtp(next);
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((s) => { if (s <= 1) { clearInterval(interval); return 0; } return s - 1; });
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
    if (!res.ok) { setError(data.error ?? "Failed to resend code."); return; }
    setOtp(["", "", "", "", "", ""]);
    startResendCooldown();
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f5] px-4">
      <div className="w-full max-w-[400px] rounded-2xl border border-[#e5e5e5] bg-white px-6 py-8 shadow-lg sm:px-8 sm:py-10">

        {/* Brand */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5A31F4]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
          </div>
          <span className="text-[17px] font-bold text-[#1a1a1a]">shop</span>
        </div>

        {step === "email" && (
          <>
            <h1 className="mb-1 text-[20px] font-bold text-[#1a1a1a]">Sign in with Shop</h1>
            <p className="mb-6 text-[13px] text-[#888]">
              Enter your email to sign in or create a Shop account.
            </p>

            <form onSubmit={handleSendOtp} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="h-12 w-full rounded-xl border-2 border-[#d0d0d0] bg-white px-4 text-[14px] text-[#222] outline-none placeholder:text-[#aaa] focus:border-[#5A31F4]"
              />

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#5A31F4] text-[14px] font-bold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Sending code…" : "Continue"}
              </button>
            </form>

            <p className="mt-5 text-center text-[11px] text-[#aaa]">
              By continuing, you agree to Shop&apos;s Terms of Service and Privacy Policy.
            </p>
          </>
        )}

        {step === "otp" && (
          <>
            <h1 className="mb-1 text-[20px] font-bold text-[#1a1a1a]">Check your email</h1>
            <p className="mb-1 text-[13px] text-[#888]">We sent a 6-digit code to</p>
            <p className="mb-6 text-[13px] font-semibold text-[#1a1a1a]">{email}</p>

            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
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
                    className={`h-12 w-full rounded-xl border-2 bg-white text-center text-[20px] font-semibold text-[#1a1a1a] outline-none transition ${
                      digit ? "border-[#5A31F4]" : "border-[#d0d0d0] focus:border-[#5A31F4]"
                    }`}
                  />
                ))}
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || otp.join("").length < 6}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#5A31F4] text-[14px] font-bold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Verifying…" : "Verify & sign in"}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between text-[12px]">
              <button
                onClick={() => { setStep("email"); setError(null); setOtp(["","","","","",""]); }}
                className="text-[#555] transition hover:text-[#1a1a1a]"
              >
                ← Change email
              </button>
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0 || loading}
                className="text-[#5A31F4] transition hover:opacity-70 disabled:text-[#aaa]"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
