"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden bg-[#F8F5F0]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#9A1B1F_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#285834]/10 text-[#285834] text-xs font-bold uppercase tracking-widest mb-8 border border-[#285834]/20">
          <Sparkles size={14} />
          <span>Blind Box Văn Hóa Việt Nam</span>
        </div>

        {/* Central Logo Box */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-b from-[#9A1B1F] to-[#6E1215] border border-[#9A1B1F]/20 shadow-2xl">
          <Image
            src="/logo.png"
            alt="Chạm Thức Banner Logo"
            width={240}
            height={80}
            className="h-32 sm:h-44 md:h-52 w-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight text-[#9A1B1F] mb-6 tracking-tight">
          ĐÁNH THỨC GIÁ TRỊ<br />VĂN HÓA VIỆT NAM
        </h1>

        <p className="font-sans text-base sm:text-lg max-w-2xl text-[#3A2618]/80 leading-relaxed mb-10 font-normal">
          Tiên phong ứng dụng mô hình phân phối <strong className="font-semibold text-[#9A1B1F]">Hộp khám phá ngẫu nhiên (Blind Box)</strong> kết hợp bộ nguyên liệu DIY cá nhân hóa trải nghiệm văn hóa bản địa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Khám Phá Hộp Giao Thời</span>
            <ArrowRight size={18} className="ml-2" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Tìm Hiểu Triết Lý
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
