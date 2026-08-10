"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { QrCode, Play } from "lucide-react";

export const CulturalStation: React.FC = () => {
  return (
    <section
      id="story"
      className="py-14 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-paper-warm border-y border-text-wood/8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-16 md:mb-20"
        >
          <span className="inline-block font-sans text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-red bg-brand-red/8 px-3 sm:px-4 py-1.5 rounded-full border border-brand-red/15 mb-4 sm:mb-5">
            Trạm Kể Chuyện
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-brand-red tracking-tight">
            Làng Nghề Truyền Thống
          </h2>
        </motion.div>

        {/* Editorial layout — stacked on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Artisan portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
              <Image
                src="/artisan-portrait.jpg"
                alt="Nghệ nhân làng Chuông"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-wood/40 via-transparent to-transparent" />
            </div>

            {/* Floating caption */}
            <div className="absolute bottom-3 right-3 sm:-bottom-4 sm:-right-4 md:bottom-6 md:right-6 bg-paper-ivory/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-text-wood/10 max-w-[200px] sm:max-w-[240px]">
              <p className="font-sans text-[10px] sm:text-[11px] font-bold text-bamboo-green uppercase tracking-wider mb-0.5 sm:mb-1">
                Nghệ Nhân Ưu Tú
              </p>
              <p className="font-serif text-sm sm:text-base font-bold text-brand-red">
                Làng Nón Chuông
              </p>
              <p className="font-sans text-[10px] sm:text-[11px] text-text-wood/70">
                60 năm gìn giữ nghề nón lá truyền thống
              </p>
            </div>
          </motion.div>

          {/* Quote + QR audio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            {/* Artisan quote — clean typography, full quotation marks, author aligned right */}
            <div className="relative mb-8 sm:mb-12 bg-paper-ivory/60 rounded-2xl p-6 sm:p-8 border border-brand-red/10 shadow-sm">
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-red leading-relaxed italic text-left">
                “Giữ được nghề không chỉ là giữ miếng cơm, mà là giữ lấy cái hồn quê đã thấm vào từng sợi tre, lá nón qua mấy thế hệ.”
              </blockquote>
              <p className="font-sans text-xs sm:text-sm font-bold text-text-wood/70 tracking-wider uppercase mt-4 sm:mt-6 text-right">
                — Nghệ Nhân Làng Chuông
              </p>
            </div>

            {/* QR Audio Player Card */}
            <div className="bg-paper-ivory rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-text-wood/10 shadow-sm">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-brand-red flex items-center justify-center flex-shrink-0">
                  <Play size={18} className="text-brand-gold ml-0.5 fill-current sm:[&]:w-5 sm:[&]:h-5" />
                </div>
                <div>
                  <p className="font-serif text-sm sm:text-base font-bold text-brand-red">
                    Nghe Nghệ Nhân Kể Chuyện
                  </p>
                  <p className="font-sans text-[10px] sm:text-[11px] text-text-wood/60">
                    Song ngữ VI / EN · Kèm nhạc cụ dân gian
                  </p>
                </div>
              </div>

              {/* Waveform mockup */}
              <div className="flex items-end gap-[2px] sm:gap-[3px] h-6 sm:h-8 mb-2 sm:mb-3">
                {[3, 6, 4, 8, 5, 7, 3, 6, 8, 4, 7, 5, 3, 6, 4, 8, 5, 7, 3, 6, 8, 4, 7, 5, 3, 6, 4, 8].map(
                  (h, i) => (
                    <div
                      key={i}
                      className={`w-[3px] sm:w-1 rounded-full ${
                        i < 12 ? "bg-brand-red" : "bg-text-wood/20"
                      }`}
                      style={{ height: `${h * 2.5}px` }}
                    />
                  )
                )}
              </div>

              <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-text-wood/50 font-sans">
                <span>1:24</span>
                <div className="flex items-center gap-1 sm:gap-1.5 text-bamboo-green font-bold uppercase tracking-wider">
                  <QrCode size={11} />
                  <span>Quét QR trên vỏ hộp</span>
                </div>
                <span>3:45</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CulturalStation;
