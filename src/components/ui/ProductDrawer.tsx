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
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-text-wood/50 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="relative w-full sm:max-w-md h-full bg-paper-ivory shadow-2xl flex flex-col border-l border-text-wood/10 z-10"
          >
            {/* Header */}
            <div className="h-14 px-4 sm:px-6 border-b border-text-wood/10 flex items-center justify-between bg-paper-warm flex-shrink-0">
              <span className="font-serif text-lg font-bold text-brand-red">Chi tiết sản phẩm</span>
              <button
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center text-text-wood/60 hover:text-brand-red rounded-full hover:bg-black/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Product image */}
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 448px"
                  className="object-cover"
                />
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {/* Tag + Title */}
                <div>
                  <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-bamboo-green mb-1 block">
                    {item.village}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-red mb-1">
                    {item.name}
                  </h3>
                  <p className="font-sans text-sm text-text-wood/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Included items */}
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-wood mb-3">
                    Thành phần trong hộp
                  </h4>
                  <div className="space-y-2.5">
                    {item.materials.map((mat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-text-wood/80">
                        <CheckCircle2 size={15} className="text-bamboo-green flex-shrink-0 mt-0.5" />
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secret random item */}
                <div className="bg-brand-red/5 border border-brand-red/15 rounded-xl p-4 flex items-start gap-3">
                  <Gift size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs font-bold uppercase tracking-wider text-brand-red mb-0.5">
                      Quà tặng ngẫu nhiên
                    </p>
                    <p className="font-sans text-sm text-text-wood/75">
                      {item.secretItem}
                    </p>
                  </div>
                </div>

                {/* QR feature teaser */}
                <div className="bg-paper-warm rounded-xl p-4 border border-text-wood/8 flex items-start gap-3">
                  <QrCode size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs font-bold uppercase tracking-wider text-text-wood mb-0.5">
                      Mã QR trải nghiệm
                    </p>
                    <p className="font-sans text-sm text-text-wood/60">
                      Quét mã trên vỏ hộp để xem video nghệ nhân song ngữ kèm nhạc nền dân gian.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-4 sm:p-6 border-t border-text-wood/10 bg-paper-warm pb-[calc(1rem+env(safe-area-inset-bottom))] flex gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  const key = item.id as ProductKey;
                  onClose();
                  onOrder(key);
                }}
                className="flex-1 h-12 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                <span>{item.ctaLabel}</span>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
