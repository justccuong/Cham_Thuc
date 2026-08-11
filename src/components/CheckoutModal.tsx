"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export type PaymentMethodType = "Chuyển khoản VietQR" | "Thanh toán khi nhận hàng (COD)";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  productName,
  productPrice,
}) => {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [submitting, setSubmitting] = useState(false);
  const [orderCode, setOrderCode] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(
    "Chuyển khoản VietQR"
  );

  // Validation Errors
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    address?: string;
    general?: string;
  }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 50);
    setName(val);
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 150);
    setAddress(val);
    if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
  };

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; address?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên nhận hàng.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Họ và tên quá ngắn (tối thiểu 2 ký tự).";
    }

    const phoneRegex = /^0(3|5|7|8|9)\d{8}$/;
    if (!phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại nhận hàng.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09).";
    }

    if (!address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ giao hàng chi tiết.";
    } else if (address.trim().length < 5) {
      newErrors.address = "Địa chỉ giao hàng quá ngắn (tối thiểu 5 ký tự).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          productName,
          price: productPrice,
          paymentMethod,
          notes,
        }),
      });

      const data = await res.json();

      if (data.success && data.orderCode) {
        setOrderCode(data.orderCode);
        setStep("success");
      } else {
        setErrors({
          general: data.error || "Đặt hàng không thành công. Vui lòng thử lại.",
        });
      }
    } catch {
      setErrors({
        general: "Không thể kết nối đến hệ thống. Vui lòng kiểm tra lại mạng.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep("form");
    setName("");
    setPhone("");
    setAddress("");
    setNotes("");
    setOrderCode("");
    setErrors({});
    onClose();
  };

  if (!mounted) return null;

  const formattedPrice = new Intl.NumberFormat("vi-VN").format(productPrice);

  const bankId = process.env.NEXT_PUBLIC_BANK_ID || "TPB";
  const bankAccountNo = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NO || "0000000000";
  const bankAccountName = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || "";
  const fbPageUsername = process.env.NEXT_PUBLIC_FB_PAGE_USERNAME || "";

  const vietQrUrl = `https://img.vietqr.io/image/${bankId}-${bankAccountNo}-compact2.png?amount=${productPrice}&addInfo=${orderCode}&accountName=${encodeURIComponent(
    bankAccountName
  )}`;

  const messengerUrl = `https://m.me/${fbPageUsername}?text=T%C3%B4i%20x%C3%A1c%20nh%E1%BA%ADn%20%C4%91%C6%A1n%20h%C3%A0ng%20m%C3%A3%20${orderCode}`;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          key="checkout-modal-wrapper"
          className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            key="checkout-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            key="checkout-sheet"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-lg max-h-[90vh] my-auto bg-paper-ivory shadow-2xl flex flex-col rounded-3xl border border-text-wood/10 text-text-wood z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="h-16 px-6 border-b border-text-wood/10 flex items-center justify-between bg-paper-warm flex-shrink-0">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-red">
                {step === "form" ? "Thông Tin Đặt Hàng" : "Đặt Hàng Thành Công"}
              </h3>
              <button
                onClick={handleReset}
                className="w-10 h-10 flex items-center justify-center text-text-wood/60 hover:text-brand-red transition-colors rounded-full hover:bg-black/5 cursor-pointer"
                aria-label="Đóng"
              >
                <X size={20} />
              </button>
            </div>

            {/* VIEW 1: INPUT FORM */}
            {step === "form" && (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4">
                  {/* Product Info Banner */}
                  <div className="bg-paper-warm rounded-2xl p-4 border border-text-wood/10 flex justify-between items-center text-sm">
                    <div>
                      <span className="text-xs font-bold text-text-wood/60 block uppercase tracking-wider">Sản phẩm:</span>
                      <h4 className="font-serif font-bold text-brand-red text-base">{productName}</h4>
                    </div>
                    <span className="font-price font-extrabold text-lg text-brand-red">
                      {formattedPrice} đ
                    </span>
                  </div>

                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle size={16} className="flex-shrink-0" />
                      <span>{errors.general}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-text-wood uppercase tracking-wider mb-1">
                      Họ và tên nhận hàng * <span className="text-text-wood/40 font-normal">({name.length}/50)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={50}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={name}
                      onChange={handleNameChange}
                      className={`w-full bg-white border ${
                        errors.name ? "border-red-500 bg-red-50/30" : "border-text-wood/15"
                      } rounded-xl px-4 h-12 text-sm text-text-wood focus:outline-none focus:border-brand-red transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-text-wood uppercase tracking-wider mb-1">
                      Số điện thoại nhận hàng * <span className="text-text-wood/40 font-normal">({phone.length}/10)</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="0987123456"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`w-full bg-white border ${
                        errors.phone ? "border-red-500 bg-red-50/30" : "border-text-wood/15"
                      } rounded-xl px-4 h-12 text-sm text-text-wood focus:outline-none focus:border-brand-red transition-colors`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <label className="block text-xs font-bold text-text-wood uppercase tracking-wider mb-1">
                      Địa chỉ giao hàng chi tiết * <span className="text-text-wood/40 font-normal">({address.length}/150)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={150}
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                      value={address}
                      onChange={handleAddressChange}
                      className={`w-full bg-white border ${
                        errors.address ? "border-red-500 bg-red-50/30" : "border-text-wood/15"
                      } rounded-xl px-4 h-12 text-sm text-text-wood focus:outline-none focus:border-brand-red transition-colors`}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-text-wood uppercase tracking-wider mb-1">
                      Ghi chú đơn hàng <span className="text-text-wood/40 font-normal">(Tùy chọn, {notes.length}/200)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={200}
                      placeholder="Giao giờ hành chính, gọi trước khi giao..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value.slice(0, 200))}
                      className="w-full bg-white border border-text-wood/15 rounded-xl px-4 h-12 text-sm text-text-wood focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>

                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-xs font-bold text-text-wood uppercase tracking-wider mb-2">
                      Phương thức thanh toán:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Chuyển khoản VietQR")}
                        className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                          paymentMethod === "Chuyển khoản VietQR"
                            ? "bg-white border-brand-red text-brand-red shadow-sm ring-2 ring-brand-red/20"
                            : "bg-paper-warm border-text-wood/15 text-text-wood/80 hover:border-text-wood/30"
                        }`}
                      >
                        <span className="block font-serif text-sm font-bold mb-1">Chuyển khoản VietQR</span>
                        <span className="text-[11px] font-normal text-text-wood/60">Quét mã QR thanh toán nhanh</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Thanh toán khi nhận hàng (COD)")}
                        className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                          paymentMethod === "Thanh toán khi nhận hàng (COD)"
                            ? "bg-white border-brand-red text-brand-red shadow-sm ring-2 ring-brand-red/20"
                            : "bg-paper-warm border-text-wood/15 text-text-wood/80 hover:border-text-wood/30"
                        }`}
                      >
                        <span className="block font-serif text-sm font-bold mb-1">Thanh toán COD</span>
                        <span className="text-[11px] font-normal text-text-wood/60">Trả tiền mặt khi nhận hàng</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="p-5 sm:p-7 border-t border-text-wood/10 bg-paper-warm">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={submitting}
                    className="w-full h-13 sm:h-14 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-lg rounded-2xl text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>ĐANG XỬ LÝ...</span>
                      </>
                    ) : (
                      <span>XÁC NHẬN ĐẶT HÀNG</span>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* VIEW 2: ORDER SUCCESS VIEW */}
            {step === "success" && (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-bamboo-green/10 border border-bamboo-green/20 flex items-center justify-center text-bamboo-green mb-1">
                  <CheckCircle2 size={36} />
                </div>

                <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-red">
                  ĐẶT HÀNG THÀNH CÔNG
                </h4>

                <div className="bg-brand-red/8 px-4 py-2 rounded-xl border border-brand-red/15">
                  <p className="font-price font-extrabold text-base sm:text-lg text-brand-red tracking-wider">
                    MÃ ĐƠN HÀNG: {orderCode}
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-text-wood/80 max-w-sm leading-relaxed">
                  Cảm ơn quý khách <strong className="font-bold text-brand-red">{name}</strong> đã đặt mua <strong className="font-bold text-brand-red">{productName}</strong>.
                </p>

                {/* VietQR Image & Transfer Details */}
                {paymentMethod === "Chuyển khoản VietQR" && (
                  <div className="w-full bg-white rounded-2xl p-4 border border-text-wood/12 shadow-sm space-y-3">
                    <p className="font-sans text-xs font-bold uppercase tracking-wider text-brand-red">
                      Quét mã VietQR để thanh toán:
                    </p>
                    <div className="relative w-48 h-48 mx-auto rounded-xl overflow-hidden border border-text-wood/10 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={vietQrUrl}
                        alt={`Mã VietQR đơn hàng ${orderCode}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-xs text-text-wood/80 space-y-1 text-left bg-paper-warm p-3 rounded-xl border border-text-wood/10">
                      <div className="flex justify-between">
                        <span className="text-text-wood/60">Số tiền:</span>
                        <span className="font-price font-bold text-brand-red">{formattedPrice} đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-wood/60">Nội dung chuyển khoản:</span>
                        <span className="font-price font-bold text-brand-red">{orderCode}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Messenger CTA Button */}
                <div className="w-full pt-2">
                  <a
                    href={messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-13 bg-[#0084FF] hover:bg-[#0073E6] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg flex items-center justify-center transition-all cursor-pointer uppercase tracking-wider"
                  >
                    XÁC NHẬN ĐƠN HÀNG QUA MESSENGER
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CheckoutModal;
