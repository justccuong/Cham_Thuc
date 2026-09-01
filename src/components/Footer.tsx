"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, Phone, Mail } from "lucide-react";
import { CloudPatternOverlay } from "@/components/CloudPatternOverlay";
import { useLanguage } from "@/lib/i18n";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer
      id="footer"
      className="bg-[#3A2618] text-[#F8F5F0] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-[#F8F5F0]/10 font-sans relative z-10 overflow-hidden"
    >
      <CloudPatternOverlay variant="dark" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-8 sm:pb-12 border-b border-[#F8F5F0]/10 relative z-10">
        {/* Brand & Logo */}
        <div className="md:col-span-5 space-y-3 sm:space-y-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Chạm Thức Logo"
              width={48}
              height={48}
              className="h-10 sm:h-12 w-10 sm:w-12 rounded-full object-cover border border-paper-ivory/20 opacity-95 shadow-sm flex-shrink-0"
            />
            <span className="font-serif font-bold text-xl sm:text-2xl text-paper-ivory tracking-wide">
              CHẠM THỨC
            </span>
          </Link>

          <h3 className="font-serif text-lg sm:text-xl text-paper-ivory font-bold tracking-wide">
            {t.hero.titleLine1} — {t.hero.titleLine2}
          </h3>

          <p className="text-xs sm:text-sm text-paper-ivory/80 leading-relaxed font-light max-w-md">
            {t.footer.tagline}
          </p>

          {/* Social & Contact Links — min 44px touch */}
          <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61592690401391"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-paper-ivory/10 hover:bg-brand-red text-paper-ivory transition-colors flex items-center justify-center"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href="tel:0964470213"
              className="h-11 px-4 rounded-full bg-paper-ivory/10 hover:bg-brand-red text-paper-ivory text-xs font-semibold flex items-center gap-2 transition-colors"
              aria-label="Hotline"
            >
              <Phone size={15} />
              <span>0964 470 213</span>
            </a>

            <a
              href="mailto:chamthuc2026@gmail.com"
              className="h-11 px-4 rounded-full bg-paper-ivory/10 hover:bg-bamboo-green text-paper-ivory text-xs font-semibold flex items-center gap-2 transition-colors"
              aria-label="Email"
            >
              <Mail size={15} />
              <span>chamthuc2026@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-2 sm:space-y-3 text-sm">
          <h4 className="font-serif text-base sm:text-lg font-bold text-paper-ivory mb-3 sm:mb-4">
            Khám Phá
          </h4>
          <ul className="space-y-2 sm:space-y-2.5 text-paper-ivory/80">
            <li>
              <a href="#hero" className="hover:text-clay-terracotta transition-colors">
                Về Chạm Thức
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-clay-terracotta transition-colors">
                Bộ Kit DIY Làng Nghề
              </a>
            </li>
            <li>
              <a href="#story" className="hover:text-clay-terracotta transition-colors">
                Trạm Kể Chuyện Làng Nghề
              </a>
            </li>
            <li>
              <a href="#b2b" className="hover:text-clay-terracotta transition-colors">
                Giải Pháp B2B & ESG
              </a>
            </li>
          </ul>
        </div>

        {/* Social Impact Statement */}
        <div className="md:col-span-4 bg-brand-red/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-paper-ivory/10 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 text-clay-terracotta">
            <Heart size={16} />
            <h4 className="font-serif text-sm sm:text-base font-bold text-paper-ivory">
              Tác Động Xã Hội
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-paper-ivory/80 leading-relaxed font-light">
            Gìn giữ giá trị làng nghề, kết nối văn hóa Việt với thế hệ trẻ.
          </p>
          <div className="pt-1 sm:pt-2 text-[10px] sm:text-[11px] text-paper-ivory/60 italic flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-bamboo-green" />
            <span>Sản phẩm thủ công thuần Việt 100%</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs text-paper-ivory/50 gap-3 sm:gap-4 relative z-10">
        <div>© 2026 Chạm Thức by Ngũ Sắc Team.</div>
        <div className="flex items-center gap-4 sm:gap-6">
          <span>Bảo mật</span>
          <span>Điều khoản</span>
          <span>Liên hệ</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
