// app/campaign/page.tsx

import Image from "next/image";

const campaignImages = [
    "/assets/images/campaign-1.jpg",
    "/assets/images/campaign-2.jpg",
    "/assets/images/campaign-3.jpg",
    "/assets/images/campaign-4.jpg",
    "/assets/images/campaign-5.jpg",
    "/assets/images/campaign-6.jpg",
    "/assets/images/campaign-7.jpg",
    "/assets/images/campaign-8.jpg",
];


export default function Collection() {
  return (
    <main className="bg-white">
        <section className="px-4 pb-16 pt-8 sm:px-6 md:px-10 md:pb-24 md:pt-12">
        
        {/* CONTAINER */}
        <div className="mx-auto max-w-[700px]">
          
          {/* TITLE */}
          <h1 className="mb-10 text-[32px] font-semibold tracking-[-0.03em] text-neutral-900">
            S/S 26 Campaign
          </h1>

          {/* IMAGES */}
          <div className="flex flex-col gap-8">
            {campaignImages.map((image, index) => (
              <figure
                key={image}
                className="relative w-full overflow-hidden bg-neutral-100"
              >
                <Image
                  src={image}
                  alt={`Campaign image ${index + 1}`}
                  width={1200}
                  height={1600}
                  priority={index === 0}
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </figure>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}