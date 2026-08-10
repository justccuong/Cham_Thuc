"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Gift } from "lucide-react";
import { CraftItem } from "@/types";
import { Button } from "./Button";

interface DetailModalProps {
  item: CraftItem | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-text-wood/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full sm:max-w-lg bg-paper-ivory rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border-t sm:border border-brand-red/20 text-text-wood z-10 max-h-[85vh] overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 flex items-center justify-center text-text-wood/60 hover:text-brand-red rounded-full hover:bg-black/5 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-4">
            <div className="text-5xl mb-3">{item.icon}</div>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-bamboo-green mb-1">
              {item.village}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-red font-bold mb-1">
              {item.name}
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-brand-red/80 font-semibold uppercase tracking-wider">
              <Gift size={12} />
              Tặng kèm phụ kiện trang trí ngẫu nhiên
            </span>
          </div>

          <div className="bg-paper-warm rounded-2xl p-4 mb-5 border border-text-wood/10 text-sm leading-relaxed text-text-wood/90">
            {item.description}
          </div>

          {item.materials && item.materials.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-red mb-3">
                Thành phần trong hộp:
              </h4>
              <div className="space-y-2">
                {item.materials.map((mat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-text-wood/80">
                    <CheckCircle2 size={15} className="text-bamboo-green flex-shrink-0 mt-0.5" />
                    <span>{mat}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2 text-sm text-brand-red font-semibold">
                  <Gift size={15} className="text-brand-red flex-shrink-0 mt-0.5" />
                  <span>{item.secretItem}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="primary" className="flex-1 h-12 hover:bg-brand-red-hover" onClick={onClose}>
              {item.ctaLabel}
            </Button>
            <Button variant="outline" className="h-12" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
