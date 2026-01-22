"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScanLine, Search, CheckCircle, CreditCard, User, Clock, Calendar } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/src/components/Navbar";

// Mock Data Type
interface BookingDetails {
    id: string;
    customerName: string;
    serviceName: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'arrived' | 'completed';
    paymentStatus: 'unpaid' | 'paid';
    price: string;
}

export default function CashierPage() {
    const [bookingId, setBookingId] = useState("");
    const [booking, setBooking] = useState<BookingDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Mock Search Function
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingId) return;

        setIsLoading(true);
        // Simulate API Fetch
        setTimeout(() => {
            if (bookingId.length > 3) {
                setBooking({
                    id: bookingId,
                    customerName: "Budi Santoso",
                    serviceName: "Executive Massage (90 Mins)",
                    date: "Today, 24 Oct",
                    time: "14:00",
                    status: "confirmed",
                    paymentStatus: "unpaid",
                    price: "Rp 350.000"
                });
                toast.success("Booking Found!");
            } else {
                toast.error("Booking not found");
                setBooking(null);
            }
            setIsLoading(false);
        }, 800);
    };

    const updateStatus = (newStatus: BookingDetails['status'], newPayment?: BookingDetails['paymentStatus']) => {
        if (!booking) return;
        setBooking({ ...booking, status: newStatus, paymentStatus: newPayment || booking.paymentStatus });
        toast.success(`Status updated to: ${newStatus.toUpperCase()}`);
    };

    return (
        <main className="min-h-screen bg-[#111] text-white font-sans p-6 pb-24 md:pb-6">
            <h1 className="text-2xl font-serif text-[#D4AF37] mb-8 text-center">Cashier Terminal</h1>

            {/* SCANNER / INPUT SECTION */}
            <div className="max-w-md mx-auto mb-10">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="Scan QR or Enter Booking ID..."
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        className="w-full bg-[#222] border border-[#333] rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner"
                    />
                    <ScanLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D4AF37] text-black p-2 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                    >
                        {isLoading ? <span className="animate-spin text-lg">↻</span> : <Search size={20} />}
                    </button>
                </form>
            </div>

            {/* BOOKING CARD */}
            {booking && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md mx-auto bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden shadow-2xl"
                >
                    {/* Status Header */}
                    <div className={`p-4 text-center font-bold tracking-widest uppercase ${booking.status === 'completed' ? 'bg-green-600 text-white' :
                            booking.status === 'arrived' ? 'bg-blue-600 text-white' :
                                'bg-[#333] text-gray-300'
                        }`}>
                        {booking.status}
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Guest Info */}
                        <div className="flex items-start gap-4">
                            <div className="bg-[#222] p-3 rounded-full">
                                <User className="text-[#D4AF37]" size={24} />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Guest Name</p>
                                <h3 className="text-xl font-bold text-white">{booking.customerName}</h3>
                                <p className="text-xs text-green-400 mt-1">● Returning Guest (5 Visits)</p>
                            </div>
                        </div>

                        <div className="h-px bg-[#333]" />

                        {/* Service Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-300">
                                <Calendar size={18} className="text-[#D4AF37]" />
                                <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                                <Clock size={18} className="text-[#D4AF37]" />
                                <span className="text-xl font-bold text-white">{booking.time}</span>
                            </div>
                            <div className="bg-[#222] p-3 rounded-lg border border-[#333]">
                                <p className="text-sm text-gray-400">Service</p>
                                <p className="font-medium text-[#D4AF37]">{booking.serviceName}</p>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-between items-end pt-4">
                            <span className="text-gray-400">Total Due</span>
                            <span className="text-3xl font-serif text-white">{booking.price}</span>
                        </div>

                        {/* ACTIONS */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            {booking.status !== 'arrived' && booking.status !== 'completed' && (
                                <button
                                    onClick={() => updateStatus('arrived')}
                                    className="col-span-2 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <CheckCircle size={20} />
                                    Check In Guest
                                </button>
                            )}

                            {booking.status === 'arrived' && (
                                <button
                                    onClick={() => updateStatus('completed', 'paid')}
                                    className="col-span-2 bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <CreditCard size={20} />
                                    Confirm Payment
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </main>
    );
}
