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
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer border border-[#9A1B1F]/10 shadow-[0_8px_20px_rgba(58,38,24,0.05)] hover:shadow-[0_18px_35px_rgba(58,38,24,0.14)] h-full flex flex-col justify-between transition-all duration-500"
    >
      {/* In-Card Cloud Watermark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/patterns/cl3.png"
        alt=""
        className="pointer-events-none absolute -bottom-2 -right-2 w-16 opacity-10 filter sepia saturate-200 hue-rotate-320 group-hover:scale-110 transition-transform duration-300 z-0"
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
          <span className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-bamboo-green mb-2 block">
            {item.tag}
          </span>

          <div className="min-h-[3.5rem] flex items-center mb-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-red leading-snug">
              {item.name}
            </h3>
          </div>

          <p className="font-sans text-sm text-text-wood/80 leading-relaxed mb-4 font-medium">
            {item.description}
          </p>
        </div>

        {/* Bottom Action Area (Price & CTA) */}
        <div className="mt-auto pt-2">
          {/* Price */}
          <p className="font-price text-2xl sm:text-3xl font-extrabold text-brand-red mb-3">
            {new Intl.NumberFormat('vi-VN').format(item.price)}<span className="text-base font-semibold ml-1">₫</span>
          </p>

          <span className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-brand-red group-hover:gap-2.5 transition-all duration-300">
            Xem chi tiết
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
