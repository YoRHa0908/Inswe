
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "BLACK TRUCK ROPE CAP",
    href: "/assets/images/PHO00007.JPG",
    img: "/cap1.jpg",
  },
  {
    title: "BROWN HALF ZIPPER",
    href: "/assets/images/PHO00007.JPG",
    img: "/cap2.jpg",
  },
  {
    title: "PINK ZIPPER CAP",
    href: "/assets/images/PHO00007.JPG",
    img: "/cap3.jpg",
  },
  {
    title: "WHITE ROPE CAP",
    href: "/assets/images/PHO00007.JPG",
    img: "/cap4.jpg",
  },
];

export default function CollectionCarousel() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-xl font-semibold mb-6">
          DISCOVER COLLECTION
        </h3>

        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {collections.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="min-w-[240px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3">
                <p className="text-sm font-medium">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}