"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, RotateCcw, Truck } from "lucide-react";
import { useCart } from "@/lib/CartContext";

type ProductDetailProps = {
  product: {
    id: number;
    name: string;
    price: number;
    images: string[];
    inStock: boolean;
  };
};

// All products — used to build the "You may also like" grid
const allProducts = [
  { id: 1, name: "black half zipper",     price: 79.99, image: "/assets/images/PHO00007.JPG" },
  { id: 2, name: "Black rope trucker cap", price: 79.99, image: "/assets/images/PHO00003.JPG" },
  { id: 3, name: "black truck robe cap",   price: 84.99, image: "/assets/images/PHO00004.JPG" },
  { id: 4, name: "black zipper cap",       price: 84.99, image: "/assets/images/PHO00005.JPG" },
  { id: 5, name: "blue truck robe cap",    price: 84.99, image: "/assets/images/PHO00006.JPG" },
  { id: 6, name: "Brown half zipper cap",  price: 79.99, image: "/assets/images/PHO00009.JPG" },
  { id: 7, name: "Pink zipper cap",        price: 84.99, image: "/assets/images/PHO00010.JPG" },
  { id: 8, name: "white rope cap",         price: 79.99, image: "/assets/images/PHO00011.JPG" },
];

export default function ProductDetail({ product }: ProductDetailProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? product.images.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === product.images.length - 1 ? 0 : i + 1));

  // Pick 4 products that are not the current one
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
    <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">

        {/* ── LEFT: IMAGE GALLERY ── */}
        <div className="flex flex-col gap-4 lg:w-[62%]">
          {/* Main image */}
          <div className="relative aspect-[4/3.5] w-full overflow-hidden bg-[#f3f3f3]">
            <Image
              key={activeIndex}
              src={product.images[activeIndex]}
              alt={`${product.name} – image ${activeIndex + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 1024px) 100vw, 62vw"
              priority
            />

            {/* Prev / Next arrows */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#222] shadow transition hover:bg-white"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#222] shadow transition hover:bg-white"
            >
              ›
            </button>

            {/* Slide counter */}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-[12px] text-white">
              {activeIndex + 1} / {product.images.length}
            </span>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative h-[64px] w-[64px] flex-shrink-0 overflow-hidden bg-[#f3f3f3] transition sm:h-[80px] sm:w-[80px] ${
                  i === activeIndex
                    ? "ring-2 ring-[#222]"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: PRODUCT INFO ── */}
        <div className="flex flex-col lg:w-[38%] lg:pt-2">
          {/* Name */}
          <h1 className="text-[22px] font-normal leading-snug tracking-[-0.02em] text-[#1a1a1a]">
            {product.name}
          </h1>

          {/* Price */}
          <p className="mt-2 text-[15px] text-[#444]">
            £{product.price.toFixed(2)}
          </p>

          {/* Divider */}
          <hr className="my-5 border-[#e5e5e5]" />

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-3">
            {/* Quantity stepper */}
            <div className="flex h-[44px] items-center rounded-full border border-[#d5d5d5] bg-white px-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[18px] text-[#222] transition hover:bg-[#f0f0f0]"
              >
                −
              </button>
              <span className="w-8 text-center text-[14px] font-medium text-[#222]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[18px] text-[#222] transition hover:bg-[#f0f0f0]"
              >
                +
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`flex h-[44px] flex-1 items-center justify-center gap-2 rounded-full text-[14px] font-medium text-white transition ${
                added ? "bg-green-600" : "bg-[#1a1a1a] hover:bg-[#333]"
              }`}
            >
              <ShoppingCart size={16} strokeWidth={1.8} />
              {added ? "Added!" : "Add to cart"}
            </button>
          </div>

          {/* Buy now */}
          <button className="mt-3 flex h-[44px] w-full items-center justify-center rounded-full bg-[#5A31F4] text-[14px] font-medium text-white transition hover:opacity-90">
            Buy with Shop
          </button>

          {/* More payment options */}
          <button className="mt-2 text-center text-[13px] text-[#555] underline underline-offset-2 transition hover:text-[#222]">
            More payment options
          </button>

          {/* Trust badges */}
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[13px] text-[#444]">
              <Truck size={16} strokeWidth={1.6} className="text-[#666]" />
              Reliable shipping
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[#444]">
              <RotateCcw size={16} strokeWidth={1.6} className="text-[#666]" />
              Flexible returns
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* ── YOU MAY ALSO LIKE ── */}
      <section className="mx-auto max-w-[1200px] px-4 pb-12 sm:px-6 lg:px-10 lg:pb-16">
        {/* Divider */}
        <hr className="mb-8 border-[#e5e5e5]" />

        <h2 className="mb-6 text-[18px] font-normal tracking-[-0.02em] text-[#1a1a1a]">
          You may also like
        </h2>

        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
          {related.map((item) => (
            <Link
              key={item.id}
              href={`/shop/${item.id}`}
              className="group w-full"
            >
              {/* Image */}
              <div className="relative aspect-[1/1.05] w-full overflow-hidden bg-[#f3f3f3]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>

              {/* Info */}
              <div className="pt-3">
                <p className="text-[13px] font-normal leading-snug text-[#222]">
                  {item.name}
                </p>
                <p className="mt-1 text-[12px] text-[#666]">
                  £{item.price.toFixed(2)} GBP
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
