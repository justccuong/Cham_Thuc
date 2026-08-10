"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, QrCode, CheckCircle2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProductKey = "non-la" | "to-he" | "chuon-chuon";

const products: Record<ProductKey, { label: string; price: number }> = {
  "non-la": { label: "Hộp DIY Nón Lá Mini", price: 299000 },
  "to-he": { label: "Hộp DIY Tò He Dân Gian", price: 299000 },
  "chuon-chuon": { label: "Hộp DIY Chuồn Chuồn Tre", price: 299000 },
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductKey>("non-la");
  const [quantity, setQuantity] = useState(1);
  const [showVietQR, setShowVietQR] = useState(false);

  const totalPrice = products[selectedProduct].price * quantity;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div key="cart-drawer-wrapper" className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              key="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
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
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-red">Giỏ Hàng</h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-11 h-11 flex items-center justify-center text-text-wood/60 hover:text-brand-red transition-colors rounded-full hover:bg-black/5"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
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
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-text-wood/70 hover:text-brand-red"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Promo */}
                <div className="bg-brand-red/5 border border-brand-red/15 rounded-xl p-3 text-xs text-brand-red flex items-center gap-2">
                  <CheckCircle2 size={16} className="flex-shrink-0" />
                  <span>Freeship cho đơn từ 500.000đ</span>
                </div>
              </div>

              {/* Footer */}
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
                  onClick={() => setShowVietQR(true)}
                  className="w-full h-12 bg-brand-red hover:bg-brand-red-hover text-brand-gold shadow-lg flex items-center justify-center gap-2"
                >
                  <QrCode size={18} />
                  <span>Thanh Toán VietQR</span>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VietQR Modal */}
      <AnimatePresence>
        {showVietQR && (
          <div key="vietqr-modal-wrapper" className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
            <motion.div
              key="vietqr-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVietQR(false)}
              className="absolute inset-0 bg-text-wood/80 backdrop-blur-md"
            />
            <motion.div
              key="vietqr-modal"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full sm:max-w-sm bg-paper-ivory rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border-t sm:border border-brand-red/30 text-text-wood text-center z-10 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
            >
              <button
                onClick={() => setShowVietQR(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 flex items-center justify-center text-text-wood/60 hover:text-brand-red rounded-full hover:bg-black/5"
              >
                <X size={20} />
              </button>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-red mb-1">
                Thanh Toán VietQR
              </h3>
              <p className="text-xs text-text-wood/70 mb-3 sm:mb-4">
                Quét mã bằng app Ngân hàng
              </p>

              <div className="bg-white p-3 sm:p-4 rounded-2xl border border-text-wood/10 shadow-inner mb-3 sm:mb-4 inline-block">
                <img
                  src={`https://img.vietqr.io/image/MB-0345678999-compact2.png?amount=${totalPrice}&addInfo=CHAMTHUC%20DAT%20HOP&accountName=NGU%20SAC%20TEAM`}
                  alt="VietQR"
                  className="w-44 h-44 sm:w-56 sm:h-56 object-contain mx-auto"
                />
              </div>

              <div className="text-xs text-left bg-paper-warm p-3 rounded-xl border border-text-wood/10 space-y-1 mb-3 sm:mb-4">
                <div className="flex justify-between">
                  <span className="opacity-70">Ngân hàng:</span>
                  <span className="font-bold">MB Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Chủ TK:</span>
                  <span className="font-bold">DU AN CHAM THUC</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Số tiền:</span>
                  <span className="font-bold text-brand-red">{totalPrice.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  alert("Hệ thống đã ghi nhận đơn hàng! Cảm ơn bạn.");
                  setShowVietQR(false);
                  onClose();
                }}
                className="w-full h-12"
              >
                Đã Chuyển Khoản Xong
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
