"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Mail, Clock, Navigation, CheckCircle2 } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function ContactPage() {
    const contactMessage = encodeURIComponent("Halo Denver Inn Spa, saya tertarik dengan layanan Anda. Bisakah saya mendapatkan informasi menu dan ketersediaan slot untuk reservasi? Terima kasih.");

    return (
        <main className="bg-black min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">
            <Navbar />

            <div className="flex flex-col lg:flex-row min-h-screen pt-20 lg:pt-0">
                {/* Visual Side (Left on Desktop) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen sticky top-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"
                        alt="Denver Inn Facade"
                        fill
                        className="object-cover grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black lg:hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                    {/* Floating Info Overlay for Desktop */}
                    <div className="absolute bottom-12 left-12 hidden lg:block max-w-xs p-6 glass border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4 text-[#D4AF37]">
                            <CheckCircle2 size={24} />
                            <span className="font-bold tracking-widest text-xs uppercase">Verified Location</span>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed italic">
                            "Located in the historic heart of Braga, providing a safe and discrete sanctuary for years."
                        </p>
                    </div>
                </motion.div>

                {/* Content Side (Right on Desktop) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-black">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="max-w-xl w-full"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors text-xs uppercase tracking-[0.3em] font-bold mb-12 group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>

                        <header className="mb-12">
                            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                                Reach Our <br />
                                <span className="text-[#D4AF37]">Concierge</span>
                            </h1>
                            <p className="text-lg text-white/50 font-light">
                                Your digital butler is ready to assist with reservations and menu inquiries.
                            </p>
                        </header>

                        <div className="space-y-10">
                            {/* Address */}
                            <div className="flex items-start gap-6">
                                <MapPin className="text-[#D4AF37] mt-1 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-serif text-white text-xl mb-2">Location</h4>
                                    <p className="text-white/60 font-light leading-relaxed">
                                        Komp. Banceuy Permai<br />
                                        Jl. ABC No.112, Braga<br />
                                        Bandung, West Java 40111
                                    </p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex items-start gap-6">
                                <Clock className="text-[#D4AF37] mt-1 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-serif text-white text-xl mb-2">Service Hours</h4>
                                    <p className="text-white/60 font-light leading-relaxed">
                                        Open Daily (Setiap Hari)<br />
                                        11:00 AM — 12:00 PM
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-6">
                                <Mail className="text-[#D4AF37] mt-1 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-serif text-white text-xl mb-2">Correspondence</h4>
                                    <p className="text-white/60 font-light leading-relaxed">
                                        contact@denverinn-spa.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 pt-12 border-t border-white/10">
                            <a
                                href={`https://wa.me/628112251337?text=${contactMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 py-4 bg-[#D4AF37] text-black rounded-full hover:bg-white transition-all text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-[#D4AF37]/20"
                            >
                                Contact WhatsApp
                            </a>
                            <button
                                onClick={() => window.open('https://maps.google.com', '_blank')}
                                className="flex items-center justify-center gap-3 py-4 border border-white/20 text-white rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-xs uppercase tracking-[0.2em] font-bold"
                            >
                                <Navigation size={14} />
                                Get Directions
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
