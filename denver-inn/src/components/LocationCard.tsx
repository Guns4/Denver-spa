"use client";

import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";

export default function LocationCard() {
    const handleGetDirections = () => {
        const lat = -6.225014; // Contoh Lat Jakarta Selatan (Senopati area)
        const lng = 106.809715; // Contoh Long

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        if (isIOS) {
            window.open(`http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`, '_blank');
        } else {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        }
    };

    return (
        <section className="w-full max-w-4xl mx-auto py-12 px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >

                {/* MAP VISUAL SECTION */}
                <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden group">
                    {/* Elegant Dark Map Placeholder */}
                    <Image
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                        alt="Denver Inn Location Map"
                        fill
                        className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#1a1a1a]/30 mix-blend-multiply" />

                    {/* Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <button
                            onClick={handleGetDirections}
                            className="px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-full shadow-lg hover:scale-110 hover:bg-white transition-all duration-300 flex items-center gap-2"
                        >
                            <MapPin className="w-5 h-5" />
                            Get Directions
                        </button>
                    </div>
                </div>

                {/* INFO TEXT SECTION */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-6">
                    <div>
                        <h3 className="text-3xl font-serif text-[#D4AF37] mb-2">Visit Our Sanctuary</h3>
                        <div className="w-12 h-[1px] bg-[#D4AF37]/50 mb-4"></div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-4 text-white/80 font-light">
                            <MapPin className="w-6 h-6 text-[#D4AF37] mt-1 shrink-0" />
                            <div>
                                <p className="font-medium text-white tracking-wide">Denver Inn Luxury Spa</p>
                                <p className="text-sm opacity-70 leading-relaxed">Jl. Senopati No. 88, Kebayoran Baru<br />Jakarta Selatan, 12190</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 text-white/80 font-light">
                            <Clock className="w-6 h-6 text-[#D4AF37] mt-1 shrink-0" />
                            <div>
                                <p className="font-medium text-white tracking-wide">Opening Hours</p>
                                <p className="text-sm opacity-70">Daily: 10:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
        </section>
    );
}
