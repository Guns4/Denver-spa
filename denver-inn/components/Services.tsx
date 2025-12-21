import { supabase } from "@/utils/supabase/client";
import ServiceCard from "./ServiceCard";

export default async function Services() {
    const { data: services, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true }); // Assuming there might be a created_at, or just default order

    if (error) {
        console.error("Error fetching services:", error);
        return (
            <div className="text-center py-20 text-white/50">
                <p>Failed to load services.</p>
            </div>
        );
    }

    // Fallback for empty state or if no data yet
    if (!services || services.length === 0) {
        return (
            <section className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col gap-16">
                <div className="flex flex-col items-center text-center gap-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#e2d1c3]">Our Services</h2>
                    <div className="w-24 h-[1px] bg-white/20"></div>
                    <p className="text-white/60 max-w-lg">No services available at the moment.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col gap-16">
            <div className="flex flex-col items-center text-center gap-4">
                <h2 className="text-4xl md:text-5xl font-serif text-[#e2d1c3]">Our Services</h2>
                <div className="w-24 h-[1px] bg-white/20"></div>
                <p className="text-white/60 max-w-lg font-light tracking-wide">
                    Indulge in our carefully curated selection of treatments designed to restore your balance.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service: any) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </section>
    );
}
