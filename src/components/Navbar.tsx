"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import CartDrawer from "./CartDrawer";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Trang chủ", href: "#hero" },
  { label: "Hộp Giao Thời", href: "#products" },
  { label: "Làng Nghề", href: "#story" },
  { label: "B2B", href: "#b2b" },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 h-14 sm:h-16 flex items-center ${
          scrolled
            ? "translate-y-0 bg-paper-ivory/80 backdrop-blur-md border-b border-text-wood/10 shadow-sm"
            : "-translate-y-full"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <Image
              src="/logo.png"
              alt="CHẠM THỨC"
              width={120}
              height={38}
              className="h-8 sm:h-10 w-auto object-contain"
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
                className="ct-nav-link hover:text-brand-red transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA — desktop only */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setCartOpen(true)}
              className="inline-flex items-center gap-2 bg-brand-red text-brand-gold rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-brand-red-hover transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ShoppingBag size={14} />
              <span>Khám phá Hộp</span>
            </button>
          </div>

          {/* Mobile: Cart + Hamburger — min 44×44 tap area */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={() => setCartOpen(true)}
              className="w-11 h-11 flex items-center justify-center text-brand-red rounded-lg hover:bg-text-wood/5 transition-colors"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag size={22} />
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
              <div className="p-4 border-t border-text-wood/10">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setCartOpen(true);
                  }}
                  className="w-full h-12 inline-flex items-center justify-center gap-2 bg-brand-red text-brand-gold rounded-full text-sm font-semibold uppercase tracking-widest shadow-md hover:bg-brand-red-hover transition-all cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  <span>Khám phá Hộp</span>
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
