"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function TermsPage() {
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
                                <ShieldCheck size={32} />
                                <span className="uppercase tracking-[0.4em] text-xs font-bold">Kerangka Hukum</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif text-white">Syarat & Ketentuan</h1>
                        </header>

                        <div className="prose prose-invert prose-gold max-w-none">
                            <section className="mb-12">
                                <h3 className="text-xl font-serif text-[#D4AF37] mb-6">1. Kebijakan Reservasi</h3>
                                <p className="text-white/60 leading-relaxed mb-4 font-light">
                                    Pemesanan yang dilakukan melalui platform digital kami adalah reservasi yang mengikat secara hukum. Saat Anda memesan slot, kami mendedikasikan sumber daya dan terapis secara eksklusif untuk Anda.
                                </p>
                                <p className="text-white/60 leading-relaxed font-medium">
                                    ⚠️ Ketidakhadiran dalam janji temu terjadwal (No-Show) sebanyak 3 kali akan mengakibatkan penangguhan akun permanen dan pemblokiran (blacklist) dari sistem kami.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h3 className="text-xl font-serif text-[#D4AF37] mb-6">2. Kode Etik & Perilaku</h3>
                                <p className="text-white/60 leading-relaxed mb-4 font-light">
                                    Denver Inn Spa adalah institusi kesehatan yang <strong className="text-white underline decoration-[#D4AF37]">sepenuhnya profesional</strong>. Kami menjaga keamanan dan martabat staf kami dengan keseriusan mutlak.
                                </p>
                                <ul className="list-disc pl-5 text-white/60 space-y-3 mb-4 font-light">
                                    <li>Segala bentuk perilaku yang tidak pantas terhadap staf akan mengakibatkan penghentian layanan secara instan.</li>
                                    <li>Permintaan layanan di luar menu (non-menu services) sangat dilarang.</li>
                                    <li>Dalam kasus seperti ini, tidak ada pengembalian uang (refund) yang akan diberikan, dan pihak berwenang dapat dihubungi jika diperlukan.</li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h3 className="text-xl font-serif text-[#D4AF37] mb-6">3. Kesehatan & Keselamatan</h3>
                                <p className="text-white/60 leading-relaxed mb-4 font-light">
                                    Kesejahteraan Anda adalah prioritas kami. Mohon informasikan kepada terapis atau meja resepsionis mengenai kondisi medis, alergi, atau cedera terbaru sebelum perawatan dimulai.
                                </p>
                                <p className="text-white/60 leading-relaxed font-light">
                                    Denver Inn Spa berhak menolak layanan kepada siapa pun yang berada di bawah pengaruh zat terlarang.
                                </p>
                            </section>
                        </div>

                        <div className="mt-20 pt-12 border-t border-white/5 flex justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors text-xs uppercase tracking-[0.3em] font-bold group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
