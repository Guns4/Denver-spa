"use client";

import { useBookingStore } from "@/src/store/useBookingStore";
import { Users, CheckCircle, XCircle, Clock, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminDashboard() {
    const { step } = useBookingStore();
    const [occupancy, setOccupancy] = useState(65); // Dummy Percentage
    const [requests, setRequests] = useState([
        { id: 1, name: "Budi Santoso", service: "Executive Massage", time: "19:00", status: "pending" },
        { id: 2, name: "Michael Tan", service: "VIP Package", time: "20:30", status: "pending" },
    ]);

    const handleAction = (id: number, action: 'approve' | 'reject') => {
        setRequests(prev => prev.filter(r => r.id !== id));
        if (action === 'approve') toast.success(`Booking #${id} Approved`);
        else toast.error(`Booking #${id} Rejected`);
    };

    return (
        <div className="space-y-8 pb-24 md:pb-10">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif text-white">Dashboard</h1>
                    <p className="text-white/50">Welcome back, Owner.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-2xl font-bold text-[#D4AF37]">21:42</p>
                    <p className="text-xs text-white/40 uppercase">Wednesday, 24 Jan</p>
                </div>
            </header>

            {/* LIVE OCCUPANCY WIDGET */}
            <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
                <div className="flex justify-between items-center mb-4 relative z-10">
                    <h3 className="text-white font-medium flex items-center gap-2">
                        <Users size={18} className="text-[#D4AF37]" />
                        Live Occupancy
                    </h3>
                    <span className="text-2xl font-bold text-white">{occupancy}%</span>
                </div>

                {/* Visual Bar */}
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden relative z-10">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${occupancy}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full ${occupancy > 80 ? 'bg-red-500' : 'bg-[#D4AF37]'} rounded-full relative`}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                </div>
                <p className="text-xs text-white/40 mt-3 relative z-10">8 of 12 Rooms Active</p>
            </div>

            {/* INCOMING REQUESTS (TINDER STYLE LIST) */}
            <div>
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Clock size={16} className="text-blue-400" />
                    Incoming Requests
                </h3>

                <div className="space-y-4">
                    <AnimatePresence>
                        {requests.length > 0 ? requests.map((req) => (
                            <motion.div
                                key={req.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/10 flex justify-between items-center group hover:border-[#D4AF37]/50 transition-colors"
                            >
                                <div>
                                    <h4 className="text-white font-bold">{req.name}</h4>
                                    <p className="text-sm text-[#D4AF37]">{req.service}</p>
                                    <p className="text-xs text-white/40 mt-1">Requesting {req.time}</p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAction(req.id, 'reject')}
                                        className="p-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <XCircle size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleAction(req.id, 'approve')}
                                        className="p-3 rounded-full bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-colors"
                                    >
                                        <CheckCircle size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        )) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-8 text-center text-white/30 bg-white/5 rounded-2xl border border-white/5 border-dashed"
                            >
                                No pending requests
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* QUICK STATS (EXISTING, MINIMIZED) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <h3 className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Today's Revenue</h3>
                    <p className="text-xl text-green-400 font-medium">2.4M</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <h3 className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Total Guests</h3>
                    <p className="text-xl text-white font-medium">32</p>
                </div>
            </div>

            {/* FLOATING ACTION BUTTON (FAB) */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-[#D4AF37] text-black rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center z-50 overflow-hidden"
                onClick={() => toast("Open Walk-In Modal (Coming Soon)")}
            >
                <div className="absolute inset-0 bg-white/20 hover:bg-transparent transition-colors" />
                <Plus size={28} />
            </motion.button>
        </div>
    );
}
