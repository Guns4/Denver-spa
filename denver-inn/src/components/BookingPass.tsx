"use client";

import QRCode from "react-qr-code";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, CheckCircle2 } from "lucide-react";

interface BookingPassProps {
    bookingId: string;
    customerName: string;
    serviceName: string;
    startTime: string; // ISO string
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export default function BookingPass({
    bookingId = "DEN-123-456",
    customerName = "Guest",
    serviceName = "Executive Massage",
    startTime = new Date().toISOString(),
    status = "confirmed"
}: BookingPassProps) {

    const date = new Date(startTime);
    const formattedDate = format(date, "EEEE, d MMM yyyy");
    const formattedTime = format(date, "HH:mm");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm mx-auto bg-white text-black rounded-3xl overflow-hidden shadow-2xl"
        >
            {/* HEAD */}
            <div className="bg-[#D4AF37] p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/topography.svg')] opacity-10" />
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black/60 mb-1">Boarding Pass</h3>
                <h2 className="text-2xl font-serif font-bold text-black">Denver Inn Spa</h2>
            </div>

            {/* BODY */}
            <div className="p-8 flex flex-col items-center relative">
                {/* Cutout Circles for Ticket Effect */}
                <div className="absolute -left-3 top-[-12px] w-6 h-6 bg-[#1a1a1a] rounded-full" />
                <div className="absolute -right-3 top-[-12px] w-6 h-6 bg-[#1a1a1a] rounded-full" />

                {/* QR Code */}
                <div className="p-4 bg-white border-4 border-black rounded-xl mb-6 shadow-lg">
                    <QRCode
                        value={bookingId}
                        size={180}
                        level="H"
                        fgColor="#000000"
                        bgColor="#FFFFFF"
                    />
                </div>

                <div className="text-center w-full space-y-4">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Guest Name</p>
                        <p className="text-xl font-bold font-serif">{customerName}</p>
                    </div>

                    <div className="flex justify-between border-t border-dashed border-gray-300 pt-4 mt-4">
                        <div className="text-left">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date</p>
                            <p className="font-semibold">{formattedDate}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Time</p>
                            <p className="text-2xl font-bold text-[#D4AF37]">{formattedTime}</p>
                        </div>
                    </div>

                    <div className="border-t border-dashed border-gray-300 pt-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Service</p>
                        <p className="font-medium text-lg">{serviceName}</p>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="bg-gray-100 p-4 text-center border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-sm bg-green-100 py-2 px-4 rounded-full mx-auto w-fit">
                    <CheckCircle2 size={16} />
                    <span>PAY AT OUTLET</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-3 uppercase tracking-widest">
                    ID: {bookingId}
                </p>
            </div>
        </motion.div>
    );
}
