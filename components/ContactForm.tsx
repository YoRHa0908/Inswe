"use client";

import { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    body: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error ?? "Failed to send message. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", body: "" });
    } catch {
      alert("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <path
              d="M4.75 10.75L7.75 14.25L15.25 5.75"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-[16px] font-medium text-[#1a1a1a]">Message sent!</p>
        <p className="text-[14px] text-[#888]">
          Thanks for reaching out. We&apos;ll be in touch soon.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-[13px] text-[#555] underline underline-offset-2 hover:text-black"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ContactForm-name" className="text-[13px] font-medium text-[#444]">
            Name
          </label>
          <input
            id="ContactForm-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="h-[48px] w-full rounded-xl border border-[#e0e0e0] bg-[#fafafa] px-4 text-[14px] text-[#222] outline-none transition placeholder:text-[#bbb] focus:border-[#1a1a1a] focus:bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ContactForm-email" className="text-[13px] font-medium text-[#444]">
            Email <span className="text-[#e55]">*</span>
          </label>
          <input
            id="ContactForm-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="h-[48px] w-full rounded-xl border border-[#e0e0e0] bg-[#fafafa] px-4 text-[14px] text-[#222] outline-none transition placeholder:text-[#bbb] focus:border-[#1a1a1a] focus:bg-white"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="ContactForm-phone" className="text-[13px] font-medium text-[#444]">
          Phone
        </label>
        <input
          id="ContactForm-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="+44 000 000 0000"
          pattern="[0-9\-\+\s]*"
          value={formData.phone}
          onChange={handleChange}
          className="h-[48px] w-full rounded-xl border border-[#e0e0e0] bg-[#fafafa] px-4 text-[14px] text-[#222] outline-none transition placeholder:text-[#bbb] focus:border-[#1a1a1a] focus:bg-white"
        />
      </div>

      {/* Comment */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="ContactForm-body" className="text-[13px] font-medium text-[#444]">
          Comment <span className="text-[#e55]">*</span>
        </label>
        <textarea
          id="ContactForm-body"
          name="body"
          rows={7}
          placeholder="How can we help you?"
          value={formData.body}
          onChange={handleChange}
          required
          className="w-full resize-none rounded-xl border border-[#e0e0e0] bg-[#fafafa] px-4 py-3.5 text-[14px] text-[#222] outline-none transition placeholder:text-[#bbb] focus:border-[#1a1a1a] focus:bg-white"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 flex h-[50px] w-full items-center justify-center rounded-xl bg-[#1a1a1a] text-[14px] font-medium text-white transition hover:bg-[#333] disabled:opacity-60"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Sending…
          </span>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
