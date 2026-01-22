"use client";

import { motion } from "framer-motion";
import { Crown, Clock, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface BlackCardProps {
    memberName: string;
    memberId: string;
    totalVisitHours: number;
    memberSince: string;
    tier: 'bronze' | 'silver' | 'gold';
}

export default function BlackCard({ memberName, memberId, totalVisitHours, memberSince, tier }: BlackCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-md mx-auto"
            style={{ perspective: '1000px' }}
        >
            {/* Card Container */}
            <div
                className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.2)'
                }}
            >
                {/* Metallic Texture Overlay */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                    }}
                />

                {/* Gold Accent Corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/20 to-transparent rounded-bl-full" />

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Crown className="text-[#D4AF37]" size={20} />
                                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em]">
                                    Denver Elite
                                </span>
                            </div>
                            <p className="text-white/40 text-[10px] uppercase tracking-wider">Member Card</p>
                        </div>

                        {/* Tier Badge */}
                        <div
                            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                            style={{
                                backgroundColor: tier === 'gold' ? '#FFD700' : tier === 'silver' ? '#C0C0C0' : '#CD7F32',
                                color: '#000',
                                borderColor: tier === 'gold' ? '#FFD700' : tier === 'silver' ? '#C0C0C0' : '#CD7F32',
                            }}
                        >
                            {tier}
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className="absolute top-6 right-6 bg-white p-2 rounded-lg">
                        <QRCodeSVG value={memberId} size={60} />
                    </div>

                    {/* Member Info */}
                    <div className="mt-auto">
                        <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Member Name</p>
                        <h3 className="text-white font-serif text-xl mb-4">{memberName}</h3>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Total Hours */}
                            <div>
                                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Visit Hours</p>
                                <div className="flex items-center gap-1">
                                    <Clock size={14} className="text-[#D4AF37]" />
                                    <span className="text-white font-bold text-lg">{totalVisitHours}h</span>
                                </div>
                            </div>

                            {/* Member Since */}
                            <div>
                                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Since</p>
                                <div className="flex items-center gap-1">
                                    <Sparkles size={14} className="text-[#D4AF37]" />
                                    <span className="text-white font-bold text-lg">{memberSince}</span>
                                </div>
                            </div>
                        </div>

                        {/* Member ID */}
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-white/30 font-mono text-xs">{memberId}</p>
                        </div>
                    </div>
                </div>

                {/* Holographic Shine Effect */}
                <motion.div
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'linear'
                    }}
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        background: 'linear-gradient(135deg, transparent 30%, rgba(212,175,55,0.1) 50%, transparent 70%)',
                        backgroundSize: '200% 200%',
                    }}
                />
            </div>

            {/* Benefits Text Below Card */}
            <div className="mt-6 text-center">
                <p className="text-white/60 text-sm mb-2">Your exclusive benefits:</p>
                <div className="flex justify-center gap-4 text-xs text-white/40">
                    <span>• Priority Booking</span>
                    <span>• Special Discounts</span>
                    <span>• VIP Access</span>
                </div>
            </div>
        </motion.div>
    );
}
