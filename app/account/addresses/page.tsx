"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  // ── Edit profile modal ──
  const [modalOpen, setModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tempFirst, setTempFirst] = useState("");
  const [tempLast, setTempLast] = useState("");
  const email = "jane0908hill@outlook.com";

  const openModal = () => {
    setTempFirst(firstName);
    setTempLast(lastName);
    setModalOpen(true);
  };
  const handleSave = () => {
    setFirstName(tempFirst);
    setLastName(tempLast);
    setModalOpen(false);
  };
  const handleCancel = () => setModalOpen(false);
  const displayName = [firstName, lastName].filter(Boolean).join(" ");

  // ── Add address modal ──
  const [addrOpen, setAddrOpen] = useState(false);
  const [addrForm, setAddrForm] = useState({
    country: "United Kingdom",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postcode: "",
    isDefault: false,
  });

  const handleAddrChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setAddrForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  const handleAddrSave = () => setAddrOpen(false);
  const handleAddrCancel = () => setAddrOpen(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f7]">

      {/* ── HEADER ── */}
      <header className="shrink-0 border-b border-[#e8e8e8] bg-white">
        <div className="mx-auto flex h-12 w-3/5 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[15px] font-semibold tracking-[-0.03em] text-[#1a1a1a] no-underline">
              Inswè
            </Link>
            <nav className="flex items-center gap-5">
              <Link href="/account" className="text-[13px] text-[#666] no-underline transition hover:text-[#1a1a1a]">
                Orders
              </Link>
              <Link href="/account/addresses" className="text-[13px] font-medium text-[#1a1a1a] underline underline-offset-[3px]">
                Profile
              </Link>
            </nav>
          </div>
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 border-[#5A31F4] bg-[#ede9ff]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5A31F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="mx-auto w-3/5 flex-1 px-6 py-8">
        <h1 className="mb-5 text-[21px] font-semibold tracking-[-0.02em] text-[#1a1a1a]">
          Profile
        </h1>

        {/* NAME + EMAIL CARD */}
        <div className="mb-3 rounded-2xl border border-[#e5e5e5] bg-white">

          {/* Name row */}
          <div className="px-5 py-[14px]">
            <div className="mb-1 flex items-center gap-1.5">
              <span className="text-[14px] text-[#999]">Name</span>
              <button
                onClick={openModal}
                type="button"
                aria-label="Edit profile"
                className="flex cursor-pointer items-center border-none bg-transparent p-0 text-[#999] transition hover:text-[#1a1a1a]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
                  <path d="M9.19 2.31a1.5 1.5 0 0 1 2.12 0l.354.354a1.5 1.5 0 0 1 0 2.121l-6.477 6.477a1.5 1.5 0 0 1-.846.424l-1.737.252a.5.5 0 0 1-.567-.567l.252-1.737a1.5 1.5 0 0 1 .424-.846z" />
                  <path d="m8 3.5 1.237 1.237 1.238 1.238" />
                </svg>
              </button>
            </div>
            {/* Always render — shows saved name or placeholder */}
            <p className="text-[14px] text-[#1a1a1a]">
              {displayName || <span className="text-[#bbb]">No name added</span>}
            </p>
          </div>

          {/* Divider */}
          <div className="mx-5 h-px bg-[#f0f0f0]" />

          {/* Email row */}
          <div className="px-5 py-[14px]">
            <p className="mb-1 text-[14px] text-[#999]">Email</p>
            <p className="text-[13px] text-[#1a1a1a]">{email}</p>
          </div>
        </div>

        {/* ADDRESSES CARD */}
        <div className="mb-6 rounded-2xl border border-[#e5e5e5] bg-white px-5 py-[14px]">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[14px] font-medium text-[#1a1a1a]">Addresses</span>
            <button
              type="button"
              aria-label="Add address"
              onClick={() => setAddrOpen(true)}
              className="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-[13px] text-[#4a90e2]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M2 7h10M7 2v10" />
              </svg>
              <strong className="text-[14px] font-medium">Add</strong>
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-[#f5f5f5] px-3.5 py-2.5 text-[14px] text-[#888]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="7" cy="7" r="5.5" />
              <path strokeLinejoin="round" d="M6.99 4.49h.02v.02h-.02z" />
              <path d="M7 9.75v-3" />
            </svg>
            No addresses added
          </div>
        </div>

        {/* SIGN OUT */}
        <div className="mb-8 flex items-center gap-5">
          <button type="button" className="cursor-pointer rounded-xl border border-[#d0d0d0] bg-white px-5 py-2.5 text-[13px] font-bold text-[#4a90e2] transition hover:bg-[#f5f5f5]">
            Sign out
          </button>
          <button type="button" className="cursor-pointer border-none bg-transparent p-0 text-[13px] text-[#4a90e2] transition hover:opacity-70">
            Sign out of all devices
          </button>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="shrink-0 border-t border-[#e5e5e5] py-5">
        <div className="mx-auto flex w-3/5 items-center justify-center gap-5 px-6">
          <Link href="/refund-policy" className="text-[11px] text-[#aaa] no-underline transition hover:text-[#555]">Refund policy</Link>
          <Link href="/privacy-policy" className="text-[11px] text-[#aaa] no-underline transition hover:text-[#555]">Privacy policy</Link>
          <Link href="/terms-of-service" className="text-[11px] text-[#aaa] no-underline transition hover:text-[#555]">Terms of service</Link>
        </div>
      </footer>

      {/* ── EDIT PROFILE MODAL ── */}
      {modalOpen && (
        <>
          <div onClick={handleCancel} className="fixed inset-0 z-40 bg-[rgba(80,80,80,0.5)] backdrop-blur-sm" />
          <div className="fixed left-1/2 top-1/2 z-50 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-[15px] bg-white px-6 pb-5 pt-5 shadow-[0_4px_24px_rgba(0,0,0,0.14)]">

            {/* Title + close */}
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[15px] font-semibold text-[#1a1a1a]">Edit profile</span>
              <button onClick={handleCancel} type="button" aria-label="Close" className="flex cursor-pointer items-center border-none bg-transparent p-0 text-[#aaa] transition hover:text-[#555]">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* First + Last name */}
            <div className="mb-4 grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="First name"
                value={tempFirst}
                onChange={(e) => setTempFirst(e.target.value)}
                autoFocus
                className="h-10 w-full rounded-[9px] border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-2 focus:border-[#4a90e2]"
              />
              <input
                type="text"
                placeholder="Last name"
                value={tempLast}
                onChange={(e) => setTempLast(e.target.value)}
                className="h-10 w-full rounded-[9px] border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#222] outline-none placeholder:text-[#bbb] focus:border-2 focus:border-[#4a90e2]"
              />
            </div>

            {/* Email read-only */}
            <div className="border-b border-[#e8e8e8] pb-3">
              <p className="mb-0.5 text-[12px] text-[#999]">Email</p>
              <p className="text-[13px] text-[#1a1a1a]">{email}</p>
            </div>
            <p className="mb-5 mt-1.5 text-[11px] text-[#aaa]">
              This email is used for sign-in and order updates.
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <button onClick={handleCancel} type="button" className="cursor-pointer border-none bg-transparent p-0 text-[13px] text-[#4a90e2] underline underline-offset-2">
                Cancel
              </button>
              <button onClick={handleSave} type="button" className="cursor-pointer border-none bg-transparent p-0 text-[13px] font-medium text-[#1a1a1a]">
                Save
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── ADD ADDRESS MODAL ── */}
      {addrOpen && (
        <>
          <div onClick={handleAddrCancel} className="fixed inset-0 z-40 bg-[rgba(80,80,80,0.5)] backdrop-blur-sm" />
          <div className="fixed left-1/2 top-1/2 z-50 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-6 pb-6 pt-5 shadow-[0_8px_32px_rgba(0,0,0,0.18)]">

            {/* Title + close */}
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[#1a1a1a]">Add address</span>
              <button onClick={handleAddrCancel} type="button" aria-label="Close" className="flex cursor-pointer items-center border-none bg-transparent p-0 text-[#aaa] transition hover:text-[#555]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Country */}
            <div className="mb-3">
              <label className="mb-1 block text-[12px] text-[#888]">Country/region</label>
              <div className="relative">
                <select name="country" value={addrForm.country} onChange={handleAddrChange} className="h-11 w-full appearance-none rounded-lg border border-[#d0d0d0] bg-white px-3 text-[14px] text-[#222] outline-none focus:border-[#4a90e2]">
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Japan</option>
                  <option>South Korea</option>
                  <option>Thailand</option>
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            {/* First + Last name */}
            <div className="mb-3 grid grid-cols-2 gap-3">
              <input type="text" name="firstName" placeholder="First name" value={addrForm.firstName} onChange={handleAddrChange} autoFocus className="h-11 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[14px] text-[#222] outline-none placeholder:text-[#aaa] focus:border-[#4a90e2] focus:border-2" />
              <input type="text" name="lastName" placeholder="Last name" value={addrForm.lastName} onChange={handleAddrChange} className="h-11 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[14px] text-[#222] outline-none placeholder:text-[#aaa] focus:border-[#4a90e2] focus:border-2" />
            </div>

            {/* Address */}
            <input type="text" name="address" placeholder="Address" value={addrForm.address} onChange={handleAddrChange} className="mb-3 h-11 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[14px] text-[#222] outline-none placeholder:text-[#aaa] focus:border-[#4a90e2]" />

            {/* Apartment */}
            <input type="text" name="apartment" placeholder="Apartment, suite, etc. (optional)" value={addrForm.apartment} onChange={handleAddrChange} className="mb-3 h-11 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[14px] text-[#222] outline-none placeholder:text-[#aaa] focus:border-[#4a90e2]" />

            {/* City + Postcode */}
            <div className="mb-4 grid grid-cols-2 gap-3">
              <input type="text" name="city" placeholder="City" value={addrForm.city} onChange={handleAddrChange} className="h-11 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[14px] text-[#222] outline-none placeholder:text-[#aaa] focus:border-[#4a90e2]" />
              <input type="text" name="postcode" placeholder="Postcode" value={addrForm.postcode} onChange={handleAddrChange} className="h-11 w-full rounded-lg border border-[#d0d0d0] bg-white px-3 text-[14px] text-[#222] outline-none placeholder:text-[#aaa] focus:border-[#4a90e2]" />
            </div>

            {/* Default checkbox */}
            <label className="mb-5 flex cursor-pointer items-center gap-2.5 text-[13px] text-[#444]">
              <input type="checkbox" name="isDefault" checked={addrForm.isDefault} onChange={handleAddrChange} className="h-4 w-4 cursor-pointer accent-[#4a90e2]" />
              This is my default address
            </label>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <button onClick={handleAddrCancel} type="button" className="cursor-pointer border-none bg-transparent p-0 text-[14px] text-[#4a90e2] underline underline-offset-2">
                Cancel
              </button>
              <button onClick={handleAddrSave} type="button" className="h-10 cursor-pointer rounded-lg bg-[#4a90e2] px-6 text-[14px] font-medium text-white transition hover:bg-[#3a7fd0]">
                Save
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
