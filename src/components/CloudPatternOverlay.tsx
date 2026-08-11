"use client";

import React from "react";

export function CloudPatternOverlay() {
  const cloudImages = ["/patterns/cl1.png", "/patterns/cl2.png", "/patterns/cl3.png"];

  const cloudPositions: Array<{
    top: string;
    left?: string;
    right?: string;
    size: string;
    rotate: string;
  }> = [
    // LEFT MARGIN COLUMN (Dải lề trái)
    { top: "8%", left: "2%", size: "w-12", rotate: "rotate-0" },
    { top: "32%", left: "4%", size: "w-14", rotate: "-rotate-12" },
    { top: "58%", left: "2%", size: "w-16", rotate: "rotate-6" },
    { top: "82%", left: "3%", size: "w-12", rotate: "rotate-0" },

    // RIGHT MARGIN COLUMN (Dải lề phải)
    { top: "15%", right: "3%", size: "w-14", rotate: "rotate-12" },
    { top: "42%", right: "2%", size: "w-16", rotate: "rotate-0" },
    { top: "68%", right: "4%", size: "w-12", rotate: "-rotate-6" },
    { top: "90%", right: "2%", size: "w-18", rotate: "rotate-12" },
  ];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
      aria-hidden="true"
    >
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
            className={`absolute ${pos.size} opacity-15 ${pos.rotate} filter sepia saturate-200 hue-rotate-320`}
          />
        );
      })}
    </div>
  );
}

export default CloudPatternOverlay;
