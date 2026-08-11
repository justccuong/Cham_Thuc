interface CloudPatternOverlayProps {
  variant?: "light" | "dark";
}

export function CloudPatternOverlay({ variant = "light" }: CloudPatternOverlayProps) {
  const isDark = variant === "dark";
  const filterClass = isDark
    ? "filter invert sepia saturate-200 hue-rotate-30"
    : "filter sepia saturate-200 hue-rotate-320";

  return (
    <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden" aria-hidden="true">
      {/* Cloud 1: Top Right edge */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/patterns/cl1.png"
        alt=""
        className={`absolute top-12 -right-6 w-20 md:w-28 opacity-15 ${filterClass}`}
      />
      {/* Cloud 2: Top Left edge */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/patterns/cl2.png"
        alt=""
        className={`absolute top-8 -left-6 w-16 md:w-24 opacity-10 ${filterClass}`}
      />
      {/* Cloud 3: Bottom Right behind cards */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/patterns/cl3.png"
        alt=""
        className={`absolute bottom-10 right-8 w-20 md:w-28 opacity-15 ${filterClass}`}
      />
      {/* Cloud 4: Bottom Left behind cards */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/patterns/cl1.png"
        alt=""
        className={`absolute bottom-12 left-6 w-16 md:w-24 opacity-10 ${filterClass}`}
      />
    </div>
  );
}
