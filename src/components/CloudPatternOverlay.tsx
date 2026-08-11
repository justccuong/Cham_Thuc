interface CloudPatternOverlayProps {
  variant?: "light" | "dark";
}

export function CloudPatternOverlay({ variant = "light" }: CloudPatternOverlayProps) {
  const isDark = variant === "dark";
  const filterClass = isDark
    ? "filter invert sepia saturate-200 hue-rotate-30"
    : "filter sepia saturate-200 hue-rotate-320";

  const cloudImages = ["/patterns/cl1.png", "/patterns/cl2.png", "/patterns/cl3.png"];

  const cloudPositions: Array<{
    top: string;
    left?: string;
    right?: string;
    size: string;
    opacity: string;
    rotate: string;
  }> = [
    // LEFT MARGIN COLUMN (Dải lề trái)
    { top: "8%", left: "2%", size: "w-12 md:w-16", opacity: "opacity-15 md:opacity-20", rotate: "rotate-0" },
    { top: "32%", left: "3%", size: "w-10 md:w-14", opacity: "opacity-10 md:opacity-15", rotate: "-rotate-12" },
    { top: "58%", left: "2%", size: "w-14 md:w-18", opacity: "opacity-15 md:opacity-20", rotate: "rotate-6" },
    { top: "82%", left: "4%", size: "w-12 md:w-16", opacity: "opacity-10 md:opacity-15", rotate: "rotate-0" },

    // RIGHT MARGIN COLUMN (Dải lề phải)
    { top: "15%", right: "3%", size: "w-14 md:w-18", opacity: "opacity-15 md:opacity-20", rotate: "rotate-12" },
    { top: "42%", right: "2%", size: "w-12 md:w-16", opacity: "opacity-10 md:opacity-15", rotate: "rotate-0" },
    { top: "68%", right: "4%", size: "w-10 md:w-14", opacity: "opacity-15 md:opacity-20", rotate: "-rotate-6" },
    { top: "90%", right: "2%", size: "w-14 md:w-18", opacity: "opacity-10 md:opacity-15", rotate: "rotate-12" },
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
            className={`absolute ${pos.size} ${pos.opacity} ${pos.rotate} ${filterClass}`}
          />
        );
      })}
    </div>
  );
}
