import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3A2618] text-[#F8F5F0] py-12 px-6 border-t border-[#F8F5F0]/10 text-center font-sans">
      <div className="max-w-4xl mx-auto space-y-4">
        <Image
          src="/logo.png"
          alt="Chạm Thức Logo"
          width={180}
          height={60}
          className="h-14 w-auto mx-auto opacity-90 object-contain"
        />
        <p className="font-serif text-lg text-[#F8F5F0] font-light tracking-wide">
          Chạm Tinh Hoa - Mở Văn Hóa
        </p>
        <p className="text-xs sm:text-sm max-w-lg mx-auto opacity-70 leading-relaxed">
          Dự án phát triển các hộp trải nghiệm văn hóa Việt Nam theo chủ đề làng nghề truyền thống bởi Ngũ Sắc Team.
        </p>
        <div className="pt-6 border-t border-[#F8F5F0]/10 text-xs opacity-50">
          &copy; 2026 Chạm Thức Project by Ngũ Sắc. Built with Next.js & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
};
