"use client";

import { motion } from "framer-motion";
import { Crown, Award, Medal } from "lucide-react";

type UserTier = 'bronze' | 'silver' | 'gold';

interface TierProgressProps {
    currentTier: UserTier;
    totalReferrals: number;
}

const TIER_CONFIG = {
    bronze: {
        name: "Bronze Member",
        color: "#CD7F32",
        icon: Medal,
        nextTier: "silver",
        requirement: 3,
        benefits: ["Standard rates", "Early access to promos"]
    },
    silver: {
        name: "Silver VIP",
        color: "#C0C0C0",
        icon: Award,
        nextTier: "gold",
        requirement: 10,
        benefits: ["Permanent 5% OFF", "Birthday surprise", "SMS reminders"]
    },
    gold: {
        name: "Gold Elite",
        color: "#FFD700",
        icon: Crown,
        nextTier: null,
        requirement: null,
        benefits: ["Permanent 10% OFF", "Priority booking", "Free welcome drink", "Exclusive events"]
    }
};

export default function TierProgress({ currentTier, totalReferrals }: TierProgressProps) {
    const config = TIER_CONFIG[currentTier];
    const Icon = config.icon;

    // Calculate progress to next tier
    const getProgress = () => {
        if (currentTier === 'gold') return 100; // Max tier

        const nextTierRequirement = config.requirement || 0;
        const previousTierRequirement = currentTier === 'silver' ? 3 : 0;

        const progress = ((totalReferrals - previousTierRequirement) / (nextTierRequirement - previousTierRequirement)) * 100;
        return Math.min(Math.max(progress, 0), 100);
    };

    const remaining = config.nextTier ? (config.requirement || 0) - totalReferrals : 0;

    return (
        <div className="bg-gradient-to-br from-black via-[#1a1a1a] to-[#0a0a0a] border rounded-2xl p-6 relative overflow-hidden" style={{ borderColor: `${config.color}40` }}>
            {/* Background Glow */}
            <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at top right, ${config.color}, transparent)` }}></div>

            <div className="relative z-10">
                {/* Current Tier Badge */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${config.color}20` }}>
                            <Icon size={24} style={{ color: config.color }} />
                        </div>
                        <div>
                            <h3 className="font-serif text-lg" style={{ color: config.color }}>{config.name}</h3>
                            <p className="text-white/50 text-xs">Your current status</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white font-bold text-2xl">{totalReferrals}</p>
                        <p className="text-white/40 text-xs uppercase tracking-wider">Referrals</p>
                    </div>
                </div>

                {/* Progress Circle (for next tier) */}
                {config.nextTier && (
                    <div className="mb-6">
                        <div className="flex items-center justify-center mb-4">
                            <svg className="transform -rotate-90" width="140" height="140">
                                {/* Background Circle */}
                                <circle
                                    cx="70"
                                    cy="70"
                                    r="60"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="8"
                                />
                                {/* Progress Circle */}
                                <motion.circle
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: getProgress() / 100 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    cx="70"
                                    cy="70"
                                    r="60"
                                    fill="none"
                                    stroke={TIER_CONFIG[config.nextTier].color}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray="377" // 2 * PI * 60
                                />
                                {/* Center Text */}
                                <text x="70" y="65" textAnchor="middle" className="text-white font-bold text-xl fill-white">
                                    {remaining}
                                </text>
                                <text x="70" y="80" textAnchor="middle" className="text-white/50 text-xs fill-white/50">
                                    more
                                </text>
                            </svg>
                        </div>

                        <div className="text-center">
                            <p className="text-white/70 text-sm mb-1">
                                <span className="font-bold" style={{ color: TIER_CONFIG[config.nextTier].color }}>
                                    {remaining} friends away
                                </span> from unlocking
                            </p>
                            <p className="font-serif text-lg" style={{ color: TIER_CONFIG[config.nextTier].color }}>
                                {TIER_CONFIG[config.nextTier].name}
                            </p>
                        </div>
                    </div>
                )}

                {/* Benefits List */}
                <div className="pt-4 border-t border-white/10">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Your Benefits</p>
                    <div className="space-y-2">
                        {config.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }}></div>
                                <p className="text-white/80 text-sm">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gold Achievement */}
                {currentTier === 'gold' && (
                    <div className="mt-6 bg-gradient-to-r from-[#FFD700]/20 to-transparent rounded-lg p-4 border border-[#FFD700]/30">
                        <p className="text-[#FFD700] font-serif text-sm">🏆 You've reached the highest tier! Enjoy your exclusive benefits.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
