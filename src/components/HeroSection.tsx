"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden bg-black"
    >
      {/* Full-width cinematic background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Vietnamese artisan crafting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
      </div>

      {/* Centered content — mobile padding px-5, desktop px-6 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-6 flex flex-col items-center pt-20 sm:pt-0"
      >
        {/* Logo badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-5 sm:mb-8 p-3 sm:p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-paper-ivory/15 shadow-2xl"
        >
          <Image
            src="/logo.png"
            alt="CHẠM THỨC"
            width={180}
            height={60}
            className="h-12 sm:h-16 md:h-20 w-auto object-contain"
            priority
          />
        </motion.div>

        {/* Badge */}
        <span className="inline-block font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-paper-ivory/90 bg-paper-ivory/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full border border-paper-ivory/20 mb-4 sm:mb-6">
          Trải nghiệm văn hóa Việt
        </span>

        {/* Headline — text-3xl mobile, text-7xl desktop */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.1] text-paper-ivory mb-4 sm:mb-6 tracking-tight"
        >
          Chạm tinh hoa
          <br />
          <span className="text-brand-gold">Mở văn hóa</span>
        </motion.h1>

        {/* Minimal subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-sans text-sm sm:text-base md:text-lg text-paper-ivory/85 max-w-md sm:max-w-lg mb-8 sm:mb-12 font-light leading-relaxed"
        >
          Hộp quà ngẫu nhiên Blind Box kết hợp bộ kit DIY di sản truyền thống Việt.
        </motion.p>

        {/* Primary CTA — w-full on mobile, auto on desktop. Min h-12 touch target */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          onClick={() =>
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
          }
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-red text-brand-gold rounded-full px-8 sm:px-10 h-12 sm:h-auto sm:py-4 text-sm font-bold uppercase tracking-widest hover:bg-brand-red-hover transition-all shadow-2xl active:scale-95 cursor-pointer"
        >
          <span>Khám phá ngay</span>
          <ArrowDown size={18} className="animate-bounce" />
        </motion.button>
      </motion.div>


    </section>
  );
};

export default HeroSection;
