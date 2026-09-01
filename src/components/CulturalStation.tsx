"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { CloudPatternOverlay } from "@/components/CloudPatternOverlay";
import { useLanguage } from "@/lib/i18n";
import { useCart, ProductKey } from "@/lib/cart";

interface VillageStory {
  id: string;
  productKey: ProductKey;
  villageName: string;
  location: string;
  history: string;
  subtitle: string;
  tag: string;
  image: string;
  story: string;
  poem: string;
  highlights: string[];
  productName: string;
  productImage: string;
  price: number;
}

const VILLAGES: VillageStory[] = [
  {
    id: "non-chuong",
    productKey: "non-la",
    villageName: "Làng Nón Chuông",
    location: "Xã Phương Trung, Huyện Thanh Oai, Hà Nội",
    history: "Hơn 300 năm gìn giữ nghề nón lá cổ truyền",
    subtitle: "300 năm gìn giữ nghề nón lá cổ truyền",
    tag: "LÀNG NÓN CHUÔNG",
    image: "/villages/non-chuong.png",
    poem: "“Nón Chuông, khua lụa, quai thao làng Đơ”",
    story:
      "Trải qua hơn 300 năm gìn giữ và phát triển bên dòng sông Đáy, từng chiếc nón lá làng Chuông được đan cài tỉ mỉ từ nan tre, bẹ lá cọ trắng muốt, lưu giữ nét đẹp thanh lịch đoan trang của phụ nữ Việt.",
    highlights: [
      "Nan tre chuốt nhẵn, đan cài 16 vòng nón thanh tao chuẩn mực.",
      "Lá cọ trắng phơi sương tạo độ dẻo dai và sắc trắng trang nhã.",
      "Mỗi chiếc nón là kết tinh của hàng ngàn mũi chằm khéo léo.",
    ],
    productName: "Bộ DIY Nón Lá Mini",
    productImage: "/products/non-la/cover.png",
    price: 160000,
  },
  {
    id: "to-he-xuan-la",
    productKey: "to-he",
    villageName: "Làng Tò He Xuân La",
    location: "Xã Phượng Dực, Huyện Phú Xuyên, Hà Nội",
    history: "Làng nghề nặn tò he dân gian độc nhất vô nhị",
    subtitle: "Nghệ thuật nặn bột màu dân gian độc nhất vô nhị",
    tag: "LÀNG TÒ HE XUÂN LA",
    image: "/villages/to-he-xuan-la.png",
    poem: "“Tò he cô bán mấy đồng — Tôi mua một cái cho chồng tôi chơi”",
    story:
      "Từ những vắt bột nếp thơm dẻo nhuộm màu tự nhiên, dưới đôi bàn tay khéo léo của nghệ nhân Xuân La, những con giống dân gian sống động ra đời mang theo cả bầu trời ký ức tuổi thơ trong trẻo.",
    highlights: [
      "Bột nếp dẻo mịn không dính tay, nhuộm màu tự nhiên thảo mộc.",
      "Nghệ thuật tạo hình con giống dân gian sống động, có hồn.",
      "Món quà dân gian gắn liền với ký ức tuổi thơ bao thế hệ Việt.",
    ],
    productName: "Bộ DIY Tò He Dân Gian",
    productImage: "/products/to-he/cover.png",
    price: 160000,
  },
  {
    id: "chuon-chuon-thach-xa",
    productKey: "chuon-chuon",
    villageName: "Làng Chuồn Chuồn Tre Thạch Xá",
    location: "Xã Thạch Xá, Huyện Thạch Thất, Hà Nội",
    history: "Kỳ công tre mộc dưới chân chùa Tây Phương",
    subtitle: "Kỳ công chuồn chuồn tre thăng bằng dưới chân chùa Tây Phương",
    tag: "LÀNG CHUỒN CHUỒN TRE THẠCH XÁ",
    image: "/villages/chuon-chuon-thach-xa.png",
    poem: "“Chuồn chuồn bay thấp thì mưa — Bay cao thì nắng, bay vừa thì râm”",
    story:
      "Dưới chân chùa Tây Phương cổ kính, nghệ nhân làng Thạch Xá vót từng thanh tre mộc mạc, cân đo tỉ mỉ từng milimet để tạo nên những chú chuồn chuồn có thể đậu thăng bằng kỳ diệu trên mọi điểm tựa.",
    highlights: [
      "Tre già sấy khô tự nhiên, đẽo gọt mộc mạc chống mối mọt.",
      "Kỹ thuật tạo đối trọng cánh & mỏ thăng bằng chuẩn từng milimet.",
      "Tự do vẽ màu sắc tươi vui mang ý nghĩa may mắn, bình an.",
    ],
    productName: "Bộ DIY Chuồn Chuồn Tre",
    productImage: "/products/chuon-chuon/cover.png",
    price: 160000,
  },
];

export const CulturalStation: React.FC = () => {
  const { t } = useLanguage();
  const { openCart } = useCart();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Generous 25-second rotation so users have plenty of time to read
  useEffect(() => {
    if (isHovered) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev === VILLAGES.length - 1 ? 0 : prev + 1));
    }, 25000);
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
          <span className="inline-block font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3.5 sm:px-4 py-1.5 rounded-full border border-brand-gold/20 mb-4 sm:mb-5">
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

          {/* 3 Equal Symmetrical Village Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 max-w-2xl mx-auto mt-4">
            {VILLAGES.map((v, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-2xl font-sans text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer border text-center flex items-center justify-center ${
                    isActive
                      ? "bg-brand-gold text-[#2A1B12] border-brand-gold shadow-[0_4px_20px_rgba(244,232,193,0.3)] scale-[1.02]"
                      : "bg-[#3A2618]/80 text-paper-ivory/80 border-brand-gold/20 hover:border-brand-gold/50 hover:text-brand-gold hover:bg-[#4A3220]"
                  }`}
                >
                  <span className="truncate">{v.villageName}</span>
                </button>
              );
            })}
          </div>

          {/* 3 Synchronized Segmented Countdown Timer Bars */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-2xl mx-auto mt-3 px-1">
            {VILLAGES.map((v, idx) => {
              const isActive = idx === activeIdx;
              const isPassed = idx < activeIdx;
              return (
                <div
                  key={`timer-seg-${v.id}`}
                  onClick={() => setActiveIdx(idx)}
                  className="h-1 sm:h-1.5 bg-paper-ivory/15 rounded-full overflow-hidden relative cursor-pointer"
                  title={`Chuyển sang ${v.villageName}`}
                >
                  {isPassed ? (
                    <div className="h-full w-full bg-brand-gold rounded-full" />
                  ) : isActive ? (
                    <motion.div
                      key={`progress-bar-${activeIdx}`}
                      className="h-full bg-brand-gold rounded-full shadow-[0_0_8px_rgba(244,232,193,0.8)]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: isHovered ? 0 : 25, ease: "linear" }}
                    />
                  ) : null}
                </div>
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
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center"
            >
              {/* Left Column: Full 1:1 Square Visual Poster (Zero Cropping with object-contain) */}
              <div className="lg:col-span-5 relative group flex flex-col items-center">
                <div className="relative w-full max-w-md sm:max-w-lg aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-brand-gold/30 bg-[#160E08] p-1.5 sm:p-2">
                  <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#1F130B]">
                    <Image
                      src={current.image}
                      alt={current.villageName}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-contain transition-transform duration-700 ease-out group-hover:scale-102"
                      priority
                    />
                  </div>
                </div>

                {/* Left / Right Carousel Controls */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={handlePrev}
                    aria-label="Làng nghề trước"
                    className="w-10 h-10 rounded-full bg-[#3A2618] hover:bg-brand-gold text-paper-ivory hover:text-[#2A1B12] border border-brand-gold/30 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg active:scale-95"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-xs font-bold text-brand-gold font-sans tracking-widest uppercase">
                    {activeIdx + 1} / {VILLAGES.length}
                  </span>
                  <button
                    onClick={handleNext}
                    aria-label="Làng nghề tiếp theo"
                    className="w-10 h-10 rounded-full bg-[#3A2618] hover:bg-brand-gold text-paper-ivory hover:text-[#2A1B12] border border-brand-gold/30 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg active:scale-95"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Right Column: Story & Heritage Craft Highlights (Replaced Mock Audio) */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
                {/* Cultural Story Card */}
                <div className="relative bg-[#3A2618]/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-brand-gold/25 shadow-xl space-y-4 hover:border-brand-gold/45 transition-colors duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-gold/15 pb-3">
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-gold">
                      <Sparkles size={15} className="text-brand-gold" />
                      <span>{current.villageName}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-paper-ivory/70 font-sans">
                      <MapPin size={13} className="text-brand-red flex-shrink-0" />
                      <span className="truncate">{current.location}</span>
                    </div>
                  </div>

                  <p className="font-serif text-lg sm:text-xl md:text-2xl text-paper-ivory font-medium italic leading-relaxed">
                    {current.poem}
                  </p>

                  <p className="font-sans text-sm sm:text-base text-paper-ivory/85 leading-relaxed font-light">
                    {current.story}
                  </p>
                </div>

                {/* Heritage Craft Highlights Card (Replaced Audio Player) */}
                <div className="bg-[#3A2618] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-brand-gold/25 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-gold">
                    <Clock size={15} />
                    <span>Tinh hoa nghệ thuật thủ công</span>
                  </div>

                  {/* 3 Craft Highlights */}
                  <div className="space-y-2.5">
                    {current.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-paper-ivory/85">
                        <CheckCircle2 size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Connected DIY Kit Action Card */}
                  <div className="pt-3 border-t border-brand-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#2A1B12]/80 rounded-2xl p-4 border border-brand-gold/20">
                    <div className="flex items-center gap-3.5 w-full sm:w-auto">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-brand-gold/30 bg-[#3A2618]">
                        <Image
                          src={current.productImage}
                          alt={current.productName}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-gold block">
                          Trải nghiệm tự tay làm
                        </span>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-paper-ivory">
                          {current.productName}
                        </h4>
                        <p className="font-price font-extrabold text-sm sm:text-base text-brand-red">
                          {current.price.toLocaleString("vi-VN")} đ
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
                      <button
                        onClick={() => openCart(current.productKey)}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-brand-red hover:bg-brand-red-hover text-brand-gold font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border border-brand-gold/25"
                      >
                        <ShoppingBag size={15} />
                        <span>Đặt mua ngay</span>
                      </button>
                      <a
                        href="#products"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-paper-ivory font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer border border-paper-ivory/15"
                      >
                        <span>Chi tiết</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
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
