"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

            {/* 1. BACKGROUND IMAGE (Fixed/Parallax feel) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/_DSC4744.JPG" // Ganti dengan gambar background pilihan Anda
                    alt="Spa Ambience Background"
                    fill
                    className="object-cover opacity-40" // Opacity dikurangi agar text terbaca
                    priority
                />
                {/* Overlay Gradient agar lebih mewah & text terbaca */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#1a1a1a]" />
            </div>

            {/* 2. KONTEN UTAMA (Floating/Antigravity) */}
            <div className="relative z-10 text-center px-4 flex flex-col items-center">

                {/* Animasi Antigravity untuk Gambar Utama (Layer 1) */}
                <motion.div
                    animate={{ y: [0, -20, 0] }} // Bergerak naik 20px lalu turun lagi
                    transition={{
                        duration: 6, // Durasi 6 detik (sangat lambat & halus)
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mb-6 w-64 md:w-96 relative h-40 md:h-60"
                >
                    <Image
                        src="/assets/Logo.png" // Gambar tulisan/logo artistik Anda
                        alt="Denver Inn Art"
                        fill
                        className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" // Efek glow emas tipis
                    />
                </motion.div>

                {/* Teks Subjudul dengan Fade In */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-gray-200 text-lg md:text-xl font-light tracking-[0.2em] mb-10 max-w-2xl"
                >
                    LUXURY AMBIENCE EXPERIENCE • PREMIUM RELAXATION
                </motion.p>

                {/* Tombol CTA */}
                <motion.a
                    href="#services"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm tracking-widest uppercase hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-500 rounded-sm"
                >
                    Explore Services
                </motion.a>
            </div>
        </section>
    );
}