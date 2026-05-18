"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const allProducts = [
  {
    id: 1, name: "Modern Bag",        price: 79.99, isCaps: false,
    image: "/assets/images/PHO00003.JPG",
    images: [
      "/assets/images/PHO00003.JPG",
      "/assets/images/PHO00004.JPG",
      "/assets/images/PHO00005.JPG",
      "/assets/images/PHO00006.JPG",
    ],
  },
  {
    id: 2, name: "Modern Leather Bag",        price: 79.99, isCaps: false,
    image: "/assets/images/PHO00005.JPG",
    images: [
      "/assets/images/PHO00005.JPG",
      "/assets/images/PHO00006.JPG",
      "/assets/images/PHO00003.JPG",
      "/assets/images/PHO00004.JPG",
    ],
  },
  {
    id: 3, name: "Modern Leather Bag2",        price: 79.99, isCaps: false,
    image: "/assets/images/PHO00006.JPG",
    images: [
      "/assets/images/PHO00006.JPG",
      "/assets/images/PHO00005.JPG",
      "/assets/images/PHO00003.JPG",
      "/assets/images/PHO00004.JPG",
    ],
  },
  {
    id: 4, name: "Modern Leather Bag2",        price: 79.99, isCaps: false,
    image: "/assets/images/PHO00004.JPG",
    images: [
      "/assets/images/PHO00004.JPG",
      "/assets/images/PHO00005.JPG",
      "/assets/images/PHO00003.JPG",
      "/assets/images/PHO00006.JPG",
    ],
  },
  {
    id: 5, name: "Black Cap",        price: 79.99, isCaps: true,
    image: "/assets/images/JNSWE_caps_18_black.jpg",
    images: [
      "/assets/images/JNSWE_caps_18_black.jpg",
      "/assets/images/JNSWE_caps_18_black1.jpg",
      "/assets/images/JNSWE_caps_18_black2.jpg",
      "/assets/images/JNSWE_caps_18_black3.jpg",
    ],
  },
  {
    id: 6, name: "Pink Cap",         price: 79.99, isCaps: true,
    image: "/assets/images/JNSWE_caps_17_pink.jpg",
    images: [
      "/assets/images/JNSWE_caps_17_pink.jpg",
      "/assets/images/JNSWE_caps_17_pink1.jpg",
      "/assets/images/JNSWE_caps_17_pink2.jpg",
      "/assets/images/JNSWE_caps_17_pink3.jpg",
    ],
  },
  {
    id: 7, name: "Blue Cap",         price: 84.99, isCaps: true,
    image: "/assets/images/JNSWE_caps_19_blue.jpg",
    images: [
      "/assets/images/JNSWE_caps_19_blue.jpg",
      "/assets/images/JNSWE_caps_19_blue1.jpg",
      "/assets/images/JNSWE_caps_19_blue2.jpg",
      "/assets/images/JNSWE_caps_19_blue3.jpg",
    ],
  },
  {
    id: 8, name: "Brown Cap",        price: 84.99, isCaps: true,
    image: "/assets/images/JNSWE_caps_20_brown.jpg",
    images: [
      "/assets/images/JNSWE_caps_20_brown.jpg",
      "/assets/images/JNSWE_caps_20_brown1.jpg",
      "/assets/images/JNSWE_caps_20_brown2.jpg",
      "/assets/images/JNSWE_caps_20_brown3.jpg",
    ],
  },
  {
    id: 9, name: "Back Zip Cap",     price: 84.99, isCaps: true,
    image: "/assets/images/JNSWE_caps_21_backzip.jpg",
    images: [
      "/assets/images/JNSWE_caps_21_backzip.jpg",
      "/assets/images/JNSWE_caps_21_backzip1.jpg",
      "/assets/images/JNSWE_caps_21_backzip2.jpg",
      "/assets/images/JNSWE_caps_21_backzip3.jpg",
    ],
  },
  {
    id: 10, name: "White Cap",        price: 79.99, isCaps: true,
    image: "/assets/images/JNSWE_caps_22_white.jpg",
    images: [
      "/assets/images/JNSWE_caps_22_white.jpg",
      "/assets/images/JNSWE_caps_22_white1.jpg",
      "/assets/images/JNSWE_caps_22_white2.jpg",
      "/assets/images/JNSWE_caps_22_white3.jpg",
    ],
  },
];

type Props = {
  capsOnly?: boolean;
  title?: string;
};

export default function CollectionCarousel({ capsOnly = false, title = "DISCOVER COLLECTION" }: Props) {
  const products = capsOnly ? allProducts.filter((p) => p.isCaps) : allProducts.filter((p) => !p.isCaps);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = (el.querySelector("a") as HTMLElement)?.offsetWidth ?? 300;
    el.scrollBy({ left: dir === "left" ? -(cardWidth + 16) : cardWidth + 16, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-10">

        {/* Header row */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#1a1a1a]">
            {title}
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              disabled={!canScrollLeft}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#1a1a1a] transition hover:bg-[#f5f5f5] disabled:opacity-30"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              disabled={!canScrollRight}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#1a1a1a] transition hover:bg-[#f5f5f5] disabled:opacity-30"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
            <Link
              href="/shop"
              className="text-[13px] text-[#555] underline underline-offset-2 transition hover:text-[#1a1a1a]"
            >
              View all
            </Link>
          </div>
        </div>

        {/* Scrollable product row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="group min-w-[260px] flex-shrink-0 sm:min-w-[300px] md:min-w-[340px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative aspect-[1/1.15] w-full overflow-hidden rounded-lg bg-[#f3f3f3]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, 340px"
                />
              </div>
              <div className="pt-3">
                <p className="text-[13px] font-normal leading-snug text-[#222]">
                  {product.name}
                </p>
                <p className="mt-1 text-[12px] text-[#666]">
                  £{product.price.toFixed(2)} GBP
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
