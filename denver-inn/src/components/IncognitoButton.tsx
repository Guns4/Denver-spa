"use client";

import { motion } from "framer-motion";
import { Trash2, Shield, AlertTriangle } from "lucide-react";
import { useIncognito } from "@/src/hooks/useIncognito";
import { useState } from "react";

export default function IncognitoButton() {
    const { quickClean } = useIncognito();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleClick = () => {
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        quickClean();
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={handleClick}
                className="flex items-center gap-2 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all text-white/70 hover:text-white text-sm"
            >
                <Trash2 size={16} />
                <span>Quick Clean</span>
            </button>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1a1a1a] border border-red-500/30 rounded-2xl p-8 max-w-md w-full"
                    >
                        {/* Warning Icon */}
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="text-red-500" size={32} />
                        </div>

                        {/* Title */}
                        <h3 className="text-white font-serif text-2xl text-center mb-4">
                            Privacy Mode
                        </h3>

                        {/* Description */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start gap-3">
                                <Shield className="text-[#D4AF37] mt-0.5 shrink-0" size={18} />
                                <div>
                                    <p className="text-white/90 text-sm mb-1">
                                        This will immediately:
                                    </p>
                                    <ul className="text-white/60 text-xs space-y-1 list-disc list-inside">
                                        <li>Clear all browsing data</li>
                                        <li>Delete booking history</li>
                                        <li>Remove preferences</li>
                                        <li>Redirect to a neutral page</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-6">
                            <p className="text-red-400 text-xs text-center">
                                This action cannot be undone. Make sure you've saved any important information.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all"
                            >
                                Clean & Exit
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
