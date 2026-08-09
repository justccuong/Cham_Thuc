"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CraftItem } from "@/types";
import { CraftCard } from "@/components/ui/CraftCard";
import { DetailModal } from "@/components/ui/DetailModal";

const collectionItems: CraftItem[] = [
  {
    id: "1",
    icon: "👒",
    name: "Bộ DIY Nón Lá Mini",
    village: "Làng Nón Chuông — Hà Nội",
    subtitle: "Trang trí nón lá thủ công",
    description:
      "Hộp trải nghiệm làm nón lá mini handmade từ nghệ nhân làng Chuông. Gồm khung nan tre, lá nón thật, cọ và bộ màu acrylic cao cấp.",
    image: "/products/non-chuong.jpg",
    materials: ["Nón lá mini thủ công", "Bộ màu Acrylic 6 màu", "2 cọ vẽ chuyên dụng", "Photocard Nghệ Nhân"],
    tag: "Làng Nón Chuông",
  },
  {
    id: "2",
    icon: "🎎",
    name: "Bộ DIY Tò He Dân Gian",
    village: "Làng Tò He Xuân La — Hà Nội",
    subtitle: "Nặn tò he truyền thống",
    description:
      "Hộp tò he Xuân La mang lại ký ức tuổi thơ với thỏi bột màu tự nhiên dẻo mịn, que gỗ thủ công và catalog tạo hình con giống.",
    image: "/products/to-he.jpg",
    materials: ["6 thỏi bột gạo màu tự nhiên", "Bộ que gỗ nặn tò he", "Dầu dừa dưỡng bột", "Mã QR Video nghệ nhân"],
    tag: "Làng Tò He Xuân La",
  },
  {
    id: "3",
    icon: "🖼️",
    name: "Bộ DIY Tranh Đông Hồ",
    village: "Làng Tranh Đông Hồ — Bắc Ninh",
    subtitle: "In mộc bản giấy dó",
    description:
      "Tự tay in tranh dân gian Đông Hồ bằng khuôn dấu gỗ khắc tay tỉ mỉ và mực in truyền thống trên giấy dó điệp.",
    image: "/products/tranh-dong-ho.jpg",
    materials: ["3 tờ giấy dó điệp chuẩn", "Mộc bản in gỗ thủ công", "Mực in tranh truyền thống", "Con lăn mực & chổi quét"],
    tag: "Làng Tranh Đông Hồ",
  },
  {
    id: "4",
    icon: "🧵",
    name: "Bộ DIY Khăn Lụa Thêu",
    village: "Làng Lụa Vạn Phúc — Hà Đông",
    subtitle: "Thêu lụa tơ tằm thủ công",
    description:
      "Trải nghiệm thêu nghệ thuật trên lụa tơ tằm Vạn Phúc cao cấp. Gồm khăn lụa trơn, kim chỉ thêu các màu và khung thêu gỗ.",
    image: "/products/lua-van-phuc.jpg",
    materials: ["Khăn lụa tơ tằm 40×40cm", "Khung thêu gỗ tròn", "Bộ chỉ thêu 8 màu", "Mẫu in chuyển mực"],
    tag: "Làng Lụa Vạn Phúc",
  },
  {
    id: "5",
    icon: "🎋",
    name: "Bộ DIY Chuồn Chuồn Tre",
    village: "Làng Tre Thạch Xá — Hà Nội",
    subtitle: "Tô màu chuồn chuồn thăng bằng",
    description:
      "Mô hình chuồn chuồn tre tự thăng bằng độc đáo của làng Thạch Xá. Kèm bộ màu vẽ sắc màu giúp bạn thỏa sức sáng tạo.",
    image: "/products/chuon-chuon-tre.jpg",
    materials: ["2 chuồn chuồn tre thăng bằng", "Chân đế tre gác mỏ", "Bộ màu Acrylic cao cấp", "Bảng pha màu mini"],
    tag: "Làng Tre Thạch Xá",
  },
];

export const BlindBoxGrid: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<CraftItem | null>(null);

  return (
    <section id="products" className="py-14 sm:py-20 md:py-28 lg:py-32 bg-paper-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Section header — with mobile padding */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-brand-red/8 text-brand-red text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-5 border border-brand-red/15"
          >
            <Sparkles size={14} />
            <span>Bộ Sưu Tập #1</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-brand-red mb-3 sm:mb-4 tracking-tight"
          >
            Hương Sắc Giao Thời
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-text-wood/65 max-w-md mx-auto font-light leading-relaxed"
          >
            5 hộp quà ngẫu nhiên từ các làng nghề truyền thống danh tiếng.
          </motion.p>
        </div>

        {/* MOBILE: Horizontal swipe carousel */}
        <div className="sm:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 px-4 pb-4">
            {collectionItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
              >
                <CraftCard item={item} onSelect={setSelectedItem} />
              </motion.div>
            ))}
          </div>
          {/* Swipe hint */}
          <p className="text-center text-[11px] text-text-wood/40 mt-2 font-sans">
            ← Vuốt để xem thêm →
          </p>
        </div>

        {/* TABLET & DESKTOP: Flex-wrap centered layout */}
        <div className="hidden sm:flex sm:flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8">
          {collectionItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
              className="w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.75rem)]"
            >
              <CraftCard item={item} onSelect={setSelectedItem} />
            </motion.div>
          ))}
        </div>
      </div>

      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export default BlindBoxGrid;
