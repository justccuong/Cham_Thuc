"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const StorySection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const storyText = `Giữa nhịp sống hiện đại, nhiều giá trị văn hóa truyền thống đang dần trở nên xa lạ với thế hệ trẻ. Chạm Thức ra đời với mong muốn tạo nên một không gian kết nối giữa văn hóa và cuộc sống hiện đại, nơi những câu chuyện xưa được tiếp cận bằng những cách gần gũi và mới mẻ hơn. Thông qua việc khám phá các giá trị văn hóa, làng nghề truyền thống và những nét đẹp dân gian Việt Nam, Chạm Thức hy vọng có thể góp phần đưa văn hóa đến gần hơn với cộng đồng.`;

  return (
    <section id="story" className="py-24 px-6 bg-white border-y border-[#3A2618]/10 text-[#3A2618]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs font-bold tracking-widest text-[#285834] uppercase mb-2 block font-sans"
        >
          Triết Lý & Sứ Mệnh
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-serif text-3xl sm:text-5xl font-normal text-[#9A1B1F] mb-8"
        >
          Chạm Tinh Hoa - Mở Văn Hóa
        </motion.h2>

        <div className="relative overflow-hidden transition-all duration-500">
          <p className={`font-sans text-base sm:text-lg leading-relaxed text-justify sm:text-center text-[#3A2618]/90 font-light ${!isExpanded ? "line-clamp-3 sm:line-clamp-4" : ""}`}>
            {storyText}
          </p>
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 text-[#9A1B1F] hover:bg-[#9A1B1F]/10"
        >
          <span>{isExpanded ? "Thu gọn câu chuyện" : "Đọc tiếp câu chuyện"}</span>
          {isExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
        </Button>
      </div>
    </section>
  );
};
