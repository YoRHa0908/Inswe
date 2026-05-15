"use client";

import { X } from "lucide-react";

interface ShopLoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ShopLoginModal({
  open,
  onClose,
}: ShopLoginModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-[380px] rounded-[22px] bg-white px-5 pb-7 pt-5 sm:px-6 sm:pb-8 sm:pt-6">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 transition hover:opacity-60"
        >
          <X size={20} />
        </button>

        {/* TOP ICONS */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#5A31F4] text-[20px] font-semibold text-white">
            shop
          </div>

          <div className="text-[#cfcfcf]">•••</div>

          <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#dddddd] bg-[#f6f6f6] text-[26px] text-black">
            I
          </div>
        </div>

        {/* TITLE */}
        <div className="mt-7 text-center">
          <h2 className="text-[22px] font-semibold tracking-[-0.04em] text-black">
            Sign in to Shop
          </h2>

          <p className="mt-2 text-[15px] text-[#666]">
            To continue to{" "}
            <span className="font-medium text-black">Inswè</span>
          </p>
        </div>

        {/* INPUT */}
        <div className="mt-8">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-[54px] w-full rounded-full border border-black/70 px-5 text-[15px] outline-none"
          />
        </div>

        {/* BUTTON */}
        <button className="mt-5 flex h-[54px] w-full items-center justify-center rounded-full bg-[#5A31F4] text-[17px] font-medium text-white transition hover:opacity-90">
          Continue
        </button>

        {/* PASSKEY */}
        <button className="mt-8 flex w-full items-center justify-center gap-2 text-[16px] font-medium text-black">
          <span>⌁</span>
          Use a passkey
        </button>

        {/* TERMS */}
        <p className="mx-auto mt-8 max-w-[290px] text-center text-[12px] leading-[18px] text-[#777]">
          By continuing, you agree to Shop’s terms, privacy policy,
          and to sharing your email, name, and avatar with Inswè.
        </p>

        {/* LANGUAGE */}
        <div className="mt-12 text-center text-[14px] text-[#666]">
          English ˅
        </div>
      </div>
    </div>
  );
}