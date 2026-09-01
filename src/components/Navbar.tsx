"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { totalCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.products, href: "#products" },
    { label: t.nav.story, href: "#story" },
    { label: t.nav.b2b, href: "#b2b" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'products', 'story', 'b2b'];
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-500 h-14 sm:h-16 flex items-center ${
          scrolled
            ? "translate-y-0 bg-paper-ivory/80 backdrop-blur-md border-b border-text-wood/10 shadow-sm"
            : "-translate-y-full"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <Image
              src="/logo.png"
              alt="CHẠM THỨC"
              width={40}
              height={40}
              className="h-9 sm:h-10 w-9 sm:w-10 rounded-full object-cover border border-brand-red/20 shadow-sm flex-shrink-0"
              priority
            />
            <span className="font-serif font-bold text-lg sm:text-xl md:text-2xl text-brand-red tracking-wide">
              CHẠM THỨC
            </span>
          </Link>

          {/* Center Nav — desktop only */}
          <nav className="hidden lg:flex items-center gap-8 font-sans font-medium text-sm text-text-wood">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`ct-nav-link hover:text-brand-red transition-colors ${activeSection === link.href.replace('#', '') ? 'active text-brand-red' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA — desktop only */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-paper-warm p-1 rounded-full border border-text-wood/15 text-xs font-bold font-price">
              <button
                onClick={() => setLang("vi")}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  lang === "vi"
                    ? "bg-brand-red text-brand-gold shadow-sm"
                    : "text-text-wood/60 hover:text-brand-red"
                }`}
              >
                VI
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  lang === "en"
                    ? "bg-brand-red text-brand-gold shadow-sm"
                    : "text-text-wood/60 hover:text-brand-red"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => openCart()}
              className="relative inline-flex items-center gap-2.5 bg-brand-red text-brand-gold rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-brand-red-hover transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <ShoppingBag size={16} />
              <span>{t.nav.cart}</span>
              {totalCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-red font-price text-xs font-extrabold flex items-center justify-center shadow-sm">
                  {totalCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Language + Cart + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="flex items-center bg-paper-warm p-0.5 rounded-full border border-text-wood/15 text-[11px] font-bold font-price">
              <button
                onClick={() => setLang("vi")}
                className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                  lang === "vi"
                    ? "bg-brand-red text-brand-gold shadow-sm"
                    : "text-text-wood/60"
                }`}
              >
                VI
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                  lang === "en"
                    ? "bg-brand-red text-brand-gold shadow-sm"
                    : "text-text-wood/60"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => openCart()}
              className="relative w-11 h-11 flex items-center justify-center text-brand-red rounded-xl hover:bg-text-wood/5 transition-colors cursor-pointer"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag size={22} />
              {totalCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-red text-brand-gold font-price text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {totalCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-11 h-11 flex items-center justify-center text-brand-red rounded-lg hover:bg-text-wood/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide-in from right */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-text-wood/50 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-paper-ivory shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="h-14 flex items-center justify-between px-4 border-b border-text-wood/10">
                <span className="font-serif font-bold text-brand-red text-lg">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-11 h-11 flex items-center justify-center text-text-wood/60 hover:text-brand-red"
                  aria-label="Đóng menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav links — min 48px touch height */}
              <div className="flex-1 px-4 py-6 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center h-12 px-3 rounded-xl text-base font-sans font-medium text-text-wood hover:text-brand-red hover:bg-brand-red/5 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Drawer CTA — full width 48px height */}
              <div className="p-4 border-t border-text-wood/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openCart();
                  }}
                  className="w-full h-12 inline-flex items-center justify-center gap-2 bg-brand-red text-brand-gold rounded-full text-sm font-semibold uppercase tracking-widest shadow-md hover:bg-brand-red-hover transition-all cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  <span>{t.nav.exploreBox}</span>
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
};

export default Navbar;
