"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/src/components/Navbar";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate registration
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: 'Creating account...',
            success: 'Account created! Please sign in.',
            error: 'Error',
        });
    };

    return (
        <main className="min-h-screen bg-[#111] text-white flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-sm"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif text-[#D4AF37] mb-2">Join The Club</h1>
                        <p className="text-white/50 text-sm">Create an account for exclusive perks</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        {/* Name Input */}
                        <div className="relative group">
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer placeholder-transparent"
                                placeholder="Full Name"
                                id="name"
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-0 top-3 text-white/50 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#D4AF37] peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/50 -top-4 text-xs text-[#D4AF37]"
                            >
                                Full Name
                            </label>
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer placeholder-transparent"
                                placeholder="Email Address"
                                id="email"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-0 top-3 text-white/50 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#D4AF37] peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/50 -top-4 text-xs text-[#D4AF37]"
                            >
                                Email Address
                            </label>
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer placeholder-transparent"
                                placeholder="Password"
                                id="password"
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-0 top-3 text-white/50 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#D4AF37] peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/50 -top-4 text-xs text-[#D4AF37]"
                            >
                                Password
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-300"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-white/50">
                        Already have an account? <Link href="/login" className="text-[#D4AF37] hover:underline">Sign In</Link>
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
