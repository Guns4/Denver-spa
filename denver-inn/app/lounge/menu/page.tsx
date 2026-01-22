"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Coffee, UtensilsCrossed, Wine, Info } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const MENU = [
    {
        category: "Prime Beverages",
        icon: Coffee,
        description: "Freshly brewed and ethically sourced.",
        items: [
            { name: "Ginger Tonic", price: "25k+", desc: "Fresh ginger, organic honey, lime." },
            { name: "Executive Arabica", price: "30k+", desc: "Single-origin medium roast." },
            { name: "Kyoto Green Tea", price: "25k+", desc: "Premium ceremonial grade." },
            { name: "Dark Chocolate", price: "35k+", desc: "70% cocoa Belgian blend." }
        ]
    },
    {
        category: "Cold Refreshments",
        icon: Wine,
        description: "Rehydrating elixirs to reset your system.",
        items: [
            { name: "Infused Essence", price: "20k", desc: "Lemon, cucumber, fresh mint." },
            { name: "Young Coconut", price: "35k", desc: "Chilled, served in-shell." },
            { name: "Signature Cold Brew", price: "35k", desc: "12-hour extraction arabica." },
            { name: "Seasonal Smoothie", price: "40k", desc: "Daily selection of fresh fruits." }
        ]
    },
    {
        category: "Lite Bites",
        icon: UtensilsCrossed,
        description: "Delicate pairing for your relaxation session.",
        items: [
            { name: "Gourmet Nuts", price: "30k", desc: "Roasted almond and cashew mix." },
            { name: "Orchard Platter", price: "45k", desc: "Slices of premium seasonal fruits." },
            { name: "Artisan Crackers", price: "50k", desc: "Served with select cheese & honey." },
            { name: "Petit Sandwich", price: "55k", desc: "Classic sourdough club triangles." }
        ]
    }
];

export default function LoungeMenuPage() {
    return (
        <main className="bg-black min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <header className="mb-24 text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors text-xs uppercase tracking-[0.3em] font-bold mb-12 group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Home
                            </Link>
                            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
                                The <span className="text-[#D4AF37]">Lounge</span> Menu
                            </h1>
                            <p className="text-xl text-white/50 font-serif italic">
                                Savor the moment. Refined selections for the discerning palate.
                            </p>
                        </header>

                        <div className="space-y-32">
                            {MENU.map((cat, idx) => {
                                const Icon = cat.icon;
                                return (
                                    <section key={cat.category} className="relative">
                                        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12 border-b border-white/10 pb-6">
                                            <Icon className="text-[#D4AF37] shrink-0" size={24} />
                                            <h2 className="text-3xl font-serif text-white">{cat.category}</h2>
                                            <span className="text-white/30 text-xs uppercase tracking-widest font-light md:ml-auto">
                                                {cat.description}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                            {cat.items.map((item, iIdx) => (
                                                <div key={item.name} className="group relative">
                                                    <div className="flex justify-between items-baseline mb-2">
                                                        <h4 className="text-xl font-serif text-white group-hover:text-[#D4AF37] transition-colors">
                                                            {item.name}
                                                        </h4>
                                                        <div className="flex-1 mx-4 border-b border-dotted border-white/20"></div>
                                                        <span className="text-[#D4AF37] font-bold text-sm">
                                                            {item.price}
                                                        </span>
                                                    </div>
                                                    <p className="text-white/40 text-sm font-light leading-relaxed">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>

                        <footer className="mt-40 p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center gap-6 justify-center">
                            <Info className="text-[#D4AF37]" size={24} />
                            <p className="text-sm text-white/60 text-center md:text-left font-light leading-relaxed">
                                <strong className="text-white">Note:</strong> All Silver & Gold members receive one complimentary welcome drink per day. <br />
                                Orders are settled at the executive cashier upon check-out.
                            </p>
                        </footer>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
