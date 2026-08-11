"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CloudPatternOverlay } from "@/components/CloudPatternOverlay";

interface ImpactPillar {
  title: string;
  description: string;
}

const pillars: ImpactPillar[] = [
  {
    title: "Bảo Tồn Di Sản",
    description:
      "Đóng góp trực tiếp vào quỹ bảo tồn các giá trị di sản văn hóa phi vật thể và làng nghề thủ công Việt Nam.",
  },
  {
    title: "Sinh Kế Nghệ Nhân",
    description:
      "Tạo nguồn thu nhập ổn định và cải thiện chất lượng cuộc sống cho đội ngũ nghệ nhân làng nghề truyền thống.",
  },
  {
    title: "Bao Bì Xanh",
    description:
      "Sử dụng 100% vật liệu tre nứa và bao bì tự nhiên phân hủy sinh học theo định hướng ESG.",
  },
];

export const B2BSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: val });
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 80);
    setForm({ ...form, name: val });
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 80);
    setForm({ ...form, email: val });
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const validateB2BForm = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập tên đơn vị / tổ chức.";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Tên đơn vị quá ngắn (tối thiểu 3 ký tự).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ email liên hệ.";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Địa chỉ email không đúng định dạng (ví dụ: contact@company.com).";
    }

    const phoneRegex = /^0(3|5|7|8|9)\d{8}$/;
    if (!form.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại liên hệ.";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateB2BForm()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="b2b" className="py-14 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#F8F5F0] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
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
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-red mb-3 sm:mb-4 tracking-tight"
          >
            Giải Pháp Quà Tặng B2B
          </motion.h2>

          <p className="font-sans text-sm sm:text-base text-text-wood/65 font-light max-w-lg mx-auto leading-relaxed">
            Nâng tầm quà tặng đối tác bằng mô hình Hộp Khám Phá di sản cá nhân hóa.
          </p>
        </motion.div>

        {/* 3 Impact Pillars with red left-border accent & warm depth */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              className="bg-[#EFE9DE] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#9A1B1F]/15 border-l-4 border-l-[#9A1B1F] shadow-[0_10px_25px_-5px_rgba(58,38,24,0.08)] text-left hover:shadow-[0_15px_30px_-5px_rgba(58,38,24,0.14)] transition-all duration-300"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-red mb-2 sm:mb-3">
                {pillar.title}
              </h3>
              <p className="font-sans text-sm text-text-wood/75 leading-relaxed font-normal">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* B2B Form with depth polish */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl mx-auto bg-[#EFE9DE] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-[#9A1B1F]/20 shadow-[0_15px_35px_-5px_rgba(58,38,24,0.12)]"
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
                  Tên Đơn Vị * <span className="text-text-wood/40 font-normal">({form.name.length}/80)</span>
                </label>
                <input
                  type="text"
                  maxLength={80}
                  placeholder="Ví dụ: Trường THPT Chuyên Tuyên Quang..."
                  value={form.name}
                  onChange={handleNameChange}
                  className={`w-full bg-paper-ivory border ${
                    errors.name ? "border-red-500 bg-red-50/30" : "border-text-wood/15"
                  } rounded-xl px-4 h-12 text-base text-text-wood focus:outline-none focus:border-brand-red transition-colors font-sans`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-text-wood uppercase tracking-wider mb-1.5">
                  Email * <span className="text-text-wood/40 font-normal">({form.email.length}/80)</span>
                </label>
                <input
                  type="email"
                  maxLength={80}
                  placeholder="contact@company.com"
                  value={form.email}
                  onChange={handleEmailChange}
                  className={`w-full bg-paper-ivory border ${
                    errors.email ? "border-red-500 bg-red-50/30" : "border-text-wood/15"
                  } rounded-xl px-4 h-12 text-base text-text-wood focus:outline-none focus:border-brand-red transition-colors font-sans`}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-text-wood uppercase tracking-wider mb-1.5">
                  Số Điện Thoại * <span className="text-text-wood/40 font-normal">({form.phone.length}/10)</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="0987123456"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  className={`w-full bg-paper-ivory border ${
                    errors.phone ? "border-red-500 bg-red-50/30" : "border-text-wood/15"
                  } rounded-xl px-4 h-12 text-base text-text-wood focus:outline-none focus:border-brand-red transition-colors font-sans`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.phone}
                  </p>
                )}
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
