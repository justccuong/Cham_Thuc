"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, QrCode, ShoppingBag, Search } from "lucide-react";
import { CraftItem } from "@/types";
import { ProductKey } from "@/components/CartDrawer";
import { Button } from "./Button";

interface ProductDrawerProps {
  item: CraftItem | null;
  onClose: () => void;
  onOrder: (key: ProductKey) => void;
}

interface VariantThumb {
  id: string;
  name: string;
  image?: string;
  isSecret?: boolean;
}

const getVariants = (item: CraftItem): VariantThumb[] => {
  if (item.id === "to-he") {
    return [
      { id: "v1", name: "Tứ Linh Dân Gian", image: "/products/to-he.jpg" },
      { id: "v2", name: "Ký Ức Làng Quê", image: "/products/to-he.png" },
      { id: "v3", name: "Màu & Phụ Kiện", image: "/products/tranh-dong-ho.jpg" },
      { id: "v4", name: "Mẫu Bí Ẩn", isSecret: true },
    ];
  }
  if (item.id === "non-la") {
    return [
      { id: "v1", name: "Họa Tiết Mộc", image: "/products/non-chuong.jpg" },
      { id: "v2", name: "Sơn Thủy Mini", image: "/products/non-chuong.png" },
      { id: "v3", name: "Bộ Màu Acrylic", image: "/products/lua-van-phuc.jpg" },
      { id: "v4", name: "Mẫu Bí Ẩn", isSecret: true },
    ];
  }
  return [
    { id: "v1", name: "Tre Mộc Thăng Bằng", image: "/products/chuon-chuon-tre.jpg" },
    { id: "v2", name: "Chuồn Chuồn Son", image: "/products/chuon-chuon-tre.png" },
    { id: "v3", name: "Chân Đế Mây Tre", image: "/products/tranh-dong-ho.jpg" },
    { id: "v4", name: "Mẫu Bí Ẩn", isSecret: true },
  ];
};

export const ProductDrawer: React.FC<ProductDrawerProps> = ({ item, onClose, onOrder }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setActiveIdx(0);
  }, [item?.id]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  if (!item) return null;

  const variants = getVariants(item);
  const activeVariant = variants[activeIdx] || variants[0];
  const priceDisplay = new Intl.NumberFormat("vi-VN").format(item.price);
  const priceShort = Math.round(item.price / 1000);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 sm:py-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            key="drawer-panel"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md md:max-w-3xl lg:max-w-4xl h-full sm:h-auto max-h-[90vh] my-auto bg-paper-ivory shadow-2xl flex flex-col md:flex-row rounded-none sm:rounded-3xl border-0 sm:border border-text-wood/10 z-[100] overflow-y-auto sm:overflow-hidden"
          >
            {/* Sleek Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-text-wood/70 hover:text-brand-red flex items-center justify-center shadow-md backdrop-blur-sm transition-all"
              aria-label="Đóng"
            >
              <X size={20} />
            </button>

            {/* Left Side: Interactive Gallery Column */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 bg-[#FAF7F2] border-r border-text-wood/10 flex flex-col justify-between space-y-4">
              {/* Main Image Container */}
              <div className="relative w-full aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden shadow-inner bg-stone-200/50">
                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs px-3 py-1.5 rounded-full font-medium shadow-md flex items-center gap-1.5">
                  <Search size={13} className="text-brand-gold" />
                  <span>Xem các bộ mẫu ngẫu nhiên</span>
                </div>

                <AnimatePresence mode="wait">
                  {activeVariant.isSecret ? (
                    <motion.div
                      key="secret-box"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full bg-gradient-to-br from-[#2A1B12] via-[#4A2016] to-[#9A1B1F] flex flex-col items-center justify-center p-6 text-center"
                    >
                      <span className="text-5xl sm:text-6xl mb-3 animate-bounce">❓</span>
                      <h5 className="font-serif text-xl sm:text-2xl font-bold text-brand-gold mb-1">
                        Mẫu Bí Ẩn (Secret Item)
                      </h5>
                      <p className="font-sans text-xs sm:text-sm text-brand-gold/80 max-w-xs leading-relaxed">
                        1 trong 6 mẫu phụ kiện độc bản phát hành giới hạn. Mở hộp để khám phá bất ngờ!
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeVariant.image}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={activeVariant.image || item.image}
                        alt={activeVariant.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Variant Thumbnail Carousel */}
              <div>
                <p className="text-[11px] font-bold text-text-wood/60 uppercase tracking-wider mb-2">
                  Xem trước biến thể ({activeIdx + 1}/4): <span className="text-brand-red font-semibold">{activeVariant.name}</span>
                </p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {variants.map((v, idx) => {
                    const isActive = idx === activeIdx;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setActiveIdx(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          isActive
                            ? "border-brand-red ring-2 ring-brand-red/30 scale-105 shadow-md"
                            : "border-text-wood/15 hover:border-brand-red/50 opacity-80 hover:opacity-100"
                        }`}
                      >
                        {v.isSecret ? (
                          <div className="w-full h-full bg-gradient-to-br from-[#2A1B12] to-[#9A1B1F] flex flex-col items-center justify-center p-1 text-center">
                            <span className="text-lg sm:text-xl">❓</span>
                            <span className="text-[9px] font-bold text-brand-gold uppercase tracking-tighter leading-tight mt-0.5">
                              Secret
                            </span>
                          </div>
                        ) : (
                          <Image
                            src={v.image || item.image}
                            alt={v.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side: Editorial Layout & Copy */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-paper-ivory space-y-5">
              <div className="space-y-4">
                {/* Village Tag + Title */}
                <div>
                  <span className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wider text-bamboo-green mb-1 block">
                    {item.village}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-black text-brand-red mb-2 leading-tight">
                    {item.name}
                  </h3>
                  <p className="font-price text-3xl sm:text-4xl font-extrabold text-brand-red mb-3">
                    {priceDisplay}<span className="text-lg font-bold ml-1">₫</span>
                  </p>
                  <p className="font-sans text-sm text-text-wood/85 leading-relaxed bg-brand-red/5 p-3 rounded-xl border border-brand-red/10 font-medium">
                    ✨ Mỗi hộp chắc chắn gồm bộ dụng cụ làm thủ công, kèm <strong>NGẪU NHIÊN 1 trong các bộ mẫu con giống/phụ kiện</strong> ở hình bên.
                  </p>
                </div>

                {/* Included Checklist (Clean Typography without checkmarks) */}
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-wood mb-2">
                    Thành phần trong hộp
                  </h4>
                  <div className="space-y-2 font-sans text-sm text-text-wood/85 pl-1">
                    {item.materials.map((mat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" />
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secret item teaser */}
                <div className="bg-paper-warm rounded-xl p-3.5 border border-text-wood/10 flex items-start gap-3">
                  <Gift size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs font-bold uppercase tracking-wider text-brand-red mb-0.5">
                      Quà tặng bí ẩn
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-text-wood/75">
                      {item.secretItem}
                    </p>
                  </div>
                </div>

                {/* QR teaser */}
                <div className="bg-paper-warm rounded-xl p-3.5 border border-text-wood/10 flex items-start gap-3">
                  <QrCode size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs font-bold uppercase tracking-wider text-text-wood mb-0.5">
                      Mã QR nghệ nhân
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-text-wood/65">
                      Quét mã trên vỏ hộp để xem video hướng dẫn song ngữ kèm nhạc dân gian.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action CTA */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    const key = item.id as ProductKey;
                    onClose();
                    onOrder(key);
                  }}
                  className="w-full h-12 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-lg flex items-center justify-center gap-2 rounded-xl text-base font-bold uppercase tracking-wider"
                >
                  <ShoppingBag size={18} />
                  <span>CHỌN HỘP NÀY — {priceShort}K</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
