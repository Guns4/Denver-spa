"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Gallery from "@/src/components/Gallery";

export default function GalleryPage() {
    return (
        <main className="bg-black min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <header className="mb-24 text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors text-xs uppercase tracking-[0.3em] font-bold mb-12 group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Home
                            </Link>
                            <div className="flex flex-col items-center gap-4 mb-6 text-[#D4AF37]">
                                <Camera size={32} />
                                <span className="uppercase tracking-[0.5em] text-[10px] font-bold">Visual Journal</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
                                The <span className="text-[#D4AF37]">Ambiance</span>
                            </h1>
                            <p className="text-xl text-white/50 font-serif italic max-w-2xl mx-auto">
                                "A glimpse into the sanctuary. Where shadows meet luxury."
                            </p>
                        </header>

                        {/* GALLERY COMPONENT INTEGRATION */}
                        <div className="relative z-10">
                            <Gallery />
                        </div>

                        <div className="mt-32 pt-16 border-t border-white/10 text-center">
                            <p className="text-white/40 text-sm font-light uppercase tracking-widest mb-8">
                                Captured at Denver Inn Spa branch
                            </p>
                            <Link
                                href="/virtual-tour"
                                className="inline-block px-10 py-4 border border-[#D4AF37] text-[#D4AF37] rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#D4AF37] hover:text-black transition-all"
                            >
                                Take 360° Tour
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
