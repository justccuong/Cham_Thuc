export function CloudPatternOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden opacity-10 mix-blend-multiply filter sepia-[0.8] saturate-[2.5] hue-rotate-[320deg] brightness-90">
      {/* Pattern Layer 1: cl1.png */}
      <div
        className="absolute inset-0 bg-repeat"
        style={{
          backgroundImage: "url('/patterns/cl1.png')",
          backgroundSize: "120px auto",
          backgroundPosition: "0 0",
        }}
      />
      {/* Pattern Layer 2: cl2.png - Shifted offset to prevent overlap */}
      <div
        className="absolute inset-0 bg-repeat"
        style={{
          backgroundImage: "url('/patterns/cl2.png')",
          backgroundSize: "90px auto",
          backgroundPosition: "180px 140px",
        }}
      />
      {/* Pattern Layer 3: cl3.png - Shifted offset */}
      <div
        className="absolute inset-0 bg-repeat"
        style={{
          backgroundImage: "url('/patterns/cl3.png')",
          backgroundSize: "100px auto",
          backgroundPosition: "90px 280px",
        }}
      />
    </div>
  );
}
