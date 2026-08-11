"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CraftItem } from "@/types";
import { CraftCard } from "@/components/ui/CraftCard";
import { ProductModal } from "@/components/ProductModal";
import { CartDrawer, ProductKey } from "@/components/CartDrawer";
import { CloudPatternOverlay } from "@/components/CloudPatternOverlay";

const collectionItems: CraftItem[] = [
  {
    id: "non-la",
    icon: "",
    name: "Bộ DIY Nón Lá Mini",
    village: "Làng Nón Chuông — Hà Nội",
    subtitle: "Trang trí nón lá thủ công",
    description: "Bộ kit tự làm nón lá mini kèm quà tặng ngẫu nhiên.",
    image: "/products/non-chuong.jpg",
    gallery: ["/products/non-chuong.jpg", "/products/non-chuong.png"],
    price: 299000,
    materials: [
      "Frame nón lá mini thủ công",
      "Bộ màu vẽ Acrylic 6 màu",
      "2 cọ vẽ chuyên dụng",
      "Photocard Nghệ Nhân",
    ],
    secretItem: "Chi tiết trang trí ngẫu nhiên — mẫu màu tô đặc biệt hoặc phụ kiện độc bản",
    tag: "LÀNG NÓN CHUÔNG",
    ctaLabel: "CHỌN HỘP NÓN LÁ",
  },
  {
    id: "to-he",
    icon: "",
    name: "Bộ DIY Tò He Dân Gian",
    village: "Làng Tò He Xuân La — Hà Nội",
    subtitle: "Nặn tò he truyền thống",
    description: "Nặn tò he bằng bột màu tự nhiên kèm khuôn con giống bí ẩn.",
    image: "/products/to-he.jpg",
    gallery: ["/products/to-he.jpg", "/products/to-he.png"],
    price: 299000,
    materials: [
      "Bột màu tự nhiên dẻo mịn",
      "Que gỗ nặn truyền thống",
      "Cọ vẽ chi tiết",
      "Sách hướng dẫn tạo hình",
    ],
    secretItem: "Khuôn nặn con giống bí ẩn — mẫu ngẫu nhiên trong 6 con giống dân gian",
    tag: "LÀNG TÒ HE XUÂN LA",
    ctaLabel: "CHỌN HỘP TÒ HE",
  },
  {
    id: "chuon-chuon",
    icon: "",
    name: "Bộ DIY Chuồn Chuồn Tre",
    village: "Làng Tre Thạch Xá — Hà Nội",
    subtitle: "Tô màu chuồn chuồn thăng bằng",
    description: "Tô màu chuồn chuồn tre thăng bằng kèm chân đế ngẫu nhiên.",
    image: "/products/chuon-chuon-tre.jpg",
    gallery: ["/products/chuon-chuon-tre.jpg", "/products/chuon-chuon-tre.png"],
    price: 299000,
    materials: [
      "Mô hình tre đẽo gọt thủ công",
      "Bộ màu vẽ Acrylic cao cấp",
      "Cọ vẽ chuyên dụng",
    ],
    secretItem: "Chân đế mây tre ngẫu nhiên — 1 trong 4 kiểu dáng thủ công độc bản",
    tag: "LÀNG TRE THẠCH XÁ",
    ctaLabel: "CHỌN HỘP CHUỒN CHUỒN",
  },
];

export const ProductCollection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<CraftItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProductKey, setCartProductKey] = useState<ProductKey | undefined>(undefined);

  const handleOrder = (key: ProductKey) => {
    setCartProductKey(key);
    setCartOpen(true);
  };

  return (
    <section
      id="products"
      className="py-14 sm:py-20 md:py-28 lg:py-32 bg-[#F8F5F0] border-y border-[#9A1B1F]/10 relative z-10 overflow-hidden"
    >
      <CloudPatternOverlay variant="light" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="inline-block font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#9A1B1F] bg-[#9A1B1F]/8 px-4 py-1.5 rounded-full border border-[#9A1B1F]/15 mb-4 sm:mb-5">
            HỘP KHÁM PHÁ VĂN HÓA
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#9A1B1F] mb-3 sm:mb-4 tracking-tight">
            Bộ Kit Trải Nghiệm DIY
          </h2>

          {/* Section Divider */}
          <div className="flex items-center justify-center gap-4 my-6 opacity-30">
            <div className="h-[1px] w-16 bg-[#9A1B1F]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/patterns/cl3.png" alt="" className="w-6 h-6 object-contain" />
            <div className="h-[1px] w-16 bg-[#9A1B1F]" />
          </div>

          <p className="font-sans text-sm sm:text-base text-[#3A2618]/65 max-w-md mx-auto font-light leading-relaxed">
            Chọn hộp bạn yêu thích — mỗi hộp ẩn chứa phụ kiện ngẫu nhiên.
          </p>
        </motion.div>

        {/* 3 Editorial Lookbook Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 items-stretch">
          {collectionItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              className="h-full"
            >
              <CraftCard item={item} onSelect={setSelectedItem} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product detail modal */}
      <ProductModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onOrder={handleOrder}
      />

      {/* Cart & COD Order Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        initialProductKey={cartProductKey}
      />
    </section>
  );
};

export default ProductCollection;
