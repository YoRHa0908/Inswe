import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
  videoSrc?: string;
  poster?: string;
  images?: string[];
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
    <section className="relative w-full min-h-[70vh] flex items-center justify-center text-white">
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
            <source src={videoSrc} type="video/AVI" />
          </video>
        ) : images ? (
          <div className="grid grid-cols-2 h-full">
            {images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt="campaign"
                width={800}
                height={800}
                className="object-cover w-full h-full"
              />
            ))}
          </div>
        ) : null}

        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-semibold">{title}</h2>

        {subtitle && (
          <p className="mt-4 text-sm md:text-base text-white/80">
            {subtitle}
          </p>
        )}

        <Link
          href={buttonHref}
          className="inline-block mt-6 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}