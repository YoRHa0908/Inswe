import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e5e5e5] bg-[#f5f5f5] dark:border-[#2a2a2a] dark:bg-[#111]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-6 py-6 md:flex-row md:justify-between md:px-16 md:py-8">

        {/* Left: copyright + links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[12px] text-[#5b5b5b] dark:text-[#888] sm:gap-6 md:gap-8 md:text-[14px]">
          <p>
            © 2026{" "}
            <Link href="/" className="transition-opacity hover:opacity-60">Inswè</Link>
            ,{" "}
            <Link href="https://www.shopify.com" className="transition-opacity hover:opacity-60">
              Powered by Shopify
            </Link>
          </p>
          <Link href="/policies/privacy-policy" className="transition-opacity hover:opacity-60">Privacy policy</Link>
          <Link href="/policies/refund-policy" className="transition-opacity hover:opacity-60">Refund policy</Link>
          <Link href="/policies/terms-of-service" className="transition-opacity hover:opacity-60">Terms of service</Link>
        </div>

        {/* Right: social icons */}
        <div className="flex items-center gap-5 text-[#6a6a6a] dark:text-[#888]">
          <a href="https://www.instagram.com/inswe_" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-opacity hover:opacity-60">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.23 3.492c-.84-.037-1.096-.046-3.23-.046-2.144 0-2.39.01-3.238.055-.776.027-1.195.164-1.487.273a2.43 2.43 0 0 0-.912.593 2.486 2.486 0 0 0-.602.922c-.11.282-.238.702-.274 1.486-.046.84-.046 1.095-.046 3.23 0 2.134.01 2.39.046 3.229.004.51.097 1.016.274 1.495.145.365.319.639.602.913.282.282.538.456.92.602.474.176.974.268 1.479.273.848.046 1.103.046 3.238.046 2.134 0 2.39-.01 3.23-.046.784-.036 1.203-.164 1.486-.273.374-.146.648-.329.921-.602.283-.283.447-.548.602-.922.177-.476.27-.979.274-1.486.037-.84.046-1.095.046-3.23 0-2.134-.01-2.39-.055-3.229-.027-.784-.164-1.204-.274-1.495a2.43 2.43 0 0 0-.593-.913 2.604 2.604 0 0 0-.92-.602c-.284-.11-.703-.237-1.488-.273Z" />
            </svg>
          </a>
          <a href="https://www.tiktok.com/@inswe_" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="transition-opacity hover:opacity-60">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.511 1.705h2.74s-.157 3.51 3.795 3.768v2.711s-2.114.129-3.796-1.158l.028 5.606A5.073 5.073 0 1 1 8.213 7.56h.708v2.785a2.298 2.298 0 1 0 1.618 2.205L10.51 1.705Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
