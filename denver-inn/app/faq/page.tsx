"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const FAQS = [
    {
        q: "Apakah saya harus membayar di website?",
        a: "Tidak. Kami menggunakan sistem Pay at Outlet. Booking di website hanya untuk mengamankan slot. Pembayaran dilakukan di kasir (Cash/QRIS/Card)."
    },
    {
        q: "Apakah tempat ini menjaga privasi?",
        a: "Privasi adalah prioritas nomor satu kami. Data tamu dijaga kerahasiaannya, dan kami menyediakan opsi 'Incognito' bagi tamu yang membutuhkan ketenangan ekstra."
    },
    {
        q: "Apa yang harus saya bawa?",
        a: "Anda tidak perlu membawa apa pun. Kami menyediakan pakaian ganti steril, handuk premium, slippers, dan perlengkapan mandi lengkap."
    },
    {
        q: "Bagaimana jika saya terlambat?",
        a: "Kami memberikan toleransi waktu 30 menit. Jika lebih dari itu, durasi treatment mungkin akan disesuaikan agar tidak mengganggu tamu berikutnya."
    }
];

function FAQItem({ q, a, isOpen, toggle }: { q: string, a: string, isOpen: boolean, toggle: () => void }) {
    return (
        <div className="border-b border-white/5 last:border-none">
            <button
                onClick={toggle}
                className="w-full flex items-center justify-between py-8 text-left group"
            >
                <h3 className={`text-lg md:text-xl transition-colors ${isOpen ? 'text-[#D4AF37]' : 'text-white/80 group-hover:text-white'}`}>
                    {q}
                </h3>
                <div className="shrink-0 ml-4">
                    {isOpen ? <Minus size={20} className="text-[#D4AF37]" /> : <Plus size={20} className="text-white/40" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 text-white/50 leading-relaxed font-light md:text-lg max-w-2xl">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">FAQ</h1>
                        <p className="text-[#D4AF37] font-serif italic text-xl mb-16">Pertanyaan yang Sering Diajukan</p>

                        <div className="space-y-2">
                            {FAQS.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    q={faq.q}
                                    a={faq.a}
                                    isOpen={openIndex === index}
                                    toggle={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            ))}
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
