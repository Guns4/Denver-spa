import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/src/supabase/client";
import { startOfDay, endOfDay, format } from "date-fns";

export interface TimeSlot {
    time: string;
    isBlocked: boolean;
}

export const useAvailability = (date: Date | null) => {
    return useQuery({
        queryKey: ['availability', date ? format(date, 'yyyy-MM-dd') : 'none'],
        queryFn: async () => {
            if (!date) return [];

            const supabase = createClient();
            const start = startOfDay(date).toISOString();
            const end = endOfDay(date).toISOString();

            // Fetch all bookings for the selected date
            const { data: bookings, error } = await supabase
                .from('bookings')
                .select('start_time, end_time, status')
                .gte('start_time', start)
                .lte('end_time', end)
                .neq('status', 'cancelled'); // Ignore cancelled bookings

            if (error) throw error;

            // Simple logic: if a slot is booked, it's blocked.
            // In a real app with multiple therapists, this would check if *all* therapists are busy.
            // For Phase 22, we return the raw bookings to help the UI calculate free slots.

            return bookings || [];
        },
        enabled: !!date, // Only run if date is selected
        refetchInterval: 30000, // Auto-refresh every 30s (Phase 22 Req)
    });
};
