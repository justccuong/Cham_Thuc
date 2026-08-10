"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, CheckCircle2, Plus, Minus, Truck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductKey?: ProductKey;
}

export type ProductKey = "non-la" | "to-he" | "chuon-chuon";

const products: Record<ProductKey, { label: string; price: number }> = {
  "non-la": { label: "Hộp DIY Nón Lá Mini", price: 299000 },
  "to-he": { label: "Hộp DIY Tò He Dân Gian", price: 299000 },
  "chuon-chuon": { label: "Hộp DIY Chuồn Chuồn Tre", price: 299000 },
};

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  initialProductKey = "non-la",
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductKey>(initialProductKey);
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  // Validation Errors State
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; address?: string }>({});

  const totalPrice = products[selectedProduct].price * quantity;

  // Handle phone input change (only digits, max 10)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  // Handle full name change (max 50)
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 50);
    setFullName(val);
    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
  };

  // Handle address change (max 150)
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 150);
    setAddress(val);
    if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: { fullName?: string; phone?: string; address?: string } = {};

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      newErrors.fullName = "Vui lòng nhập họ và tên nhận hàng.";
    } else if (trimmedName.length < 2) {
      newErrors.fullName = "Họ và tên phải có ít nhất 2 ký tự.";
    }

    const phoneRegex = /^0(3|5|7|8|9)\d{8}$/;
    if (!phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại nhận hàng.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09).";
    }

    const trimmedAddress = address.trim();
    if (!trimmedAddress) {
      newErrors.address = "Vui lòng nhập địa chỉ nhận hàng.";
    } else if (trimmedAddress.length < 10) {
      newErrors.address = "Địa chỉ quá ngắn (vui lòng nhập rõ số nhà, tên đường, phường/xã, quận/huyện).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep("success");
    }
  };

  const resetDrawer = () => {
    setStep("cart");
    setFullName("");
    setPhone("");
    setAddress("");
    setNote("");
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="cart-drawer-wrapper" className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetDrawer}
            className="absolute inset-0 bg-text-wood/60 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            key="cart-sheet"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full sm:max-w-md h-full bg-paper-ivory shadow-2xl flex flex-col border-l border-text-wood/10 text-text-wood z-10"
          >
            {/* Header */}
            <div className="h-14 px-4 sm:px-6 border-b border-text-wood/10 flex items-center justify-between bg-paper-warm flex-shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-brand-red" size={18} />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-red">
                  {step === "cart" && "Giỏ Hàng & Chọn Hộp"}
                  {step === "checkout" && "Thông Tin Đặt Hàng COD"}
                  {step === "success" && "Đặt Hàng Thành Công"}
                </h3>
              </div>
              <button
                onClick={resetDrawer}
                className="w-11 h-11 flex items-center justify-center text-text-wood/60 hover:text-brand-red transition-colors rounded-full hover:bg-black/5"
              >
                <X size={20} />
              </button>
            </div>

            {/* STEP 1: CART SELECTOR */}
            {step === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Product selector */}
                  <div>
                    <label className="block text-xs font-bold text-text-wood uppercase tracking-wider mb-2 sm:mb-3">
                      Chọn Hộp Trải Nghiệm:
                    </label>
                    <div className="space-y-2">
                      {(Object.keys(products) as ProductKey[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => setSelectedProduct(key)}
                          className={`w-full h-12 px-4 rounded-xl border text-sm flex items-center justify-between transition-all ${
                            selectedProduct === key
                              ? "bg-white border-brand-red shadow-sm text-brand-red font-bold"
                              : "bg-paper-warm border-text-wood/10 hover:border-text-wood/30 text-text-wood"
                          }`}
                        >
                          <span>{products[key].label}</span>
                          <span className="font-serif font-bold text-brand-red">
                            {products[key].price.toLocaleString("vi-VN")}đ
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-text-wood/10 shadow-sm space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-brand-red mb-1">
                        {products[selectedProduct].label}
                      </h4>
                      <p className="text-xs text-clay-terracotta font-semibold">
                        Tặng kèm: Phụ kiện ngẫu nhiên + Photocard nghệ nhân
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-text-wood/10">
                      <span className="text-xs font-semibold text-text-wood/80">Số lượng:</span>
                      <div className="flex items-center gap-2 bg-paper-warm rounded-lg border border-text-wood/10">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center text-text-wood/70 hover:text-brand-red"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-serif font-bold text-base w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(99, quantity + 1))}
                          className="w-10 h-10 flex items-center justify-center text-text-wood/70 hover:text-brand-red"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* COD Note & Promo */}
                  <div className="bg-brand-red/5 border border-brand-red/15 rounded-xl p-3 text-xs text-brand-red flex items-center gap-2">
                    <Truck size={16} className="flex-shrink-0" />
                    <span>Thanh toán COD khi nhận hàng — Kiểm tra hàng thoải mái!</span>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="p-4 sm:p-6 border-t border-text-wood/10 bg-paper-warm space-y-3 sm:space-y-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-semibold text-text-wood/80">Tổng tiền:</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-brand-red">
                      {totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setStep("checkout")}
                    className="w-full h-12 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Tiếp Tục Đặt Hàng COD</span>
                  </Button>
                </div>
              </>
            )}

            {/* STEP 2: CHECKOUT COD FORM WITH STRICT VALIDATION */}
            {step === "checkout" && (
              <form onSubmit={handleOrderSubmit} className="flex-1 flex flex-col justify-between">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  {/* Order item recap */}
                  <div className="bg-paper-warm rounded-xl p-3 border border-text-wood/10 text-xs flex justify-between items-center">
                    <div>
                      <p className="font-serif font-bold text-brand-red">{products[selectedProduct].label}</p>
                      <p className="text-text-wood/60">Số lượng: {quantity}</p>
                    </div>
                    <span className="font-serif font-bold text-sm text-brand-red">
                      {totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>

                  {/* Input 1: Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-text-wood uppercase tracking-wider mb-1">
                      Họ và tên nhận hàng * <span className="text-text-wood/40 font-normal">({fullName.length}/50)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={50}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={fullName}
                      onChange={handleFullNameChange}
                      className={`w-full bg-white border ${
                        errors.fullName ? "border-red-500 bg-red-50/30" : "border-text-wood/15"
                      } rounded-xl px-4 h-11 text-sm text-text-wood focus:outline-none focus:border-brand-red transition-colors`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Input 2: Phone (Only digits, max 10) */}
                  <div>
                    <label className="block text-xs font-bold text-text-wood uppercase tracking-wider mb-1">
                      Số điện thoại * <span className="text-text-wood/40 font-normal">({phone.length}/10)</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="0987123456"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`w-full bg-white border ${
                        errors.phone ? "border-red-500 bg-red-50/30" : "border-text-wood/15"
                      } rounded-xl px-4 h-11 text-sm text-text-wood focus:outline-none focus:border-brand-red transition-colors`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Input 3: Delivery Address */}
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
                      } rounded-xl px-4 h-11 text-sm text-text-wood focus:outline-none focus:border-brand-red transition-colors`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Input 4: Note (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-text-wood uppercase tracking-wider mb-1">
                      Ghi chú đơn hàng <span className="text-text-wood/40 font-normal">(Tùy chọn, {note.length}/200)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={200}
                      placeholder="Giao giờ hành chính, gọi trước khi giao..."
                      value={note}
                      onChange={(e) => setNote(e.target.value.slice(0, 200))}
                      className="w-full bg-white border border-text-wood/15 rounded-xl px-4 h-11 text-sm text-text-wood focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>

                  {/* COD Payment Badge */}
                  <div className="bg-bamboo-green/10 border border-bamboo-green/20 rounded-xl p-3 text-xs text-bamboo-green flex items-center gap-2">
                    <Truck size={16} className="flex-shrink-0" />
                    <span>Hình thức: Ship COD (Thanh toán tiền mặt khi nhận hàng)</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 sm:p-6 border-t border-text-wood/10 bg-paper-warm space-y-2 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full h-12 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-lg"
                  >
                    Xác Nhận Đặt Hàng COD ({totalPrice.toLocaleString("vi-VN")}đ)
                  </Button>
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    className="w-full h-10 text-xs font-semibold text-text-wood/70 hover:text-brand-red transition-colors"
                  >
                    ← Quay lại giỏ hàng
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: ORDER SUCCESS CONFIRMATION */}
            {step === "success" && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-bamboo-green/10 border border-bamboo-green/20 flex items-center justify-center text-bamboo-green mb-2">
                  <CheckCircle2 size={36} />
                </div>

                <h4 className="font-serif text-2xl font-bold text-brand-red">
                  Đặt Hàng Thành Công!
                </h4>

                <p className="font-sans text-sm text-text-wood/75 leading-relaxed max-w-xs">
                  Cảm ơn bạn <strong className="font-semibold text-brand-red">{fullName}</strong> đã đồng hành cùng <strong className="font-semibold text-brand-red">Chạm Thức</strong>.
                </p>

                <div className="w-full bg-paper-warm rounded-2xl p-4 border border-text-wood/10 text-xs text-left space-y-2">
                  <div className="flex justify-between border-b border-text-wood/10 pb-2">
                    <span className="text-text-wood/60">Sản phẩm:</span>
                    <span className="font-bold text-brand-red">{products[selectedProduct].label} x {quantity}</span>
                  </div>
                  <div className="flex justify-between border-b border-text-wood/10 pb-2">
                    <span className="text-text-wood/60">Tổng tiền COD:</span>
                    <span className="font-bold text-brand-red">{totalPrice.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className="flex justify-between border-b border-text-wood/10 pb-2">
                    <span className="text-text-wood/60">Số điện thoại:</span>
                    <span className="font-semibold text-text-wood">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-wood/60">Địa chỉ giao:</span>
                    <span className="font-semibold text-text-wood text-right max-w-[180px]">{address}</span>
                  </div>
                </div>

                <p className="text-xs text-bamboo-green italic font-medium">
                  Đội ngũ Chạm Thức sẽ gọi điện xác nhận đơn hàng trước khi giao!
                </p>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={resetDrawer}
                  className="w-full h-12 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-md mt-4"
                >
                  Hoàn Tất
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
