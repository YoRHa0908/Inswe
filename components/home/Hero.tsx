import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full">
            {/* blurred background */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/images/campaign-6.jpg"
                    alt="Hero background"
                    fill
                    className="object-cover blur-sm scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* foreground */}
            <div className="relative w-full h-[500px]">
                <Image
                    src="/assets/images/campaign-6.jpg"
                    alt="Hero"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </section>
    );
}