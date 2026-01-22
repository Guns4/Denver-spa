"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Droplets, Sofa } from "lucide-react";

const FACILITIES = [
    {
        id: "vip-suite",
        title: "VIP Royal Suite",
        desc: "Private sanctuary with premium marble finishes",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
        size: "large" // Takes 2 columns on desktop
    },
    {
        id: "sauna",
        title: "Sauna & Steam",
        desc: "Finnish sauna with chromotherapy",
        icon: Droplets,
        color: "#4ECDC4"
    },
    {
        id: "lounge",
        title: "Executive Lounge",
        desc: "Private relaxation area",
        icon: Sofa,
        color: "#9B59B6"
    }
];

export default function BentoFacilities() {
    return (
        <section className="py-24 md:py-32 px-6 bg-black">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-gray-100 mb-4">
                        World-Class Facilities
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Every detail designed for your comfort
                    </p>
                </motion.div>

                {/* Desktop: Bento Grid */}
                <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
                    {/* Large Box - VIP Suite (spans 2 rows on left) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer bg-noise"
                    >
                        <Link href="/virtual-tour">
                            <div className="relative h-full min-h-[600px]">
                                <Image
                                    src={FACILITIES[0].image}
                                    alt={FACILITIES[0].title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-3xl font-serif text-white mb-2">{FACILITIES[0].title}</h3>
                                    <p className="text-gray-300">{FACILITIES[0].desc}</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Small Box - Sauna */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative rounded-3xl overflow-hidden glass-light border border-white/10 p-8 min-h-[290px] flex flex-col justify-between group hover:border-[#4ECDC4]/50 transition-all duration-300"
                    >
                        <div>
                            <div className="w-16 h-16 bg-[#4ECDC4]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Droplets className="text-[#4ECDC4]" size={32} />
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-2">{FACILITIES[1].title}</h3>
                            <p className="text-gray-400 text-sm">{FACILITIES[1].desc}</p>
                        </div>
                    </motion.div>

                    {/* Small Box - Lounge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative rounded-3xl overflow-hidden glass-light border border-white/10 p-8 min-h-[290px] flex flex-col justify-between group hover:border-[#9B59B6]/50 transition-all duration-300"
                    >
                        <div>
                            <div className="w-16 h-16 bg-[#9B59B6]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Sofa className="text-[#9B59B6]" size={32} />
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-2">{FACILITIES[2].title}</h3>
                            <p className="text-gray-400 text-sm">{FACILITIES[2].desc}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile: Horizontal Snap Carousel */}
                <div className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
                    <div className="flex gap-4 pb-4">
                        {FACILITIES.map((facility, idx) => (
                            <motion.div
                                key={facility.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="snap-center shrink-0 w-[85vw]"
                            >
                                {facility.image ? (
                                    <div className="relative h-[400px] rounded-3xl overflow-hidden bg-noise">
                                        <Image
                                            src={facility.image}
                                            alt={facility.title}
                                            fill
                                            className="object-cover"
                                            sizes="85vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-2xl font-serif text-white mb-2">{facility.title}</h3>
                                            <p className="text-gray-300 text-sm">{facility.desc}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="glass-light border border-white/10 rounded-3xl p-8 h-[400px] flex flex-col justify-between">
                                        <div>
                                            {facility.icon && (
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6`} style={{ backgroundColor: `${facility.color}20` }}>
                                                    <facility.icon style={{ color: facility.color }} size={32} />
                                                </div>
                                            )}
                                            <h3 className="text-2xl font-serif text-white mb-2">{facility.title}</h3>
                                            <p className="text-gray-400">{facility.desc}</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
