"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { CraftItem } from "@/types";
import { ProductKey } from "@/lib/cart";
import { Button } from "./ui/Button";
import { useLanguage } from "@/lib/i18n";

interface ProductModalProps {
  item: CraftItem | null;
  onClose: () => void;
  onOrder: (key: ProductKey) => void;
}

interface BlindBoxVariant {
  id: string;
  tag: string;
  name: string;
  image: string;
  subtext: string;
  isSecret?: boolean;
}

const getBlindBoxVariants = (item: CraftItem): BlindBoxVariant[] => {
  if (item.id === "to-he") {
    return [
      {
        id: "base",
        tag: "Gốc",
        name: "Bộ Kit DIY Tò He Gốc",
        image: "/products/to-he.jpg",
        subtext: "Bộ Kit DIY đầy đủ gồm bột tò he 7 màu, que tre, bộ dụng cụ tạo hình và giấy HDSD.",
      },
    ];
  }

  if (item.id === "non-la") {
    return [
      {
        id: "base",
        tag: "Gốc",
        name: "Bộ Kit Nón Lá Mini Gốc",
        image: "/products/non-chuong.jpg",
        subtext: "Bộ Kit DIY đầy đủ gồm phôi nón lá trắng, nón lụa mini, màu vẽ, cọ, keo dán, charm và giấy HDSD.",
      },
      {
        id: "gift1",
        tag: "Mẫu 01",
        name: "Quai Lụa & Tua Rua Dân Gian",
        image: "/products/non-chuong.png",
        subtext: "Cơ hội nhận ngẫu nhiên: Bộ quai lụa tơ tằm và tua rua dân gian.",
      },
      {
        id: "gift2",
        tag: "Mẫu 02",
        name: "Hạt Ngọc & Pattern Thủ Công",
        image: "/products/lua-van-phuc.jpg",
        subtext: "Cơ hội nhận ngẫu nhiên: Bộ hạt ngọc và hoa văn đơm thủ công.",
      },
      {
        id: "secret",
        tag: "Hiếm",
        name: "Quai Lụa Sơn Thiếp Vàng Khai Xuân",
        image: "/products/tranh-dong-ho.jpg",
        subtext: "Mẫu độc bản bí ẩn: Chi tiết trang trí đặc biệt giới hạn 5%.",
        isSecret: true,
      },
    ];
  }

  return [
    {
      id: "base",
      tag: "Gốc",
      name: "Bộ Kit Chuồn Chuồn Tre Gốc",
      image: "/products/chuon-chuon-tre.jpg",
      subtext: "Bộ Kit DIY đầy đủ gồm 2 chuồn chuồn tre mộc, chân đế, khay pha màu, màu vẽ, 2 cọ và giấy HDSD.",
    },
  ];
};

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose, onOrder }) => {
  const { t } = useLanguage();
  const isMounted = useIsClient();
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevItemId, setPrevItemId] = useState<string | undefined>(item?.id);

  // Reset activeIdx during render when item changes
  if (item?.id !== prevItemId) {
    setPrevItemId(item?.id);
    setActiveIdx(0);
  }

  // Prevent background page scrolling when modal is open
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

  if (!isMounted) return null;

  const variants = item ? getBlindBoxVariants(item) : [];
  const activeVariant = variants[activeIdx] || variants[0];
  const priceDisplay = item ? new Intl.NumberFormat("vi-VN").format(item.price) : "";

  return createPortal(
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 sm:py-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md md:max-w-3xl lg:max-w-4xl h-auto max-h-[88vh] sm:max-h-[90vh] my-auto bg-paper-ivory shadow-2xl flex flex-col md:flex-row rounded-2xl sm:rounded-3xl border border-text-wood/10 z-[100] overflow-y-auto md:overflow-hidden m-3 sm:m-0"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#3A2618]/70 hover:text-[#9A1B1F] flex items-center justify-center shadow-md backdrop-blur-sm transition-all cursor-pointer"
              aria-label={t.modal.close}
            >
              <X size={20} />
            </button>

            {/* Left Column: Visuals & Interactive Blind Box Gallery */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 bg-[#FAF7F2] border-b md:border-b-0 md:border-r border-[#3A2618]/10 flex flex-col justify-between space-y-3 sm:space-y-4 flex-shrink-0">
              {/* Main Display Image */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden shadow-inner bg-stone-200/50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeVariant.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={activeVariant.image}
                      alt={activeVariant.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />

                    {/* Tag Overlay */}
                    <div className="absolute top-3 left-3 z-20 bg-black/65 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {activeVariant.tag} — {activeVariant.name}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Subtext under main image */}
              <p className="font-sans text-xs sm:text-sm text-[#3A2618]/80 bg-white p-3 rounded-xl border border-[#3A2618]/10 font-normal leading-relaxed">
                {activeVariant.subtext}
              </p>

              {/* Thumbnails Section — only shown for products with blind box variants */}
              {variants.length > 1 && (
              <div>
                <p className="text-[11px] font-bold text-[#3A2618]/60 uppercase tracking-widest mb-2">
                  {t.modal.giftHeader}
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
                            ? "border-[#9A1B1F] ring-2 ring-[#9A1B1F] scale-105 shadow-md"
                            : "border-[#3A2618]/15 hover:border-[#9A1B1F]/50 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={v.image}
                          alt={v.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                          {v.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              )}
            </div>

            {/* Right Column: Information & CTA */}
            <div className="w-full md:w-1/2 p-5 sm:p-8 flex flex-col justify-between md:overflow-y-auto bg-paper-ivory space-y-5 pb-6 sm:pb-8 flex-shrink-0">
              <div className="space-y-4">
                {/* Village Tag + Title + Price */}
                <div>
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#285834] mb-1 block">
                    {item.village.toUpperCase()}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#9A1B1F] mb-2 leading-snug">
                    {item.name}
                  </h3>
                  <p className="font-price text-3xl font-extrabold text-[#9A1B1F] mb-3">
                    {priceDisplay} {t.products.priceSuffix}
                  </p>
                </div>

                {/* Component List with Plain Text Bullets */}
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#3A2618]/80 mb-2">
                    {t.modal.materialsHeader}
                  </h4>
                  <div className="space-y-1.5 font-sans text-sm text-[#3A2618]/85 pl-1 font-normal">
                    {item.materials.map((mat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#9A1B1F] font-bold">-</span>
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlight Box for Random Gift Note — hidden when no random gift */}
                {item.secretItem && (
                <div className="bg-[#9A1B1F]/5 border border-[#9A1B1F]/20 p-4 rounded-xl space-y-1">
                  <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#9A1B1F]">
                    {t.modal.giftNoteTitle}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-[#3A2618]/80 leading-relaxed font-normal">
                    {t.modal.giftNoteDesc}
                  </p>
                </div>
                )}
              </div>

              {/* Bottom Primary CTA */}
              <div className="pt-3 pb-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    const key = item.id as ProductKey;
                    onClose();
                    onOrder(key);
                  }}
                  className="w-full h-12 sm:h-13 bg-[#9A1B1F] hover:bg-[#7A1518] text-[#F4E8C1] shadow-lg flex items-center justify-center gap-2 rounded-xl text-base font-bold uppercase tracking-wider cursor-pointer"
                >
                  <ShoppingBag size={18} />
                  <span>
                    {t.modal.selectBoxBtn}
                    {priceDisplay} {t.products.priceSuffix}
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProductModal;
