"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "./ProductSection";
import { useCart } from "@/lib/CartContext";

type ProductCardProps = {
  product: Product;
  view: "default" | "zoom-out";
};

export default function ProductCard({ product, view }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const images = product.images ?? [product.image];

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next(e: React.MouseEvent) {
    e.preventDefault();
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <Link
      href={`/shop/${product.id}`}
      className="w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActiveIndex(0);
      }}
    >
      {/* IMAGE AREA */}
      <div
        className={`relative overflow-hidden bg-[#f3f3f3] ${
          view === "default" ? "aspect-[1/1.15]" : "aspect-square"
        }`}
      >
        {/* All images stacked — only active one is visible */}
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${product.name} – ${i + 1}`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            sizes={
              view === "default"
                ? "(max-width: 768px) 50vw, 25vw"
                : "(max-width: 768px) 25vw, 12vw"
            }
            priority={i === 0}
          />
        ))}

        {/* Hover overlay controls */}
        {hovered && (
          <>
            {/* Prev arrow */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[18px] text-[#222] shadow-sm transition hover:bg-white"
            >
              ←
            </button>

            {/* Next arrow */}
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[18px] text-[#222] shadow-sm transition hover:bg-white"
            >
              →
            </button>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              aria-label="Add to cart"
              className={`absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all duration-200 ${
                added
                  ? "scale-110 bg-[#1a1a1a]"
                  : "bg-white hover:bg-[#f0f0f0]"
              }`}
            >
              <ShoppingBag
                size={17}
                strokeWidth={1.8}
                className={`transition-colors duration-200 ${added ? "text-white" : "text-[#222]"}`}
              />
              {/* + badge — pulses when added */}
              <span
                className={`absolute bottom-[6px] right-[6px] flex h-[10px] w-[10px] items-center justify-center rounded-full text-[7px] font-bold text-white transition-all duration-200 ${
                  added ? "scale-125 bg-green-500" : "bg-[#1a1a1a]"
                }`}
              >
                {added ? "✓" : "+"}
              </span>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`block h-[5px] rounded-full transition-all duration-200 ${
                    i === activeIndex ? "w-4 bg-white" : "w-[5px] bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* INFO */}
      <div className="pt-3">
        <h3
          className={`font-normal leading-[1.2] text-[#222] ${
            view === "default" ? "text-[14px]" : "text-[13px]"
          }`}
        >
          {product.name}
        </h3>
        <p
          className={`mt-1 text-[#444] ${
            view === "default" ? "text-[13px]" : "text-[12px]"
          }`}
        >
          £{product.price.toFixed(2)} GBP
        </p>
      </div>
    </Link>
  );
}
