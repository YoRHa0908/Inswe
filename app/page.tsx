import Hero from "@/components/home/Hero";
import VideoHero from "@/components/home/VideoHero";
import CollectionCarousel from "@/components/home/CollectionCarousel";
import SubscribeSection from "@/components/home/SubscribeSection";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden bg-white dark:bg-[#0f0f0f]">
      <Header />
      <Hero />

      {/* Main video — New arrivals */}
      <VideoHero
        title="New arrivals"
        subtitle="Made with care and unconditionally loved by our customers."
        buttonText="Shop Now"
        buttonHref="/shop"
        videoSrc="/assets/videos/about_bag.mp4"
      />

      {/* First DISCOVER COLLECTION — caps only */}
      <CollectionCarousel
        capsOnly={false}
        title="DISCOVER COLLECTION"
      />

      {/* Caps video */}
      <VideoHero
        title=""
        buttonText="Shop Caps"
        buttonHref="/shop"
        videoSrc="/assets/videos/Caps.mp4"
      />

      {/* Second DISCOVER COLLECTION — caps only, below Caps.mp4 */}
      <CollectionCarousel
        capsOnly={true}
        title="DISCOVER COLLECTION"
      />

      {/* Campaign image section */}
      <VideoHero
        title="DISCOVER INSWÈ CAMPAIGN SZN 1"
        buttonText="SEE NOW"
        buttonHref="/shop"
        images="/assets/images/campaign-7.jpg"
      />

      <SubscribeSection />
      <Footer />
    </main>
  );
}
