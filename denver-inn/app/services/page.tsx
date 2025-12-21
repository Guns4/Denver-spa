"use client";

import Navbar from "@/src/components/Navbar";
import Services from "@/src/components/Services";
import { motion } from "framer-motion";

export default function ServicesPage() {
    return (
        <main className="bg-[#1a1a1a] min-h-screen text-white font-sans">
            <Navbar />

            {/* Header Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-serif text-[#D4AF37] mb-6">Our Services</h1>
                        <p className="max-w-2xl mx-auto text-white/60 font-light leading-relaxed">
                            Discover our range of premium executive treatments, from therapeutic massages
                            to full-body recovery therapies designed for the modern gentleman.
                        </p>
                        <div className="w-24 h-[1px] bg-[#D4AF37]/30 mx-auto mt-12" />
                    </motion.div>
                </div>
            </section>

            {/* Main Services Grid */}
            <div className="pb-32">
                <Services />
            </div>

            {/* Footer CTA */}
            <section className="py-20 bg-black/30 backdrop-blur-sm border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-serif text-white mb-8 italic">Ready to experience deep relaxation?</h2>
                    <motion.a
                        href="/booking"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-12 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:bg-white transition-all"
                    >
                        Reserve Your Session
                    </motion.a>
                </div>
            </section>
        </main>
    );
}
