"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const links = {

        support: [
            { name: "FAQ", href: "/faq" },
            { name: "Terms", href: "/terms" },
            { name: "Privacy", href: "/privacy" },
            { name: "About Us", href: "/about" },
        ],
    };

    return (
        <footer className="bg-[#0a0a0a] text-white/40 pt-16 pb-32 md:pb-16 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 text-center md:text-left">
                    {/* BRAND */}
                    <div className="flex flex-col items-center md:items-start max-w-sm">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/assets/denver SPA tanpa nama.png"
                                alt="Denver Inn Logo"
                                width={120}
                                height={48}
                                className="object-contain opacity-60 hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <p className="text-xs font-light leading-relaxed tracking-wide">
                            The ultimate gentleman's sanctuary in Bandung. Experience premium relaxation and executive therapy.
                        </p>
                    </div>

                    {/* LINKS */}
                    <div className="flex items-center">
                        {/* SUPPORT */}
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                            <h4 className="text-white/80 font-serif tracking-widest uppercase text-[10px] md:mb-0">Support</h4>
                            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                                {links.support.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-xs hover:text-[#D4AF37] transition-colors tracking-wide">{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="pt-8 border-t border-white/5 flex justify-center items-center">
                    <div className="text-[10px] tracking-widest uppercase font-light flex items-center gap-1.5">
                        <span>&copy; 2026 Copyright :</span>
                        <a
                            href="https://www.ligunsentertainment.agency/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#D4AF37] hover:text-white transition-all font-bold"
                        >
                            Liguns Entertainment
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

