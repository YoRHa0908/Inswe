import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import IntroVideo from "@/components/IntroVideo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inswè",
  description: "A modern website built with Next.js and Tailwind CSS",
  other: {
    "google": "notranslate",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <CartProvider>
          <IntroVideo />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}