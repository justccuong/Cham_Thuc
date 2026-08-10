"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CraftItem } from "@/types";
import { CraftCard } from "@/components/ui/CraftCard";
import { ProductDrawer } from "@/components/ui/ProductDrawer";

const collectionItems: CraftItem[] = [
  {
    id: "non-la",
    icon: "👒",
    name: "Bộ DIY Nón Lá Mini",
    village: "Làng Nón Chuông — Hà Nội",
    subtitle: "Trang trí nón lá thủ công",
    description: "Bộ kit tự làm nón lá mini kèm quà tặng ngẫu nhiên.",
    image: "/products/non-chuong.png",
    materials: [
      "Frame nón lá mini thủ công",
      "Bộ màu vẽ Acrylic 6 màu",
      "2 cọ vẽ chuyên dụng",
      "Photocard Nghệ Nhân",
    ],
    secretItem: "Chi tiết trang trí ngẫu nhiên — mẫu màu tô đặc biệt hoặc phụ kiện độc bản",
    tag: "Làng nón Chuông",
    ctaLabel: "Chọn Hộp Nón Lá",
  },
  {
    id: "to-he",
    icon: "🎎",
    name: "Bộ DIY Tò He Dân Gian",
    village: "Làng Tò He Xuân La — Hà Nội",
    subtitle: "Nặn tò he truyền thống",
    description: "Nặn tò he bằng bột màu tự nhiên kèm khuôn con giống bí ẩn.",
    image: "/products/to-he.png",
    materials: [
      "Bột màu tự nhiên dẻo mịn",
      "Que gỗ nặn truyền thống",
      "Cọ vẽ chi tiết",
      "Sách hướng dẫn tạo hình",
    ],
    secretItem: "Khuôn nặn con giống bí ẩn — mẫu ngẫu nhiên trong 6 con giống dân gian",
    tag: "Làng tò he Xuân La",
    ctaLabel: "Chọn Hộp Tò He",
  },
  {
    id: "chuon-chuon",
    icon: "🎋",
    name: "Bộ DIY Chuồn Chuồn Tre",
    village: "Làng Tre Thạch Xá — Hà Nội",
    subtitle: "Tô màu chuồn chuồn thăng bằng",
    description: "Tô màu chuồn chuồn tre thăng bằng kèm chân đế ngẫu nhiên.",
    image: "/products/chuon-chuon-tre.png",
    materials: [
      "Mô hình tre đẽo gọt thủ công",
      "Bộ màu vẽ Acrylic cao cấp",
      "Cọ vẽ chuyên dụng",
    ],
    secretItem: "Chân đế mây tre ngẫu nhiên — 1 trong 4 kiểu dáng thủ công độc bản",
    tag: "Làng tre Thạch Xá",
    ctaLabel: "Chọn Hộp Chuồn Chuồn",
  },
];

export const ProductCollection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<CraftItem | null>(null);

  return (
    <section id="products" className="py-14 sm:py-20 md:py-28 lg:py-32 bg-paper-ivory">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="inline-block font-sans text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-red/70 mb-4 sm:mb-5">
            Hộp Khám Phá Văn Hóa
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-brand-red mb-3 sm:mb-4 tracking-tight">
            Bộ Kit Trải Nghiệm DIY
          </h2>

          <p className="font-sans text-sm sm:text-base text-text-wood/55 max-w-md mx-auto font-light leading-relaxed">
            Chọn hộp bạn yêu thích — mỗi hộp ẩn chứa phụ kiện ngẫu nhiên.
          </p>
        </motion.div>

        {/* 3 Minimal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {collectionItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
            >
              <CraftCard item={item} onSelect={setSelectedItem} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product detail drawer */}
      <ProductDrawer item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export default ProductCollection;
