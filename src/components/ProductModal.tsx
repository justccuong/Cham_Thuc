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
  if (item.id === "non-la") {
    return [
      {
        id: "cover",
        tag: "Hộp",
        name: "Hộp DIY Nón Lá Mini",
        image: "/products/non-la/cover.png",
        subtext: "Bộ Kit DIY Nón Lá Mini — Đầy đủ dụng cụ và quà tặng nón lụa ngẫu nhiên.",
      },
      {
        id: "flatlay",
        tag: "Dụng cụ",
        name: "Trọn bộ nguyên liệu",
        image: "/products/non-la/flatlay.jpg",
        subtext: "Phôi nón lá trắng mini, nón lụa mini, vỉ màu acrylic, keo dán, charm/đá và HDSD.",
      },
      {
        id: "inside",
        tag: "Mở hộp",
        name: "Bên trong hộp",
        image: "/products/non-la/inside.jpg",
        subtext: "Đóng gói chỉn chu, sắp xếp nguyên liệu ngăn nắp và an toàn khi vận chuyển.",
      },
      {
        id: "hats",
        tag: "Nón lụa",
        name: "Nón lụa màu ngẫu nhiên",
        image: "/products/non-la/hats.jpg",
        subtext: "Mỗi hộp đi kèm 1 chiếc nón lụa mini màu ngẫu nhiên (đỏ, hồng, xanh lá, xanh dương...).",
      },
    ];
  }

  if (item.id === "to-he") {
    return [
      {
        id: "cover",
        tag: "Hộp",
        name: "Hộp DIY Tò He Dân Gian",
        image: "/products/to-he/cover.png",
        subtext: "Bộ Kit DIY Tò He Xuân La — Đánh thức ký ức tuổi thơ dân gian Việt Nam.",
      },
      {
        id: "flatlay",
        tag: "Dụng cụ",
        name: "Trọn bộ nguyên liệu",
        image: "/products/to-he/flatlay.jpg",
        subtext: "Bột nặn tò he cao cấp không dính tay kèm que gỗ, bộ dụng cụ tạo hình cơ bản và HDSD.",
      },
      {
        id: "inside-top",
        tag: "Mở hộp",
        name: "Bên trong hộp",
        image: "/products/to-he/inside-top.jpg",
        subtext: "Đóng gói cẩn thận cùng rơm lót giấy kraft thân thiện với môi trường.",
      },
      {
        id: "inside-pack",
        tag: "Chi tiết",
        name: "Tạo hình tò he",
        image: "/products/to-he/inside-pack.jpg",
        subtext: "Tự do sáng tạo nặn những nhân vật dân gian sống động theo trí tưởng tượng.",
      },
    ];
  }

  return [
    {
      id: "cover",
      tag: "Hộp",
      name: "Hộp DIY Chuồn Chuồn Tre",
      image: "/products/chuon-chuon/cover.png",
      subtext: "Bộ Kit DIY Chuồn Chuồn Tre Thạch Xá — Tinh hoa thăng bằng tre mộc.",
    },
    {
      id: "flatlay",
      tag: "Dụng cụ",
      name: "Trọn bộ nguyên liệu",
      image: "/products/chuon-chuon/flatlay.jpg",
      subtext: "Chuồn chuồn tre mộc chưa sơn, bộ vỉ màu Acrylic kèm 2 cọ, chân đế 1 nhánh và HDSD.",
    },
    {
      id: "inside-top",
      tag: "Mở hộp",
      name: "Bên trong hộp",
      image: "/products/chuon-chuon/inside-top.jpg",
      subtext: "Đóng gói chỉn chu, bảo vệ mô hình chuồn chuồn tre nguyên vẹn.",
    },
    {
      id: "inside-angled",
      tag: "Chi tiết",
      name: "Góc mở hộp",
      image: "/products/chuon-chuon/inside-angled.jpg",
      subtext: "Khám phá nét đẹp chuồn chuồn tre giữ thăng bằng độc đáo trên chân đế.",
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
                    {item.secretItem}
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
