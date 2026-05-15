"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
  videoSrc?: string;
  poster?: string;
  images?: string;
};

export default function VideoHero({
  title,
  subtitle,
  buttonText,
  buttonHref,
  videoSrc,
  poster,
  images,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play on mount
    const tryPlay = () => {
      video.play().catch(() => {});
    };

    tryPlay();

    // Resume whenever it pauses (browser may pause it on tab switch, scroll, etc.)
    const handlePause = () => {
      // Small delay to avoid fighting with intentional pauses
      setTimeout(() => {
        if (video.paused && !video.ended) {
          video.play().catch(() => {});
        }
      }, 200);
    };

    // Resume when tab becomes visible again
    const handleVisibility = () => {
      if (!document.hidden && video.paused) {
        video.play().catch(() => {});
      }
    };

    // Resume when page regains focus
    const handleFocus = () => {
      if (video.paused) video.play().catch(() => {});
    };

    video.addEventListener("pause", handlePause);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleFocus);

    return () => {
      video.removeEventListener("pause", handlePause);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleFocus);
    };
  }, [videoSrc]);

  return (
    <section className="relative w-full text-white">
      <div className="relative w-full bg-black">
        {videoSrc ? (
          <video
            ref={videoRef}
            className="w-full h-auto block"
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            style={{ maxHeight: "100vh" }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : images ? (
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/9]">
            <Image
              src={images}
              alt="campaign"
              fill
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <div className="min-h-[50vh] sm:min-h-[70vh]" />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6">
            <h2 className="text-2xl font-semibold sm:text-3xl md:text-5xl">{title}</h2>

            {subtitle && (
              <p className="mt-3 text-sm md:text-base text-white/80 max-w-[560px] mx-auto">
                {subtitle}
              </p>
            )}

            <Link
              href={buttonHref}
              className="inline-block mt-6 px-6 py-3 bg-white text-black rounded-full text-sm hover:bg-gray-200 transition"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
