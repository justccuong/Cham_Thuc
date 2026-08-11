interface CloudPatternOverlayProps {
  /** "light" for ivory/warm sections, "dark" for wood-brown sections */
  variant?: "light" | "dark";
}

export function CloudPatternOverlay({ variant = "light" }: CloudPatternOverlayProps) {
  const isDark = variant === "dark";

  return (
    <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden" aria-hidden="true">
      {/* Sparse, Minimal Multi-Image Cloud Pattern Overlay */}
      <div
        className={`absolute inset-0 bg-repeat ${isDark ? "opacity-8" : "opacity-15"}`}
        style={{
          backgroundImage: "url('/patterns/cl1.png'), url('/patterns/cl2.png'), url('/patterns/cl3.png')",
          /* HUGE background size so clouds are spaced VERY FAR APART */
          backgroundSize: "600px 600px, 800px 800px, 700px 700px",
          /* Shift origins to scatter them natively */
          backgroundPosition: "40px 50px, 320px 400px, 180px 700px",
          /* Make lines subtle brown for light, or soft gold for dark */
          filter: isDark
            ? "invert(1) sepia(1) saturate(200%) hue-rotate(30deg) brightness(0.9)"
            : "sepia(1) saturate(200%) hue-rotate(320deg) brightness(0.7)",
        }}
      />
    </div>
  );
}
