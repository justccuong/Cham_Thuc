"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * Helper to determine whether the target element sits on a dark, red,
 * or brown background (e.g. Hero, Footer, Cultural Station, or Red CTA buttons).
 */
function checkIsDarkSurface(target: HTMLElement | null): boolean {
  if (!target) return false;

  // 1. Explicit sections or elements tagged for dark/gold cursor
  if (
    target.closest(
      "#hero, #footer, #story, [data-cursor-theme='dark'], [data-cursor-theme='gold'], [data-cursor='dark'], [data-cursor='gold']"
    )
  ) {
    return true;
  }

  // 2. Common class markers for brand red, black, dark lacquer brown
  if (
    target.closest(
      ".bg-brand-red, .bg-brand-red-hover, .bg-black, .bg-\\[\\#2A1B12\\], .bg-\\[\\#3A2618\\], .bg-stone-900, .bg-neutral-900, .bg-zinc-900"
    )
  ) {
    return true;
  }

  // 3. Modal / drawer dark backdrops
  if (target.closest(".fixed.inset-0.bg-black\\/60, .fixed.inset-0.bg-black\\/70, .fixed.inset-0.bg-black\\/50")) {
    return true;
  }

  // 4. Dynamic inspection of computed background color (up to 4 parent levels)
  try {
    let curr: HTMLElement | null = target;
    let depth = 0;
    while (curr && curr !== document.body && depth < 4) {
      const bg = window.getComputedStyle(curr).backgroundColor;
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
          const r = parseInt(match[1], 10);
          const g = parseInt(match[2], 10);
          const b = parseInt(match[3], 10);
          const a = match[4] !== undefined ? parseFloat(match[4]) : 1;

          if (a > 0.35) {
            // Perceived luminance (ITU-R BT.601)
            const lum = (r * 299 + g * 587 + b * 114) / 1000;
            // Dark background (lum < 115) OR rich red dominance (r > 120 and predominantly red)
            if (lum < 115 || (r > 125 && r > g * 1.5 && r > b * 1.5)) {
              return true;
            }
            return false;
          }
        }
      }
      curr = curr.parentElement;
      depth++;
    }
  } catch {
    // ignore
  }

  return false;
}

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isDarkSurface, setIsDarkSurface] = useState(true);

  const isDarkRef = useRef(true);
  const lastTargetRef = useRef<HTMLElement | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Responsive springs for outer ring trailing effect with zero sluggishness
  const springConfig = { damping: 38, stiffness: 480, mass: 0.15 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has fine pointer (mouse/trackpad, not touch)
    if (typeof window !== "undefined") {
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      setIsTouchDevice(!finePointer);
      if (!finePointer) return;
    }

    const updateSurface = (el: HTMLElement | null) => {
      if (!el) return;
      const isDark = checkIsDarkSurface(el);
      if (isDark !== isDarkRef.current) {
        isDarkRef.current = isDark;
        setIsDarkSurface(isDark);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target && target !== lastTargetRef.current) {
        lastTargetRef.current = target;
        updateSurface(target);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track interactive element hover and input fields
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      lastTargetRef.current = target;
      updateSurface(target);

      const inputEl = Boolean(
        target.closest("input") ||
        target.closest("textarea")
      );
      setIsInput(inputEl);

      const isInteractive = Boolean(
        target.closest("button") ||
        target.closest("a") ||
        target.closest("select") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer") ||
        target.closest(".group")
      );
      setIsHovered(isInteractive);
    };

    // Re-check surface when scrolling under static mouse position
    const handleScroll = () => {
      const x = cursorX.get();
      const y = cursorY.get();
      if (x >= 0 && y >= 0) {
        const el = document.elementFromPoint(x, y) as HTMLElement | null;
        if (el && el !== lastTargetRef.current) {
          lastTargetRef.current = el;
          updateSurface(el);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  // Heritage Color Palettes:
  // - Dark / Red Surface: Brand Gold (#F4E8C1) with warm luminous glow (Thếp Vàng trên nền Sơn Son)
  // - Light Surface: Brand Red (#9A1B1F) (Đỏ Chu Sa trên nền Giấy Ngà)
  const colors = isDarkSurface
    ? {
        ringBorder: isInput
          ? "#F4E8C1"
          : isHovered
          ? "rgba(244, 232, 193, 0.9)"
          : "rgba(244, 232, 193, 0.45)",
        ringBg: isInput
          ? "rgba(244, 232, 193, 0.22)"
          : isHovered
          ? "rgba(244, 232, 193, 0.12)"
          : "rgba(244, 232, 193, 0.03)",
        ringShadow: isHovered
          ? "0 0 20px rgba(244, 232, 193, 0.35)"
          : "0 0 8px rgba(244, 232, 193, 0.15)",
        dotBg: isHovered ? "#FFFFFF" : "#F4E8C1",
        dotShadow: "0 0 14px rgba(244, 232, 193, 0.95), 0 0 4px rgba(255, 255, 255, 0.9)",
      }
    : {
        ringBorder: isInput
          ? "#9A1B1F"
          : isHovered
          ? "rgba(154, 27, 31, 0.75)"
          : "rgba(154, 27, 31, 0.4)",
        ringBg: isInput
          ? "rgba(154, 27, 31, 0.2)"
          : isHovered
          ? "rgba(154, 27, 31, 0.08)"
          : "rgba(154, 27, 31, 0.02)",
        ringShadow: "none",
        dotBg: isHovered ? "#7A1518" : "#9A1B1F",
        dotShadow: "0 0 10px rgba(154, 27, 31, 0.5)",
      };

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
          width: isInput ? 4 : isHovered ? 48 : 28,
          height: isInput ? 24 : isHovered ? 48 : 28,
          borderRadius: isInput ? 2 : 9999,
          borderColor: colors.ringBorder,
          backgroundColor: colors.ringBg,
          boxShadow: colors.ringShadow,
          scale: isClicking ? 0.85 : isHovered ? 1.15 : 1,
        }}
        transition={{ type: "spring", damping: 24, stiffness: 360 }}
      />

      {/* Inner Precision Dot */}
      {!isInput && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full will-change-transform"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            width: isHovered ? 8 : 6,
            height: isHovered ? 8 : 6,
            scale: isClicking ? 0.7 : isHovered ? 1.3 : 1,
            backgroundColor: colors.dotBg,
            boxShadow: colors.dotShadow,
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        />
      )}
    </>
  );
};

export default CustomCursor;
