import { MOCK_SERVICES } from "@/src/data/mock";
import { BookingData } from "@/src/data/schemas";

// This service layer decouples the UI from the database
export const BookingService = {
    getServices: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_SERVICES;
    },

    submitBooking: async (data: BookingData) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        // In a real app, this would POST to Supabase/API
        console.log("Submitting to DB:", data);
        return { success: true, bookingId: "BKG-" + Math.floor(Math.random() * 10000) };
    }
};
