import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/src/supabase/client";
import { Database } from "@/src/types/database.types";

type Service = Database['public']['Tables']['services']['Row'];

export const useServices = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: async (): Promise<Service[]> => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('id');

            if (error) throw error;
            return data || [];
        },
        staleTime: Infinity, // Services rarely change, cache indefinitely until manual invalidation
    });
};
