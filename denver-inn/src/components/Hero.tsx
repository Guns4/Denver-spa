"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

            {/* 1. BACKGROUND IMAGE (Fixed/Parallax feel) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/_DSC1997.JPG" // Ganti dengan gambar background pilihan Anda
                    alt="Spa Ambience Background"
                    fill
                    className="object-cover opacity-40" // Opacity dikurangi agar text terbaca
                    priority
                />
                {/* Overlay Gradient agar lebih mewah & text terbaca */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#1a1a1a]" />
            </div>

            {/* 2. KONTEN UTAMA (Floating/Antigravity) */}
            <div className="relative z-10 text-center px-6 flex flex-col items-center w-full">

                {/* Animasi Antigravity untuk Gambar Utama (Layer 1) */}
                <motion.div
                    animate={{ y: [0, -15, 0] }} // Gerak lebih halus
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mb-8 w-full flex justify-center"
                >
                    <Image
                        src="/assets/Denver Inn Art.JPG"
                        alt="Denver Inn Art"
                        width={320}
                        height={140}
                        className="object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] w-[240px] md:w-[320px]"
                        priority
                    />
                </motion.div>

                {/* Teks Subjudul dengan Fade In */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-gray-200 text-[10px] sm:text-xs md:text-base font-light tracking-[0.2em] md:tracking-[0.3em] mb-12 uppercase text-center max-w-[90vw] md:max-w-none leading-relaxed"
                >
                    Luxury Ambience Experience <span className="hidden sm:inline mx-2">•</span> <br className="sm:hidden" /> Premium Relaxation
                </motion.p>

                {/* Tombol CTA */}
                <motion.a
                    href="#services"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-widest uppercase hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-500 rounded-sm"
                >
                    Explore Services
                </motion.a>
            </div>
        </section>
    );
}