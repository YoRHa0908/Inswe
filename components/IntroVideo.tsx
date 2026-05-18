"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroVideo() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => video.play().catch(() => {});
    tryPlay();

    // Resume when tab becomes visible
    const handleVisibility = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener("visibilitychange", handleVisibility);

    // Resume if paused unexpectedly
    video.addEventListener("pause", tryPlay);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      video.removeEventListener("pause", tryPlay);
    };
  }, []);

  const dismiss = () => {
    setFading(true);
    setTimeout(() => setVisible(false), 600);
  };

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      className={`fixed inset-0 z-[9999] cursor-pointer bg-black transition-opacity duration-600 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        autoPlay
        muted
        loop
        playsInline
        src="/assets/videos/about_bag_home.mp4"
      />

      {/* Click hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70">
        <span className="text-[13px] tracking-widest uppercase">Click to enter</span>
        <svg
          className="animate-bounce"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
}
