"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ServiceProps {
    title: string;
    description: string;
    price: number;
    image_url?: string;
    category?: string;
}

export default function ServiceCard({ service }: { service: ServiceProps }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-yellow-200/50 hover:shadow-[0_0_30px_rgba(253,224,71,0.1)]"
        >
            {/* Glowing Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Image if available */}
            {service.image_url && (
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                    <Image
                        src={service.image_url}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
            )}

            <div className="relative z-10 flex flex-col gap-2">
                {service.category && (
                    <span className="text-xs uppercase tracking-widest text-[#e2d1c3]/60 mb-1">
                        {service.category}
                    </span>
                )}
                <h3 className="text-2xl font-serif text-[#e2d1c3] font-medium group-hover:text-white transition-colors">
                    {service.title}
                </h3>
                <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">
                    {service.description}
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 w-full flex justify-between items-center px-1">
                    <span className="text-lg font-light tracking-wide text-[#e2d1c3]">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(service.price)}</span>
                    <button className="text-xs tracking-wider uppercase border border-white/30 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all">Book</button>
                </div>
            </div>
        </motion.div>
    );
}
