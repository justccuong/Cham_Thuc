"use client";

import React from "react";

interface CloudDecoratorsProps {
  variant?: "red" | "gold";
}

export const CloudDecorators: React.FC<CloudDecoratorsProps> = ({ variant = "red" }) => {
  const colorClass = variant === "gold" ? "bg-brand-gold/20" : "bg-brand-red/15";

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden hidden md:block" aria-hidden="true">
      {/* Cloud 1 (cl1.png): Top-Right behind title area */}
      <div
        className={`absolute top-6 right-12 w-16 h-16 md:w-20 md:h-20 ${colorClass} [mask-image:url('/patterns/cl1.png')] [-webkit-mask-image:url('/patterns/cl1.png')] [mask-size:contain] [-webkit-mask-size:contain] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] transform scale-75 opacity-80`}
      />

      {/* Cloud 2 (cl2.png): Mid-Left beside Product Card 1 */}
      <div
        className={`absolute top-1/2 left-6 md:left-8 -translate-y-12 w-16 h-16 md:w-20 md:h-20 ${colorClass} [mask-image:url('/patterns/cl2.png')] [-webkit-mask-image:url('/patterns/cl2.png')] [mask-size:contain] [-webkit-mask-size:contain] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] transform scale-90 opacity-90`}
      />

      {/* Cloud 3 (cl3.png): Bottom-Right near Product Card 3 */}
      <div
        className={`absolute bottom-8 right-12 md:right-16 w-16 h-16 md:w-20 md:h-20 ${colorClass} [mask-image:url('/patterns/cl3.png')] [-webkit-mask-image:url('/patterns/cl3.png')] [mask-size:contain] [-webkit-mask-size:contain] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] transform scale-75 opacity-80`}
      />

      {/* Cloud 4 (cl1.png): Top-Left subtle accent */}
      <div
        className={`absolute top-10 left-12 md:left-16 w-16 h-16 md:w-20 md:h-20 ${colorClass} [mask-image:url('/patterns/cl1.png')] [-webkit-mask-image:url('/patterns/cl1.png')] [mask-size:contain] [-webkit-mask-size:contain] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] transform scale-50 opacity-60`}
      />

      {/* Cloud 5 (cl2.png): Floating behind middle section header */}
      <div
        className={`absolute top-4 left-1/3 w-16 h-16 md:w-20 md:h-20 ${colorClass} [mask-image:url('/patterns/cl2.png')] [-webkit-mask-image:url('/patterns/cl2.png')] [mask-size:contain] [-webkit-mask-size:contain] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] transform scale-50 opacity-70`}
      />
    </div>
  );
};

export default CloudDecorators;
