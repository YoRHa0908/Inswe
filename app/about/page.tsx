import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
export const dynamic = 'force-dynamic'
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="section-padding">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="max-w-4xl">
              {/* Title */}
              <h1 className="mb-10 text-[2.1rem] font-bold tracking-[-0.02em] text-[#1e1e1e]">
                s/s 26 Campaign
              </h1>

              {/* Content */}
              <div className="space-y-8 text-[1.1rem] leading-[1.8] tracking-[-0.01em] text-[#222]">
                <p>
                  Founded in 2025 by designer and creative director Juan José Mouko
                  Nsue, INSWĒ is a celebration of movement. Born in Equatorial
                  Guinea, raised in Madrid, and now based in London, Juan José’s
                  journey mirrors the essence of the brand — one that embraces the
                  richness of migration and the beauty of blending cultures.
                </p>

                <p>
                  INSWĒ captures the uniqueness that comes from living in multiple
                  places, from forming identities through movement. Every garment is
                  a reflection of the spaces, sounds, and cultures that leave an
                  indelible mark.
                </p>

                <p>
                  Luxury at INSWĒ is not only found in the material, but in the
                  freedom to express one’s true self. It lies in the act of carrying
                  parts of different communities, histories, and experiences,
                  wearing them with pride as the foundation of individual identity.
                  Through the lens of Juan José, INSWĒ honours the quiet power of
                  transformation — where every piece is intricately crafted to
                  embraces the richness of migration and the beauty of blending
                  cultures.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}