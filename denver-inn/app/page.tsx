import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import Services from "@/src/components/Services";
import LocationCard from "@/src/components/LocationCard";
import AdBanner from "@/src/components/AdBanner";

export default function Home() {
  return (
    <main className="bg-[#1a1a1a] min-h-screen text-white font-sans">
      <Navbar />
      <Hero />

      <div className="relative z-20 bg-[#1a1a1a] flex flex-col pb-24">

        {/* Top Ad Banner */}
        <div className="my-12">
          <AdBanner dataAdSlot="1234567890" />
        </div>

        {/* Services Section */}
        <div className="mt-12 mb-8 text-center px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-4">Our Signature Treatments</h2>
          <div className="w-24 h-[1px] bg-[#D4AF37]/50 mx-auto my-6"></div>
        </div>

        <Services />

        <div className="mt-24">
          <LocationCard />
        </div>

        {/* Bottom Ad Banner */}
        <div className="mt-20">
          <AdBanner dataAdSlot="1234567890" />
        </div>
      </div>
    </main>
  );
}
