import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCollection from "@/components/ProductCollection";
import CulturalStation from "@/components/CulturalStation";
import B2BSection from "@/components/B2BSection";
import ShowOncePopup from "@/components/ShowOncePopup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-paper-ivory relative">
      {/* Paper-Grain Texture Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-5 mix-blend-overlay bg-[url('/textures/paper-grain.png')] bg-repeat"
        aria-hidden="true"
      />

      <ShowOncePopup />
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ProductCollection />
        <CulturalStation />
        <B2BSection />
      </main>
      <Footer />
    </div>
  );
}
