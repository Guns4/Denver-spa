import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, CheckCircle } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import StickyBottomCTA from "@/src/components/StickyBottomCTA";
import Reviews from "@/src/components/Reviews";

// Dummy Data (replace with DB fetch)
const servicesData: Record<string, any> = {
    "executive-massage": {
        title: "Executive Massage",
        price: "Rp 350.000",
        duration: "90 Mins",
        description: "Designed for the modern gentleman, our Executive Massage targets deep muscle tension accumulated from long office hours. This treatment combines Swedish and Deep Tissue techniques to restore mobility and reduce stress.",
        benefits: ["Relieves lower back pain", "Improves posture", "Reduces mental fatigue"],
        image: "/images/services/executive-massage.jpg"
    },
    // Add more...
};

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const service = servicesData[slug];

    if (!service) return notFound();

    return (
        <main className="bg-[#1a1a1a] min-h-screen text-white font-sans">
            <Navbar />

            {/* HERO */}
            <section className="relative h-[60vh] w-full">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-2">{service.title}</h1>
                    <p className="text-[#D4AF37] text-lg font-medium tracking-wide">{service.price} &bull; {service.duration}</p>
                </div>
            </section>

            {/* CONTENT */}
            <div className="container mx-auto px-6 py-12 max-w-4xl">
                <div className="mb-12">
                    <h2 className="text-2xl font-serif text-[#D4AF37] mb-6">Description</h2>
                    <p className="text-white/80 leading-relaxed text-lg font-light">
                        {service.description}
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-serif text-[#D4AF37] mb-6">Benefits</h2>
                    <ul className="space-y-4">
                        {service.benefits.map((benefit: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-3 text-white/80">
                                <CheckCircle className="text-[#D4AF37]" size={20} />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Reviews />
            <Footer />
            <StickyBottomCTA />
        </main>
    );
}
