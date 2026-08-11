import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCollection from "@/components/ProductCollection";
import CulturalStation from "@/components/CulturalStation";
import B2BSection from "@/components/B2BSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-paper-ivory relative">
      {/* Paper-Grain Texture Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-multiply bg-[url('/textures/paper-grain.png')] bg-repeat"
        aria-hidden="true"
      />

      {/* Traditional Vân Mây Cloud Pattern Watermark Overlay (Single Large Corner Accent) */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.05] bg-[url('/patterns/van-may.svg')] bg-no-repeat bg-[position:top_right_-100px] bg-[size:650px] sm:bg-[size:850px]"
        aria-hidden="true"
      />

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
