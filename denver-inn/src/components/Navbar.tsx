"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useBooking } from "../context/BookingContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    const { openBooking } = useBooking();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent ${scrolled || isOpen
                ? "bg-black/80 backdrop-blur-xl border-white/5 py-3"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* LEFT SPACER - for balanced layout */}
                <div className="w-20 md:w-24"></div>

                {/* CENTER MENU LINKS (Desktop) */}
                <div className="hidden md:flex items-center space-x-10">
                    {["Home", "Services", "Gallery"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : item === "Gallery" ? "/#gallery" : `/${item.toLowerCase()}`}
                            className="text-white/80 hover:text-[#D4AF37] font-light tracking-widest text-sm uppercase transition-all duration-300 relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex items-center gap-4 z-50">
                    <button
                        onClick={openBooking}
                        className="hidden md:inline-flex px-8 py-2.5 bg-[#D4AF37] text-black hover:bg-white hover:text-black transition-all duration-300 rounded-sm text-xs font-semibold uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    >
                        Book Now
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white p-2 focus:outline-none hover:text-[#D4AF37] transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-black/90 z-40 flex flex-col items-center justify-center gap-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex flex-col items-center gap-8"
                        >
                            {["Home", "Services", "Gallery"].map((item, index) => (
                                <Link
                                    key={item}
                                    href={item === "Home" ? "/" : item === "Gallery" ? "/#gallery" : `/${item.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    className="text-3xl font-serif text-white/90 hover:text-[#D4AF37] transition-colors tracking-wide"
                                >
                                    {item}
                                </Link>
                            ))}

                            <div className="w-12 h-[1px] bg-white/10 my-4"></div>

                            <button
                                onClick={() => { setIsOpen(false); openBooking(); }}
                                className="px-10 py-4 bg-[#D4AF37] text-black font-semibold uppercase tracking-[0.2em] text-sm rounded-sm shadow-xl"
                            >
                                Book Appointment
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
