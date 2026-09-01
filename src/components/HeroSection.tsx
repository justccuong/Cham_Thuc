"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { useLanguage } from "@/lib/i18n";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center text-center overflow-hidden bg-black"
    >
      {/* Background image — shows clean first */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/no-text.png"
          alt="CHẠM THỨC — Chạm Tinh Hoa, Mở Văn Hóa"
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
          className="mb-5 sm:mb-8 p-1.5 sm:p-2 rounded-full bg-black/30 backdrop-blur-md border border-paper-ivory/20 shadow-2xl inline-flex items-center justify-center"
        >
          <Image
            src="/logo.png"
            alt="CHẠM THỨC"
            width={96}
            height={96}
            className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 rounded-full object-cover shadow-lg border border-brand-gold/30"
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
          {t.hero.badge}
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] text-paper-ivory mb-4 sm:mb-6 tracking-tight drop-shadow-md"
        >
          {t.hero.titleLine1}
          <br />
          <span className="text-brand-gold">{t.hero.titleLine2}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="font-sans text-sm sm:text-base md:text-lg text-paper-ivory/80 max-w-sm sm:max-w-md font-light leading-relaxed"
        >
          {t.hero.subtitle}
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
          {t.hero.ctaExplore}
        </span>
        <ArrowDown size={16} className="text-paper-ivory/50 animate-bounce group-hover:text-paper-ivory transition-colors duration-300" />
      </motion.a>
    </section>
  );
};

export default HeroSection;
