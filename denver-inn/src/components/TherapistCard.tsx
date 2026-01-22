"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Clock, CheckCircle2 } from "lucide-react";

interface TherapistProfile {
    id: string;
    name: string;
    title: string;
    photo: string;
    yearsExperience: number;
    certifications: string[];
    specialties: string[];
    nextAvailable?: string; // e.g., "15:30 Today" or "Tomorrow 10:00"
    isAvailable: boolean;
}

interface TherapistCardProps {
    therapist: TherapistProfile;
    onBook?: (therapistId: string) => void;
}

export default function TherapistCard({ therapist, onBook }: TherapistCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group relative overflow-hidden"
        >
            {/* Professional Photo */}
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-[#D4AF37]/50 transition-all">
                <Image
                    src={therapist.photo}
                    alt={therapist.name}
                    fill
                    className="object-cover"
                />

                {/* Availability Indicator */}
                <div
                    className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center ${therapist.isAvailable ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                >
                    {therapist.isAvailable && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                </div>
            </div>

            {/* Name & Title */}
            <div className="text-center mb-4">
                <h3 className="text-white font-serif text-lg mb-1">{therapist.name}</h3>
                <p className="text-[#D4AF37] text-xs uppercase tracking-wider">{therapist.title}</p>
            </div>

            {/* Experience */}
            <div className="flex items-center justify-center gap-2 mb-4 text-white/60 text-sm">
                <Award size={16} className="text-[#D4AF37]" />
                <span>{therapist.yearsExperience} Years Experience</span>
            </div>

            {/* Certifications */}
            <div className="mb-4">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2 text-center">Certifications</p>
                <div className="space-y-1">
                    {therapist.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-white/70">
                            <CheckCircle2 size={12} className="text-green-400 shrink-0" />
                            <span>{cert}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Specialties */}
            <div className="mb-4">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2 text-center">Specialties</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {therapist.specialties.map((specialty, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded text-[10px] text-[#D4AF37] uppercase tracking-wider"
                        >
                            {specialty}
                        </span>
                    ))}
                </div>
            </div>

            {/* Availability Bar */}
            {therapist.nextAvailable && (
                <div className="bg-gradient-to-r from-green-900/20 to-transparent rounded-lg p-3 mb-4 border border-green-500/20">
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-green-400" />
                        <div>
                            <p className="text-green-400 text-xs font-semibold">Next Available</p>
                            <p className="text-white/70 text-xs">{therapist.nextAvailable}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Book Button */}
            <button
                onClick={() => onBook?.(therapist.id)}
                disabled={!therapist.isAvailable}
                className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 ${therapist.isAvailable
                        ? 'bg-[#D4AF37] hover:bg-white text-black shadow-lg shadow-[#D4AF37]/30'
                        : 'bg-white/5 text-white/30 cursor-not-allowed'
                    }`}
            >
                {therapist.isAvailable ? 'Book Session' : 'Fully Booked'}
            </button>

            {/* Professional Standard Badge */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 size={16} className="text-[#D4AF37]" />
            </div>
        </motion.div>
    );
}

// Sample Data for Testing
export const SAMPLE_THERAPISTS: TherapistProfile[] = [
    {
        id: "T001",
        name: "Sarah Kim",
        title: "Senior Therapist",
        photo: "https://i.pravatar.cc/150?u=sarah",
        yearsExperience: 8,
        certifications: ["Certified Shiatsu", "Aromatherapy Specialist", "Sports Massage"],
        specialties: ["Deep Tissue", "Shiatsu", "Sport Recovery"],
        nextAvailable: "15:30 Today",
        isAvailable: true
    },
    {
        id: "T002",
        name: "Michael Chen",
        title: "Spa Director",
        photo: "https://i.pravatar.cc/150?u=michael",
        yearsExperience: 12,
        certifications: ["Physiotherapy Background", "Hot Stone Certified", "Reflexology Master"],
        specialties: ["Hot Stone", "Reflexology", "Thai Massage"],
        nextAvailable: "Tomorrow 10:00",
        isAvailable: true
    },
    {
        id: "T003",
        name: "Diana Lee",
        title: "Massage Therapist",
        photo: "https://i.pravatar.cc/150?u=diana",
        yearsExperience: 5,
        certifications: ["Swedish Massage", "Prenatal Certified"],
        specialties: ["Relaxation", "Swedish", "Prenatal"],
        isAvailable: false
    }
];
