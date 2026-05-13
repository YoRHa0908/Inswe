import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductSection from "@/components/productItem/ProductSection";

export default function ShopPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <Header />
      <ProductSection />
      <Footer/>
    </main>
  );
}