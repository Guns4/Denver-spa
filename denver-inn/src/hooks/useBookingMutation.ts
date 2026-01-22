import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { createClient } from "@/src/supabase/client"; // To be implemented
import { Database } from "../types/database.types";

type BookingInsert = Database['public']['Tables']['bookings']['Insert'];

// Mocking Supabase client for now as setup is abstract
const mockSupabaseInsert = async (newBooking: BookingInsert) => {
    // Simulate API call
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.9) reject(new Error("Simulated Network Error"));
            resolve({ data: { ...newBooking, id: "mock-id-123" }, error: null });
        }, 1000);
    });
    return { data: { ...newBooking, id: "mock-id-123" }, error: null };
};

export const useBookingMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mockSupabaseInsert, // Replace with real supabase.from('bookings').insert()

        // OPTIMISTIC UPDATE: Update UI before server response
        onMutate: async (newBooking) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['bookings'] });

            // Snapshot the previous value
            const previousBookings = queryClient.getQueryData(['bookings']);

            // Optimistically update to the new value
            queryClient.setQueryData(['bookings'], (old: any[]) => [...(old || []), { ...newBooking, id: 'temp-id', status: 'pending' }]);

            // Return a context object with the snapshotted value
            return { previousBookings };
        },

        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, newBooking, context) => {
            queryClient.setQueryData(['bookings'], context?.previousBookings);
            toast.error("Booking Failed. Please try again.");
            console.error("Booking Error:", err);
        },

        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },

        onSuccess: () => {
            toast.success("Booking Confirmed!", {
                description: "You will receive a WhatsApp confirmation shortly."
            });
        },
    });
};
