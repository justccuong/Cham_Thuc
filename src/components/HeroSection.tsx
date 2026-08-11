"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center text-center overflow-hidden bg-black"
    >
      {/* Background image — shows clean first */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Vietnamese artisan crafting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark + blur overlay — starts almost immediately (0.1s) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65 backdrop-blur-[3px]"
        />
      </div>

      {/* Text content — fast staggered entrance starting at 0.2s */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-6 flex flex-col items-center flex-1 justify-center"
      >
        {/* Logo badge */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
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
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="inline-block font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-paper-ivory/90 bg-paper-ivory/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full border border-paper-ivory/20 mb-4 sm:mb-6"
        >
          Trải nghiệm văn hóa Việt
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] text-paper-ivory mb-4 sm:mb-6 tracking-tight drop-shadow-md"
        >
          Chạm tinh hoa
          <br />
          <span className="text-brand-gold">Mở văn hóa</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="font-sans text-sm sm:text-base md:text-lg text-paper-ivory/80 max-w-sm sm:max-w-md font-light leading-relaxed"
        >
          Mỗi chiếc hộp là một hành trình nhỏ về làng nghề — nơi bạn tự tay chạm vào di sản.
        </motion.p>
      </motion.div>

      {/* "Khám phá ngay" — text-only link pinned near bottom */}
      <motion.a
        href="#products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.65 }}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="relative z-10 mb-10 sm:mb-14 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="font-sans text-xs sm:text-sm text-paper-ivory/70 tracking-widest uppercase group-hover:text-paper-ivory transition-colors duration-300">
          Khám phá ngay
        </span>
        <ArrowDown size={16} className="text-paper-ivory/50 animate-bounce group-hover:text-paper-ivory transition-colors duration-300" />
      </motion.a>
    </section>
  );
};

export default HeroSection;
