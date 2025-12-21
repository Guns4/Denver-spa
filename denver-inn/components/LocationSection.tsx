"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function LocationSection() {
    const openMaps = () => {
        // Coordinates for Denver Inn (Placeholder: Seminyak area for demo)
        const lat = -8.6829;
        const lng = 115.1585;

        // Check if device is iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        if (isIOS) {
            window.open(`maps://maps.apple.com/?daddr=${lat},${lng}`, '_blank');
        } else {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        }
    };

    return (
        <section className="w-full relative py-24 px-6 flex flex-col items-center">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="flex flex-col gap-8 order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-[#e2d1c3] mb-6">Find Your Sanctuary</h2>
                        <div className="flex flex-col gap-6 text-white/70 font-light tracking-wide">
                            <p>
                                Nestled in the heart of Jakarta, Denver Inn offers an escape from the bustling city life.
                                Our location is designed to provide maximum privacy and tranquility.
                            </p>
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-[#e2d1c3] mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium text-white">Denver Inn Spa</p>
                                    <p>Jl. Senopati No. 123, Kebayoran Baru</p>
                                    <p>Jakarta Selatan, 12190</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                onClick={openMaps}
                                className="group px-8 py-4 bg-[#e2d1c3] text-[#0f172a] rounded-full font-semibold uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center gap-2"
                            >
                                Get Directions
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                            <p className="mt-4 text-xs text-white/40 italic">
                                *Automatically opens Apple Maps on iOS devices
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Map Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-1 md:order-2 relative h-[500px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                >
                    {/* Static Map Image Placeholder (using Unsplash dark map aesthetic) */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop")' }}
                    >
                        {/* Overlay Pin */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="w-4 h-4 bg-[#e2d1c3] rounded-full animate-ping absolute inset-0"></div>
                                <div className="w-4 h-4 bg-[#e2d1c3] rounded-full relative border-2 border-[#0f172a]"></div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-[#0f172a]/20 mix-blend-multiply pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
