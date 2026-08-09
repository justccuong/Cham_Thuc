"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#3A2618]/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#F8F5F0] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#9A1B1F]/20 text-[#3A2618] z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#3A2618]/60 hover:text-[#9A1B1F] p-1.5 rounded-full hover:bg-black/5 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-6xl text-center mb-4">{item.icon}</div>

          <span className="block text-center text-xs font-bold uppercase tracking-widest text-[#285834] mb-1">
            {item.village}
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl text-center text-[#9A1B1F] font-bold mb-2">
            {item.name}
          </h3>

          <p className="text-xs text-center font-medium text-[#DC866B] uppercase tracking-wider mb-6">
            {item.subtitle}
          </p>

          <div className="bg-[#EFE9DE] rounded-2xl p-4 mb-6 border border-[#3A2618]/10 text-sm leading-relaxed text-[#3A2618]/90">
            {item.description}
          </div>

          {item.materials && item.materials.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A1B1F] mb-3">
                Thành phần trong bộ khám phá:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {item.materials.map((mat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#3A2618]/80">
                    <CheckCircle2 size={14} className="text-[#285834] flex-shrink-0" />
                    <span>{mat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="primary" className="flex-1 hover:bg-[#7A1518]" onClick={onClose}>
              Đặt Hộp Khám Phá
            </Button>
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
