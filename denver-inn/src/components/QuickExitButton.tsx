"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Shield } from "lucide-react";

interface QuickExitButtonProps {
    redirectUrl?: string;
    enableDoubleTap?: boolean;
}

export default function QuickExitButton({
    redirectUrl = "https://news.google.com",
    enableDoubleTap = true
}: QuickExitButtonProps) {
    const [lastTap, setLastTap] = useState(0);
    const [showHint, setShowHint] = useState(false);

    // Double-tap detection
    useEffect(() => {
        if (!enableDoubleTap) return;

        const handleKeyPress = (e: KeyboardEvent) => {
            // ESC key as alternative quick exit
            if (e.key === "Escape" && e.ctrlKey) {
                handleQuickExit();
            }
        };

        const handleDoubleTap = () => {
            const now = Date.now();
            const DOUBLE_TAP_DELAY = 300; // milliseconds

            if (now - lastTap < DOUBLE_TAP_DELAY) {
                handleQuickExit();
            }
            setLastTap(now);
        };

        window.addEventListener('keydown', handleKeyPress);
        document.addEventListener('dblclick', handleDoubleTap);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('dblclick', handleDoubleTap);
        };
    }, [lastTap, enableDoubleTap]);

    const handleQuickExit = () => {
        // Create a phantom browsing history to mask the visit
        const phantomPages = [
            'https://www.google.com/search?q=business+news',
            redirectUrl
        ];

        // Replace current history
        phantomPages.forEach((url, index) => {
            if (index === 0) {
                window.location.replace(url);
            }
        });
    };

    return (
        <>
            {/* Floating Quick Exit Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
                className="fixed top-4 left-4 z-50"
                onMouseEnter={() => setShowHint(true)}
                onMouseLeave={() => setShowHint(false)}
            >
                <button
                    onClick={handleQuickExit}
                    className="w-10 h-10 bg-black/50 hover:bg-red-600/80 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-white/10 hover:border-red-500/50 group"
                    aria-label="Quick Exit"
                >
                    <LogOut size={18} className="text-white group-hover:rotate-12 transition-transform" />
                </button>

                {/* Hint Tooltip */}
                <AnimatePresence>
                    {showHint && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute left-12 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-xl text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-white/20 shadow-xl"
                        >
                            <div className="flex items-center gap-2">
                                <Shield size={12} className="text-red-400" />
                                <span>Quick Exit (Ctrl+Esc)</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Privacy Notice (First Visit) */}
            {typeof window !== 'undefined' && !localStorage.getItem('privacy_notice_seen') && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="fixed bottom-24 right-6 max-w-sm bg-gradient-to-br from-black to-[#1a1a1a] border border-[#D4AF37]/30 rounded-xl p-4 shadow-2xl z-40 backdrop-blur-xl"
                >
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center shrink-0">
                            <Shield size={20} className="text-[#D4AF37]" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-medium text-sm mb-1">Private Browsing Mode</h4>
                            <p className="text-white/60 text-xs mb-3">
                                Use the exit button (top-left) or press Ctrl+Esc to quickly leave this page.
                            </p>
                            <button
                                onClick={() => {
                                    localStorage.setItem('privacy_notice_seen', 'true');
                                    setShowHint(false);
                                }}
                                className="text-[#D4AF37] text-xs font-semibold hover:underline"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
}
