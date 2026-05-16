"use client";

import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { type Product } from "@/lib/products";

interface ShopFiltersProps {
    products: Product[];
    view: "default" | "zoom-out";
    setView: Dispatch<SetStateAction<"default" | "zoom-out">>;
    sort: string;
    setSort: Dispatch<SetStateAction<string>>;
    setFilteredProducts: Dispatch<SetStateAction<Product[]>>;
}

const sortOptions = [
    { label: "Featured", value: "manual" },
    { label: "Most relevant", value: "most-relevant" },
    { label: "Best selling", value: "best-selling" },
    { label: "Alphabetically, A-Z", value: "title-ascending" },
    { label: "Alphabetically, Z-A", value: "title-descending" },
    { label: "Price, low to high", value: "price-ascending" },
    { label: "Price, high to low", value: "price-descending" },
    { label: "Date, old to new", value: "created-ascending" },
    { label: "Date, new to old", value: "created-descending" },
];

export default function ShopFilters({
    products,
    view,
    setView,
    sort,
    setSort,
    setFilteredProducts,
}: ShopFiltersProps) {
    const [sortOpen, setSortOpen] = useState(false);
    const [priceOpen, setPriceOpen] = useState(false);
    const [availabilityOpen, setAvailabilityOpen] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    // Tracks the applied price range shown next to "Price"
    const [appliedMin, setAppliedMin] = useState("");
    const [appliedMax, setAppliedMax] = useState("");
    const [availability, setAvailability] = useState({
        inStock: false,
        outOfStock: false,
    });

    const sortRef = useRef<HTMLDivElement>(null);
    const priceRef = useRef<HTMLDivElement>(null);
    const availabilityRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
                setSortOpen(false);
            }
            if (priceRef.current && !priceRef.current.contains(e.target as Node)) {
                setPriceOpen(false);
            }
            if (availabilityRef.current && !availabilityRef.current.contains(e.target as Node)) {
                setAvailabilityOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Helper function to apply all filters and sorting
    const applyAllFilters = () => {
        let filtered = [...products];
        
        // 1. Apply availability filter
        if (availability.inStock && !availability.outOfStock) {
            filtered = filtered.filter((p) => p.inStock);
        }
        if (!availability.inStock && availability.outOfStock) {
            filtered = filtered.filter((p) => !p.inStock);
        }
        
        // 2. Apply price filter
        const MAX_PRICE = Math.max(...products.map((p) => p.price));
        const min = minPrice === "" ? 0 : Math.min(Number(minPrice), MAX_PRICE);
        const max = maxPrice === "" ? MAX_PRICE : Math.min(Number(maxPrice), MAX_PRICE);
        
        if (min > 0 || max < MAX_PRICE) {
            filtered = filtered.filter(
                (product) => product.price >= min && product.price <= max
            );
        }
        
        // 3. Apply sorting
        if (sort === "manual") {
            // Featured/Manual order - show featured products first, then others
            filtered.sort((a, b) => {
                const aFeatured = a.isFeatured ? 1 : 0;
                const bFeatured = b.isFeatured ? 1 : 0;
                if (aFeatured !== bFeatured) return bFeatured - aFeatured;
                return a.id - b.id; // Fallback to ID order
            });
        } else if (sort === "title-ascending") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === "title-descending") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sort === "price-ascending") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === "price-descending") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sort === "most-relevant") {
            // For "most relevant", we could use a combination of factors
            // For now, let's use featured + alphabetical
            filtered.sort((a, b) => {
                const aFeatured = a.isFeatured ? 1 : 0;
                const bFeatured = b.isFeatured ? 1 : 0;
                if (aFeatured !== bFeatured) return bFeatured - aFeatured;
                return a.name.localeCompare(b.name);
            });
        } else if (sort === "best-selling") {
            // Since we don't have sales data, sort by featured + price (higher price first as proxy)
            filtered.sort((a, b) => {
                const aFeatured = a.isFeatured ? 1 : 0;
                const bFeatured = b.isFeatured ? 1 : 0;
                if (aFeatured !== bFeatured) return bFeatured - aFeatured;
                return b.price - a.price;
            });
        } else if (sort === "created-ascending") {
            // Oldest first - sort by ID (assuming lower ID = older)
            filtered.sort((a, b) => a.id - b.id);
        } else if (sort === "created-descending") {
            // Newest first - sort by ID descending (assuming higher ID = newer)
            filtered.sort((a, b) => b.id - a.id);
        }
        
        setFilteredProducts(filtered);
    };

    // Apply filters whenever sort, availability, or price range changes
    useEffect(() => {
        applyAllFilters();
    }, [sort, availability, minPrice, maxPrice, products]);

    // SORT
    const handleSort = (value: string) => {
        setSort(value);
        setSortOpen(false);
    };

    // PRICE FILTER
    const MAX_PRICE = Math.max(...products.map((p) => p.price));

    const applyPriceFilter = () => {
        const min = minPrice === "" ? 0 : Math.min(Number(minPrice), MAX_PRICE);
        const max = maxPrice === "" ? MAX_PRICE : Math.min(Number(maxPrice), MAX_PRICE);

        // Clamp the input fields to valid range
        const clampedMin = String(min === 0 ? "" : min);
        const clampedMax = String(max === MAX_PRICE && maxPrice === "" ? "" : max);
        setMinPrice(clampedMin);
        setMaxPrice(clampedMax);
        setAppliedMin(clampedMin);
        setAppliedMax(clampedMax);
        setPriceOpen(false);
        // applyAllFilters will be triggered by useEffect when minPrice/maxPrice change
    };

    return (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 text-[14px]">
            {/* LEFT */}
            <div className="flex items-center gap-8">
                {/* AVAILABILITY */}
                <div className="relative" ref={availabilityRef}>
                    <button
                        onClick={() => setAvailabilityOpen((o) => !o)}
                        className="flex items-center gap-1 text-[14px] text-black"
                    >
                        <span>Availability</span>
                        {(availability.inStock || availability.outOfStock) && (
                            <span className="text-[12px] text-gray-500">
                                {availability.inStock && "In stock"}
                                {availability.inStock && availability.outOfStock && ", "}
                                {availability.outOfStock && "Out of stock"}
                            </span>
                        )}
                        <ChevronDown
                            size={14}
                            className={`transition duration-200 ${availabilityOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {availabilityOpen && (
                        <div className="absolute left-0 top-[36px] z-50 w-[150px] rounded-md border border-[#e5e5e5] bg-white p-4 shadow-xl">
                            <div className="space-y-2">
                                <label className="flex cursor-pointer items-center gap-3 py-1">
                                    <input
                                        type="checkbox"
                                        checked={availability.inStock}
                                        onChange={(e) =>
                                            setAvailability((prev) => ({ ...prev, inStock: e.target.checked }))
                                        }
                                        className="hidden"
                                    />
                                    <div
                                        className={`flex h-[15px] w-[15px] items-center justify-center border transition ${
                                            availability.inStock
                                                ? "border-black bg-black text-white"
                                                : "border-[#cfcfcf] bg-white"
                                        }`}
                                    >
                                        {availability.inStock && (
                                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                                <path
                                                    d="M4.75439 10.7485L7.68601 14.5888C7.79288 14.7288 7.84632 14.7988 7.91174 14.8242C7.96907 14.8466 8.03262 14.8469 8.09022 14.8253C8.15596 14.8007 8.21026 14.7314 8.31886 14.5927L15.2475 5.74658"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-[14px] text-black">In stock</span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-3 py-1">
                                    <input
                                        type="checkbox"
                                        checked={availability.outOfStock}
                                        onChange={(e) =>
                                            setAvailability((prev) => ({ ...prev, outOfStock: e.target.checked }))
                                        }
                                        className="hidden"
                                    />
                                    <div
                                        className={`flex h-[15px] w-[15px] items-center justify-center border transition ${
                                            availability.outOfStock
                                                ? "border-black bg-black text-white"
                                                : "border-[#cfcfcf] bg-white"
                                        }`}
                                    >
                                        {availability.outOfStock && (
                                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                                <path
                                                    d="M4.75439 10.7485L7.68601 14.5888C7.79288 14.7288 7.84632 14.7988 7.91174 14.8242C7.96907 14.8466 8.03262 14.8469 8.09022 14.8253C8.15596 14.8007 8.21026 14.7314 8.31886 14.5927L15.2475 5.74658"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-[14px] text-black">Out of stock</span>
                                </label>
                            </div>

                            {(availability.inStock || availability.outOfStock) && (
                                <button
                                    onClick={() => setAvailability({ inStock: false, outOfStock: false })}
                                    className="mt-4 text-[13px] font-medium text-black underline"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* PRICE */}
                <div className="relative" ref={priceRef}>
                    <button
                        onClick={() => setPriceOpen((o) => !o)}
                        className="flex items-center gap-2 text-[15px]"
                    >
                        <span>Price</span>
                        {/* Active range label */}
                        {(appliedMin !== "" || appliedMax !== "") && (
                            <span className="text-[12px] text-gray-500">
                                £{appliedMin !== "" ? appliedMin : "0"}
                                {" – "}
                                £{appliedMax !== "" ? appliedMax : "84.99"}
                            </span>
                        )}
                        <ChevronDown
                            size={16}
                            className={`transition duration-200 ${priceOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {priceOpen && (
                        <div className="absolute left-0 top-10 z-50 w-[min(360px,90vw)] rounded-2xl bg-white p-5 shadow-2xl">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-1 items-center rounded-xl border border-[#e0e0e0] bg-white px-4 py-3">
                                    <span className="mr-3 text-[15px] text-[#aaa]">£</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={minPrice}
                                        min={0}
                                        max={MAX_PRICE}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        onBlur={() => {
                                            if (minPrice !== "" && Number(minPrice) > MAX_PRICE) {
                                                setMinPrice(String(MAX_PRICE));
                                            }
                                        }}
                                        className="w-full bg-transparent text-right text-[15px] text-[#333] outline-none placeholder:text-[#bbb]"
                                    />
                                </div>

                                <span className="text-[14px] text-[#888]">to</span>

                                <div className="flex flex-1 items-center rounded-xl border border-[#e0e0e0] bg-white px-4 py-3">
                                    <span className="mr-3 text-[15px] text-[#aaa]">£</span>
                                    <input
                                        type="number"
                                        placeholder={String(MAX_PRICE)}
                                        value={maxPrice}
                                        min={0}
                                        max={MAX_PRICE}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        onBlur={() => {
                                            if (maxPrice !== "" && Number(maxPrice) > MAX_PRICE) {
                                                setMaxPrice(String(MAX_PRICE));
                                            }
                                        }}
                                        className="w-full bg-transparent text-right text-[15px] text-[#333] outline-none placeholder:text-[#bbb]"
                                    />
                                </div>
                            </div>

                            <p className="mt-4 text-[13px] font-medium text-[#222]">
                                The highest price is £{MAX_PRICE.toFixed(2)}
                            </p>

                            <div className="mt-4 flex items-center gap-4">
                                <button
                                    onClick={applyPriceFilter}
                                    className="h-[38px] rounded-lg bg-black px-5 text-[13px] font-medium text-white transition hover:bg-[#333]"
                                >
                                    Apply
                                </button>
                                <button
                                    onClick={() => {
                                        setMinPrice("");
                                        setMaxPrice("");
                                        setAppliedMin("");
                                        setAppliedMax("");
                                        // applyAllFilters will be triggered by useEffect when minPrice/maxPrice change
                                    }}
                                    className="text-[13px] text-[#555] underline underline-offset-2 transition hover:text-black"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6">
                <span className="text-gray-500">{products.length} items</span>

                {/* SORT */}
                <div className="relative" ref={sortRef}>
                    <button onClick={() => setSortOpen((o) => !o)} className="flex items-center gap-1">
                        <span>Sort</span>
                        <ChevronDown size={16} className={`transition ${sortOpen ? "rotate-180" : ""}`} />
                    </button>

                    {sortOpen && (
                        <div className="absolute right-0 top-10 z-50 w-[min(280px,90vw)] rounded-xl bg-white p-2 shadow-xl">
                            {sortOptions.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex cursor-pointer items-center rounded-md px-3 py-2 hover:bg-gray-100"
                                >
                                    <input
                                        type="radio"
                                        name="sort_by"
                                        value={option.value}
                                        checked={sort === option.value}
                                        onChange={() => handleSort(option.value)}
                                        className="hidden"
                                    />
                                    <span className="mr-3 w-[20px]">
                                        {sort === option.value && (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path
                                                    d="M4.7 10.7L7.7 14.6C7.9 14.8 8.1 14.8 8.3 14.6L15.2 5.7"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                    <span className="text-[14px]">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* GRID ICONS */}
                <div className="hidden sm:flex items-center gap-3">
                    <button
                        onClick={() => setView("default")}
                        className={`grid grid-cols-2 gap-[2px] ${view === "default" ? "opacity-100" : "opacity-40"}`}
                    >
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-[6px] w-[6px] bg-gray-700" />
                        ))}
                    </button>

                    <button
                        onClick={() => setView("zoom-out")}
                        className={`grid grid-cols-3 gap-[2px] ${view === "zoom-out" ? "opacity-100" : "opacity-40"}`}
                    >
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="h-[4px] w-[4px] bg-gray-500" />
                        ))}
                    </button>
                </div>
            </div>
        </div>
    );
}
