"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CraftItem } from "@/types";
import { Eye } from "lucide-react";

interface CraftCardProps {
  item: CraftItem;
  onSelect: (item: CraftItem) => void;
}

export const CraftCard: React.FC<CraftCardProps> = ({ item, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={() => onSelect(item)}
      className="group relative bg-paper-warm rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl border border-text-wood/8 transition-shadow duration-500 flex-shrink-0 w-[280px] sm:w-auto snap-center"
    >
      {/* 4:3 Product Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text-wood/60 via-transparent to-transparent" />

        {/* Village tag */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
          <span className="bg-paper-ivory/90 backdrop-blur-md text-brand-red text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider border border-brand-red/20">
            {item.tag}
          </span>
        </div>

        {/* Hover overlay with details — hidden on touch, visible on hover */}
        <div className="absolute inset-0 z-20 bg-text-wood/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-col justify-center items-center text-center p-5 text-paper-ivory hidden sm:flex">
          <p className="font-sans text-xs text-paper-ivory/90 leading-relaxed font-light max-w-[90%] mb-4">
            {item.description}
          </p>
          <span className="inline-flex items-center gap-1.5 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Eye size={14} />
            Xem chi tiết
          </span>
        </div>
      </div>

      {/* Bottom card body */}
      <div className="p-4 sm:p-5">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-red mb-1 leading-snug">
          {item.name}
        </h3>
        <p className="font-sans text-[11px] sm:text-xs text-text-wood/60 uppercase tracking-wider mb-3 sm:mb-4">
          {item.subtitle}
        </p>
        {/* Full-width CTA — min h-12 for touch */}
        <button className="w-full h-12 bg-brand-red text-brand-gold rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-brand-red-hover transition-colors cursor-pointer active:scale-95">
          Chọn Hộp
        </button>
      </div>
    </motion.div>
  );
};
