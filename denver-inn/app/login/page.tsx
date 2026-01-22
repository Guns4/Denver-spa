"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import OTPInput from "@/src/components/ui/OTPInput";
import { useHaptic } from "@/src/hooks/useHaptic";
import { Phone, ArrowRight, Lock } from "lucide-react";

export default function LoginPage() {
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { trigger } = useHaptic();

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (phone.length < 10) {
            toast.error("Please enter a valid phone number");
            trigger("error");
            return;
        }

        setIsLoading(true);
        trigger("light");

        // Simulate API call to send OTP
        setTimeout(() => {
            setIsLoading(false);
            setStep("otp");
            toast.success("OTP sent to your WhatsApp!");
            trigger("success");
        }, 1500);
    };

    const handleOTPComplete = (code: string) => {
        setIsLoading(true);
        trigger("medium"); // Haptic feedback on complete

        // Simulate OTP Verification
        setTimeout(() => {
            setIsLoading(false);
            if (code === "1234") { // Mock "correct" code
                toast.success("Welcome back to Denver Inn!");
                trigger("success");
                // Redirect logic here
            } else {
                toast.error("Invalid Code. Try 1234.");
                trigger("error");
            }
        }, 1500);
    };

    // Phone formatting helper
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
        if (value.startsWith("0")) value = value.substring(1); // Remove leading 0 if present (we add +62)
        if (value.startsWith("62")) value = value.substring(2); // Remove 62 if user typed it
        setPhone(value);
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-black font-sans">
            {/* BACKGROUND AMBIENCE */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 blur-sm scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="text-center mb-10">
                    <Link href="/">
                        <h1 className="text-4xl font-serif text-[#D4AF37] mb-2 drop-shadow-lg tracking-wider">Denver Inn</h1>
                    </Link>
                    <p className="text-white/60 text-sm tracking-wide uppercase">The Gentleman's Sanctuary</p>
                </div>

                {/* GLASS CARD */}
                <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {step === "phone" ? (
                            <motion.form
                                key="phone-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handlePhoneSubmit}
                                className="space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-medium text-white mb-2">Sign In</h2>
                                    <p className="text-white/40 text-sm">Enter your number to continue</p>
                                </div>

                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-white/10 pr-3">
                                        <span className="text-lg">🇮🇩</span>
                                        <span className="text-white/60 font-medium">+62</span>
                                    </div>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        placeholder="812-3456-7890"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-28 pr-4 text-lg text-white font-medium tracking-wide focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/20"
                                        autoFocus
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || phone.length < 9}
                                    className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                                >
                                    {isLoading ? (
                                        <span className="animate-pulse">Sending...</span>
                                    ) : (
                                        <>
                                            Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="otp-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6 text-center"
                            >
                                <div className="mb-8">
                                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                                        <Lock size={20} />
                                    </div>
                                    <h2 className="text-2xl font-medium text-white mb-2">Verification</h2>
                                    <p className="text-white/40 text-sm">We sent a code to <span className="text-white">+62 {phone}</span></p>
                                </div>

                                <OTPInput length={4} onComplete={handleOTPComplete} />

                                <div className="mt-8">
                                    <button
                                        onClick={() => setStep("phone")}
                                        className="text-xs text-white/30 hover:text-[#D4AF37] transition-colors"
                                    >
                                        Wrong number? Go back
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <p className="mt-8 text-center text-[10px] text-white/20 uppercase tracking-widest">
                    Secure Encrypted Login
                </p>
            </div>
        </main>
    );
}
