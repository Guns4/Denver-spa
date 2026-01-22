import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Service {
    id: number;
    title: string;
    price: string;
    duration: string;
}

interface UserDetails {
    name: string;
    phone: string;
    notes: string;
}

interface BookingState {
    step: number;
    selectedService: Service | null;
    selectedDate: Date | null;
    selectedTime: string | null;
    userDetails: UserDetails;

    // Actions
    setStep: (step: number) => void;
    setService: (service: Service | null) => void;
    setDate: (date: Date | null) => void;
    setTime: (time: string | null) => void;
    setUserDetails: (details: Partial<UserDetails>) => void;
    resetBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set) => ({
            step: 1,
            selectedService: null,
            selectedDate: null,
            selectedTime: null,
            userDetails: { name: '', phone: '', notes: '' },

            setStep: (step) => set({ step }),
            setService: (service) => set({ selectedService: service }),
            setDate: (date) => set({ selectedDate: date }),
            setTime: (time) => set({ selectedTime: time }),
            setUserDetails: (details) =>
                set((state) => ({ userDetails: { ...state.userDetails, ...details } })),
            resetBooking: () => set({
                step: 1,
                selectedService: null,
                selectedDate: null,
                selectedTime: null,
                userDetails: { name: '', phone: '', notes: '' }
            }),
        }),
        {
            name: 'booking-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
