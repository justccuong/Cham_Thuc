"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  X,
  CheckCircle2,
  Plus,
  Minus,
  Truck,
  AlertCircle,
  Trash2,
  CreditCard,
  MessageCircle,
  Banknote,
  Loader2,
  Copy,
  Check,
  User,
  Phone,
  MapPin,
  FileText,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { generateOrderCode } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useCart, ProductKey, PRODUCTS_CATALOG } from "@/lib/cart";

export type { ProductKey, ProductInfo } from "@/lib/cart";
export { PRODUCTS_CATALOG } from "@/lib/cart";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialProductKey?: ProductKey;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
}) => {
  const { t } = useLanguage();
  const {
    cartState,
    totalCount,
    totalPrice,
    cartEntries,
    isCartOpen: contextIsOpen,
    closeCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const isMounted = useIsClient();
  const isOpen = propIsOpen !== undefined ? propIsOpen : contextIsOpen;
  const handleCloseDrawer = propOnClose || closeCart;

  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"VIETQR" | "COD">("VIETQR");
  const [finalAmount, setFinalAmount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Validation Errors State
  const [errors, setErrors] = useState<{
    fullName?: string;
    phone?: string;
    address?: string;
    general?: string;
  }>({});

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

  const handleCopy = (text: string, fieldName: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  // Form input handlers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 15);
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

    const cleanPhone = phone.replace(/\D/g, "");
    const phoneRegex = /^0(3|5|7|8|9)\d{8}$/;
    if (!cleanPhone) {
      newErrors.phone = "Vui lòng nhập số điện thoại nhận hàng.";
    } else if (!phoneRegex.test(cleanPhone)) {
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

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const cleanPhone = phone.replace(/\D/g, "");
      const productNames = cartEntries
        .map((k) => `${PRODUCTS_CATALOG[k]?.label || k} x${cartState[k]}`)
        .join(", ");

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          phone: cleanPhone,
          address: address.trim(),
          productName: productNames,
          price: totalPrice,
          paymentMethod,
          notes: note.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.orderCode) {
        setOrderCode(data.orderCode);
        setFinalAmount(data.finalAmount || totalPrice);
        clearCart();
        setStep("success");
      } else {
        setErrors({ general: data.error || "Đặt hàng không thành công. Vui lòng thử lại." });
      }
    } catch (err) {
      console.error("Order submit API error:", err);
      // Fallback
      setOrderCode(generateOrderCode());
      setFinalAmount(totalPrice);
      clearCart();
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
    setPaymentMethod("VIETQR");
    setFinalAmount(0);
    setErrors({});
    handleCloseDrawer();
  };

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          key="cart-drawer-wrapper"
          className="fixed inset-0 z-[100] flex justify-end sm:items-center sm:justify-center p-0 sm:p-4 sm:py-6 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] cursor-pointer"
          />

          {/* Sheet Container */}
          <motion.div
            key="cart-sheet"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full sm:max-w-xl md:max-w-2xl h-[100dvh] sm:h-[88vh] sm:max-h-[820px] my-auto bg-paper-ivory shadow-2xl flex flex-col sm:rounded-3xl border border-text-wood/10 text-text-wood z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="h-16 px-5 sm:px-7 border-b border-text-wood/10 flex items-center justify-between bg-paper-warm flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="text-brand-red" size={22} />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-red">
                  {step === "cart" &&
                    `${t.cart.title} (${totalCount} ${t.cart.itemCountSuffix})`}
                  {step === "checkout" && t.cart.formTitle}
                  {step === "success" && t.cart.orderSuccessTitle}
                </h3>
              </div>
              <button
                onClick={resetDrawer}
                className="w-10 h-10 flex items-center justify-center text-text-wood/60 hover:text-brand-red transition-colors rounded-full hover:bg-black/5 cursor-pointer"
                aria-label={t.modal.close}
              >
                <X size={22} />
              </button>
            </div>

            {/* Progress Step Indicator */}
            <div className="bg-paper-warm/80 border-b border-text-wood/10 px-5 sm:px-8 py-3 flex items-center justify-between z-10 relative flex-shrink-0">
              {[
                { id: "cart", label: "Giỏ hàng", stepNum: 1 },
                { id: "checkout", label: "Giao hàng", stepNum: 2 },
                { id: "success", label: "Hoàn tất", stepNum: 3 },
              ].map((s, i, arr) => {
                const isActive = step === s.id;
                const isPast = arr.findIndex((x) => x.id === step) > i;
                return (
                  <React.Fragment key={s.id}>
                    <button
                      type="button"
                      disabled={s.id === "success" || (s.id === "checkout" && cartEntries.length === 0)}
                      onClick={() => {
                        if (s.id === "cart") setStep("cart");
                        if (s.id === "checkout" && cartEntries.length > 0) setStep("checkout");
                      }}
                      className={`flex items-center gap-2 text-left transition-all ${
                        isActive || isPast ? "opacity-100" : "opacity-40"
                      } ${s.id !== "success" ? "cursor-pointer" : ""}`}
                    >
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isActive
                            ? "bg-brand-red text-white shadow-md scale-110"
                            : isPast
                            ? "bg-bamboo-green text-white"
                            : "bg-text-wood/15 text-text-wood"
                        }`}
                      >
                        {isPast ? <CheckCircle2 size={15} /> : s.stepNum}
                      </div>
                      <span
                        className={`text-[11px] sm:text-xs font-bold transition-colors ${
                          isActive ? "text-brand-red" : isPast ? "text-bamboo-green" : "text-text-wood/70"
                        }`}
                      >
                        {s.label}
                      </span>
                    </button>
                    {i < arr.length - 1 && (
                      <div
                        className={`flex-1 h-[2px] mx-2 sm:mx-4 rounded-full transition-colors ${
                          isPast ? "bg-bamboo-green" : "bg-text-wood/15"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Content Container */}
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
              <AnimatePresence mode="wait">
                {/* ==================== STEP 1: CART ITEMS ==================== */}
                {step === "cart" && (
                  <motion.div
                    key="cart-step"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col bg-paper-ivory"
                  >
                    <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-7 space-y-6">
                      {/* Free Shipping Banner */}
                      <div className="bg-gradient-to-r from-bamboo-green/10 via-brand-gold/20 to-bamboo-green/10 border border-bamboo-green/25 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-text-wood">
                          <Truck size={18} className="text-bamboo-green flex-shrink-0 animate-bounce" />
                          <span>Miễn phí vận chuyển toàn quốc cho tất cả đơn hàng Chạm Thức</span>
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-bamboo-green text-white px-2.5 py-1 rounded-full flex-shrink-0 shadow-sm">
                          Freeship 0đ
                        </span>
                      </div>

                      {cartEntries.length === 0 ? (
                        <div className="text-center py-10 sm:py-14 space-y-4 bg-white/70 rounded-3xl border border-text-wood/10 p-6">
                          <div className="w-16 h-16 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto shadow-inner">
                            <ShoppingBag size={32} />
                          </div>
                          <div>
                            <p className="font-serif text-lg font-bold text-text-wood">
                              {t.cart.emptyTitle}
                            </p>
                            <p className="font-sans text-xs sm:text-sm text-text-wood/60 mt-1 max-w-sm mx-auto">
                              {t.cart.emptySubtitle}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs sm:text-sm font-bold text-text-wood uppercase tracking-wider">
                              {t.cart.selectedProducts}
                            </label>
                            <span className="text-xs text-text-wood/60 font-medium">
                              {totalCount} sản phẩm
                            </span>
                          </div>

                          {cartEntries.map((key) => {
                            const product = PRODUCTS_CATALOG[key];
                            if (!product) return null;
                            const qty = cartState[key] || 0;
                            const itemSubtotal = product.price * qty;

                            return (
                              <div
                                key={key}
                                className="bg-white rounded-2xl p-4 sm:p-4.5 border border-text-wood/12 shadow-[0_4px_16px_rgba(58,38,24,0.04)] hover:shadow-md transition-shadow flex items-center gap-4 relative group"
                              >
                                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-text-wood/10 shadow-inner bg-paper-warm">
                                  <Image
                                    src={product.image}
                                    alt={product.label}
                                    fill
                                    sizes="80px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>

                                <div className="flex-grow min-w-0">
                                  <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-bamboo-green block mb-0.5">
                                    {product.village}
                                  </span>
                                  <h4 className="font-serif font-bold text-base sm:text-lg text-brand-red truncate">
                                    {product.label}
                                  </h4>
                                  <p className="font-price font-extrabold text-base sm:text-lg text-brand-red mt-1">
                                    {itemSubtotal.toLocaleString("vi-VN")}{" "}
                                    {t.products.priceSuffix}
                                  </p>
                                </div>

                                {/* Stepper */}
                                <div className="flex items-center gap-1.5 bg-paper-warm rounded-2xl border border-text-wood/15 p-1.5 flex-shrink-0 shadow-inner">
                                  <button
                                    onClick={() => updateQuantity(key, qty - 1)}
                                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-text-wood/75 hover:text-brand-red hover:bg-white rounded-xl transition-all cursor-pointer active:scale-95"
                                    aria-label="Giảm số lượng"
                                  >
                                    <Minus size={16} />
                                  </button>
                                  <span className="font-price font-bold text-base sm:text-lg w-7 sm:w-8 text-center text-text-wood">
                                    {qty}
                                  </span>
                                  <button
                                    onClick={() => addItem(key)}
                                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-text-wood/75 hover:text-brand-red hover:bg-white rounded-xl transition-all cursor-pointer active:scale-95"
                                    aria-label="Tăng số lượng"
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>

                                {/* Trash */}
                                <button
                                  onClick={() => removeItem(key)}
                                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-text-wood/40 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer flex-shrink-0"
                                  aria-label="Xóa sản phẩm"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Add More Products Cross-sell */}
                      <div className="pt-3 border-t border-text-wood/10">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles size={14} className="text-brand-red" />
                          <label className="text-xs sm:text-sm font-bold text-text-wood uppercase tracking-wider">
                            {t.cart.addMore}
                          </label>
                        </div>
                        <div className="space-y-2.5">
                          {(Object.keys(PRODUCTS_CATALOG) as ProductKey[]).map((key) => {
                            const product = PRODUCTS_CATALOG[key];
                            if (!product) return null;
                            const inCart = (cartState[key] || 0) > 0;
                            return (
                              <div
                                key={key}
                                className="bg-white/80 hover:bg-white rounded-2xl p-3 sm:p-3.5 border border-text-wood/10 hover:border-brand-red/30 transition-all flex items-center justify-between shadow-sm"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-inner bg-paper-warm">
                                    <Image
                                      src={product.image}
                                      alt={product.label}
                                      fill
                                      sizes="56px"
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="truncate">
                                    <p className="font-serif font-bold text-sm sm:text-base text-text-wood truncate">
                                      {product.label}
                                    </p>
                                    <p className="font-price text-xs sm:text-sm font-extrabold text-brand-red">
                                      {product.price.toLocaleString("vi-VN")}{" "}
                                      {t.products.priceSuffix}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  onClick={() => addItem(key)}
                                  className="px-3.5 py-1.5 bg-brand-red/10 hover:bg-brand-red text-brand-red hover:text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1 flex-shrink-0 cursor-pointer shadow-sm"
                                >
                                  <Plus size={14} />
                                  <span>{inCart ? `Thêm (${cartState[key]})` : "Thêm vào giỏ"}</span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="p-5 sm:p-7 border-t border-text-wood/10 bg-paper-warm space-y-3.5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] flex-shrink-0">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs sm:text-sm text-text-wood/70">
                          <span>Tạm tính:</span>
                          <span className="font-price font-bold">
                            {totalPrice.toLocaleString("vi-VN")} {t.products.priceSuffix}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm text-bamboo-green font-semibold">
                          <span>Phí vận chuyển:</span>
                          <span>Miễn phí (Freeship 0đ)</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-text-wood/10">
                          <span className="text-sm sm:text-base font-bold text-text-wood">
                            {t.cart.totalLabel}
                          </span>
                          <span className="font-price text-2xl sm:text-3xl font-extrabold text-brand-red">
                            {totalPrice.toLocaleString("vi-VN")} {t.products.priceSuffix}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="lg"
                        disabled={cartEntries.length === 0}
                        onClick={() => setStep("checkout")}
                        className="w-full h-13 sm:h-14 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-lg flex items-center justify-center gap-2 text-base sm:text-lg font-bold uppercase tracking-wider rounded-2xl disabled:opacity-50 cursor-pointer transition-transform active:scale-98"
                      >
                        <span>{t.cart.checkoutBtn}</span>
                        <ArrowRight size={18} />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* ==================== STEP 2: CHECKOUT FORM ==================== */}
                {step === "checkout" && (
                  <motion.form
                    key="checkout-step"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    onSubmit={handleOrderSubmit}
                    className="absolute inset-0 flex flex-col justify-between bg-paper-ivory"
                  >
                    <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-7 space-y-5">
                      {/* Compact Order Recap */}
                      <div className="bg-paper-warm rounded-2xl p-4 border border-text-wood/10 text-xs sm:text-sm space-y-2">
                        <div className="flex items-center justify-between border-b border-text-wood/10 pb-2">
                          <span className="font-bold text-text-wood uppercase tracking-wider">
                            {t.cart.orderListTitle} ({totalCount} {t.cart.itemCountSuffix}):
                          </span>
                          <button
                            type="button"
                            onClick={() => setStep("cart")}
                            className="text-brand-red font-bold hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <ArrowLeft size={13} />
                            <span>Sửa</span>
                          </button>
                        </div>
                        {cartEntries.map((key) => {
                          const p = PRODUCTS_CATALOG[key];
                          if (!p) return null;
                          const q = cartState[key];
                          return (
                            <div key={key} className="flex justify-between items-center text-text-wood/85">
                              <span>- {p.label} x {q}</span>
                              <span className="font-price font-bold">
                                {(p.price * q).toLocaleString("vi-VN")} {t.products.priceSuffix}
                              </span>
                            </div>
                          );
                        })}
                        <div className="flex justify-between items-center pt-2 border-t border-text-wood/10 font-bold text-brand-red">
                          <span>{t.cart.totalLabel}</span>
                          <span className="font-price text-lg">
                            {totalPrice.toLocaleString("vi-VN")} {t.products.priceSuffix}
                          </span>
                        </div>
                      </div>

                      {errors.general && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-xs flex items-center gap-2">
                          <AlertCircle size={16} className="flex-shrink-0" />
                          <span>{errors.general}</span>
                        </div>
                      )}

                      {/* Input 1: Full Name */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-text-wood uppercase tracking-wider">
                          <User size={14} className="text-brand-red" />
                          <span>Họ và tên người nhận *</span>
                        </label>
                        <input
                          type="text"
                          maxLength={50}
                          placeholder="VD: Nguyễn Văn A"
                          value={fullName}
                          onChange={handleFullNameChange}
                          className={`w-full bg-white border ${
                            errors.fullName
                              ? "border-red-500 bg-red-50/30"
                              : "border-text-wood/15 focus:border-brand-red"
                          } rounded-xl px-4 h-12 text-sm text-text-wood transition-all`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle size={13} />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Input 2: Phone */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-text-wood uppercase tracking-wider">
                          <Phone size={14} className="text-brand-red" />
                          <span>Số điện thoại nhận hàng *</span>
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="VD: 0912345678"
                          value={phone}
                          onChange={handlePhoneChange}
                          className={`w-full bg-white border ${
                            errors.phone
                              ? "border-red-500 bg-red-50/30"
                              : "border-text-wood/15 focus:border-brand-red"
                          } rounded-xl px-4 h-12 text-sm text-text-wood transition-all`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle size={13} />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>

                      {/* Input 3: Address */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-text-wood uppercase tracking-wider">
                          <MapPin size={14} className="text-brand-red" />
                          <span>Địa chỉ giao hàng chi tiết *</span>
                        </label>
                        <input
                          type="text"
                          maxLength={150}
                          placeholder="VD: Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
                          value={address}
                          onChange={handleAddressChange}
                          className={`w-full bg-white border ${
                            errors.address
                              ? "border-red-500 bg-red-50/30"
                              : "border-text-wood/15 focus:border-brand-red"
                          } rounded-xl px-4 h-12 text-sm text-text-wood transition-all`}
                        />
                        {errors.address && (
                          <p className="text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle size={13} />
                            <span>{errors.address}</span>
                          </p>
                        )}
                      </div>

                      {/* Input 4: Notes */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-text-wood uppercase tracking-wider">
                          <FileText size={14} className="text-brand-red" />
                          <span>Ghi chú giao hàng (Tùy chọn)</span>
                        </label>
                        <input
                          type="text"
                          maxLength={200}
                          placeholder="VD: Giao hàng giờ hành chính, gọi trước khi giao..."
                          value={note}
                          onChange={(e) => setNote(e.target.value.slice(0, 200))}
                          className="w-full bg-white border border-text-wood/15 focus:border-brand-red rounded-xl px-4 h-12 text-sm text-text-wood transition-all"
                        />
                      </div>

                      {/* Payment Method Cards */}
                      <div className="space-y-2.5 pt-2">
                        <label className="block text-xs sm:text-sm font-bold text-text-wood uppercase tracking-wider">
                          {t.cart.paymentMethodLabel}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* VietQR Option */}
                          <div
                            onClick={() => setPaymentMethod("VIETQR")}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                              paymentMethod === "VIETQR"
                                ? "border-brand-red bg-brand-red/5 shadow-md"
                                : "border-text-wood/15 bg-white hover:border-text-wood/30"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <CreditCard size={18} className="text-brand-red" />
                                <span className="font-bold text-sm text-text-wood">Chuyển khoản VietQR</span>
                              </div>
                              <span className="text-[10px] font-bold uppercase bg-brand-red text-white px-2 py-0.5 rounded-full">
                                Tiện lợi
                              </span>
                            </div>
                            <p className="text-xs text-text-wood/70 leading-relaxed">
                              Quét mã QR qua mọi app ngân hàng / MoMo. Tự động &amp; nhanh chóng.
                            </p>
                          </div>

                          {/* COD Option */}
                          <div
                            onClick={() => setPaymentMethod("COD")}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                              paymentMethod === "COD"
                                ? "border-brand-red bg-brand-red/5 shadow-md"
                                : "border-text-wood/15 bg-white hover:border-text-wood/30"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Banknote size={18} className="text-bamboo-green" />
                                <span className="font-bold text-sm text-text-wood">Ship COD</span>
                              </div>
                              <span className="text-[10px] font-bold uppercase bg-bamboo-green/20 text-bamboo-green px-2 py-0.5 rounded-full">
                                Tiền mặt
                              </span>
                            </div>
                            <p className="text-xs text-text-wood/70 leading-relaxed">
                              Thanh toán tiền mặt khi nhận hàng. Kiểm tra hàng trước khi nhận.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="p-5 sm:p-7 border-t border-text-wood/10 bg-paper-warm space-y-2.5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] flex-shrink-0">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={submitting}
                        className="w-full h-13 sm:h-14 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-lg rounded-2xl text-base sm:text-lg font-bold uppercase tracking-wider disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 transition-transform active:scale-98"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            <span>ĐANG XÁC NHẬN ĐƠN HÀNG...</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck size={20} />
                            <span>
                              {t.cart.confirmOrderBtn} ({totalPrice.toLocaleString("vi-VN")} {t.products.priceSuffix})
                            </span>
                          </>
                        )}
                      </Button>
                      <button
                        type="button"
                        onClick={() => setStep("cart")}
                        className="w-full h-10 text-xs sm:text-sm font-semibold text-text-wood/70 hover:text-brand-red transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <ArrowLeft size={14} />
                        <span>{t.cart.backToCart}</span>
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* ==================== STEP 3: ORDER SUCCESS ==================== */}
                {step === "success" && (() => {
                  const fbPageId = process.env.NEXT_PUBLIC_FB_PAGE_ID || "61592690401391";
                  const bankId = process.env.NEXT_PUBLIC_BANK_ID || "MB";
                  const bankAccountNo = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NO || "0964470213";
                  const bankAccountName = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || "NGUYEN DINH CUONG";
                  const messengerText = encodeURIComponent(`Xin chào Chạm Thức, tôi vừa đặt đơn hàng #${orderCode}.`);
                  const messengerLink = `https://m.me/${fbPageId}?text=${messengerText}`;
                  const vietqrUrl = `https://img.vietqr.io/image/${bankId}-${bankAccountNo}-compact2.png?amount=${finalAmount}&addInfo=${encodeURIComponent(
                    orderCode
                  )}&accountName=${encodeURIComponent(bankAccountName)}`;

                  return (
                    <motion.div
                      key="success-step"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute inset-0 bg-paper-ivory flex-1 overflow-y-auto p-5 sm:p-7 flex flex-col items-center text-center space-y-5"
                    >
                      {/* Success Icon */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-bamboo-green/10 border border-bamboo-green/30 flex items-center justify-center text-bamboo-green shadow-inner">
                        <CheckCircle2 size={40} className="animate-pulse" />
                      </div>

                      <div>
                        <h4 className="font-serif text-2xl sm:text-3xl font-bold text-brand-red">
                          {t.cart.orderSuccessTitle}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-text-wood/75 leading-relaxed max-w-sm mx-auto mt-1">
                          {t.cart.orderSuccessThanks}
                        </p>
                      </div>

                      {/* Order Code Card */}
                      <div className="w-full bg-paper-warm rounded-2xl p-4 sm:p-5 border border-text-wood/10 text-xs sm:text-sm text-left space-y-2.5">
                        <div className="flex justify-between items-center border-b border-text-wood/10 pb-2">
                          <span className="text-text-wood/60 font-medium">{t.cart.orderCodeLabel}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-price font-extrabold text-brand-red text-base tracking-wider">
                              #{orderCode}
                            </span>
                            <button
                              onClick={() => handleCopy(orderCode, "code")}
                              className="px-2 py-1 bg-white border border-text-wood/15 rounded-lg text-xs font-semibold text-text-wood hover:border-brand-red transition-all flex items-center gap-1 cursor-pointer"
                            >
                              {copiedField === "code" ? <Check size={12} className="text-bamboo-green" /> : <Copy size={12} />}
                              <span>{copiedField === "code" ? "Đã chép" : "Sao chép"}</span>
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center border-b border-text-wood/10 pb-2">
                          <span className="text-text-wood/60">{t.cart.totalAmount}</span>
                          <span className="font-price font-bold text-base sm:text-lg text-brand-red">
                            {finalAmount.toLocaleString("vi-VN")} {t.products.priceSuffix}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-text-wood/60">{t.cart.paymentMethodLabel.replace(":", "")}</span>
                          <span className="font-semibold text-text-wood">
                            {paymentMethod === "VIETQR" ? t.cart.paymentVietQR : t.cart.paymentCOD}
                          </span>
                        </div>
                      </div>

                      {/* VietQR Bank Payment */}
                      {paymentMethod === "VIETQR" && (
                        <div className="w-full bg-white rounded-2xl p-5 border border-brand-red/20 shadow-md space-y-4">
                          <p className="text-xs sm:text-sm font-bold text-brand-red uppercase tracking-wider">
                            {t.cart.vietqrScanGuide}
                          </p>

                          <div className="flex justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={vietqrUrl}
                              alt="VietQR Payment"
                              className="w-52 h-52 sm:w-60 sm:h-60 rounded-xl border border-text-wood/10 shadow-sm"
                            />
                          </div>

                          <div className="text-xs sm:text-sm text-text-wood/80 space-y-2 bg-paper-warm/80 rounded-xl p-3.5 text-left border border-text-wood/10">
                            <div className="flex justify-between items-center">
                              <span>Ngân hàng: <strong>{bankId} (MB Bank)</strong></span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Số tài khoản: <strong className="font-price text-brand-red">{bankAccountNo}</strong></span>
                              <button
                                onClick={() => handleCopy(bankAccountNo, "stk")}
                                className="px-2 py-0.5 bg-white border border-text-wood/15 rounded text-[11px] font-bold text-brand-red hover:bg-brand-red/5 flex items-center gap-1 cursor-pointer"
                              >
                                {copiedField === "stk" ? <Check size={11} /> : <Copy size={11} />}
                                <span>{copiedField === "stk" ? "Đã chép" : "Copy"}</span>
                              </button>
                            </div>
                            <div>
                              <span>Chủ tài khoản: <strong>{bankAccountName}</strong></span>
                            </div>
                            <div className="flex justify-between items-center pt-1 border-t border-text-wood/10">
                              <span>Nội dung chuyển khoản: <strong className="font-price text-brand-red">{orderCode}</strong></span>
                              <button
                                onClick={() => handleCopy(orderCode, "memo")}
                                className="px-2 py-0.5 bg-white border border-text-wood/15 rounded text-[11px] font-bold text-brand-red hover:bg-brand-red/5 flex items-center gap-1 cursor-pointer"
                              >
                                {copiedField === "memo" ? <Check size={11} /> : <Copy size={11} />}
                                <span>{copiedField === "memo" ? "Đã chép" : "Copy"}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* COD Info */}
                      {paymentMethod === "COD" && (
                        <div className="w-full bg-bamboo-green/5 rounded-2xl p-4 sm:p-5 border border-bamboo-green/20 flex items-start gap-3 text-left">
                          <Truck size={22} className="text-bamboo-green flex-shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-text-wood/85 leading-relaxed">
                            {t.cart.codConfirmMsg}
                          </p>
                        </div>
                      )}

                      {/* Messenger Confirmation */}
                      <a
                        href={messengerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 h-12 sm:h-13 bg-[#0084FF] hover:bg-[#006FDB] text-white font-bold text-sm sm:text-base uppercase tracking-wider rounded-2xl shadow-lg transition-all cursor-pointer hover:scale-[1.01]"
                      >
                        <MessageCircle size={18} />
                        <span>{t.cart.messengerConfirmBtn}</span>
                      </a>

                      <p className="text-[11px] sm:text-xs text-text-wood/60 italic">
                        {t.cart.callConfirmNote}
                      </p>

                      <Button
                        variant="primary"
                        size="lg"
                        onClick={resetDrawer}
                        className="w-full h-12 bg-brand-red hover:bg-brand-red-hover text-brand-gold font-bold uppercase tracking-wider rounded-2xl cursor-pointer"
                      >
                        {t.cart.finishBtn}
                      </Button>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CartDrawer;
