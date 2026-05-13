import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/productItem/ProductDetail";

// Static product data — mirrors ProductSection
const products = [
  {
    id: 1,
    name: "black half zipper",
    price: 79.99,
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
    images: [
      "/assets/images/PHO00007.JPG",
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
    images: [
      "/assets/images/PHO00007.JPG",
      "/assets/images/PHO00003.JPG",
      "/assets/images/PHO00011.JPG",
      "/assets/images/PHO00004.JPG",
    ],
    inStock: true,
  },
  {
    id: 4,
    name: "black zipper cap",
    price: 84.99,
    images: [
      "/assets/images/PHO00007.JPG",
      "/assets/images/PHO00005.JPG",
      "/assets/images/PHO00006.JPG",
      "/assets/images/PHO00009.JPG",
    ],
    inStock: true,
  },
  {
    id: 5,
    name: "blue truck robe cap",
    price: 84.99,
    images: [
      "/assets/images/PHO00007.JPG",
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
    images: [
      "/assets/images/PHO00007.JPG",
      "/assets/images/PHO00004.JPG",
      "/assets/images/PHO00005.JPG",
      "/assets/images/PHO00006.JPG",
    ],
    inStock: true,
  },
  {
    id: 7,
    name: "Pink zipper cap",
    price: 84.99,
    images: [
      "/assets/images/PHO00007.JPG",
      "/assets/images/PHO00009.JPG",
      "/assets/images/PHO00010.JPG",
      "/assets/images/PHO00011.JPG",
    ],
    inStock: true,
  },
  {
    id: 8,
    name: "white rope cap",
    price: 79.99,
    images: [
      "/assets/images/PHO00007.JPG",
      "/assets/images/PHO00003.JPG",
      "/assets/images/PHO00004.JPG",
      "/assets/images/PHO00005.JPG",
    ],
    inStock: true,
  },
];

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <main className="bg-[#f5f5f5] min-h-screen">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-[16px] text-[#666]">Product not found.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </main>
  );
}
