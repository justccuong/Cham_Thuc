interface CloudPatternOverlayProps {
  variant?: "light" | "dark";
}

export function CloudPatternOverlay({ variant = "light" }: CloudPatternOverlayProps) {
  const isDark = variant === "dark";
  const filterClass = isDark
    ? "filter invert sepia saturate-200 hue-rotate-30"
    : "filter sepia saturate-200 hue-rotate-320";

  // Array of cloud image sources
  const cloudImages = ["/patterns/cl1.png", "/patterns/cl2.png", "/patterns/cl3.png"];

  // Pre-calculated scattered position coordinates across the section height
  const cloudPositions: Array<{
    top: string;
    left?: string;
    right?: string;
    size: string;
    opacity: string;
    rotate: string;
  }> = [
    { top: "5%", left: "3%", size: "w-16", opacity: "opacity-15", rotate: "rotate-0" },
    { top: "12%", right: "4%", size: "w-20", opacity: "opacity-20", rotate: "rotate-6" },
    { top: "28%", left: "8%", size: "w-14", opacity: "opacity-10", rotate: "-rotate-12" },
    { top: "35%", right: "12%", size: "w-16", opacity: "opacity-15", rotate: "rotate-0" },
    { top: "52%", left: "4%", size: "w-20", opacity: "opacity-20", rotate: "rotate-12" },
    { top: "65%", right: "6%", size: "w-14", opacity: "opacity-15", rotate: "-rotate-6" },
    { top: "80%", left: "10%", size: "w-16", opacity: "opacity-15", rotate: "rotate-0" },
    { top: "92%", right: "5%", size: "w-18", opacity: "opacity-20", rotate: "rotate-12" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden" aria-hidden="true">
      {cloudPositions.map((pos, index) => {
        const imgSrc = cloudImages[index % cloudImages.length];
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={imgSrc}
            alt=""
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
            }}
            className={`absolute ${pos.size} ${pos.opacity} ${pos.rotate} ${filterClass} transition-all`}
          />
        );
      })}
    </div>
  );
}
