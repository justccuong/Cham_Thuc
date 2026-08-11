"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Gift, QrCode, ShoppingBag } from "lucide-react";
import { CraftItem } from "@/types";
import { ProductKey } from "@/components/CartDrawer";
import { Button } from "./Button";

interface ProductDrawerProps {
  item: CraftItem | null;
  onClose: () => void;
  onOrder: (key: ProductKey) => void;
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({ item, onClose, onOrder }) => {
  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 sm:py-6">
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-text-wood/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            key="drawer-panel"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md md:max-w-3xl lg:max-w-4xl h-full sm:h-auto max-h-[92vh] bg-paper-ivory shadow-2xl flex flex-col md:flex-row rounded-none sm:rounded-3xl border-0 sm:border border-text-wood/10 z-10 overflow-hidden"
          >
            {/* Sleek Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-text-wood/70 hover:text-brand-red flex items-center justify-center shadow-md backdrop-blur-sm transition-all"
              aria-label="Đóng"
            >
              <X size={20} />
            </button>

            {/* Left Side: 50% Image Flatlay */}
            <div className="w-full md:w-1/2 relative bg-black/5 flex-shrink-0 min-h-[260px] sm:min-h-[340px] md:min-h-[480px] overflow-hidden">
              <div className="relative w-full h-full min-h-[260px] sm:min-h-[340px] md:min-h-[480px] overflow-x-auto scrollbar-none">
                <div className="flex snap-x snap-mandatory h-full">
                  {(item.gallery && item.gallery.length > 0 ? item.gallery : [item.image]).map((src, idx) => (
                    <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative aspect-[4/3] md:aspect-auto">
                      <Image
                        src={src}
                        alt={`${item.name} - Ảnh ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>
                {item.gallery && item.gallery.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {item.gallery.map((_, idx) => (
                      <span key={idx} className="w-2 h-2 rounded-full bg-white/70 shadow-sm" />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: 50% Details & Actions */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-paper-ivory space-y-5">
              <div className="space-y-4">
                {/* Village Tag + Title */}
                <div>
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-bamboo-green mb-1.5 block">
                    {item.village}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-red mb-2 leading-tight">
                    {item.name}
                  </h3>
                  <p className="font-sans text-sm text-text-wood/75 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="font-price text-2xl sm:text-3xl font-bold text-brand-red mt-2.5">
                    {new Intl.NumberFormat('vi-VN').format(item.price)}<span className="text-base font-medium ml-1">₫</span>
                  </p>
                </div>

                {/* What's inside */}
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-wood/90 mb-2.5">
                    Thành phần trong hộp
                  </h4>
                  <div className="space-y-2">
                    {item.materials.map((mat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-text-wood/80">
                        <CheckCircle2 size={16} className="text-bamboo-green flex-shrink-0 mt-0.5" />
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secret item */}
                <div className="bg-brand-red/5 border border-brand-red/15 rounded-xl p-3.5 flex items-start gap-3">
                  <Gift size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs font-bold uppercase tracking-wider text-brand-red mb-0.5">
                      Quà tặng ngẫu nhiên
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
                      Mã QR trải nghiệm
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-text-wood/65">
                      Quét mã trên vỏ hộp để xem video nghệ nhân song ngữ kèm nhạc nền dân gian.
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
                  <span>{item.ctaLabel}</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
