"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? "bg-black/90 backdrop-blur-md py-2" : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* LOGO SECTION */}
                <Link href="/" className="relative z-10" onClick={() => setIsOpen(false)}>
                    <Image
                        src="/assets/denver SPA tanpa nama.png"
                        alt="Denver Inn Logo"
                        width={80}
                        height={32}
                        className="object-contain md:w-[90px]"
                        priority
                    />
                </Link>

                {/* MENU LINKS (Desktop) */}
                <div className="hidden md:flex space-x-8 text-white/90 font-light tracking-wider">
                    <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
                    <Link href="/services" className="hover:text-[#D4AF37] transition-colors">Services</Link>
                    <Link href="/#gallery" className="hover:text-[#D4AF37] transition-colors">Gallery</Link>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/booking"
                        className="hidden md:inline-block px-6 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 rounded-full text-sm uppercase tracking-widest"
                    >
                        Book Now
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white p-2 focus:outline-none"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/5 py-10 px-6 md:hidden flex flex-col items-center gap-8 shadow-2xl"
                    >
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-serif text-white hover:text-[#D4AF37] transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/services"
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-serif text-white hover:text-[#D4AF37] transition-colors"
                        >
                            Services
                        </Link>
                        <Link
                            href="/#gallery"
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-serif text-white hover:text-[#D4AF37] transition-colors"
                        >
                            Gallery
                        </Link>

                        <Link
                            href="/booking"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 px-10 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] rounded-full text-sm"
                        >
                            Book Now
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
