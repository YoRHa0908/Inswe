"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/CartContext";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const relatedProducts = [
  { id: 1, name: "black half zipper",     price: 79.99, image: "/assets/images/PHO00007.JPG" },
  { id: 2, name: "Black rope trucker cap", price: 79.99, image: "/assets/images/PHO00003.JPG" },
  { id: 5, name: "blue truck robe cap",    price: 84.99, image: "/assets/images/PHO00006.JPG" },
  { id: 6, name: "Brown half zipper cap",  price: 79.99, image: "/assets/images/PHO00009.JPG" },
];

export default function CartPage() {
  const { items, totalCount, updateQty, removeItem } = useCart();
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="mx-auto max-w-[1200px] px-6 py-8">

        {/* ── CART TITLE ── */}
        <div className="mb-6 flex items-center gap-2">
          <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Cart</h1>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0f0f0] text-[12px] font-medium text-[#555]">
            {totalCount}
          </span>
        </div>

        <div className="flex gap-8">

          {/* ── LEFT: ITEMS ── */}
          <div className="flex-1">
            {items.length === 0 ? (
              <div className="py-16 text-center text-[14px] text-[#aaa]">
                Your cart is empty.{" "}
                <Link href="/shop" className="text-[#1a1a1a] underline">
                  Continue shopping
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#f0f0f0]">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-5">
                    {/* Image */}
                    <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-md bg-[#f3f3f3]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Name + price */}
                    <div className="flex-1">
                      <p className="text-[14px] font-medium text-[#1a1a1a]">{item.name}</p>
                      <p className="mt-0.5 text-[13px] text-[#888]">£{item.price.toFixed(2)}</p>
                    </div>

                    {/* Qty stepper */}
                    <div className="flex items-center gap-2 rounded-full border border-[#e0e0e0] px-2 py-1">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        aria-label="Decrease"
                        className="flex h-5 w-5 items-center justify-center text-[#555] transition hover:text-[#1a1a1a]"
                      >
                        <Minus size={12} strokeWidth={2} />
                      </button>
                      <span className="w-5 text-center text-[13px] font-medium text-[#1a1a1a]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        aria-label="Increase"
                        className="flex h-5 w-5 items-center justify-center text-[#555] transition hover:text-[#1a1a1a]"
                      >
                        <Plus size={12} strokeWidth={2} />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove"
                      className="text-[#aaa] transition hover:text-[#e55]"
                    >
                      <Trash2 size={16} strokeWidth={1.8} />
                    </button>

                    {/* Line total */}
                    <span className="w-20 text-right text-[14px] font-medium text-[#1a1a1a]">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: SUMMARY ── */}
          <div className="w-[280px] shrink-0">
            <div className="sticky top-24 rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-5">

              {/* Discount */}
              <div className="mb-4 border-b border-[#e5e5e5] pb-4">
                <button
                  onClick={() => setDiscountOpen((o) => !o)}
                  className="flex w-full items-center justify-between text-[13px] text-[#555] transition hover:text-[#1a1a1a]"
                >
                  <span>Discount</span>
                  <Plus size={14} strokeWidth={2} />
                </button>
                {discountOpen && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="h-8 flex-1 rounded-lg border border-[#d0d0d0] px-2.5 text-[12px] outline-none focus:border-[#1a1a1a]"
                    />
                    <button className="h-8 rounded-lg bg-[#1a1a1a] px-3 text-[11px] font-medium text-white transition hover:bg-[#333]">
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Estimated total */}
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[13px] text-[#555]">Estimated total</span>
                <span className="text-[16px] font-semibold text-[#1a1a1a]">
                  £{total.toFixed(2)} GBP
                </span>
              </div>
              <p className="mb-5 text-[11px] leading-relaxed text-[#aaa]">
                Duties and taxes included. Shipping is calculated at checkout.
              </p>

              {/* Checkout buttons */}
              <div className="flex flex-col gap-2">
                <button className="flex h-11 w-full items-center justify-center rounded-full bg-[#1a1a1a] text-[13px] font-medium text-white transition hover:bg-[#333]">
                  Check out
                </button>
                <button className="flex h-11 w-full items-center justify-center rounded-full bg-[#5A31F4] text-[14px] font-bold text-white transition hover:opacity-90">
                  shop
                </button>
                <button className="flex h-11 w-full items-center justify-center rounded-full bg-[#FFC439] text-[14px] font-bold transition hover:opacity-90">
                  <span className="italic text-[#003087]">Pay</span>
                  <span className="italic text-[#009cde]">Pal</span>
                </button>
                <button className="flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-[#1a1a1a] text-[13px] font-medium text-white transition hover:bg-[#333]">
                  <svg viewBox="0 0 24 10" width="24" height="10" fill="none">
                    <text x="0" y="9" fontSize="9" fontWeight="600" fill="#4285F4">G</text>
                  </svg>
                  <span className="text-[13px] font-medium text-white">Pay</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── YOU MAY ALSO LIKE ── */}
        <div className="mt-16">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[18px] font-semibold text-[#1a1a1a]">You may also like</h2>
            <Link href="/shop" className="text-[13px] text-[#555] transition hover:text-[#1a1a1a]">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f3f3f3]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1200px) 25vw"
                  />
                </div>
                <p className="mt-2 text-[13px] font-medium text-[#1a1a1a]">{product.name}</p>
                <p className="mt-0.5 text-[12px] text-[#888]">£{product.price.toFixed(2)} GBP</p>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
