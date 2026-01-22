"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useBooking } from "../context/BookingContext";

export default function StickyBottomCTA() {
    const [isVisible, setIsVisible] = useState(false);


    const { openBooking } = useBooking();
    const pathname = usePathname();

    const isHiddenRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/login') || pathname?.startsWith('/register');

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down 100px
            setIsVisible(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isHiddenRoute) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-0 left-0 w-full z-40 md:hidden p-4 pb-6 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"
                >
                    <div className="pointer-events-auto">
                        <button
                            onClick={openBooking}
                            className="block w-full text-center py-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_10px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.5)] transition-shadow duration-300"
                        >
                            Book Appointment
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
