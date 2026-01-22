"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Navigation, Phone } from "lucide-react";
import Image from "next/image";

export default function LocationCard() {
    const handleGetDirections = () => {
        const lat = -6.918456; // Bandung coordinates
        const lng = 107.608321;
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (isIOS) {
            window.open(`http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`, '_blank');
        } else {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        }
    };

    return (
        <section className="w-full max-w-4xl mx-auto py-8 px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
                {/* MAP VISUAL SECTION */}
                <div className="relative w-full md:w-1/2 h-48 md:h-auto overflow-hidden group">
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
                            className="px-5 py-2.5 bg-[#D4AF37] text-black font-semibold rounded-full shadow-lg hover:scale-110 hover:bg-white transition-all duration-300 flex items-center gap-2 text-sm"
                        >
                            <MapPin className="w-4 h-4" />
                            Get Directions
                        </button>
                    </div>
                </div>

                {/* INFO TEXT SECTION */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center gap-4">
                    <div>
                        <h3 className="text-2xl font-serif text-[#D4AF37] mb-1">Our Location</h3>
                        <div className="w-10 h-[1px] bg-[#D4AF37]/50 mb-3"></div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-4 text-white/80 font-light">
                            <MapPin className="w-6 h-6 text-[#D4AF37] mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium text-white text-base tracking-wide border-b border-[#D4AF37]/30 pb-1 mb-1 inline-block">Denver Inn Luxury Spa</p>
                                <p className="text-sm opacity-70 leading-relaxed">Jl. ABC No.112, Braga, Bandung</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 text-white/80 font-light">
                            <Clock className="w-6 h-6 text-[#D4AF37] mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium text-white text-base tracking-wide border-b border-[#D4AF37]/30 pb-1 mb-1 inline-block">Opening Hours</p>
                                <p className="text-sm opacity-70">Daily: 11:00 AM - 12:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-white/5">
                        <button onClick={handleGetDirections} className="flex items-center justify-center gap-2 py-3.5 border border-white/20 rounded-xl hover:border-[#D4AF37] hover:bg-white/5 hover:text-[#D4AF37] transition-all text-[11px] uppercase tracking-[0.2em] font-medium">
                            <Navigation size={14} />
                            Maps
                        </button>
                        <a
                            href={`https://wa.me/628112251337?text=${encodeURIComponent("Halo Denver Inn Spa, saya tertarik dengan layanan Anda. Bisakah saya mendapatkan informasi menu dan ketersediaan slot untuk reservasi? Terima kasih.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black rounded-xl hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(212,175,55,0.3)] transition-all text-[11px] uppercase tracking-[0.2em] font-bold shadow-lg"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
