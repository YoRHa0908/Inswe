"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function VerifyPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("pending_email") || "";
    setEmail(savedEmail);
  }, []);

  async function verifyOtp(finalCode: string) {
    try {
      setLoading(true);
      setError("");

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: finalCode,
        type: "email",
      });

      if (error) {
        setError("Invalid verification code");
        return;
      }

      window.location.href = "/";
    } catch (err) {
      setError("Verification failed");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;

    const updated = [...code];
    updated[index] = value.slice(-1);
    setCode(updated);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    const finalCode = updated.join("");

    if (finalCode.length === 6 && !updated.includes("")) {
      verifyOtp(finalCode);
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] px-4">
      <div className="w-full max-w-[380px] rounded-[28px] bg-white px-7 pb-8 pt-8 shadow-sm">
        {/* ICON */}
        <div className="flex justify-center">
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[18px] bg-[#5A31F4] text-[32px] text-white shadow-md">
            ✉
          </div>
        </div>

        {/* TITLE */}
        <div className="mt-8 text-center">
          <h1 className="text-[22px] font-semibold tracking-[-0.04em] text-black">
            Verify your email
          </h1>

          <p className="mt-2 text-[15px] text-[#6f6f6f]">
            Enter code sent to
          </p>

          <p className="mt-1 text-[16px] font-medium text-black">
            {email}
          </p>
        </div>

        {/* OTP */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-[56px] w-[48px] rounded-[14px] border border-[#dddddd] bg-[#fafafa] text-center text-[22px] font-semibold outline-none focus:border-black"
            />
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <p className="mt-4 text-center text-[13px] text-red-500">
            {error}
          </p>
        )}
        {/* LOADING */}
        {loading && (
          <p className="mt-4 text-center text-[13px] text-[#666]">
            Verifying...
          </p>
        )}
        {/* CHANGE EMAIL */}
        <button
          onClick={() => {
            window.location.href = "/auth/shop";
          }}
          className="mt-8 w-full text-center text-[15px] font-medium text-black hover:opacity-60"
        >
          Change email address
        </button>
      </div>
    </div>
  );
}