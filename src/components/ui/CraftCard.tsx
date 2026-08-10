"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CraftItem } from "@/types";
import { ArrowRight } from "lucide-react";

interface CraftCardProps {
  item: CraftItem;
  onSelect: (item: CraftItem) => void;
}

export const CraftCard: React.FC<CraftCardProps> = ({ item, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={() => onSelect(item)}
      className="group bg-paper-warm rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-500"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Minimal card body */}
      <div className="p-5 sm:p-6">
        <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-bamboo-green mb-2 block">
          {item.tag}
        </span>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-red mb-2 leading-snug">
          {item.name}
        </h3>

        <p className="font-sans text-sm text-text-wood/60 leading-relaxed mb-4">
          {item.description}
        </p>

        <span className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-brand-red group-hover:gap-2.5 transition-all duration-300">
          Xem chi tiết
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </motion.div>
  );
};
