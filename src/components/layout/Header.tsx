"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-[#F8F5F0]/90 backdrop-blur-md border-b border-[#3A2618]/10 text-[#3A2618]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Chạm Thức Official Logo"
            width={44}
            height={44}
            className="h-10 md:h-11 w-10 md:w-11 rounded-full object-cover border border-[#9A1B1F]/20 shadow-sm transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <span className="font-serif font-bold text-lg md:text-xl text-[#9A1B1F] tracking-wide">
            CHẠM THỨC
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 font-serif tracking-wider text-sm font-medium">
          <Link href="#hero" className="ct-nav-link text-[#3A2618] hover:text-[#9A1B1F]">TRANG CHỦ</Link>
          <Link href="#story" className="ct-nav-link text-[#3A2618] hover:text-[#9A1B1F]">CÂU CHUYỆN</Link>
          <Link href="#products" className="ct-nav-link text-[#3A2618] hover:text-[#9A1B1F]">BỘ SƯU TẬP</Link>
          <Link href="#values" className="ct-nav-link text-[#3A2618] hover:text-[#9A1B1F]">GIÁ TRỊ CORE</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="primary" size="sm" onClick={() => {
            const el = document.getElementById("products");
            el?.scrollIntoView({ behavior: "smooth" });
          }}>
            <ShoppingBag size={14} className="mr-1.5" />
            Khám Phá ngay
          </Button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#3A2618] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      {isOpen && (
        <div className="md:hidden bg-[#F8F5F0] border-t border-[#3A2618]/10 px-6 py-6 space-y-4 font-serif text-center shadow-xl">
          <Link href="#hero" onClick={() => setIsOpen(false)} className="block text-base py-2 hover:text-[#9A1B1F]">TRANG CHỦ</Link>
          <Link href="#story" onClick={() => setIsOpen(false)} className="block text-base py-2 hover:text-[#9A1B1F]">CÂU CHUYỆN</Link>
          <Link href="#products" onClick={() => setIsOpen(false)} className="block text-base py-2 hover:text-[#9A1B1F]">BỘ SƯU TẬP</Link>
          <Link href="#values" onClick={() => setIsOpen(false)} className="block text-base py-2 hover:text-[#9A1B1F]">GIÁ TRỊ CORE</Link>
          <Button variant="primary" className="w-full mt-4" onClick={() => setIsOpen(false)}>
            Khám Phá ngay
          </Button>
        </div>
      )}
    </header>
  );
};
