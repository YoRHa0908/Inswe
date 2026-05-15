"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import ShopFilter from "./ShopFilters";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;   // primary image (used by "You may also like")
  images: string[]; // all 4 images for the hover carousel
  inStock: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "black half zipper",
    price: 79.99,
    image: "/assets/images/PHO00007.JPG",
    images: [
      "/assets/images/PHO00007.JPG",
      "/assets/images/PHO00003.JPG",
      "/assets/images/PHO00004.JPG",
      "/assets/images/PHO00005.JPG",
    ],
    inStock: true,
  },
  {
    id: 2,
    name: "Black rope trucker cap",
    price: 79.99,
    image: "/assets/images/PHO00003.JPG",
    images: [
      "/assets/images/PHO00003.JPG",
      "/assets/images/PHO00006.JPG",
      "/assets/images/PHO00009.JPG",
      "/assets/images/PHO00010.JPG",
    ],
    inStock: true,
  },
  {
    id: 3,
    name: "black truck robe cap",
    price: 84.99,
    image: "/assets/images/PHO00004.JPG",
    images: [
      "/assets/images/PHO00004.JPG",
      "/assets/images/PHO00007.JPG",
      "/assets/images/PHO00011.JPG",
      "/assets/images/PHO00003.JPG",
    ],
    inStock: true,
  },
  {
    id: 4,
    name: "black zipper cap",
    price: 84.99,
    image: "/assets/images/PHO00005.JPG",
    images: [
      "/assets/images/PHO00005.JPG",
      "/assets/images/PHO00007.JPG",
      "/assets/images/PHO00006.JPG",
      "/assets/images/PHO00009.JPG",
    ],
    inStock: true,
  },
  {
    id: 5,
    name: "blue truck robe cap",
    price: 84.99,
    image: "/assets/images/PHO00006.JPG",
    images: [
      "/assets/images/PHO00006.JPG",
      "/assets/images/PHO00010.JPG",
      "/assets/images/PHO00011.JPG",
      "/assets/images/PHO00003.JPG",
    ],
    inStock: true,
  },
  {
    id: 6,
    name: "Brown half zipper cap",
    price: 79.99,
    image: "/assets/images/PHO00009.JPG",
    images: [
      "/assets/images/PHO00009.JPG",
      "/assets/images/PHO00004.JPG",
      "/assets/images/PHO00005.JPG",
      "/assets/images/PHO00007.JPG",
    ],
    inStock: true,
  },
  {
    id: 7,
    name: "Pink zipper cap",
    price: 84.99,
    image: "/assets/images/PHO00010.JPG",
    images: [
      "/assets/images/PHO00010.JPG",
      "/assets/images/PHO00009.JPG",
      "/assets/images/PHO00011.JPG",
      "/assets/images/PHO00007.JPG",
    ],
    inStock: true,
  },
  {
    id: 8,
    name: "white rope cap",
    price: 79.99,
    image: "/assets/images/PHO00011.JPG",
    images: [
      "/assets/images/PHO00011.JPG",
      "/assets/images/PHO00003.JPG",
      "/assets/images/PHO00004.JPG",
      "/assets/images/PHO00005.JPG",
    ],
    inStock: true,
  },
];

export default function ProductSection() {
  const [view, setView] = useState<"default" | "zoom-out">("default");
  const [sort, setSort] = useState("manual");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  return (
    <section className="max-w-[1450px] mx-auto px-4 py-8 sm:px-6 lg:px-10">
      {/* FILTER TOP */}
      <ShopFilter
        products={products}
        view={view}
        setView={setView}
        sort={sort}
        setSort={setSort}
        setFilteredProducts={setFilteredProducts}
      />

      {/* PRODUCTS */}
      <div
        className={`grid gap-x-3 gap-y-8 ${
          view === "default"
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-3 sm:grid-cols-4 lg:grid-cols-8"
        }`}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} view={view} />
        ))}
      </div>
    </section>
  );
}
