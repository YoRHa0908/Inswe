"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/lib/CartContext";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalCount, updateQty, removeItem } = useCart();
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div onClick={onClose} className="fixed inset-0 z-40 bg-black/30" />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-1/5 flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="text-[18px] font-semibold text-[#1a1a1a]">Cart</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0f0f0] text-[12px] font-medium text-[#555]">
              {totalCount}
            </span>
          </div>
          <button onClick={onClose} aria-label="Close cart" className="text-[#888] transition hover:text-[#1a1a1a]">
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-[13px] text-[#aaa]">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col divide-y divide-[#f0f0f0]">
              {items.map((item) => (
                <div key={item.id} className="py-4">
                  <div className="flex items-start gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#f3f3f3]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[13px] font-medium leading-snug text-[#1a1a1a]">{item.name}</span>
                        <span className="shrink-0 text-[13px] font-medium text-[#1a1a1a]">
                          £{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <span className="mt-0.5 text-[12px] text-[#888]">£{item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-[#e0e0e0] px-2 py-1">
                      <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease" className="flex h-5 w-5 items-center justify-center text-[#555] transition hover:text-[#1a1a1a]">
                        <Minus size={12} strokeWidth={2} />
                      </button>
                      <span className="w-5 text-center text-[13px] font-medium text-[#1a1a1a]">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} aria-label="Increase" className="flex h-5 w-5 items-center justify-center text-[#555] transition hover:text-[#1a1a1a]">
                        <Plus size={12} strokeWidth={2} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="text-[#aaa] transition hover:text-[#e55]">
                      <Trash2 size={15} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t border-[#f0f0f0] px-5 pb-6 pt-4">
          <div className="mb-4 border-b border-[#f0f0f0] pb-4">
            <button
              onClick={() => setDiscountOpen((o) => !o)}
              className="flex w-full items-center justify-between text-[13px] text-[#555] transition hover:text-[#1a1a1a]"
            >
              <span>Discount</span>
              <Plus size={15} strokeWidth={1.8} />
            </button>
            {discountOpen && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="h-9 flex-1 rounded-lg border border-[#d0d0d0] px-3 text-[13px] outline-none focus:border-[#1a1a1a]"
                />
                <button className="h-9 rounded-lg bg-[#1a1a1a] px-3 text-[12px] font-medium text-white transition hover:bg-[#333]">
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className="mb-1 flex items-center justify-between">
            <span className="text-[13px] text-[#555]">Estimated total</span>
            <span className="text-[16px] font-semibold text-[#1a1a1a]">£{total.toFixed(2)} GBP</span>
          </div>
          <p className="mb-4 text-[11px] text-[#aaa]">
            Duties and taxes included. Shipping is calculated at checkout.
          </p>

          <div className="flex flex-col gap-2">
            <Link href="/cart" onClick={onClose} className="flex h-12 w-full items-center justify-center rounded-full bg-[#1a1a1a] text-[14px] font-medium text-white transition hover:bg-[#333]">
              Check out
            </Link>
            <button className="flex h-12 w-full items-center justify-center rounded-full bg-[#5A31F4] text-[14px] font-bold text-white transition hover:opacity-90">
              shop
            </button>
            <button className="flex h-12 w-full items-center justify-center rounded-full bg-[#FFC439] text-[14px] font-bold italic transition hover:opacity-90">
              <span className="text-[#003087]">Pay</span>
              <span className="text-[#009cde]">Pal</span>
            </button>
            <button className="flex h-12 w-full items-center justify-center rounded-full bg-[#1a1a1a] text-[14px] font-medium text-white transition hover:bg-[#333]">
              G Pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
