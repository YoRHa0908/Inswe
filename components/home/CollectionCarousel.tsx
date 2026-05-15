"use client";

import Image from "next/image";
import Link from "next/link";

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
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-10">

        {/* Header row */}
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#1a1a1a]">
            DISCOVER COLLECTION
          </h2>
          <Link
            href="/shop"
            className="text-[13px] text-[#555] underline underline-offset-2 transition hover:text-[#1a1a1a]"
          >
            View all
          </Link>
        </div>

        {/* Scrollable product row */}
        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="group min-w-[160px] flex-shrink-0 sm:min-w-[200px] md:min-w-[220px]"
            >
              {/* Image */}
              <div className="relative aspect-[1/1.15] w-full overflow-hidden rounded-lg bg-[#f3f3f3]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="220px"
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
