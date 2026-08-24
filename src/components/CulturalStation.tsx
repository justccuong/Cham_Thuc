"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Play, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { CloudPatternOverlay } from "@/components/CloudPatternOverlay";
import { useLanguage } from "@/lib/i18n";

interface VillageStory {
  id: string;
  villageName: string;
  province: string;
  subtitle: string;
  tag: string;
  image: string;
  quote: string;
  author: string;
  audioTitle: string;
  audioSubtitle: string;
  audioDuration: string;
}

const VILLAGES: VillageStory[] = [
  {
    id: "non-chuong",
    villageName: "Làng Nón Chuông",
    province: "Hà Nội",
    subtitle: "300 năm gìn giữ nghề nón lá cổ truyền",
    tag: "LÀNG NÓN CHUÔNG",
    image: "/artisan-portrait.jpg",
    quote:
      "“Giữ được nghề không chỉ là giữ miếng cơm, mà là giữ lấy cái hồn quê đã thấm vào từng sợi tre, lá nón qua mấy thế hệ.”",
    author: "— Nghệ Nhân Làng Chuông",
    audioTitle: "Nghe Nghệ Nhân Kể Chuyện Làng Chuông",
    audioSubtitle: "Song ngữ VI / EN · Tiếng chằm nón & Nhạc cụ dân tộc",
    audioDuration: "3:45",
  },
  {
    id: "to-he-xuan-la",
    villageName: "Làng Tò He Xuân La",
    province: "Hà Nội",
    subtitle: "Nghệ thuật nặn bột màu dân gian độc nhất vô nhị",
    tag: "LÀNG TÒ HE XUÂN LA",
    image: "/Làng tò he.png",
    quote:
      "“Từng vắt bột màu trên tay không chỉ làm con trẻ say mê, mà là cả một ký ức tuổi thơ hồn nhiên của người Việt qua bao thăng trầm năm tháng.”",
    author: "— Nghệ Nhân Làng Xuân La",
    audioTitle: "Nghe Nghệ Nhân Kể Chuyện Tò He",
    audioSubtitle: "Song ngữ VI / EN · Tiếng nặn bột & Lời ru dân gian",
    audioDuration: "4:12",
  },
  {
    id: "chuon-chuon-thach-xa",
    villageName: "Làng Tre Thạch Xá",
    province: "Hà Nội",
    subtitle: "Kỳ công chuồn chuồn tre thăng bằng dưới chân chùa Tây Phương",
    tag: "LÀNG TRE THẠCH XÁ",
    image: "/LÀNG chuồn chuồn tre thạch xá.png",
    quote:
      "“Cái tre mộc mạc tưởng chừng vô tri, nhưng khi tìm đúng trọng tâm cân bằng, con chuồn chuồn như bay lượn và mang lại sự an yên cho mỗi ngôi nhà.”",
    author: "— Nghệ Nhân Làng Thạch Xá",
    audioTitle: "Nghe Nghệ Nhân Kể Chuyện Chuồn Chuồn Tre",
    audioSubtitle: "Song ngữ VI / EN · Tiếng vót tre & Âm vang chùa cổ",
    audioDuration: "3:28",
  },
];

export const CulturalStation: React.FC = () => {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  const current = VILLAGES[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? VILLAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === VILLAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="story"
      className="py-14 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#2A1B12] text-[#F8F5F0] border-y border-[#9A1B1F]/20 relative z-10 overflow-hidden"
    >
      <CloudPatternOverlay variant="dark" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block font-sans text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 sm:px-4 py-1.5 rounded-full border border-brand-gold/20 mb-4 sm:mb-5">
            {t.storySection.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-gold tracking-tight">
            {t.storySection.title}
          </h2>

          {/* Editorial Heritage Divider */}
          <div className="flex items-center justify-center gap-4 my-6 opacity-30">
            <div className="h-[1px] w-16 bg-[#F8F5F0]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/patterns/cl3.png" alt="" className="w-6 h-6 object-contain" />
            <div className="h-[1px] w-16 bg-[#F8F5F0]" />
          </div>

          {/* Village switcher tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4">
            {VILLAGES.map((v, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`px-4 sm:px-5 py-2 rounded-full font-sans text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer border ${
                    isActive
                      ? "bg-brand-gold text-[#2A1B12] border-brand-gold shadow-md scale-105"
                      : "bg-[#3A2618]/70 text-paper-ivory/80 border-brand-gold/20 hover:border-brand-gold/50 hover:text-brand-gold"
                  }`}
                >
                  {v.villageName}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Dynamic village showcase layout */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center"
            >
              {/* Artisan / Village visual */}
              <div className="relative">
                <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-brand-gold/20 bg-[#3A2618]">
                  <Image
                    src={current.image}
                    alt={current.villageName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B12]/80 via-transparent to-transparent" />
                </div>

                {/* Floating caption (Nghệ nhân ưu tú removed) */}
                <div className="absolute bottom-3 right-3 sm:-bottom-4 sm:-right-4 md:bottom-6 md:right-6 bg-[#3A2618]/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-xl border border-brand-gold/25 max-w-[220px] sm:max-w-[260px]">
                  <p className="font-sans text-[10px] sm:text-[11px] font-bold text-brand-gold uppercase tracking-wider mb-0.5">
                    {current.tag}
                  </p>
                  <p className="font-serif text-sm sm:text-base font-bold text-paper-ivory">
                    {current.villageName}
                  </p>
                  <p className="font-sans text-[10px] sm:text-[11px] text-paper-ivory/70 leading-snug">
                    {current.subtitle}
                  </p>
                </div>

                {/* Left / Right Carousel Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  <button
                    onClick={handlePrev}
                    aria-label="Làng nghề trước"
                    className="w-9 h-9 rounded-full bg-[#2A1B12]/80 hover:bg-brand-gold text-paper-ivory hover:text-[#2A1B12] border border-brand-gold/30 flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Làng nghề tiếp theo"
                    className="w-9 h-9 rounded-full bg-[#2A1B12]/80 hover:bg-brand-gold text-paper-ivory hover:text-[#2A1B12] border border-brand-gold/30 flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Quote + QR audio */}
              <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
                {/* Artisan quote */}
                <div className="relative bg-[#3A2618]/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-brand-gold/20 shadow-lg">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-gold mb-3">
                    <Sparkles size={13} />
                    Lời Trải Lòng Từ Nghệ Nhân
                  </span>
                  <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-paper-ivory leading-relaxed italic text-left">
                    {current.quote}
                  </blockquote>
                  <p className="font-sans text-xs sm:text-sm font-bold text-brand-gold tracking-wider uppercase mt-4 sm:mt-6 text-right">
                    {current.author}
                  </p>
                </div>

                {/* QR Audio Player Card */}
                <div className="bg-[#3A2618] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-brand-gold/20 shadow-lg">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-brand-red flex items-center justify-center flex-shrink-0 shadow-md">
                      <Play size={18} className="text-brand-gold ml-0.5 fill-current sm:[&]:w-5 sm:[&]:h-5" />
                    </div>
                    <div>
                      <p className="font-serif text-sm sm:text-base font-bold text-brand-gold">
                        {current.audioTitle}
                      </p>
                      <p className="font-sans text-[10px] sm:text-[11px] text-paper-ivory/70">
                        {current.audioSubtitle}
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
                            i < 12 ? "bg-brand-gold" : "bg-paper-ivory/20"
                          }`}
                          style={{ height: `${h * 2.5}px` }}
                        />
                      )
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-paper-ivory/60 font-sans">
                    <span>1:24</span>
                    <div className="flex items-center gap-1 sm:gap-1.5 text-brand-gold font-bold uppercase tracking-wider">
                      <QrCode size={11} />
                      <span>Quét QR trên vỏ hộp</span>
                    </div>
                    <span>{current.audioDuration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CulturalStation;
