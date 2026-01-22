"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { useBooking } from "../context/BookingContext";

// Data Dummy (Nanti ganti dengan fetch Supabase)
interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    image_url: string;
}

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    // IMPORTANT: All hooks must be called before any conditional returns
    const { openBooking } = useBooking();

    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase.from("services").select("*");
            if (error) console.error("Error fetching services:", error);
            else setServices(data || []);
            setLoading(false);
        };

        fetchServices();
    }, []);

    if (loading) {
        return <div className="text-center text-white py-20">Loading luxury experiences...</div>;
    }

    return (
        <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-4"
                >
                    Signature Treatments
                </motion.h2>
                <div className="w-24 h-[1px] bg-[#D4AF37]/30 mx-auto"></div>
            </div>

            {/* MOBILE: HORIZONTAL SNAP SCROLL */}
            <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="min-w-[85vw] md:min-w-0 snap-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-500"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <Image
                                src={service.image_url || "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000&auto=format&fit=crop"} // Placeholder incase null
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                        </div>

                        <div className="p-6 text-center">
                            <h3 className="text-xl font-serif text-white mb-2">{service.title}</h3>
                            <p className="text-[#D4AF37] font-medium tracking-wider mb-4">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                }).format(service.price)}
                            </p>
                            <button
                                onClick={openBooking}
                                className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] text-xs font-semibold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                            >
                                Book
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section >
    );
}
