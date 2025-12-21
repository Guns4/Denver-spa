"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const items = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000",
        title: "Therapeutic Rooms",
        category: "Ambiance",
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1544161515-4af6b1d462c2?q=80&w=1000",
        title: "Professional Massage",
        category: "Treatments",
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000",
        title: "Aromatic Essential Oils",
        category: "Relaxation",
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1519415510236-8559b1985622?q=80&w=1000",
        title: "Hot Stone Therapy",
        category: "Healing",
    },
    {
        id: 5,
        url: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=1000",
        title: "Zen Water Feature",
        category: "Ambiance",
    },
    {
        id: 6,
        url: "https://images.unsplash.com/photo-1620733723572-11c53f73a2ad?q=80&w=1000",
        title: "Luxury Lounge",
        category: "Ambiance",
    },
];

export default function Gallery() {
    return (
        <section id="gallery" className="py-24 px-6 bg-[#1a1a1a]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-4"
                    >
                        A Sanctuary of Calm
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 font-light tracking-widest uppercase text-xs"
                    >
                        Explore our executive facilities & ambiance
                    </motion.p>
                    <div className="w-24 h-[1px] bg-[#D4AF37]/30 mx-auto mt-8"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[400px] overflow-hidden rounded-2xl bg-white/5 border border-white/10"
                        >
                            <Image
                                src={item.url}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {item.category}
                                </p>
                                <h3 className="text-xl font-serif text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Glass subtle border on hover */}
                            <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/30 transition-colors duration-500 rounded-2xl pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
