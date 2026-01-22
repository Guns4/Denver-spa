"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function PrivacyPage() {
    return (
        <main className="bg-black min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <header className="mb-16 border-b border-white/5 pb-12">
                            <div className="flex items-center gap-4 text-[#D4AF37] mb-6">
                                <Lock size={32} />
                                <span className="uppercase tracking-[0.4em] text-xs font-bold">Security First</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif text-white">Privacy Policy</h1>
                        </header>

                        <div className="prose prose-invert max-w-none">
                            <section className="mb-12">
                                <h3 className="text-xl font-serif text-[#D4AF37] mb-6">1. Data Collection</h3>
                                <p className="text-white/60 leading-relaxed mb-4">
                                    We respect the privacy of our distinguished guests. We only collect the necessary information required for booking verification and a personalized experience:
                                </p>
                                <ul className="list-disc pl-5 text-white/60 space-y-3 mb-4 font-light">
                                    <li>Phone Number (for booking verification and OTP)</li>
                                    <li>Name (personalization)</li>
                                    <li>Treatment History (loyalty points only)</li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h3 className="text-xl font-serif text-[#D4AF37] mb-6">2. Data Usage</h3>
                                <p className="text-white/60 leading-relaxed mb-4 font-light">
                                    We do <strong>NOT</strong> sell, trade, or share your data with third-party marketing agencies. Your information is used solely for reservation management, loyalty status tracking, and critical service notifications.
                                </p>
                            </section>

                            <section className="mb-12 bg-white/5 p-8 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-serif text-[#D4AF37] mb-6 flex items-center gap-3">
                                    3. The Right to be Forgotten
                                </h3>
                                <p className="text-white/60 leading-relaxed font-light mb-0">
                                    You have the full right to request data deletion. Through our **Incognito Wipe** feature accessible in your profile, you can instantly erase your treatment history and sensitive data from our live session storage.
                                </p>
                            </section>
                        </div>

                        <div className="mt-20 pt-12 border-t border-white/5 flex justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors text-xs uppercase tracking-[0.3em] font-bold group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Home
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
