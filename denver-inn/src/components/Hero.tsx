"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CinematicHero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-noise">
            {/* Parallax Background Image */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/assets/_DSC1997.JPG"
                    alt="Denver Inn Spa Interior"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={90}
                    sizes="100vw"
                />
            </motion.div>

            {/* Cinematic Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-20 px-6 text-center max-w-5xl mx-auto"
            >
                {/* Brand Logo with Professional Motion Effects */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-10 flex justify-center"
                >
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative w-[70vw] h-[30vh] md:w-[50vw] md:h-[40vh] lg:w-[40vw] lg:h-[45vh] max-w-[700px] max-h-[350px]"
                        style={{
                            filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.35)) drop-shadow(0 0 50px rgba(212, 175, 55, 0.15))'
                        }}
                    >
                        <Image
                            src="/assets/Denver Inn Art.JPG"
                            alt="Denver Inn Spa Logo"
                            fill
                            className="object-contain"
                            priority
                            quality={100}
                        />
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    The gentleman's sanctuary in Bandung. Executive wellness, absolute discretion.
                </motion.p>

                {/* Magnetic CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                    <Link href="/booking">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative px-10 py-4 bg-[#D4AF37] hover:bg-[#C19A2E] rounded-full font-bold uppercase tracking-widest text-black transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Book Appointment
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </span>
                        </motion.button>
                    </Link>

                    <Link href="/virtual-tour">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-10 py-4 glass border border-white/20 hover:border-white/40 rounded-full font-semibold uppercase tracking-widest text-white transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                <Play className="fill-white" size={20} />
                                Virtual Tour
                            </span>
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}