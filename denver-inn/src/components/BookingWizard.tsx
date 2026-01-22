"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBookingStore } from "../store/useBookingStore";
import { toast } from "sonner";
import { calculateDynamicPrice } from "../utils/pricing";

// Interface Definitions
interface Service {
    id: number;
    title: string;
    price: string; // Formatted string for display
    duration: string;
}

const services: Service[] = [
    { id: 1, title: "Executive Massage", price: "Rp 350.000", duration: "90 Mins" },
    { id: 2, title: "Sport Massage", price: "Rp 400.000", duration: "90 Mins" },
    { id: 3, title: "Relaxation Therapy", price: "Rp 300.000", duration: "60 Mins" },
    { id: 4, title: "VIP Royal Package", price: "Rp 750.000", duration: "120 Mins" },
];

export default function BookingWizard({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    // Zustand Store
    const {
        step, setStep,
        selectedService, setService,
        selectedDate, setDate,
        selectedTime, setTime,
        userDetails, setUserDetails,
        resetBooking
    } = useBookingStore();

    // Reset wizard when closed ONLY if completed or user explicitly cancels (logic optional)
    // For now we KEEP state to persist draft.

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    // Calculate Dynamic Price
    const getPriceDetails = () => {
        if (!selectedService) return null;
        // Parse "Rp 350.000" -> 350000
        const basePrice = parseInt(selectedService.price.replace(/[^0-9]/g, ''), 10);

        if (!selectedDate || !selectedTime) {
            return { finalPrice: basePrice, isDiscounted: false, originalPrice: basePrice };
        }

        return calculateDynamicPrice(basePrice, selectedDate, selectedTime);
    };

    const priceDetails = getPriceDetails();
    const displayPrice = priceDetails ? `Rp ${priceDetails.finalPrice.toLocaleString('id-ID')}` : selectedService?.price;

    const formatWhatsAppMessage = () => {
        if (!selectedService || !selectedDate || !selectedTime) return "";
        const dateStr = selectedDate ? new Date(selectedDate).toLocaleDateString("id-ID", { dateStyle: "full" }) : "";

        // Show discount in message if applied
        let priceMessage = `Price: ${selectedService.price}`;
        if (priceDetails?.isDiscounted) {
            priceMessage = `Price: Rp ${priceDetails.finalPrice.toLocaleString('id-ID')} (Promotional Rate: ${priceDetails.appliedPromotion})`;
        }

        return `Hello Denver Spa, I would like to book:\n\nService: ${selectedService.title}\nDate: ${dateStr}\nTime: ${selectedTime}\n${priceMessage}\nName: ${userDetails.name}\n\nIs this slot available?`;
    };

    const handleBooking = () => {
        const message = encodeURIComponent(formatWhatsAppMessage());

        // Track analytics here (optional)

        window.open(`https://wa.me/628112251337?text=${message}`, '_blank');
        toast.success("Redirecting to WhatsApp...");

        // Optional: Reset after successful booking
        setTimeout(() => {
            resetBooking();
            onClose();
        }, 1000);
    };

    const handleSelectService = (service: Service) => {
        setService(service);
        toast.success(`Selected: ${service.title}`);
        handleNext();
    };

    const handleSelectTime = (time: string) => {
        setTime(time);
        toast.success(`Time set to ${time}`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center pointer-events-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-[#1a1a1a] w-full md:w-[500px] md:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl pointer-events-auto max-h-[90vh] flex flex-col border border-white/10"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#111]">
                            <div>
                                <h3 className="text-white font-serif text-lg">Book Appointment</h3>
                                <p className="text-xs text-[#D4AF37] uppercase tracking-widest">Step {step} of 4</p>
                            </div>
                            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-white/10">
                            <motion.div
                                className="h-full bg-[#D4AF37]"
                                initial={{ width: "25%" }}
                                animate={{ width: `${step * 25}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {/* Content Area */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {/* STEP 1: SELECT SERVICE */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h4 className="text-white text-xl font-light mb-4 text-center">Select Treatment</h4>
                                    {services.map((service) => (
                                        <div
                                            key={service.id}
                                            onClick={() => handleSelectService(service)}
                                            className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center group ${selectedService?.id === service.id ? "bg-[#D4AF37]/20 border-[#D4AF37]" : "bg-white/5 border-white/10 hover:border-[#D4AF37] hover:bg-white/10"}`}
                                        >
                                            <div>
                                                <h5 className="text-white font-medium group-hover:text-[#D4AF37] transition-colors">{service.title}</h5>
                                                <p className="text-xs text-white/50">{service.duration}</p>
                                            </div>
                                            <span className="text-[#D4AF37] text-sm tracking-wide font-semibold">{service.price}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* STEP 2: DATE & TIME */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h4 className="text-white text-xl font-light mb-4 text-center">Choose Date & Time</h4>

                                    {/* Date Picker */}
                                    <div className="flex justify-center">
                                        <DatePicker
                                            selected={selectedDate ? new Date(selectedDate) : new Date()}
                                            onChange={(date: Date | null) => setDate(date)}
                                            inline
                                            calendarClassName="!bg-[#111] !border-white/10 !text-white !font-sans !rounded-xl"
                                            dayClassName={() => "!text-white hover:!bg-[#D4AF37] hover:!text-black"}
                                        />
                                    </div>

                                    {/* Time Slots */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"].map((time) => {
                                            // Check if specific slot has promo
                                            // Note: We are using global selectedDate, so changes only reflect when date is picked
                                            // Ideally we'd calc this per button but for now let's keep it simple or user selectedDate
                                            const slotPrice = selectedService && selectedDate ? calculateDynamicPrice(
                                                parseInt(selectedService.price.replace(/[^0-9]/g, ''), 10),
                                                selectedDate,
                                                time
                                            ) : null;

                                            const isPromo = slotPrice?.isDiscounted;

                                            // PHASE 44: Scarcity Logic (Mock data - replace with real availability)
                                            const hour = parseInt(time.split(':')[0]);
                                            const isHighDemand = hour >= 17 && hour <= 20; // Evening slots are high demand
                                            const randomAvailability = Math.floor(Math.random() * 5) + 1; // 1-5 rooms
                                            const isLowStock = randomAvailability <= 2;

                                            return (
                                                <button
                                                    key={time}
                                                    onClick={() => handleSelectTime(time)}
                                                    className={`py-2 rounded-lg text-sm border transition-all relative overflow-hidden ${selectedTime === time
                                                        ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                                                        : "bg-transparent text-white/70 border-white/20 hover:border-[#D4AF37]"}`}
                                                >
                                                    {time}

                                                    {/* Happy Hour Promo Indicator */}
                                                    {isPromo && (
                                                        <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-bl-md" />
                                                    )}

                                                    {/* High Demand Badge (Fire Icon) */}
                                                    {isHighDemand && !isPromo && (
                                                        <span className="absolute top-0 right-0 text-[10px]">🔥</span>
                                                    )}

                                                    {/* Low Stock Alert */}
                                                    {isLowStock && selectedTime !== time && (
                                                        <span className="absolute -bottom-0.5 left-0 right-0 text-[8px] text-red-400 font-bold bg-red-900/30 px-1">
                                                            {randomAvailability} left
                                                        </span>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    {/* Legend for Promo */}
                                    <div className="flex items-center justify-center gap-2 text-xs text-white/50">
                                        <span className="w-2 h-2 bg-green-500 rounded-sm"></span>
                                        <span>Happy Hour Promo Available</span>
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        disabled={!selectedDate || !selectedTime}
                                        className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full disabled:opacity-50 disabled:cursor-not-allowed mt-4 hover:bg-[#D4AF37] transition-colors"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            )}

                            {/* STEP 3: DETAILS */}
                            {step === 3 && (
                                <div className="space-y-4">
                                    <h4 className="text-white text-xl font-light mb-4 text-center">Your Details</h4>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={userDetails.name}
                                        onChange={(e) => setUserDetails({ name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number (WhatsApp)"
                                        value={userDetails.phone}
                                        onChange={(e) => setUserDetails({ phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                    />
                                    <textarea
                                        placeholder="Special Requests (Optional)"
                                        value={userDetails.notes}
                                        onChange={(e) => setUserDetails({ notes: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors h-24 resize-none"
                                    />
                                    <button
                                        onClick={handleNext}
                                        disabled={!userDetails.name || !userDetails.phone}
                                        className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full disabled:opacity-50 disabled:cursor-not-allowed mt-4 hover:bg-[#D4AF37] transition-colors"
                                    >
                                        Review Booking
                                    </button>
                                </div>
                            )}

                            {/* STEP 4: CONFIRMATION */}
                            {step === 4 && (
                                <div className="text-center space-y-6">
                                    <CheckCircle size={64} className="text-[#D4AF37] mx-auto" />
                                    <h4 className="text-white text-2xl font-serif">Confirm Request</h4>

                                    <div className="bg-white/5 rounded-xl p-6 text-left space-y-4 border border-white/10">
                                        <div className="flex justify-between">
                                            <span className="text-white/50 text-sm">Service</span>
                                            <span className="text-white font-medium">{selectedService?.title}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white/50 text-sm">Date & Time</span>
                                            <span className="text-white font-medium">
                                                {selectedDate ? new Date(selectedDate).toLocaleDateString() : ""} at {selectedTime}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-white/50 text-sm">Total</span>
                                            <div className="text-right">
                                                {priceDetails?.isDiscounted ? (
                                                    <>
                                                        <span className="block text-xs text-red-400 line-through">Rp {priceDetails.originalPrice.toLocaleString('id-ID')}</span>
                                                        <span className="text-[#D4AF37] font-bold text-lg">Rp {priceDetails.finalPrice.toLocaleString('id-ID')}</span>
                                                        <span className="block text-[10px] text-green-400 font-bold bg-green-900/30 px-2 py-1 rounded mt-1">{priceDetails.appliedPromotion}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-[#D4AF37] font-bold text-lg">{selectedService?.price}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-white/50 leading-relaxed">
                                        By clicking Confirm, you will be redirected to WhatsApp to send these details to our receptionist for final approval.
                                    </p>

                                    <button
                                        onClick={handleBooking}
                                        className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
                                    >
                                        Confirm via WhatsApp
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Back Button (if not step 1) */}
                        {step > 1 && step < 4 && (
                            <div className="p-4 border-t border-white/10 text-center">
                                <button onClick={handleBack} className="text-white/40 text-sm hover:text-white transition-colors">
                                    Back to previous step
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
