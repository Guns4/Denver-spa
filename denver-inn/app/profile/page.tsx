"use client";

import BlackCard from "@/src/components/BlackCard";
import TherapistCard, { SAMPLE_THERAPISTS } from "@/src/components/TherapistCard";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { motion } from "framer-motion";

export default function ProfilePage() {
    return (
        <main className="bg-[#1a1a1a] min-h-screen text-white">
            <Navbar />

            <div className="pt-32 pb-16 px-6">
                <div className="container mx-auto max-w-6xl">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif text-[#D4AF37] mb-4">
                            Your Elite Profile
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            Manage your membership, track your wellness journey, and connect with our certified professionals.
                        </p>
                    </motion.div>

                    {/* Black Card Section */}
                    <section className="mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl font-serif text-white text-center mb-8"
                        >
                            Your Membership Card
                        </motion.h2>
                        <BlackCard
                            memberName="John Anderson"
                            memberId="DEN-2026-001"
                            totalVisitHours={24}
                            memberSince="Jan 2026"
                            tier="gold"
                        />
                    </section>

                    {/* Therapists Section */}
                    <section>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
                                Our Certified Professionals
                            </h2>
                            <p className="text-white/60 text-sm">
                                Highly trained therapists committed to your wellness journey
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {SAMPLE_THERAPISTS.map((therapist, idx) => (
                                <motion.div
                                    key={therapist.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <TherapistCard
                                        therapist={therapist}
                                        onBook={(id) => alert(`Booking with therapist ID: ${id}`)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
