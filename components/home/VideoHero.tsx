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
  return (
    <section className={`relative w-full flex items-center justify-center text-white ${images ? "aspect-[4/3] sm:aspect-[16/9]" : "min-h-[50vh] sm:min-h-[70vh]"}`}>
      {/* Background */}
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : images ? (
          <div className="relative h-full w-full">
            <Image
              src={images}
              alt="campaign"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
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
    </section>
  );
}