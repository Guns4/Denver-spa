"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Parallax effect: Background moves slower than foreground
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Parallax Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Spa Background"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[var(--background)]" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center gap-8 px-4">

                {/* Floating Logo/Title Container */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="flex flex-col items-center gap-4"
                >
                    {/* Logo Placeholder (or use Text if no logo asset yet) */}
                    <div className="w-24 h-24 border-2 border-[var(--foreground)] rounded-full flex items-center justify-center mb-4 backdrop-blur-sm bg-white/5">
                        <span className="font-serif text-4xl">D</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-serif text-[var(--foreground)] tracking-wider">
                        Denver Inn
                    </h1>
                    <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-white/80">
                        Luxury Spa & Wellness
                    </p>
                </motion.div>

                {/* Glassmorphism Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white tracking-widest uppercase text-sm font-medium hover:bg-white/20 transition-colors shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                    Book Now
                </motion.button>
            </div>
        </div>
    );
}
