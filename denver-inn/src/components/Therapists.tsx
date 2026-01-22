"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const therapists = [
    {
        id: 1,
        name: "Sarah Jenkins",
        title: "Senior Therapist",
        specialties: ["Deep Tissue", "Shiatsu"],
        image: "/images/therapists/sarah.jpg", // Placeholder path
        available: true,
    },
    {
        id: 2,
        name: "David Chen",
        title: "Massage Therapist",
        specialties: ["Reflexology", "Sport"],
        image: "/images/therapists/david.jpg",
        available: true,
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        title: "Spa Director",
        specialties: ["Aromatherapy", "Facial"],
        image: "/images/therapists/elena.jpg",
        available: false,
    },
    {
        id: 4,
        name: "Michael Chang",
        title: "Therapist",
        specialties: ["Thai Massage", "Stretching"],
        image: "/images/therapists/michael.jpg",
        available: true,
    },
];

export default function Therapists() {
    return (
        <section className="py-20 bg-[#111] border-t border-white/5">
            {/* HORIZONTAL SCROLL LIST */}
            <div className="flex overflow-x-auto snap-x snap-mandatory px-6 pb-8 gap-6 scrollbar-hide">
                {therapists.map((therapist, index) => (
                    <motion.div
                        key={therapist.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="snap-center shrink-0 w-[280px] bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-colors group relative"
                    >
                        {/* Avatar */}
                        <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors">
                            <Image
                                src={`https://i.pravatar.cc/150?u=${therapist.name}`} // Using pravatar for demo
                                alt={therapist.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Availability Dot */}
                        <div className={`absolute top-6 right-6 w-3 h-3 rounded-full ${therapist.available ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-red-500"}`} title={therapist.available ? "Available Today" : "Fully Booked"} />

                        {/* Info */}
                        <div className="text-center">
                            <h3 className="text-white font-serif text-lg">{therapist.name}</h3>
                            <p className="text-[#D4AF37] text-xs uppercase tracking-wider mb-4">{therapist.title}</p>

                            <div className="flex flex-wrap justify-center gap-2">
                                {therapist.specialties.map(skill => (
                                    <span key={skill} className="px-2 py-1 bg-white/10 rounded text-[10px] text-white/80">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
