"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Crown, Star, Zap, ShieldCheck } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import BlackCard from "@/src/components/BlackCard";

const TIERS = [
    {
        name: "Bronze",
        icon: Star,
        color: "#CD7F32",
        condition: "Free to join",
        benefits: ["Welcome bonus: 100 points", "Birthday special offer", "Points on every visit"]
    },
    {
        name: "Silver",
        icon: Zap,
        color: "#C0C0C0",
        condition: "3+ Successful referrals",
        benefits: ["All Bronze benefits", "5% Permanent discount", "Priority booking window", "Free drink upgrade"]
    },
    {
        name: "Gold",
        icon: Crown,
        color: "#FFD700",
        condition: "10+ Successful referrals",
        benefits: ["All Silver benefits", "10% Permanent discount", "VIP room private access", "Exclusive events invitation"]
    }
];

export default function MembershipPage() {
    return (
        <main className="bg-black min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <header className="mb-20 text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors text-xs uppercase tracking-[0.3em] font-bold mb-12 group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Home
                            </Link>
                            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
                                Denver <span className="text-[#D4AF37]">Elite</span>
                            </h1>
                            <p className="text-xl text-white/50 font-serif italic max-w-2xl mx-auto">
                                "The mark of privilege. A tiered experience for our most loyal patrons."
                            </p>
                        </header>

                        {/* Card Spotlight */}
                        <div className="mb-32 flex justify-center">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <BlackCard
                                    memberName="Elite Member"
                                    memberId="DEN-ELITE-XXXX"
                                    totalVisitHours={0}
                                    memberSince="2024"
                                    tier="bronze"
                                />
                            </motion.div>
                        </div>

                        {/* Tier Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                            {TIERS.map((tier, idx) => {
                                const Icon = tier.icon;
                                return (
                                    <motion.div
                                        key={tier.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 transition-all group"
                                    >
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 group-hover:bg-[#D4AF37]/10 transition-colors">
                                                <Icon style={{ color: tier.color }} size={28} />
                                            </div>
                                            <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">{tier.condition}</span>
                                        </div>
                                        <h3 className="text-3xl font-serif text-white mb-6">{tier.name}</h3>
                                        <ul className="space-y-4">
                                            {tier.benefits.map((benefit, bIdx) => (
                                                <li key={bIdx} className="flex items-start gap-3 text-sm text-white/60 font-light">
                                                    <ShieldCheck size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* CTA Section */}
                        <div className="text-center p-16 rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10">
                            <h2 className="text-3xl md:text-5xl font-serif mb-8">Ready to ascend?</h2>
                            <p className="text-white/60 mb-12 max-w-xl mx-auto font-light leading-relaxed">
                                Join our inner circle to start earning points on every visit and unlock the true potential of Denver Inn luxury.
                            </p>
                            <Link
                                href="/register"
                                className="px-12 py-5 bg-[#D4AF37] text-black rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:bg-white transition-all shadow-xl shadow-[#D4AF37]/20"
                            >
                                Get Your Digital Card
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
