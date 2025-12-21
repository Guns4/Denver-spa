"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { motion } from "framer-motion";

interface Service {
    id: string;
    title: string;
}

export default function BookingForm({ services }: { services: Service[] }) {
    const [formData, setFormData] = useState({
        name: "",
        whatsapp: "",
        date: "",
        time: "",
        serviceId: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        const { name, whatsapp, date, time, serviceId } = formData;

        // 1. Validation
        if (!name || !whatsapp || !date || !time || !serviceId) {
            alert("Please fill in all fields.");
            setLoading(false);
            return;
        }

        const selectedService = services.find((s) => s.id === serviceId);
        const serviceName = selectedService ? selectedService.title : "Unknown Service";

        try {
            // 2. Insert into Supabase
            const { error } = await supabase.from("bookings").insert([
                {
                    client_name: name,
                    client_whatsapp: whatsapp,
                    booking_date: date,
                    booking_time: time,
                    selected_service: serviceName,
                },
            ]);

            if (error) throw error;

            setStatus("success");

            // 3. Construct WhatsApp URL
            const message = `Halo Denver Inn, saya ${name} ingin booking ${serviceName} pada tgl ${date} jam ${time}.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/628123456789?text=${encodedMessage}`;

            // 4. Redirect
            window.open(whatsappUrl, "_blank");

            // Reset form (optional)
            setFormData({ name: "", whatsapp: "", date: "", time: "", serviceId: "" });

        } catch (err) {
            console.error("Booking error:", err);
            setStatus("error");
            alert("Failed to submit booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
        >
            <h2 className="text-3xl font-serif text-[#e2d1c3] mb-6 text-center">Reservation</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm uppercase tracking-wider text-white/60">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#e2d1c3] transition-colors"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="whatsapp" className="text-sm uppercase tracking-wider text-white/60">WhatsApp Number</label>
                    <input
                        id="whatsapp"
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#e2d1c3] transition-colors"
                        placeholder="08123456789"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="date" className="text-sm uppercase tracking-wider text-white/60">Date</label>
                        <input
                            id="date"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#e2d1c3] transition-colors [color-scheme:dark]"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="time" className="text-sm uppercase tracking-wider text-white/60">Time</label>
                        <input
                            id="time"
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#e2d1c3] transition-colors [color-scheme:dark]"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="serviceId" className="text-sm uppercase tracking-wider text-white/60">Treatment</label>
                    <select
                        id="serviceId"
                        name="serviceId"
                        value={formData.serviceId}
                        onChange={handleChange}
                        className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#e2d1c3] transition-colors appearance-none"
                        required
                    >
                        <option value="" disabled>Select a treatment</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.title}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full py-4 rounded-full bg-[#e2d1c3] text-[#0f172a] font-semibold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(226,209,195,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                >
                    {loading ? "Processing..." : "Confirm Booking"}
                </button>

                {status === "success" && (
                    <p className="text-green-400 text-center text-sm mt-2">Booking confirmed! Redirecting to WhatsApp...</p>
                )}
            </form>
        </motion.div>
    );
}
