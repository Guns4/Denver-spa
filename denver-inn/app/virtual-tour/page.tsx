"use client";

import VirtualTour from "@/src/components/VirtualTour";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { motion } from "framer-motion";
import { Eye, Sparkles, Shield } from "lucide-react";

export default function VirtualTourPage() {
    return (
        <main className="bg-[#1a1a1a] min-h-screen text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif text-[#D4AF37] mb-4">
                            Virtual Facility Tour
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            Experience our 5-star luxury spa from anywhere. Explore our VIP Suites, Finnish Sauna,
                            and Executive Lounge in stunning 360°.
                        </p>
                    </motion.div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
                        {[
                            { icon: Eye, label: "100% Authentic", desc: "No filters" },
                            { icon: Sparkles, label: "Premium Materials", desc: "Marble & Wood" },
                            { icon: Shield, label: "Verified Cleanliness", desc: "5-Star Standard" }
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white/5 rounded-xl p-4 border border-white/10 text-center"
                                >
                                    <Icon className="text-[#D4AF37] mx-auto mb-2" size={24} />
                                    <p className="text-white font-medium text-sm">{item.label}</p>
                                    <p className="text-white/50 text-xs">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Virtual Tour Component */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <VirtualTour />
                    </motion.div>

                    {/* Instructions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-xl p-6 border border-[#D4AF37]/20"
                    >
                        <h3 className="text-white font-serif text-lg mb-3">How to Navigate</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-white/70">
                            <div>
                                <span className="text-[#D4AF37] font-bold">Click & Drag:</span> Look around in 360°
                            </div>
                            <div>
                                <span className="text-[#D4AF37] font-bold">Scroll:</span> Zoom in/out
                            </div>
                            <div>
                                <span className="text-[#D4AF37] font-bold">Arrows:</span> Navigate between rooms
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-center mt-12"
                    >
                        <a
                            href="/"
                            className="inline-block px-8 py-4 bg-[#D4AF37] hover:bg-white text-black font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-[#D4AF37]/30"
                        >
                            Book Your Visit
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
