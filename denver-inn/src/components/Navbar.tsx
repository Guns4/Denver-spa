"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    // Efek agar navbar berubah warna saat di-scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* LOGO SECTION */}
                <Link href="/" className="relative z-10">
                    <Image
                        src="/assets/denver SPA tanpa nama.png" // Path logo Anda
                        alt="Denver Inn Logo"
                        width={120} // Sesuaikan ukuran lebar logo
                        height={50} // Sesuaikan ukuran tinggi
                        className="object-contain"
                        priority
                    />
                </Link>

                {/* MENU LINKS (Desktop) */}
                <div className="hidden md:flex space-x-8 text-white/90 font-light tracking-wider">
                    <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
                    <Link href="/services" className="hover:text-[#D4AF37] transition-colors">Services</Link>
                    <Link href="/#gallery" className="hover:text-[#D4AF37] transition-colors">Gallery</Link>
                </div>

                {/* BUTTON BOOK NOW */}
                <Link
                    href="/booking"
                    className="hidden md:inline-block px-6 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 rounded-full"
                >
                    Book Now
                </Link>
            </div>
        </nav>
    );
}