import Navbar from "@/src/components/Navbar";
import CinematicHero from "@/src/components/Hero";
import Services from "@/src/components/Services";
import Footer from "@/src/components/Footer";
import Reviews from "@/src/components/Reviews";
import QuickExitButton from "@/src/components/QuickExitButton";
import LocationCard from "@/src/components/LocationCard";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white font-sans">
      <Navbar />

      {/* Cinematic Hero with Parallax */}
      <CinematicHero />

      {/* Phase 46: Privacy Protection */}
      <QuickExitButton />

      {/* Main Content - Generous Spacing (py-24/py-32) */}
      <div className="relative z-20">

        {/* Location Section */}
        <div className="py-12 md:py-16 bg-[#0a0a0a]">
          <LocationCard />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
