"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getGalleryItems } from "@/src/data/galleryData";

// Get items from shared data source
const items = getGalleryItems();

export default function Gallery() {
    return (
        <section id="gallery" className="py-20 bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-4"
                    >
                        The Experience
                    </motion.h2>
                    <p className="text-white/60 tracking-widest uppercase text-sm">Visual Journey</p>
                </div>

                {/* MASONRY LAYOUT */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-zoom-in"
                        >
                            <Image
                                src={item.url}
                                alt={item.title}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <p className="text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                {item.category}
                            </p>
                            <h3 className="text-lg md:text-xl font-serif text-white translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                {item.title}
                            </h3>

                            {/* Glass subtle border on hover */}
                            <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/30 transition-colors duration-500 rounded-2xl pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
