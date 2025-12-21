"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

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
        <section id="services" className="py-16 md:py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-[#e2d1c3] text-center mb-10 md:mb-16">
                Our Treatments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5 }}
                        className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/30 transition-all duration-300"
                    >
                        {/* Image Container */}
                        <div className="relative h-64 w-full overflow-hidden">
                            <Image
                                src={service.image_url || "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000&auto=format&fit=crop"} // Placeholder incase null
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80" />
                        </div>

                        {/* Content */}
                        <div className="p-6 relative z-10">
                            <h3 className="text-2xl font-serif text-[#e2d1c3] mb-2">{service.title}</h3>
                            <p className="text-white/70 text-sm font-light mb-4 line-clamp-3">
                                {service.description}
                            </p>

                            <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-4">
                                <span className="text-lg font-medium text-white tracking-wide">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                    }).format(service.price)}
                                </span>
                                <button className="text-xs uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition-colors">
                                    Book
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
