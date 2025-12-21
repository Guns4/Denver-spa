import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import Services from "@/components/Services";
import LocationSection from "@/components/LocationSection";

export default function Home() {
  return (
    <main className="bg-[#1a1a1a] min-h-screen text-white font-sans">
      <Navbar />
      <Hero />

      {/* Existing Sections kept for continuity */}
      <div className="relative z-20 bg-[#1a1a1a]">
        <Services />
        <LocationSection />
      </div>
    </main>
  );
}
