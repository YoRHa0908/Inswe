import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full h-[280px] sm:h-[400px] md:h-[500px] overflow-hidden">
            <Image
                src="/assets/images/campaign-6.jpg"
                alt="Hero"
                fill
                className="object-cover object-center"
                priority
            />
        </section>
    );
}