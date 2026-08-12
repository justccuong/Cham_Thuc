"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CraftItem } from "@/types";

import { useLanguage } from "@/lib/i18n";

interface CraftCardProps {
  item: CraftItem;
  onSelect: (item: CraftItem) => void;
}

export const CraftCard: React.FC<CraftCardProps> = ({ item, onSelect }) => {
  const { t } = useLanguage();
  const priceDisplay = new Intl.NumberFormat("vi-VN").format(item.price);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => onSelect(item)}
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer border border-[#9A1B1F]/10 shadow-[0_8px_20px_rgba(58,38,24,0.05)] hover:shadow-[0_16px_30px_rgba(58,38,24,0.12)] h-full flex flex-col justify-between transition-all duration-300"
    >
      {/* In-Card Background Watermark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/patterns/cl3.png"
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 w-16 opacity-10 filter sepia saturate-200 hue-rotate-320 group-hover:scale-110 transition-transform duration-300 z-0"
      />

      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl flex-shrink-0 z-10">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Card body */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between relative z-10">
        <div>
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#285834] mb-1.5 block">
            {item.tag.toUpperCase()}
          </span>

          <div className="min-h-[3.5rem] flex items-center mb-2">
            <h3 className="font-serif text-xl sm:text-2xl font-black text-[#9A1B1F] leading-snug">
              {item.name}
            </h3>
          </div>

          <p className="font-sans text-sm text-[#3A2618]/80 leading-relaxed mb-4 font-normal line-clamp-1">
            {item.description}
          </p>
        </div>

        {/* Bottom Action Area */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-[#9A1B1F]/10">
          <p className="font-price text-xl font-bold text-[#9A1B1F]">
            {priceDisplay} {t.products.priceSuffix}
          </p>

          <span className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-[#9A1B1F] group-hover:gap-2 transition-all duration-300">
            {t.products.viewDetails}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CraftCard;
