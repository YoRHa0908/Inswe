"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "@/lib/CartContext";
import StripePaymentForm from "@/components/StripePaymentForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const { items } = useCart();
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Create a PaymentIntent as soon as the page loads
  useEffect(() => {
    if (subtotal <= 0) return;
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: subtotal }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
      })
      .catch(console.error);
  }, [subtotal]);

  const [form, setForm] = useState({
    email: "jane0908hill@outlook.com",
    country: "United Kingdom",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postcode: "",
    saveInfo: true,
    payment: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
    billingAddress: true,
    // billing address fields (used when billingAddress === false)
    billCountry: "United Kingdom",
    billFirstName: "",
    billLastName: "",
    billAddress: "",
    billApartment: "",
    billCity: "",
    billPostcode: "",
  });

  const set = (k: string, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="flex min-h-screen flex-col bg-white">

      {/* ── HEADER ── */}
      <header className="border-b border-[#e5e5e5] bg-white">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
          {/* Logo — left aligned */}
          <Link href="/" className="text-[17px] font-semibold tracking-[-0.03em] text-[#1a1a1a]">
            Inswè
          </Link>

          {/* Cart icon — links back to cart page */}
          <Link href="/cart" aria-label="Back to cart" className="flex h-8 w-8 items-center justify-center text-[#555] transition hover:text-[#1a1a1a]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </Link>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="mx-auto flex w-full max-w-[1100px] flex-1 gap-0">

        {/* ── LEFT: FORM ── */}
        <div className="flex-1 px-6 py-8 pr-12">

          {/* Express checkout */}
          <p className="mb-3 text-center text-[12px] text-[#888]">Express checkout</p>
          <div className="mb-4 flex gap-2">
            {/* Shop Pay */}
            <button className="flex h-11 flex-1 items-center justify-center rounded-lg bg-[#5A31F4] text-[15px] font-bold text-white transition hover:opacity-90">
              shop
            </button>
            {/* PayPal */}
            <button className="flex h-11 flex-1 items-center justify-center rounded-lg bg-[#FFC439] transition hover:opacity-90">
              <span className="text-[15px] font-bold italic text-[#003087]">Pay</span>
              <span className="text-[15px] font-bold italic text-[#009cde]">Pal</span>
            </button>
            {/* Google Pay */}
            <button className="flex h-11 flex-1 items-center justify-center gap-0.5 rounded-lg bg-[#1a1a1a] transition hover:bg-[#333]">
              <span className="text-[15px] font-bold text-[#4285F4]">G</span>
              <span className="text-[15px] font-bold text-white"> Pay</span>
            </button>
          </div>

          {/* OR divider */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e5e5e5]" />
            <span className="text-[12px] text-[#aaa]">OR</span>
            <div className="h-px flex-1 bg-[#e5e5e5]" />
          </div>

          {/* Contact */}
          <div className="mb-5">
            <div className="flex items-center justify-between rounded-lg border border-[#d0d0d0] px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#aaa]">1</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="flex-1 bg-transparent text-[13px] text-[#222] outline-none"
                  placeholder="Email"
                />
              </div>
              <button className="text-[#aaa] transition hover:text-[#555]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Delivery */}
          <h2 className="mb-3 text-[15px] font-semibold text-[#1a1a1a]">Delivery</h2>

          {/* Country */}
          <div className="relative mb-2">
            <select
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#222] outline-none focus:border-[#1a1a1a]"
            >
              <option>United Kingdom</option>
              <option>United States</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Germany</option>
              <option>France</option>
              <option>Thailand</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          {/* First + Last */}
          <div className="mb-2 grid grid-cols-2 gap-2">
            <input type="text" placeholder="First name (optional)" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className="h-11 rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#1a1a1a]" />
            <input type="text" placeholder="Last name" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className="h-11 rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#1a1a1a]" />
          </div>

          {/* Address */}
          <div className="relative mb-2">
            <input type="text" placeholder="Address" value={form.address} onChange={(e) => set("address", e.target.value)} className="h-11 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#1a1a1a]" />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>

          {/* Apartment */}
          <input type="text" placeholder="Apartment, suite, etc. (optional)" value={form.apartment} onChange={(e) => set("apartment", e.target.value)} className="mb-2 h-11 w-full rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#1a1a1a]" />

          {/* City + Postcode */}
          <div className="mb-5 grid grid-cols-2 gap-2">
            <input type="text" placeholder="City" value={form.city} onChange={(e) => set("city", e.target.value)} className="h-11 rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#1a1a1a]" />
            <input type="text" placeholder="Postcode" value={form.postcode} onChange={(e) => set("postcode", e.target.value)} className="h-11 rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#1a1a1a]" />
          </div>

          {/* Shipping method */}
          <h2 className="mb-3 text-[15px] font-semibold text-[#1a1a1a]">Shipping method</h2>
          <div className="mb-6 rounded-lg bg-[#f5f5f5] px-4 py-3 text-[13px] text-[#888]">
            Enter your shipping address to view available shipping methods.
          </div>

          {/* Payment */}
          <h2 className="mb-1 text-[16px] font-bold text-[#1a1a1a]">Payment</h2>
          <p className="mb-3 text-[13px] text-[#888]">All transactions are secure and encrypted.</p>

          <div className="mb-5 overflow-hidden rounded-lg border-2 border-[#2563EB]">

            {/* ── Credit card row ── */}
            <div
              className={`flex cursor-pointer items-center justify-between px-4 py-3 ${
                form.payment === "card" ? "bg-[#f0f5ff]" : "bg-white"
              }`}
              onClick={() => set("payment", "card")}
            >
              <label className="flex cursor-pointer items-center gap-2.5">
                <input type="radio" name="payment" checked={form.payment === "card"} onChange={() => set("payment", "card")} className="h-4 w-4 accent-[#2563EB]" />
                <span className="text-[14px] font-medium text-[#1a1a1a]">Credit card</span>
              </label>
              <div className="flex items-center gap-1.5">
                {/* VISA */}
                <div className="flex h-6 w-10 items-center justify-center rounded border border-[#e5e5e5] bg-white text-[9px] font-bold tracking-wide text-[#1a1a8c]">VISA</div>
                {/* Mastercard 1 */}
                <div className="flex h-6 w-10 items-center justify-center rounded border border-[#e5e5e5] bg-white">
                  <div className="flex">
                    <div className="h-4 w-4 rounded-full bg-[#eb001b]" />
                    <div className="-ml-2 h-4 w-4 rounded-full bg-[#f79e1b] opacity-90" />
                  </div>
                </div>
                {/* Mastercard 2 */}
                <div className="flex h-6 w-10 items-center justify-center rounded border border-[#e5e5e5] bg-white">
                  <div className="flex">
                    <div className="h-4 w-4 rounded-full bg-[#ff5f00]" />
                    <div className="-ml-2 h-4 w-4 rounded-full bg-[#eb001b] opacity-90" />
                  </div>
                </div>
                {/* +5 */}
                <div className="flex h-6 w-8 items-center justify-center rounded border border-[#e5e5e5] bg-white text-[10px] font-medium text-[#555]">+5</div>
              </div>
            </div>

            {/* Card fields */}
            {form.payment === "card" && (
              <div className="bg-[#f5f7fa] px-4 pb-4 pt-3">
                {clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
                    <StripePaymentForm onSuccess={() => {}} />
                  </Elements>
                ) : (
                  <div className="flex flex-col gap-2">
                    {/* Card number */}
                    <div className="relative">
                      <input type="text" placeholder="Card number" value={form.cardNumber} onChange={(e) => set("cardNumber", e.target.value)} className="h-12 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#2563EB]" />
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    {/* Expiry + CVV */}
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Expiration date (MM / YY)" value={form.expiry} onChange={(e) => set("expiry", e.target.value)} className="h-12 rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#2563EB]" />
                      <div className="relative">
                        <input type="text" placeholder="Security code" value={form.cvv} onChange={(e) => set("cvv", e.target.value)} className="h-12 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#2563EB]" />
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                        </svg>
                      </div>
                    </div>
                    {/* Name on card */}
                    <input type="text" placeholder="Name on card" value={form.nameOnCard} onChange={(e) => set("nameOnCard", e.target.value)} className="h-12 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#2563EB]" />
                    {/* Billing checkbox */}
                    <label className="mt-1 flex cursor-pointer items-center gap-2.5 text-[13px] text-[#444]">
                      <input type="checkbox" checked={!!form.billingAddress} onChange={(e) => set("billingAddress", e.target.checked)} className="h-4 w-4 cursor-pointer rounded accent-[#2563EB]" />
                      Use shipping address as billing address
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* ── PayPal row ── */}
            <div
              className={`flex cursor-pointer items-center justify-between border-t border-[#e5e5e5] px-4 py-3 ${
                form.payment === "paypal" ? "bg-[#f0f5ff]" : "bg-white"
              }`}
              onClick={() => set("payment", "paypal")}
            >
              <label className="flex cursor-pointer items-center gap-2.5">
                <input type="radio" name="payment" checked={form.payment === "paypal"} onChange={() => set("payment", "paypal")} className="h-4 w-4 accent-[#2563EB]" />
                <span className="text-[14px] font-medium text-[#1a1a1a]">PayPal</span>
              </label>
              <span className="text-[15px] font-bold italic">
                <span className="text-[#003087]">Pay</span><span className="text-[#009cde]">Pal</span>
              </span>
            </div>

            {/* PayPal redirect notice */}
            {form.payment === "paypal" && (
              <div className="border-t border-[#e5e5e5] bg-[#f5f5f5] px-4 py-3 text-center text-[13px] text-[#555]">
                You&apos;ll be redirected to PayPal to complete your purchase
              </div>
            )}
          </div>

          {/* ── Billing address (shown when PayPal selected) ── */}
          {form.payment === "paypal" && (
            <div className="mb-5">
              <h2 className="mb-3 text-[15px] font-semibold text-[#1a1a1a]">Billing address</h2>
              <div className="overflow-hidden rounded-lg border border-[#d0d0d0]">

                {/* Same as shipping */}
                <div
                  className={`flex cursor-pointer items-center gap-2 px-4 py-3 ${
                    form.billingAddress ? "border-b border-[#2563EB] bg-[#f0f5ff]" : "border-b border-[#e5e5e5] bg-white"
                  }`}
                  onClick={() => set("billingAddress", true)}
                >
                  <input type="radio" name="billing" checked={!!form.billingAddress} onChange={() => set("billingAddress", true)} className="accent-[#2563EB]" />
                  <span className="text-[13px] text-[#1a1a1a]">Same as shipping address</span>
                </div>

                {/* Use a different billing address */}
                <div
                  className={`flex cursor-pointer items-center gap-2 px-4 py-3 ${
                    !form.billingAddress ? "border-b border-[#2563EB] bg-[#f0f5ff]" : "bg-white"
                  }`}
                  onClick={() => set("billingAddress", false)}
                >
                  <input type="radio" name="billing" checked={!form.billingAddress} onChange={() => set("billingAddress", false)} className="accent-[#2563EB]" />
                  <span className="text-[13px] text-[#1a1a1a]">Use a different billing address</span>
                </div>

                {/* Billing address form — expands when different address selected */}
                {!form.billingAddress && (
                  <div className="bg-[#f5f5f5] px-4 pb-4 pt-3">
                    {/* Country */}
                    <div className="relative mb-2">
                      <label className="mb-0.5 block text-[11px] text-[#888]">Country/Region</label>
                      <select
                        value={form.billCountry}
                        onChange={(e) => set("billCountry", e.target.value)}
                        className="h-11 w-full appearance-none rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#222] outline-none focus:border-[#2563EB]"
                      >
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Australia</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>Thailand</option>
                      </select>
                      <svg className="pointer-events-none absolute right-3 bottom-3 text-[#888]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    {/* First + Last */}
                    <div className="mb-2 grid grid-cols-2 gap-2">
                      <input type="text" placeholder="First name (optional)" value={form.billFirstName} onChange={(e) => set("billFirstName", e.target.value)} className="h-11 rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] outline-none placeholder:text-[#bbb] focus:border-[#2563EB]" />
                      <input type="text" placeholder="Last name" value={form.billLastName} onChange={(e) => set("billLastName", e.target.value)} className="h-11 rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] outline-none placeholder:text-[#bbb] focus:border-[#2563EB]" />
                    </div>

                    {/* Address */}
                    <div className="relative mb-2">
                      <input type="text" placeholder="Address" value={form.billAddress} onChange={(e) => set("billAddress", e.target.value)} className="h-11 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] outline-none placeholder:text-[#bbb] focus:border-[#2563EB]" />
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                      </svg>
                    </div>

                    {/* Apartment */}
                    <input type="text" placeholder="Apartment, suite, etc. (optional)" value={form.billApartment} onChange={(e) => set("billApartment", e.target.value)} className="mb-2 h-11 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] outline-none placeholder:text-[#bbb] focus:border-[#2563EB]" />

                    {/* City + Postcode */}
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="City" value={form.billCity} onChange={(e) => set("billCity", e.target.value)} className="h-11 rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] outline-none placeholder:text-[#bbb] focus:border-[#2563EB]" />
                      <input type="text" placeholder="Postcode" value={form.billPostcode} onChange={(e) => set("billPostcode", e.target.value)} className="h-11 rounded-lg border border-[#d0d0d0] bg-white px-3 text-[13px] outline-none placeholder:text-[#bbb] focus:border-[#2563EB]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Save info */}
          <div className="mb-5 rounded-lg border border-[#d0d0d0] px-4 py-3">
            <div className="flex items-start gap-2">
              <input type="checkbox" checked={form.saveInfo} onChange={(e) => set("saveInfo", e.target.checked)} className="mt-0.5 accent-[#2563EB]" />
              <div>
                <p className="text-[13px] font-medium text-[#1a1a1a]">Save my information for a faster checkout</p>
                <p className="mt-0.5 text-[11px] text-[#aaa]">
                  By paying, you agree to create a Shop account subject to Shop&apos;s{" "}
                  <Link href="/terms-of-service" className="underline">Terms</Link> and{" "}
                  <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
                </p>
              </div>
              <button className="ml-auto shrink-0 text-[12px] text-[#4a90e2]">Not now</button>
            </div>
          </div>

          {/* Pay button — always visible, changes based on payment method */}
          {form.payment === "card" ? (
            <button className="mb-6 flex h-12 w-full items-center justify-center rounded-lg bg-[#2563EB] text-[15px] font-semibold text-white transition hover:bg-[#1d4ed8]">
              Pay now
            </button>
          ) : (
            <button className="mb-6 flex h-12 w-full items-center justify-center gap-1.5 rounded-lg bg-[#0070ba] text-[15px] font-medium text-white transition hover:bg-[#005ea6]">
              Pay with <span className="font-bold italic">PayPal</span>
            </button>
          )}

          {/* Footer links */}
          <div className="flex items-center justify-center gap-4">
            <Link href="/refund-policy" className="text-[11px] text-[#aaa] underline">Refund policy</Link>
            <Link href="/privacy-policy" className="text-[11px] text-[#aaa] underline">Privacy policy</Link>
            <Link href="/terms-of-service" className="text-[11px] text-[#aaa] underline">Terms of service</Link>
          </div>
        </div>

        {/* ── RIGHT: ORDER SUMMARY ── */}
        <div className="w-[380px] shrink-0 border-l border-[#e5e5e5] bg-[#f9f9f9] px-6 py-8">

          {/* Items */}
          <div className="mb-5 flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                {/* Thumbnail with qty badge */}
                <div className="relative h-14 w-14 shrink-0">
                  <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-[#e5e5e5] bg-[#f3f3f3]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#888] text-[10px] font-medium text-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-[#1a1a1a]">{item.name}</p>
                </div>
                <span className="text-[13px] font-medium text-[#1a1a1a]">
                  £{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-4 border-t border-[#e5e5e5] pt-4">
            {/* Subtotal */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] text-[#555]">Subtotal · {totalCount} items</span>
              <span className="text-[13px] text-[#1a1a1a]">£{subtotal.toFixed(2)}</span>
            </div>
            {/* Shipping */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[13px] text-[#555]">Shipping</span>
              <span className="text-[13px] text-[#aaa]">Enter shipping address</span>
            </div>
            {/* Total */}
            <div className="flex items-center justify-between border-t border-[#e5e5e5] pt-4">
              <span className="text-[15px] font-semibold text-[#1a1a1a]">Total</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[11px] text-[#aaa]">GBP</span>
                <span className="text-[20px] font-semibold text-[#1a1a1a]">£{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
