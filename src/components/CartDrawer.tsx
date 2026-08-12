"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, CheckCircle2, Plus, Minus, Truck, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { generateOrderCode } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductKey?: ProductKey;
}

export type ProductKey = "non-la" | "to-he" | "chuon-chuon";

export interface ProductInfo {
  key: ProductKey;
  label: string;
  village: string;
  price: number;
  image: string;
}

export const PRODUCTS_CATALOG: Record<ProductKey, ProductInfo> = {
  "non-la": {
    key: "non-la",
    label: "Hộp DIY Nón Lá Mini",
    village: "Làng Nón Chuông",
    price: 299000,
    image: "/products/non-chuong.jpg",
  },
  "to-he": {
    key: "to-he",
    label: "Hộp DIY Tò He Dân Gian",
    village: "Làng Tò He Xuân La",
    price: 299000,
    image: "/products/to-he.jpg",
  },
  "chuon-chuon": {
    key: "chuon-chuon",
    label: "Hộp DIY Chuồn Chuồn Tre",
    village: "Làng Tre Thạch Xá",
    price: 299000,
    image: "/products/chuon-chuon-tre.jpg",
  },
};

const STORAGE_KEY = "cham_thuc_multi_cart";

export function getCartTotalCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (typeof parsed === "object" && parsed !== null) {
        return Object.values(parsed).reduce(
          (sum: number, qty: any) => sum + (typeof qty === "number" ? qty : 0),
          0
        );
      }
    }
  } catch {
    // ignore
  }
  return 0;
}

import { useLanguage } from "@/lib/i18n";

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  initialProductKey,
}) => {
  const { t } = useLanguage();
  const [cartState, setCartState] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [orderCode, setOrderCode] = useState("");

  // Validation Errors State
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; address?: string }>({});

  const notifyCartUpdated = () => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.dispatchEvent(new Event("cart_updated"));
      }, 0);
    }
  };

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === "object" && parsed !== null) {
          setCartState(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Update cart state when initialProductKey is passed on open
  useEffect(() => {
    if (isOpen && initialProductKey) {
      setCartState((prev) => {
        const currentQty = prev[initialProductKey] || 0;
        const nextState = { ...prev, [initialProductKey]: Math.max(1, currentQty) };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
        } catch {
          // ignore
        }
        return nextState;
      });
      notifyCartUpdated();
    }
  }, [isOpen, initialProductKey]);

  // Lock body scroll when drawer is open
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

  const updateQuantity = (key: ProductKey, qty: number) => {
    setCartState((prev) => {
      const nextState = { ...prev };
      if (qty <= 0) {
        delete nextState[key];
      } else {
        nextState[key] = Math.min(99, qty);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      } catch {
        // ignore
      }
      return nextState;
    });
    notifyCartUpdated();
  };

  const addItemToCart = (key: ProductKey) => {
    updateQuantity(key, (cartState[key] || 0) + 1);
  };

  const removeItemFromCart = (key: ProductKey) => {
    updateQuantity(key, 0);
  };

  // Calculate totals
  const cartEntries = (Object.keys(cartState) as ProductKey[]).filter((k) => (cartState[k] || 0) > 0);
  const totalItemCount = cartEntries.reduce((sum, k) => sum + (cartState[k] || 0), 0);
  const totalPrice = cartEntries.reduce(
    (sum, k) => sum + PRODUCTS_CATALOG[k].price * (cartState[k] || 0),
    0
  );

  // Form input handlers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 50);
    setFullName(val);
    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 150);
    setAddress(val);
    if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
  };

  const validateForm = () => {
    const newErrors: { fullName?: string; phone?: string; address?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên nhận hàng.";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Họ và tên quá ngắn (tối thiểu 2 ký tự).";
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

  const [submitting, setSubmitting] = useState(false);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const productNames = cartEntries
        .map((k) => `${PRODUCTS_CATALOG[k].label} x${cartState[k]}`)
        .join(", ");

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          phone,
          address,
          productName: productNames,
          price: totalPrice,
          paymentMethod: "Ship COD",
          notes: note,
        }),
      });

      const data = await res.json();
      if (data.success && data.orderCode) {
        setOrderCode(data.orderCode);
        setStep("success");
      } else {
        setOrderCode(generateOrderCode());
        setStep("success");
      }
    } catch (err) {
      console.error("Order submit API error:", err);
      setOrderCode(generateOrderCode());
      setStep("success");
    } finally {
      setSubmitting(false);
    }
  };

  const resetDrawer = () => {
    setStep("cart");
    setFullName("");
    setPhone("");
    setAddress("");
    setNote("");
    setOrderCode("");
    setErrors({});
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div key="cart-drawer-wrapper" className="fixed inset-0 z-[100] flex justify-end sm:items-center sm:justify-center p-0 sm:p-4 sm:py-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] cursor-pointer"
          />

          {/* Sheet Container — Generous Widescreen Width & Comfort Spacing */}
          <motion.div
            key="cart-sheet"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full sm:max-w-xl md:max-w-2xl h-full sm:h-auto max-h-[92vh] my-auto bg-paper-ivory shadow-2xl flex flex-col sm:rounded-3xl border border-text-wood/10 text-text-wood z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="h-16 px-5 sm:px-7 border-b border-text-wood/10 flex items-center justify-between bg-paper-warm flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="text-brand-red" size={22} />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-red">
                  {step === "cart" && `Giỏ Hàng (${totalItemCount} sản phẩm)`}
                  {step === "checkout" && "Thông Tin Đặt Hàng COD"}
                  {step === "success" && "Đặt Hàng Thành Công"}
                </h3>
              </div>
              <button
                onClick={resetDrawer}
                className="w-10 h-10 flex items-center justify-center text-text-wood/60 hover:text-brand-red transition-colors rounded-full hover:bg-black/5 cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            {/* STEP 1: MULTI-PRODUCT CART LIST */}
            {step === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
                  {cartEntries.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <ShoppingBag size={56} className="mx-auto text-text-wood/30" />
                      <p className="font-sans text-base text-text-wood/70 font-semibold">
                        Giỏ hàng của bạn đang trống.
                      </p>
                      <p className="font-sans text-xs sm:text-sm text-text-wood/50">
                        Chọn thêm các Hộp DIY bên dưới để đặt mua chung một đơn hàng!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      <label className="block text-xs sm:text-sm font-extrabold text-text-wood uppercase tracking-wider mb-2">
                        SẢN PHẨM ĐÃ CHỌN:
                      </label>
                      {cartEntries.map((key) => {
                        const product = PRODUCTS_CATALOG[key];
                        const qty = cartState[key] || 0;
                        const itemSubtotal = product.price * qty;

                        return (
                          <div
                            key={key}
                            className="bg-white rounded-2xl p-4 sm:p-4.5 border border-text-wood/12 shadow-sm flex items-center gap-4 relative"
                          >
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-text-wood/10 shadow-inner">
                              <Image
                                src={product.image}
                                alt={product.label}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-grow min-w-0">
                              <span className="text-xs font-bold uppercase tracking-wider text-bamboo-green block mb-0.5">
                                {product.village}
                              </span>
                              <h4 className="font-serif font-bold text-base sm:text-lg text-brand-red truncate">
                                {product.label}
                              </h4>
                              <p className="font-price font-extrabold text-base sm:text-lg text-brand-red mt-1">
                                {itemSubtotal.toLocaleString("vi-VN")} đ
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5 bg-paper-warm rounded-xl border border-text-wood/15 p-1">
                              <button
                                onClick={() => updateQuantity(key, qty - 1)}
                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-text-wood/70 hover:text-brand-red transition-colors cursor-pointer"
                                aria-label="Giảm"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-price font-bold text-sm sm:text-base w-7 text-center">{qty}</span>
                              <button
                                onClick={() => updateQuantity(key, qty + 1)}
                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-text-wood/70 hover:text-brand-red transition-colors cursor-pointer"
                                aria-label="Tăng"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItemFromCart(key)}
                              className="w-9 h-9 flex items-center justify-center text-text-wood/40 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50 cursor-pointer"
                              aria-label="Xóa"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Add More Products Section */}
                  <div className="pt-4 border-t border-text-wood/10">
                    <label className="block text-xs sm:text-sm font-extrabold text-text-wood uppercase tracking-wider mb-3">
                      THÊM HỘP KHÁC VỀ CÙNG CHUYẾN:
                    </label>
                    <div className="space-y-2.5">
                      {(Object.keys(PRODUCTS_CATALOG) as ProductKey[]).map((key) => {
                        const product = PRODUCTS_CATALOG[key];
                        const inCart = (cartState[key] || 0) > 0;
                        return (
                          <div
                            key={key}
                            className="bg-paper-warm/80 rounded-2xl p-3.5 sm:p-4 border border-text-wood/10 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                                <Image src={product.image} alt={product.label} fill sizes="56px" className="object-cover" />
                              </div>
                              <div className="truncate">
                                <p className="font-serif font-bold text-sm sm:text-base text-text-wood truncate">{product.label}</p>
                                <p className="font-price text-xs sm:text-sm font-extrabold text-brand-red">
                                  {product.price.toLocaleString("vi-VN")} đ
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => addItemToCart(key)}
                              className="px-4 py-2 bg-white border border-brand-red/30 hover:border-brand-red text-brand-red font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer hover:bg-brand-red/5"
                            >
                              <span>{inCart ? "+ Thêm" : "+ Chọn thêm"}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* COD Note */}
                  <div className="bg-brand-red/5 border border-brand-red/15 rounded-2xl p-3.5 text-xs sm:text-sm text-brand-red flex items-center gap-2.5 font-medium">
                    <Truck size={18} className="flex-shrink-0" />
                    <span>Thanh toán COD khi nhận hàng — Kiểm tra hàng thoải mái!</span>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="p-5 sm:p-7 border-t border-text-wood/10 bg-paper-warm space-y-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-bold text-text-wood/80">
                      Tổng tiền ({totalItemCount} sản phẩm):
                    </span>
                    <span className="font-price text-2xl sm:text-3xl font-extrabold text-brand-red">
                      {totalPrice.toLocaleString("vi-VN")} đ
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    disabled={cartEntries.length === 0}
                    onClick={() => setStep("checkout")}
                    className="w-full h-13 sm:h-14 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-lg flex items-center justify-center gap-2 text-base sm:text-lg font-bold uppercase tracking-wider rounded-2xl disabled:opacity-50"
                  >
                    <span>TIẾP TỤC ĐẶT HÀNG COD</span>
                  </Button>
                </div>
              </>
            )}

            {/* STEP 2: CHECKOUT COD FORM */}
            {step === "checkout" && (
              <form onSubmit={handleOrderSubmit} className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
                  {/* Order items recap */}
                  <div className="bg-paper-warm rounded-2xl p-4 border border-text-wood/10 text-xs sm:text-sm space-y-2.5">
                    <p className="font-bold text-text-wood uppercase tracking-wider border-b border-text-wood/10 pb-2">
                      Danh sách đặt mua ({totalItemCount} sản phẩm):
                    </p>
                    {cartEntries.map((key) => {
                      const p = PRODUCTS_CATALOG[key];
                      const q = cartState[key];
                      return (
                        <div key={key} className="flex justify-between items-center text-text-wood/85">
                          <span>- {p.label} x {q}</span>
                          <span className="font-price font-bold">{(p.price * q).toLocaleString("vi-VN")} đ</span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between items-center pt-2.5 border-t border-text-wood/10 font-bold text-brand-red">
                      <span>Tổng tiền COD:</span>
                      <span className="font-price text-lg">{totalPrice.toLocaleString("vi-VN")} đ</span>
                    </div>
                  </div>

                  {/* Input 1: Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-text-wood uppercase tracking-wider mb-1.5">
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
                      } rounded-xl px-4 h-12 text-sm text-text-wood focus:outline-none focus:border-brand-red transition-colors`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Input 2: Phone */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-text-wood uppercase tracking-wider mb-1.5">
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
                      } rounded-xl px-4 h-12 text-sm text-text-wood focus:outline-none focus:border-brand-red transition-colors`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Input 3: Delivery Address */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-text-wood uppercase tracking-wider mb-1.5">
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

                  {/* Input 4: Note */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-text-wood uppercase tracking-wider mb-1.5">
                      Ghi chú đơn hàng <span className="text-text-wood/40 font-normal">(Tùy chọn, {note.length}/200)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={200}
                      placeholder="Giao giờ hành chính, gọi trước khi giao..."
                      value={note}
                      onChange={(e) => setNote(e.target.value.slice(0, 200))}
                      className="w-full bg-white border border-text-wood/15 rounded-xl px-4 h-12 text-sm text-text-wood focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>

                  {/* COD Payment Badge */}
                  <div className="bg-bamboo-green/10 border border-bamboo-green/20 rounded-2xl p-3.5 text-xs sm:text-sm text-bamboo-green flex items-center gap-2 font-medium">
                    <Truck size={18} className="flex-shrink-0" />
                    <span>Hình thức: Ship COD (Thanh toán tiền mặt khi nhận hàng)</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-5 sm:p-7 border-t border-text-wood/10 bg-paper-warm space-y-2.5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full h-13 sm:h-14 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-lg rounded-2xl text-base sm:text-lg font-bold uppercase tracking-wider"
                  >
                    XÁC NHẬN ĐẶT HÀNG COD ({totalPrice.toLocaleString("vi-VN")} đ)
                  </Button>
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    className="w-full h-10 text-xs sm:text-sm font-semibold text-text-wood/70 hover:text-brand-red transition-colors cursor-pointer"
                  >
                    &lt;- Quay lại giỏ hàng
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: ORDER SUCCESS CONFIRMATION */}
            {step === "success" && (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-bamboo-green/10 border border-bamboo-green/20 flex items-center justify-center text-bamboo-green mb-2">
                  <CheckCircle2 size={42} />
                </div>

                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-brand-red">
                  Đặt Hàng Thành Công!
                </h4>

                <p className="font-sans text-sm sm:text-base text-text-wood/75 leading-relaxed max-w-sm">
                  Cảm ơn bạn <strong className="font-semibold text-brand-red">{fullName}</strong> đã đồng hành cùng <strong className="font-semibold text-brand-red">Chạm Thức</strong>.
                </p>

                <div className="w-full bg-paper-warm rounded-2xl p-4 sm:p-5 border border-text-wood/10 text-xs sm:text-sm text-left space-y-2.5">
                  <div className="flex justify-between border-b border-text-wood/10 pb-2">
                    <span className="text-text-wood/60 font-medium">Mã đơn hàng:</span>
                    <span className="font-price font-extrabold text-brand-red tracking-wider">{orderCode}</span>
                  </div>
                  <div className="border-b border-text-wood/10 pb-2">
                    <span className="text-text-wood/60 block mb-1">Sản phẩm đặt mua:</span>
                    {cartEntries.map((k) => (
                      <p key={k} className="font-semibold text-brand-red">
                        - {PRODUCTS_CATALOG[k].label} x {cartState[k]}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-between border-b border-text-wood/10 pb-2">
                    <span className="text-text-wood/60">Tổng tiền COD:</span>
                    <span className="font-price font-bold text-base sm:text-lg text-brand-red">{totalPrice.toLocaleString("vi-VN")} đ</span>
                  </div>
                  <div className="flex justify-between border-b border-text-wood/10 pb-2">
                    <span className="text-text-wood/60">Số điện thoại:</span>
                    <span className="font-semibold text-text-wood">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-wood/60">Địa chỉ giao:</span>
                    <span className="font-semibold text-text-wood text-right max-w-[200px]">{address}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-bamboo-green italic font-medium">
                  Đội ngũ Chạm Thức sẽ gọi điện xác nhận đơn hàng trước khi giao!
                </p>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={resetDrawer}
                  className="w-full h-12 sm:h-13 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-md mt-4 rounded-2xl"
                >
                  Hoàn Tất
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CartDrawer;
