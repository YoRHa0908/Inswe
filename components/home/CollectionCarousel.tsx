"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  { id: 1, name: "black half zipper",      price: 79.99, image: "/assets/images/PHO00007.JPG" },
  { id: 2, name: "Black rope trucker cap",  price: 79.99, image: "/assets/images/PHO00003.JPG" },
  { id: 3, name: "black truck robe cap",    price: 84.99, image: "/assets/images/PHO00004.JPG" },
  { id: 4, name: "black zipper cap",        price: 84.99, image: "/assets/images/PHO00005.JPG" },
  { id: 5, name: "blue truck robe cap",     price: 84.99, image: "/assets/images/PHO00006.JPG" },
  { id: 6, name: "Brown half zipper cap",   price: 79.99, image: "/assets/images/PHO00009.JPG" },
  { id: 7, name: "Pink zipper cap",         price: 84.99, image: "/assets/images/PHO00010.JPG" },
  { id: 8, name: "white rope cap",          price: 79.99, image: "/assets/images/PHO00011.JPG" },
];

export default function CollectionCarousel() {
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
    const cardWidth = el.querySelector("a")?.offsetWidth ?? 300;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 16 : cardWidth + 16, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-10">

        {/* Header row */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#1a1a1a]">
            DISCOVER COLLECTION
          </h2>
          <div className="flex items-center gap-3">
            {/* Scroll buttons */}
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
              {/* Image */}
              <div className="relative aspect-[1/1.15] w-full overflow-hidden rounded-lg bg-[#f3f3f3]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, 340px"
                />
              </div>

              {/* Info */}
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
