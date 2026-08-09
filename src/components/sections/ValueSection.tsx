"use client";

import React from "react";
import { motion } from "framer-motion";
import { ValueItem } from "@/types";

const values: ValueItem[] = [
  {
    id: "1",
    icon: "🌱",
    title: "Bảo Tồn Bản Sắc",
    description: "Kết nối thế hệ trẻ với tinh hoa làng nghề thông qua trải nghiệm DIY gần gũi."
  },
  {
    id: "2",
    icon: "♻️",
    title: "Kinh Tế Tuần Hoàn",
    description: "Sử dụng vật liệu tự nhiên (tre, lụa, giấy dó) thân thiện tuyệt đối với môi trường."
  },
  {
    id: "3",
    icon: "🤝",
    title: "Sinh Kế Nghệ Nhân",
    description: "Trực tiếp hỗ trợ đầu ra và tạo nguồn thu nhập bền vững cho các làng nghề Việt."
  },
  {
    id: "4",
    icon: "🎁",
    title: "Trải Nghiệm Đột Phá",
    description: "Mô hình hộp quà bí ẩn (Blind Box) tăng tính sưu tầm và tạo niềm vui khám phá."
  }
];

export const ValueSection: React.FC = () => {
  return (
    <section id="values" className="py-24 px-6 bg-[#9A1B1F] text-[#F8F5F0]">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-xs font-bold tracking-widest text-[#F8F5F0]/70 uppercase mb-2 block font-sans">
          Core Values & ESG
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal mb-16 text-[#F8F5F0]">
          Giá Trị Cốt Lõi Dự Án
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, idx) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#6E1215]/80 border border-[#F8F5F0]/10 rounded-2xl p-6 text-center shadow-lg hover:border-[#F8F5F0]/30 transition-all"
            >
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-serif text-xl font-bold mb-2 text-[#F8F5F0]">
                {v.title}
              </h3>
              <p className="text-xs text-[#F8F5F0]/80 leading-relaxed font-light">
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
