interface CloudPatternOverlayProps {
  /** "light" for ivory/warm sections, "dark" for wood-brown sections */
  variant?: "light" | "dark";
}

export function CloudPatternOverlay({ variant = "light" }: CloudPatternOverlayProps) {
  // Light sections: visible brown strokes on cream bg
  // Dark sections: soft gold/cream strokes on dark bg
  const layerClass =
    variant === "dark"
      ? "opacity-20 invert sepia saturate-[3] hue-rotate-[30deg]"
      : "opacity-25 sepia saturate-[5] hue-rotate-[320deg] brightness-[0.6] contrast-[1.2]";

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: cl1 — small clouds, origin anchor */}
      <div
        className={`absolute inset-0 bg-repeat ${layerClass}`}
        style={{
          backgroundImage: "url('/patterns/cl1.png')",
          backgroundSize: "80px auto",
          backgroundPosition: "0 0",
        }}
      />
      {/* Layer 2: cl2 — medium clouds, offset 250px / 200px */}
      <div
        className={`absolute inset-0 bg-repeat ${layerClass}`}
        style={{
          backgroundImage: "url('/patterns/cl2.png')",
          backgroundSize: "90px auto",
          backgroundPosition: "250px 200px",
        }}
      />
      {/* Layer 3: cl3 — large clouds, offset 500px / 400px */}
      <div
        className={`absolute inset-0 bg-repeat ${layerClass}`}
        style={{
          backgroundImage: "url('/patterns/cl3.png')",
          backgroundSize: "100px auto",
          backgroundPosition: "500px 400px",
        }}
      />
    </div>
  );
}
