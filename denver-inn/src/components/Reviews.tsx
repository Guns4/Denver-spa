"use client";

import { Star, User } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
    {
        id: 1,
        user: "James H.",
        rating: 5,
        text: "Absolutely the best deep tissue massage I've had in Bandung. The therapist knew exactly where my tension spots were.",
        date: "Visited 2 days ago",
    },
    {
        id: 2,
        user: "Robert P.",
        rating: 5,
        text: "The VIP Suite is worth every penny. Privacy, luxury, and the jacuzzi was perfect after a long flight.",
        date: "Visited 1 week ago",
    },
    {
        id: 3,
        user: "Michael T.",
        rating: 4,
        text: "Great ambience and very professional staff. Highly recommend the Gentleman's Facial.",
        date: "Visited 3 weeks ago",
    },
    {
        id: 4,
        user: "William K.",
        rating: 5,
        text: "A hidden gem in Braga. The interior design is stunning, feels like a 5-star hotel spa.",
        date: "Visited 1 month ago",
    },
];

export default function Reviews() {
    return (
        <section className="py-20 bg-[#0f0f0f]">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-[#D4AF37] mb-2">Guest Stories</h2>
                        <div className="flex items-center gap-2">
                            <div className="flex text-[#D4AF37]">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="text-white/60 text-sm">4.9/5 Average Rating</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium text-sm">{review.user}</h4>
                                        <p className="text-white/40 text-[10px]">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {Array.from({ length: review.rating }).map((_, idx) => (
                                        <Star key={idx} size={12} className="text-[#D4AF37]" fill="currentColor" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed italic">"{review.text}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
