"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, Users, Star } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function AboutPage() {
    return (
        <main className="bg-black min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">
            <Navbar />

            <div className="flex flex-col lg:flex-row min-h-screen pt-20 lg:pt-0">
                {/* Visual Side (Left on Desktop) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen sticky top-0"
                >
                    <Image
                        src="/assets/_DSC1997.JPG"
                        alt="Denver Inn Interior"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black lg:hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </motion.div>

                {/* Content Side (Right on Desktop) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-black">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="max-w-xl"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors text-xs uppercase tracking-[0.3em] font-bold mb-12 group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>

                        <header className="mb-12">
                            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                                The Gentleman's <br />
                                <span className="text-[#D4AF37]">Sanctuary</span> in Bandung.
                            </h1>
                            <p className="text-xl md:text-2xl text-white/60 font-serif italic">
                                Recharge. Reset. Revitalize.
                            </p>
                        </header>

                        <section className="space-y-8 text-white/80 leading-relaxed font-light text-lg">
                            <p>
                                Denver Inn Spa is designed exclusively for the modern man. Located in the heart of Bandung, we offer a refuge from the chaotic city life.
                            </p>
                            <p>
                                Our certified therapists combine traditional healing techniques with modern luxury facilities. Whether you need deep tissue recovery after the gym or a silent hour to clear your mind, Denver Inn is your personal space.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
                            <div className="space-y-2">
                                <Award className="text-[#D4AF37] mb-4" size={24} />
                                <h4 className="font-bold text-white text-sm uppercase tracking-widest">5+ Years</h4>
                                <p className="text-xs text-white/40 uppercase">Experience</p>
                            </div>
                            <div className="space-y-2">
                                <Users className="text-[#D4AF37] mb-4" size={24} />
                                <h4 className="font-bold text-white text-sm uppercase tracking-widest">1000+</h4>
                                <p className="text-xs text-white/40 uppercase">Happy Guests</p>
                            </div>
                            <div className="space-y-2">
                                <Star className="text-[#D4AF37] mb-4" size={24} />
                                <h4 className="font-bold text-white text-sm uppercase tracking-widest">5-Star</h4>
                                <p className="text-xs text-white/40 uppercase">Facilities</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
