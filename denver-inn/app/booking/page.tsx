import BookingForm from "@/components/BookingForm";
import { supabase } from "@/utils/supabase/client";

export default async function BookingPage() {
    const { data: services } = await supabase
        .from("services")
        .select("id, title")
        .order("title");

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 pt-32 pb-20 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-900/20 blur-[120px] rounded-full" />
            </div>

            <div className="z-10 w-full flex flex-col items-center gap-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#e2d1c3] mb-4">Book Your Appointment</h1>
                    <p className="text-white/60 max-w-md mx-auto font-light">
                        Secure your spot for a journey of relaxation and renewal.
                    </p>
                </div>

                <BookingForm services={services || []} />
            </div>
        </div>
    );
}
