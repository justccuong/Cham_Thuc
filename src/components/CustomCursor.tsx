"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for outer ring trailing effect
  const springConfig = { damping: 24, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has fine pointer (mouse/trackpad, not touch)
    if (typeof window !== "undefined") {
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      setIsTouchDevice(!finePointer);
      if (!finePointer) return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track interactive element hover
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer") ||
        target.closest(".group")
      );
      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Smooth Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 44 : 26,
          height: isHovered ? 44 : 26,
          borderColor: isHovered ? "rgba(154, 27, 31, 0.6)" : "rgba(154, 27, 31, 0.35)",
          backgroundColor: isHovered ? "rgba(154, 27, 31, 0.08)" : "rgba(154, 27, 31, 0.02)",
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-brand-red will-change-transform shadow-[0_0_8px_rgba(154,27,31,0.4)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          scale: isHovered ? 1.25 : 1,
          backgroundColor: isHovered ? "#7A1518" : "#9A1B1F",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
