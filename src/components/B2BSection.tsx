"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImpactPillar {
  title: string;
  description: string;
  accent: string;
}

const pillars: ImpactPillar[] = [
  {
    title: "Bảo Tồn Di Sản",
    description:
      "Đóng góp trực tiếp vào quỹ bảo tồn các giá trị di sản văn hóa phi vật thể và làng nghề thủ công Việt Nam.",
    accent: "bg-brand-red/8 border-brand-red/15",
  },
  {
    title: "Sinh Kế Nghệ Nhân",
    description:
      "Tạo nguồn thu nhập ổn định và cải thiện chất lượng cuộc sống cho đội ngũ nghệ nhân làng nghề truyền thống.",
    accent: "bg-bamboo-green/8 border-bamboo-green/15",
  },
  {
    title: "Bao Bì Xanh",
    description:
      "Sử dụng 100% vật liệu giấy dó, tre nứa, lụa và bao bì tự nhiên phân hủy sinh học theo định hướng ESG.",
    accent: "bg-clay-terracotta/8 border-clay-terracotta/15",
  },
];

export const B2BSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.phone) {
      setSubmitted(true);
    }
  };

  return (
    <section id="b2b" className="py-14 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-paper-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20"
        >
          <span className="inline-block font-sans text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-red bg-brand-red/8 px-3 sm:px-4 py-1.5 rounded-full border border-brand-red/15 mb-4 sm:mb-5">
            Doanh Nghiệp & ESG
          </span>

          <motion.h2
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-brand-red mb-3 sm:mb-4 tracking-tight"
          >
            Giải Pháp Quà Tặng B2B
          </motion.h2>

          <p className="font-sans text-sm sm:text-base text-text-wood/65 font-light max-w-lg mx-auto leading-relaxed">
            Nâng tầm quà tặng đối tác bằng mô hình Hộp Khám Phá di sản cá nhân hóa.
          </p>
        </motion.div>

        {/* 3 Impact Pillars — stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              className={`rounded-xl sm:rounded-2xl p-5 sm:p-8 border text-center ${pillar.accent}`}
            >
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-red mb-2 sm:mb-3">
                {pillar.title}
              </h3>
              <p className="font-sans text-sm text-text-wood/75 leading-relaxed font-light">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* B2B Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl mx-auto bg-paper-warm rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-text-wood/10 shadow-lg"
        >
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-brand-red mb-1.5 sm:mb-2 text-center">
            Nhận Báo Giá B2B
          </h3>
          <p className="font-sans text-xs sm:text-sm text-text-wood/60 mb-6 sm:mb-8 font-light text-center">
            Điền thông tin để nhận catalogue và chính sách chiết khấu.
          </p>

          {submitted ? (
            <div className="bg-bamboo-green/10 border border-bamboo-green/25 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center space-y-3">
              <CheckCircle size={40} className="text-bamboo-green mx-auto" />
              <h4 className="font-serif text-lg sm:text-xl font-bold text-bamboo-green">
                Đã gửi thành công!
              </h4>
              <p className="font-sans text-xs sm:text-sm text-text-wood/70">
                Chạm Thức sẽ liên hệ tư vấn trong vòng 24 giờ.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-xs font-bold text-text-wood uppercase tracking-wider mb-1.5">
                  Tên Đơn Vị *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Trường THPT Chuyên..."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-paper-ivory border border-text-wood/15 rounded-xl px-4 h-12 text-base text-text-wood focus:outline-none focus:border-brand-red transition-colors font-sans"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-text-wood uppercase tracking-wider mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-paper-ivory border border-text-wood/15 rounded-xl px-4 h-12 text-base text-text-wood focus:outline-none focus:border-brand-red transition-colors font-sans"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-text-wood uppercase tracking-wider mb-1.5">
                  Số Điện Thoại *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0987 xxx xxx"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-paper-ivory border border-text-wood/15 rounded-xl px-4 h-12 text-base text-text-wood focus:outline-none focus:border-brand-red transition-colors font-sans"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full h-12 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-md mt-2"
              >
                <span>Gửi yêu cầu báo giá</span>
                <Send size={16} className="ml-2" />
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default B2BSection;
