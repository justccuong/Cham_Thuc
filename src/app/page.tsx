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

      {/* Seamless Multi-Image Cloud Pattern Overlay (cl1, cl2, cl3 repeating down full page) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-12 filter sepia(0.8) saturate(250%) hue-rotate(320deg) brightness(0.85)"
        style={{
          backgroundImage: `url('/patterns/cl1.png'), url('/patterns/cl2.png'), url('/patterns/cl3.png')`,
          backgroundRepeat: 'repeat, repeat, repeat',
          backgroundPosition: '0 0, 150px 200px, 300px 100px',
          backgroundSize: '90px auto, 70px auto, 110px auto',
        }}
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
