export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;   // primary image (used by "You may also like")
  images: string[]; // all 4 images for the hover carousel
  inStock: boolean;
  isFeatured?: boolean; // For featured products in CollectionCarousel
  isCaps?: boolean; // For featured products in CollectionCarousel
};

// Main product catalog - includes all products
export const allProducts: Product[] = [
  // Existing products from ProductSection
  {
    id: 1,
    name: "Modern Leather Bag",
    price: 79.99,
    image: "/assets/images/PHO00003.JPG",
    images: [
      "/assets/images/PHO00003.JPG",
      "/assets/images/PHO00004.JPG",
      "/assets/images/PHO00005.JPG",
      "/assets/images/PHO00006.JPG",
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Modern Leather Bag2",
    price: 79.99,
    image: "/assets/images/PHO00007.JPG",
    images: [
      "/assets/images/PHO00007.JPG",
      "/assets/images/PHO00009.JPG",
      "/assets/images/PHO00010.JPG",
      "/assets/images/PHO00011.JPG",
    ],
    inStock: true,
    isFeatured: true,
  },
  // CollectionCarousel featured products
  {
    id: 3,
    name: "Modern Leather Bag3",
    price: 79.99,
    image: "/assets/images/PHO00009.JPG",
    images: [
      "/assets/images/PHO00009.JPG",
      "/assets/images/PHO00007.JPG",
      "/assets/images/PHO00010.JPG",
      "/assets/images/PHO00011.JPG",
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Modern Leather Bag4",
    price: 79.99,
    image: "/assets/images/PHO00010.JPG",
    images: [
      "/assets/images/PHO00010.JPG",
      "/assets/images/PHO00009.JPG",
      "/assets/images/PHO0007.JPG",
      "/assets/images/PHO00011.JPG",
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 5,
    name: "Modern Leather Bag5",
    price: 79.99,
    image: "/assets/images/PHO00011.JPG",
    images: [
      "/assets/images/PHO00011.JPG",
      "/assets/images/PHO00009.JPG",
      "/assets/images/PHO0007.JPG",
      "/assets/images/PHO00010.JPG",
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 6,
    name: "Pink zipper cap",
    price: 84.99,
    image: "/assets/images/JNSWE_caps_17_pink.jpg",
    images: [
      "/assets/images/JNSWE_caps_17_pink.jpg",
      "/assets/images/JNSWE_caps_17_pink1.jpg",
      "/assets/images/JNSWE_caps_17_pink2.jpg",
      "/assets/images/JNSWE_caps_17_pink3.jpg",
    ],
    inStock: true,
    isCaps:true
  },
  {
    id: 7,
    name: "Black rope trucker cap",
    price: 84.99,
    image: "/assets/images/JNSWE_caps_18_black.jpg",
    images: [
      "/assets/images/JNSWE_caps_18_black.jpg",
      "/assets/images/JNSWE_caps_18_black1.jpg",
      "/assets/images/JNSWE_caps_18_black2.jpg",
      "/assets/images/JNSWE_caps_18_black3.jpg",
    ],
    inStock: true,
    isCaps:true
  },
  {
    id: 8,
    name: "Blue rope trucker cap",
    price: 84.99,
    image: "/assets/images/JNSWE_caps_19_blue.jpg",
    images: [
      "/assets/images/JNSWE_caps_19_blue.jpg",
      "/assets/images/JNSWE_caps_19_blue1.jpg",
      "/assets/images/JNSWE_caps_19_blue2.jpg",
      "/assets/images/JNSWE_caps_19_blue3.jpg",
    ],
    inStock: true,
    isCaps:true
  },
  {
    id: 9,
    name: "Brown zipper cap",
    price: 79.99,
    image: "/assets/images/JNSWE_caps_20_brown.jpg",
    images: [
      "/assets/images/JNSWE_caps_20_brown.jpg",
      "/assets/images/JNSWE_caps_20_brown1.jpg",
      "/assets/images/JNSWE_caps_20_brown2.jpg",
      "/assets/images/JNSWE_caps_20_brown3.jpg",
    ],
    inStock: true,
    isCaps:true
  },
  {
    id: 10,
    name: "Black zipper cap",
    price: 84.99,
    image: "/assets/images/JNSWE_caps_21_backzip.jpg",
    images: [
      "/assets/images/JNSWE_caps_21_backzip.jpg",
      "/assets/images/JNSWE_caps_21_backzip1.jpg",
      "/assets/images/JNSWE_caps_21_backzip2.jpg",
      "/assets/images/JNSWE_caps_21_backzip3.jpg",
    ],
    inStock: true,
    isCaps:true
  },
  {
    id: 11,
    name: "White Rope cap",
    price: 79.99,
    image: "/assets/images/JNSWE_caps_22_white.jpg",
    images: [
      "/assets/images/JNSWE_caps_22_white.jpg",
      "/assets/images/JNSWE_caps_17_pink.jpg",
      "/assets/images/JNSWE_caps_18_black.jpg",
      "/assets/images/JNSWE_caps_19_blue.jpg",
    ],
    inStock: true,
    isCaps:true
  },
];

// Get featured products for CollectionCarousel
export const getFeaturedProducts = () => allProducts.filter(product => product.isFeatured);

// Get product by ID
export const getProductById = (id: number) => allProducts.find(product => product.id === id);

// Get related products (excluding the current product)
export const getRelatedProducts = (currentProductId: number, limit: number = 4) => {
  return allProducts
    .filter(product => product.id !== currentProductId)
    .slice(0, limit);
};