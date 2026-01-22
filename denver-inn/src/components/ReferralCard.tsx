"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Gift, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ReferralCardProps {
    referralCode: string;
    loyaltyPoints: number;
    totalReferrals?: number;
}

export default function ReferralCard({ referralCode, loyaltyPoints, totalReferrals = 0 }: ReferralCardProps) {
    const [copied, setCopied] = useState(false);

    const shareMessage = `Cobain Denver Spa deh, pake kodeku ${referralCode} dapet diskon 20% lho! 💆‍♂️✨\n\nBook sekarang: https://denver-inn.com?ref=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        toast.success("Referral code copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
        window.open(url, '_blank');
        toast.success("Opening WhatsApp...");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#D4AF37]/20 via-[#1a1a1a] to-[#1a1a1a] border border-[#D4AF37]/30 rounded-2xl p-6 relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                        <Gift className="text-[#D4AF37]" size={24} />
                    </div>
                    <div>
                        <h3 className="text-white font-serif text-xl">Share & Earn</h3>
                        <p className="text-white/50 text-xs">Invite friends, get rewards</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Loyalty Points</p>
                        <p className="text-[#D4AF37] text-2xl font-bold">{loyaltyPoints}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Friends Invited</p>
                        <p className="text-[#D4AF37] text-2xl font-bold">{totalReferrals}</p>
                    </div>
                </div>

                {/* Referral Code */}
                <div className="bg-black/30 rounded-xl p-4 mb-4 border border-[#D4AF37]/20">
                    <p className="text-white/60 text-xs mb-2">Your Referral Code</p>
                    <div className="flex items-center justify-between">
                        <span className="text-white font-mono text-2xl font-bold tracking-widest">{referralCode}</span>
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            {copied ? <Check className="text-green-400" size={20} /> : <Copy className="text-white/60" size={20} />}
                        </button>
                    </div>
                </div>

                {/* Incentive Info */}
                <div className="bg-gradient-to-r from-green-900/20 to-transparent rounded-lg p-4 mb-4 border border-green-500/20">
                    <p className="text-green-400 text-sm font-medium mb-1">🎁 Referral Rewards</p>
                    <p className="text-white/70 text-xs leading-relaxed">
                        Your friend gets <span className="text-[#D4AF37] font-bold">20% OFF</span> their first visit.
                        You get <span className="text-[#D4AF37] font-bold">50 Points</span> when they complete their booking!
                    </p>
                </div>

                {/* Share Button */}
                <button
                    onClick={handleShareWhatsApp}
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                >
                    <Share2 size={20} />
                    Share via WhatsApp
                </button>
            </div>
        </motion.div>
    );
}
