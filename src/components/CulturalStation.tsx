"use client";

import React, { useState, useEffect } from "react";
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
  story: string;
  poem: string;
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
    image: "/villages/non-chuong.png",
    poem: "“Nón Chuông, khua lụa, quai thao làng Đơ”",
    story:
      "Trải qua hơn 300 năm gìn giữ và phát triển bên dòng sông Đáy, từng chiếc nón lá làng Chuông được đan cài tỉ mỉ từ nan tre, bẹ lá cọ trắng muốt, lưu giữ nét đẹp thanh lịch đoan trang của phụ nữ Việt.",
    audioTitle: "Nghe Kể Chuyện Làng Nón Chuông",
    audioSubtitle: "Song ngữ VI / EN · Tiếng chằm nón & Nhạc cụ dân tộc",
    audioDuration: "3:45",
  },
  {
    id: "to-he-xuan-la",
    villageName: "Làng Tò He Xuân La",
    province: "Hà Nội",
    subtitle: "Nghệ thuật nặn bột màu dân gian độc nhất vô nhị",
    tag: "LÀNG TÒ HE XUÂN LA",
    image: "/villages/to-he-xuan-la.png",
    poem: "“Tò he cô bán mấy đồng — Tôi mua một cái cho chồng tôi chơi”",
    story:
      "Từ những vắt bột nếp thơm dẻo nhuộm màu tự nhiên, dưới đôi bàn tay khéo léo của nghệ nhân Xuân La, những con giống dân gian sống động ra đời mang theo cả bầu trời ký ức tuổi thơ trong trẻo.",
    audioTitle: "Nghe Kể Chuyện Làng Tò He Xuân La",
    audioSubtitle: "Song ngữ VI / EN · Tiếng nặn bột & Điệu ru dân gian",
    audioDuration: "4:12",
  },
  {
    id: "chuon-chuon-thach-xa",
    villageName: "Làng chuồn chuồn tre Thạch Xá",
    province: "Hà Nội",
    subtitle: "Kỳ công chuồn chuồn tre thăng bằng dưới chân chùa Tây Phương",
    tag: "LÀNG CHUỒN CHUỒN TRE THẠCH XÁ",
    image: "/villages/chuon-chuon-thach-xa.png",
    poem: "“Chuồn chuồn bay thấp thì mưa — Bay cao thì nắng, bay vừa thì râm”",
    story:
      "Dưới chân chùa Tây Phương cổ kính, nghệ nhân làng Thạch Xá vót từng thanh tre mộc mạc, cân đo tỉ mỉ từng milimet để tạo nên những chú chuồn chuồn có thể đậu thăng bằng kỳ diệu trên mọi điểm tựa.",
    audioTitle: "Nghe Kể Chuyện Chuồn Chuồn Tre Thạch Xá",
    audioSubtitle: "Song ngữ VI / EN · Tiếng vót tre & Âm vang chuông chùa",
    audioDuration: "3:28",
  },
];

export const CulturalStation: React.FC = () => {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev === VILLAGES.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [isHovered, activeIdx]);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

          {/* Auto-rotate progress bar */}
          <div className="mt-4 mx-auto max-w-xs h-0.5 bg-brand-gold/20 rounded-full overflow-hidden">
            <motion.div
              key={`progress-${activeIdx}`}
              className="h-full bg-brand-gold rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: isHovered ? 0 : 8, ease: 'linear' }}
            />
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

              {/* Story & QR Audio Player */}
              <div className="flex flex-col justify-center space-y-5 sm:space-y-6">
                {/* Village Cultural Story */}
                <div className="relative bg-[#3A2618]/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-brand-gold/20 shadow-xl space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
                    <Sparkles size={14} />
                    <span>{current.villageName}</span>
                  </div>

                  <p className="font-serif text-lg sm:text-xl md:text-2xl text-paper-ivory font-medium italic leading-relaxed">
                    {current.poem}
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-paper-ivory/85 leading-relaxed font-light">
                    {current.story}
                  </p>
                </div>

                {/* QR Audio Player Card */}
                <div className="bg-[#3A2618] rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-brand-gold/25 shadow-xl">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-brand-red flex items-center justify-center flex-shrink-0 shadow-md">
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
