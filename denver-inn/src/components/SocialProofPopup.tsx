"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, X } from "lucide-react";

interface SocialProofNotification {
    id: string;
    message: string;
    timestamp: Date;
}

export default function SocialProofPopup() {
    const [notification, setNotification] = useState<SocialProofNotification | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Mock data - in production, fetch from real booking events
    const notifications = [
        "Someone from Bandung just booked the VIP Suite",
        "Ahmad just booked Executive Massage",
        "Siti from Cimahi just booked Sport Massage",
        "Budi just booked Relaxation Therapy",
        "Rina from Dago just booked the Royal Package"
    ];

    useEffect(() => {
        const showNotification = () => {
            // Random notification from the pool
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];

            setNotification({
                id: Date.now().toString(),
                message: randomNotification,
                timestamp: new Date()
            });
            setIsVisible(true);

            // Auto-hide after 5 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        // Show first notification after 10 seconds
        const initialTimeout = setTimeout(showNotification, 10000);

        // Then show every 45-60 seconds (randomized for natural feel)
        const interval = setInterval(() => {
            const randomDelay = 45000 + Math.random() * 15000; // 45-60 seconds
            setTimeout(showNotification, randomDelay);
        }, 60000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && notification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="fixed bottom-24 left-6 z-40 max-w-sm"
                >
                    <div className="bg-gradient-to-r from-[#1a1a1a] to-black border border-[#D4AF37]/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
                        <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center shrink-0">
                                <TrendingUp className="text-[#D4AF37]" size={18} />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <p className="text-white text-sm font-medium mb-1">{notification.message}</p>
                                <p className="text-white/40 text-xs">Just now</p>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Animated Progress Bar */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="h-0.5 bg-[#D4AF37]/50 mt-3 rounded-full"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
