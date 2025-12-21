"use client";

import { useState, useEffect } from "react";
import Navbar from "../../src/components/Navbar";
import { supabase } from "../../src/lib/supabase";
import { motion } from "framer-motion";

export default function BookingPage() {
    const [services, setServices] = useState<{ id: string; title: string }[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        whatsapp: "",
        date: "",
        time: "",
        service: "",
    });
    const [loading, setLoading] = useState(false);

    // Fetch Services for Dropdown
    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase
                .from("services")
                .select("id, title")
                .order("title");

            if (!error && data) {
                setServices(data);
            }
        };
        fetchServices();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { name, whatsapp, date, time, service } = formData;

        // 1. Validation
        if (!name || !whatsapp || !date || !time || !service) {
            alert("Mohon lengkapi semua data.");
            setLoading(false);
            return;
        }

        try {
            // 2. Insert to Supabase
            const { error } = await supabase.from("bookings").insert([
                {
                    client_name: name,
                    client_whatsapp: whatsapp,
                    booking_date: date,
                    booking_time: time,
                    selected_service: service,
                    status: 'pending' // Default status
                },
            ]);

            if (error) throw error;

            // 3. WhatsApp Redirect
            const message = `Halo Admin Denver Inn, saya ingin reservasi.\n\nNama: ${name}\nTanggal: ${date} - ${time}\nPaket: ${service}\n\nMohon konfirmasinya.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/628123456789?text=${encodedMessage}`; // Ganti nomor jika perlu

            window.open(whatsappUrl, "_blank");

            // Optional: Reset form or show success message
            setFormData({ name: "", whatsapp: "", date: "", time: "", service: "" });

        } catch (err) {
            console.error("Booking Error:", err);
            alert("Terjadi kesalahan saat memproses booking.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#1a1a1a] min-h-screen text-white font-sans flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center px-4 py-24 relative overflow-hidden">

                {/* Background Accents */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-lg z-10"
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
                        <h1 className="text-3xl md:text-4xl font-serif text-[#D4AF37] text-center mb-2">Book Appointment</h1>
                        <p className="text-center text-white/50 mb-8 font-light text-sm tracking-wide">
                            Start your journey to relaxation.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-[#D4AF37]">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                                />
                            </div>

                            {/* WhatsApp */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-[#D4AF37]">WhatsApp Number</label>
                                <input
                                    type="tel"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder="08123456789"
                                    className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                                />
                            </div>

                            {/* Date & Time Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-[#D4AF37]">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all [color-scheme:dark]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-[#D4AF37]">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            {/* Package Dropdown */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-[#D4AF37]">Select Package</label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all appearance-none"
                                >
                                    <option value="" className="bg-[#1a1a1a]">-- Choose Treatment --</option>
                                    {services.map((svc) => (
                                        <option key={svc.id} value={svc.title} className="bg-[#1a1a1a]">
                                            {svc.title}
                                        </option>
                                    ))}
                                    <option value="Custom/Other" className="bg-[#1a1a1a]">Other / Custom</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-4 bg-[#D4AF37] text-black font-semibold py-4 rounded-full uppercase tracking-widest hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Processing..." : "Confirm Booking"}
                            </button>

                        </form>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
