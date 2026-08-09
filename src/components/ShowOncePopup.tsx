"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, X, Gift } from "lucide-react";
import { Button } from "@/components/ui/Button";

const COOKIE_NAME = "preload_unboxing_seen";
const COOKIE_EXPIRY_HOURS = 24;

export const ShowOncePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    // Check browser cookie
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const hasSeen = cookies.some((c) => c.startsWith(`${COOKIE_NAME}=true`));

    if (!hasSeen) {
      // Show popup after 1s delay for smooth entry
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Set 24h Cookie
    const date = new Date();
    date.setTime(date.getTime() + COOKIE_EXPIRY_HOURS * 60 * 60 * 1000);
    document.cookie = `${COOKIE_NAME}=true; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-[#3A2618]/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#F8F5F0] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#9A1B1F]/30 text-[#3A2618] text-center overflow-hidden z-10"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#9A1B1F]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#285834]/10 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-[#3A2618]/60 hover:text-[#9A1B1F] p-1.5 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Đóng popup"
            >
              <X size={20} />
            </button>

            {/* Unboxing Icon Animation */}
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-20 h-20 mx-auto bg-gradient-to-b from-[#9A1B1F] to-[#7A1518] text-[#F4E8C1] rounded-2xl flex items-center justify-center shadow-lg border border-[#F4E8C1]/30 mb-6"
            >
              <Gift size={40} />
            </motion.div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#285834]/10 text-[#285834] text-[11px] font-bold uppercase tracking-wider mb-3">
              <Sparkles size={12} />
              <span>Trải Nghiệm Độc Quyền</span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#9A1B1F] mb-3">
              Chào Bạn Đến Với<br />Chạm Thức
            </h3>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-[#3A2618]/80 leading-relaxed mb-6 font-normal">
              Đeo tai nghe và tận hưởng trải nghiệm Unboxing <strong className="font-semibold text-[#9A1B1F]">"Chữa lành"</strong> với giai điệu mộc mạc và âm thanh ASMR thủ công từ các làng nghề Việt Nam.
            </p>

            {/* ASMR Sound Toggle Simulation */}
            <div className="bg-[#EFE9DE] rounded-xl p-3.5 mb-6 flex items-center justify-between border border-[#3A2618]/10 text-xs">
              <div className="flex items-center gap-2 text-left">
                <Volume2 size={18} className="text-[#9A1B1F] animate-pulse" />
                <div>
                  <div className="font-bold text-[#3A2618]">Âm thanh ASMR Làng Nghề</div>
                  <div className="text-[10px] text-[#3A2618]/60">Tiếng đan tre & mộc bản Đông Hồ</div>
                </div>
              </div>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                  isPlayingAudio
                    ? "bg-[#285834] text-white"
                    : "bg-[#9A1B1F] text-[#F4E8C1]"
                }`}
              >
                {isPlayingAudio ? "Đang Phát" : "Bật Âm Thanh"}
              </button>
            </div>

            {/* Action Buttons */}
            <Button
              variant="primary"
              size="md"
              onClick={handleDismiss}
              className="w-full bg-[#9A1B1F] hover:bg-[#7A1518] text-[#F4E8C1] shadow-md"
            >
              Bắt Đầu Khám Phá
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShowOncePopup;
