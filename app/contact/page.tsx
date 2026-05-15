import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <section className="mx-auto flex-1 w-full max-w-[560px] px-4 py-14 sm:px-6 sm:py-20">
        {/* Heading */}
        <h1 className="mb-2 text-center text-[32px] font-semibold tracking-[-0.03em] text-[#1a1a1a] sm:text-[42px]">
          Contact
        </h1>
        <p className="mb-10 text-center text-[15px] text-[#888]">
          We&apos;ll get back to you as soon as possible.
        </p>

        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}
