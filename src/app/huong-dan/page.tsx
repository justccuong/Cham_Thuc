"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  Download,
  Share2,
  Layers,
  Palette,
  ShoppingBag,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { CloudPatternOverlay } from "@/components/CloudPatternOverlay";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CustomCursor } from "@/components/CustomCursor";
import { useLanguage } from "@/lib/i18n";
import { useCart, ProductKey } from "@/lib/cart";

interface ProductGuide {
  id: ProductKey;
  name: string;
  village: string;
  location: string;
  price: number;
  coverImage: string;
  videoUrl: string;
  videoTitle: string;
  videoDuration: string;
  materials: { name: string; desc: string }[];
  steps: {
    number: string;
    title: string;
    description: string;
    tips?: string;
  }[];
  expertTips: string[];
}

const GUIDES_DATA: Record<ProductKey, ProductGuide> = {
  "non-la": {
    id: "non-la",
    name: "Bộ DIY Nón Lá Mini",
    village: "Làng Nón Chuông – Hà Nội",
    location: "Xã Phương Trung, Huyện Thanh Oai, Hà Nội",
    price: 160000,
    coverImage: "/products/non-la/cover.png",
    videoTitle: "Video Hướng Dẫn: Tự Tay Trang Trí Nón Lá Mini Nghệ Thuật",
    videoDuration: "08:45",
    videoUrl: "https://www.youtube.com/embed/oi-J_56CwCc",
    materials: [
      { name: "Phôi nón lá trắng mini", desc: "Được chằm thủ công từ lá cọ phơi sương làng Chuông" },
      { name: "Nón lụa mini", desc: "1 chiếc nón lụa mini màu sắc ngẫu nhiên độc bản" },
      { name: "Bộ vỉ màu Acrylic kèm cọ", desc: "Màu acrylic cao cấp chống thấm nước, bám chắc trên lá nón" },
      { name: "Keo dán charm", desc: "Keo dán chuyên dụng chắc chắn và nhanh khô" },
      { name: "Charm / Đá trang trí", desc: "Phụ kiện điểm xuyết tạo điểm nhấn thủ công độc bản" },
      { name: "Giấy hướng dẫn sử dụng (HDSD)", desc: "Ghi chép câu chuyện di sản và mẹo vẽ nét mảnh" },
    ],
    steps: [
      {
        number: "01",
        title: "Chuẩn Bị Bề Mặt & Phác Thảo Ý Tưởng",
        description:
          "Dùng khăn mềm khô lau nhẹ bụi trên phôi nón. Dùng bút chì nhạt (2B) phác thảo nhẹ nhàng họa tiết mong muốn (hoa sen, phong cảnh làng quê, hoa văn kỷ hà) lên các nan lá.",
        tips: "Tránh ấn mạnh đầu bút chì để không làm rách bề mặt lá nón mỏng.",
      },
      {
        number: "02",
        title: "Lên Màu Nền & Mảng Lớn",
        description:
          "Dùng cọ to lấy lượng màu vừa phải, không pha quá nhiều nước. Tô đều các mảng màu nền lớn theo chiều nan nón từ chóp nón xuống vành.",
        tips: "Chờ lớp màu nền khô trong 3–5 phút trước khi vẽ chi tiết đè lên.",
      },
      {
        number: "03",
        title: "Vẽ Nét Chi Tiết & Điểm Xuyết",
        description:
          "Sử dụng cọ nét nhỏ để viền nét hoa văn, cành lá hoặc viết thông điệp kỷ niệm. Tạo điểm nhấn với các gam màu tương phản.",
        tips: "Giữ cổ tay vững, xoay nhẹ nón theo từng góc độ để đi nét mảnh mượt mà.",
      },
      {
        number: "04",
        title: "Đính Kết Phụ Kiện & Hoàn Thiện",
        description:
          "Chấm nhẹ keo dán chuyên dụng để gắn đá trang trí hoặc gắn nón lụa mini trang trí. Để nón ở nơi khô thoáng 15–20 phút để màu khô hoàn toàn.",
        tips: "Tránh để nón dưới ánh nắng gắt trực tiếp ngay sau khi vừa vẽ xong.",
      },
    ],
    expertTips: [
      "Màu Acrylic khô rất nhanh, hãy đậy nắp khay màu sau khi lấy để tránh bị khô vón.",
      "Nếu vẽ nhầm, hãy nhanh chóng dùng tăm bông ẩm lau nhẹ khi màu chưa khô hẳn.",
      "Sản phẩm sau khi khô có thể treo trang trí bàn làm việc, góc văn hóa hoặc làm quà tặng ý nghĩa.",
    ],
  },
  "to-he": {
    id: "to-he",
    name: "Bộ DIY Tò He Dân Gian",
    village: "Làng Tò He Xuân La – Hà Nội",
    location: "Xã Phượng Dực, Huyện Phú Xuyên, Hà Nội",
    price: 160000,
    coverImage: "/products/to-he/cover.png",
    videoTitle: "Video Hướng Dẫn: Kỹ Thuật Nặn Con Giống Tò He Truyền Thống",
    videoDuration: "10:15",
    videoUrl: "https://www.youtube.com/embed/I5OfubRRNQg",
    materials: [
      { name: "Bột tò he 7 màu cao cấp", desc: "Bột nếp dẻo mịn không dính tay, an toàn, nhuộm màu tự nhiên" },
      { name: "Que tre nặn truyền thống", desc: "Thanh tre vót nhẵn làm trục giữ con giống" },
      { name: "Bộ dụng cụ tạo hình tò he", desc: "Lược khía, dao tạo nếp và que vuốt cánh hoa/vảy rồng" },
      { name: "Giấy hướng dẫn sử dụng (HDSD)", desc: "Sơ đồ tạo hình các con giống dân gian từ đơn giản đến nâng cao" },
    ],
    steps: [
      {
        number: "01",
        title: "Nhào Bột & Phối Màu",
        description:
          "Lấy một phần bột nhỏ, dùng lòng bàn tay xoa tròn để làm ấm và dẻo bột. Bạn có thể phối 2 màu bột với nhau để tạo hiệu ứng chuyển màu (ombre) độc đáo.",
        tips: "Nhào bột đều tay trong 30 giây để bề mặt bóng mịn không nứt.",
      },
      {
        number: "02",
        title: "Tạo Hình Khối Cơ Bản & Cố Định Lên Que",
        description:
          "Nặn khối thân chính (hình tròn, giọt nước hoặc bầu dục), cắm que tre vào giữa khối bột làm trục giữ chắc chắn.",
        tips: "Cắm que ngập khoảng 2/3 khối thân để con giống không bị nghiêng.",
      },
      {
        number: "03",
        title: "Gắn Các Chi Tiết Nhỏ & Tạo Vân",
        description:
          "Nặn mắt, tai, cánh hoa, vảy rồng hoặc áo giáp. Dùng đầu que vuốt hoặc lược tạo hình để ấn các đường gân, nếp gấp sinh động.",
        tips: "Chấm một giọt nước cực nhỏ vào mối nối nếu bột hơi se khô để dính chắc hơn.",
      },
      {
        number: "04",
        title: "Hoàn Thiện & Hong Khô Tự Nhiên",
        description:
          "Cắm que tò he lên chân đế hoặc cốc xốp. Để khô tự nhiên ở nhiệt độ phòng trong 12–24 giờ để sản phẩm cứng định hình bền đẹp.",
        tips: "Không sấy bằng máy sấy nhiệt cao để tránh bột bị nứt bề mặt.",
      },
    ],
    expertTips: [
      "Bọc kín các phần bột chưa dùng trong màng bọc nilon để giữ độ ẩm dẻo.",
      "Bắt đầu với những mẫu cơ bản như bông hoa, chú chim nhỏ, sau đó nâng cấp lên rồng hoặc nhân vật dân gian.",
      "Tò He sau khi khô hoàn toàn có thể trưng bày lưu niệm nhiều năm.",
    ],
  },
  "chuon-chuon": {
    id: "chuon-chuon",
    name: "Bộ DIY Chuồn Chuồn Tre",
    village: "Làng Chuồn Chuồn Tre Thạch Xá – Hà Nội",
    location: "Xã Thạch Xá, Huyện Thạch Thất, Hà Nội",
    price: 160000,
    coverImage: "/products/chuon-chuon/cover.png",
    videoTitle: "Video Hướng Dẫn: Phối Màu & Cân Bằng Chuồn Chuồn Tre Thạch Xá",
    videoDuration: "07:30",
    videoUrl: "https://www.youtube.com/embed/S6oV_RCgxuU",
    materials: [
      { name: "2 Chuồn chuồn tre mộc chưa sơn", desc: "Được vót tay chuẩn xác từ tre già Thạch Xá, tự thăng bằng trên đầu mỏ" },
      { name: "Chân đế 1 nhánh", desc: "Đế đỡ bằng gỗ/tre tự nhiên để trưng bày chuồn chuồn thăng bằng" },
      { name: "Khay pha màu", desc: "Khay pha màu tiện lợi giúp phối các gam màu phong phú" },
      { name: "Bộ vỉ màu Acrylic kèm 2 cọ vẽ", desc: "1 cọ to quét nền và 1 cọ nét siêu mảnh vẽ hoa văn cánh" },
      { name: "Giấy hướng dẫn sử dụng (HDSD)", desc: "Gợi ý hoa văn truyền thống và nguyên lý đối trọng thăng bằng" },
    ],
    steps: [
      {
        number: "01",
        title: "Kiểm Tra Điểm Thăng Bằng",
        description:
          "Đặt thử mỏ chuồn chuồn lên đầu ngón tay hoặc chân đế để cảm nhận điểm tự cân bằng độc đáo của tre mộc trước khi vẽ.",
        tips: "Trọng tâm đã được nghệ nhân căn chỉnh chuẩn xác qua góc nghiêng của 2 cánh.",
      },
      {
        number: "02",
        title: "Quét Lớp Sơn Nền Lưng & Cánh",
        description:
          "Dùng cọ to quét màu nền cho phần thân và mặt trên của đôi cánh. Có thể chọn màu đỏ chu sa, xanh ngọc bích, vàng hoàng yến hoặc màu sắc bạn yêu thích.",
        tips: "Quét lớp màu mỏng đều cả 2 bên cánh để giữ sự cân bằng trọng lượng.",
      },
      {
        number: "03",
        title: "Vẽ Hoa Văn Nghệ Thuật Lên Cánh",
        description:
          "Dùng cọ nét nhỏ điểm chấm hoa văn, vân cánh chuồn chuồn hoặc các họa tiết lượn sóng, chấm bi bắt mắt.",
        tips: "Vẽ cân xứng lượng màu giữa 2 cánh để chuồn chuồn thăng bằng chuẩn nhất.",
      },
      {
        number: "04",
        title: "Chấm Mắt & Đặt Lên Chân Đế Trưng Bày",
        description:
          "Chấm 2 mắt chuồn chuồn bằng màu đen hoặc vàng đồng. Sau khi màu khô hẳn, đặt mỏ chuồn chuồn lên chân đế 1 nhánh để thưởng thức tác phẩm tự tay bạn tạo nên!",
        tips: "Chuồn chuồn có thể thăng bằng trên bất kỳ điểm tựa nhỏ nào (đầu ngón tay, cành cây, mép bàn).",
      },
    ],
    expertTips: [
      "Quét màu đều tay giữa cánh trái và cánh phải để giữ nguyên độ thăng bằng hoàn hảo.",
      "Nếu chuồn chuồn hơi nghiêng một bên, bạn có thể quét thêm một lớp màu mỏng ở đầu cánh bên nhẹ hơn để cân bằng lại.",
      "Trưng bày tại bàn làm việc mang ý nghĩa phong thủy hanh thông, thanh tịnh và may mắn.",
    ],
  },
};

function GuideContent() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product") || searchParams.get("san-pham");

  const [activeProduct, setActiveProduct] = useState<ProductKey>("non-la");
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [copied, setCopied] = useState(false);

  const { totalCount, openCart } = useCart();
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    if (productParam && (productParam === "non-la" || productParam === "to-he" || productParam === "chuon-chuon")) {
      setActiveProduct(productParam as ProductKey);
    }
  }, [productParam]);

  const currentGuide = GUIDES_DATA[activeProduct];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/huong-dan?product=${activeProduct}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2A1B12] font-sans selection:bg-[#9A1B1F]/20 selection:text-[#9A1B1F] relative overflow-x-hidden">
      <CustomCursor />
      <CartDrawer />
      <CloudPatternOverlay variant="light" />

      {/* Top Floating Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#F8F5F0]/90 backdrop-blur-md border-b border-[#3A2618]/10 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#3A2618]/80 hover:text-[#9A1B1F] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Trang Chủ Chạm Thức</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Chạm Thức Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border border-[#3A2618]/15 shadow-sm"
            />
            <span className="font-serif font-black text-lg sm:text-xl text-[#9A1B1F] tracking-wide">
              CHẠM THỨC
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#3A2618]/15 text-xs font-semibold text-[#3A2618] hover:border-[#9A1B1F] hover:text-[#9A1B1F] shadow-sm transition-all cursor-pointer"
          >
            <Share2 size={13} />
            <span>{copied ? "Đã chép link!" : "Chia sẻ"}</span>
          </button>

          {/* Cart Button with Count Badge */}
          <button
            onClick={() => openCart()}
            className="relative px-3.5 py-1.5 bg-[#9A1B1F] hover:bg-[#7A1518] text-[#F4E8C1] font-bold text-xs sm:text-sm rounded-full flex items-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag size={15} />
            <span className="hidden sm:inline">Giỏ Hàng</span>
            {totalCount > 0 && (
              <span className="w-5 h-5 bg-[#F4E8C1] text-[#9A1B1F] text-[11px] font-black rounded-full flex items-center justify-center shadow-inner ml-0.5">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Header Section */}
      <section className="relative z-10 pt-8 sm:pt-14 pb-6 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#9A1B1F] bg-[#9A1B1F]/8 px-4 py-1.5 rounded-full border border-[#9A1B1F]/15 mb-3 sm:mb-4">
          <Sparkles size={14} className="text-[#9A1B1F]" />
          TRẠM HƯỚNG DẪN TRẢI NGHIỆM DIY
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#9A1B1F] tracking-tight mb-3 sm:mb-4 leading-tight">
          Khám Phá Cách Tự Tay Hoàn Thiện Tác Phẩm
        </h1>

        <p className="font-sans text-sm sm:text-base md:text-lg text-[#3A2618]/75 max-w-2xl mx-auto font-light leading-relaxed">
          Quét mã QR từ vỏ hộp để xem video hướng dẫn chi tiết từng bước từ nghệ nhân làng nghề, giúp bạn tự tin tạo nên sản phẩm thủ công di sản độc bản.
        </p>

        {/* 3 Equal Symmetrical Product Selector Tabs */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {(["non-la", "to-he", "chuon-chuon"] as ProductKey[]).map((pid) => {
            const p = GUIDES_DATA[pid];
            const isActive = activeProduct === pid;
            return (
              <button
                key={pid}
                onClick={() => {
                  setActiveProduct(pid);
                  setIsPlayingVideo(false);
                }}
                className={`w-full py-3 px-4 rounded-2xl font-sans text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer border flex items-center justify-center gap-2.5 ${
                  isActive
                    ? "bg-[#9A1B1F] text-[#F4E8C1] border-[#9A1B1F] shadow-[0_6px_20px_rgba(154,27,31,0.35)] scale-[1.02]"
                    : "bg-white text-[#3A2618]/80 border-[#3A2618]/15 hover:border-[#9A1B1F]/40 hover:text-[#9A1B1F] hover:bg-stone-50"
                }`}
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-white/30">
                  <Image src={p.coverImage} alt={p.name} fill className="object-cover" sizes="24px" />
                </div>
                <span className="truncate">{p.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 space-y-10 sm:space-y-14">
        {/* Active Product Title Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#3A2618]/15 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#285834] block">
                {currentGuide.village}
              </span>
              <span className="text-xs text-[#3A2618]/40">•</span>
              <div className="flex items-center gap-1 text-xs text-[#3A2618]/70">
                <MapPin size={12} className="text-[#9A1B1F]" />
                <span>{currentGuide.location}</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-[#9A1B1F]">
              {currentGuide.name}
            </h2>

            <p className="text-xs sm:text-sm text-[#3A2618]/75">
              Thời lượng xem gợi ý: <span className="font-bold text-[#9A1B1F]">{currentGuide.videoDuration}</span> • Trải nghiệm thực hành: 30–45 phút • Giá: <span className="font-price font-bold text-[#9A1B1F]">{currentGuide.price.toLocaleString("vi-VN")} đ</span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => openCart(activeProduct)}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#9A1B1F] hover:bg-[#7A1518] text-[#F4E8C1] rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer active:scale-95"
            >
              <ShoppingBag size={16} />
              <span>Đặt Hộp Này</span>
            </button>

            <a
              href={`/qr/qr-hdsd-${currentGuide.id}.png`}
              download={`QR_HDSD_${currentGuide.id}.png`}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#F8F5F0] hover:bg-[#9A1B1F]/10 border border-[#3A2618]/15 text-[#3A2618] hover:text-[#9A1B1F] rounded-2xl text-xs sm:text-sm font-bold transition-all"
              title="Tải mã QR để in ấn trên vỏ hộp / giấy HDSD"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Tải Mã QR</span>
            </a>
          </div>
        </div>

        {/* SECTION 1: VIDEO PLAYER */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-[#9A1B1F]">
            <Play size={22} className="fill-current" />
            <h3 className="font-serif text-xl sm:text-2xl font-black">
              Video Hướng Dẫn Chi Tiết
            </h3>
          </div>

          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black group">
            {isPlayingVideo ? (
              <iframe
                src={`${currentGuide.videoUrl}?autoplay=1`}
                title={currentGuide.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={currentGuide.coverImage}
                  alt={currentGuide.videoTitle}
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

                {/* Play Button Trigger */}
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className="absolute inset-0 m-auto w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#9A1B1F] hover:bg-[#7A1518] text-[#F4E8C1] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group-hover:ring-8 group-hover:ring-[#9A1B1F]/30"
                  aria-label="Phát video hướng dẫn"
                >
                  <Play size={32} className="fill-current ml-1" />
                </button>

                {/* Bottom Video Meta */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-1.5">
                  <span className="inline-block bg-[#9A1B1F] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                    VIDEO CHÍNH THỨC
                  </span>
                  <p className="font-serif text-lg sm:text-2xl font-bold drop-shadow-md">
                    {currentGuide.videoTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 drop-shadow">
                    Bấm để xem video từng nét vẽ và động tác của nghệ nhân
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: MATERIALS CHECKLIST */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-[#9A1B1F]">
            <Layers size={22} />
            <h3 className="font-serif text-xl sm:text-2xl font-black">
              Kiểm Tra Dụng Cụ Trong Hộp Của Bạn
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {currentGuide.materials.map((mat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#3A2618]/12 shadow-sm flex items-start gap-3.5 hover:border-[#9A1B1F]/35 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#285834]/10 text-[#285834] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm shadow-inner">
                  ✓
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-sm sm:text-base text-[#2A1B12]">
                    {mat.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3A2618]/70 font-light leading-relaxed">
                    {mat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: STEP-BY-STEP WORKFLOW */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 text-[#9A1B1F]">
            <Palette size={22} />
            <h3 className="font-serif text-xl sm:text-2xl font-black">
              4 Bước Hoàn Thiện Tác Phẩm
            </h3>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {currentGuide.steps.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#3A2618]/12 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-5 sm:gap-6 items-start hover:shadow-md transition-shadow"
              >
                {/* Step Big Number Badge */}
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#9A1B1F]/8 border border-[#9A1B1F]/20 flex items-center justify-center text-[#9A1B1F] font-serif font-black text-2xl sm:text-3xl shadow-inner">
                  {st.number}
                </div>

                <div className="flex-1 space-y-2.5">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#9A1B1F]">
                    {st.title}
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-[#3A2618]/90 leading-relaxed font-normal">
                    {st.description}
                  </p>

                  {st.tips && (
                    <div className="bg-[#FAF7F2] rounded-xl p-3.5 border border-[#3A2618]/12 text-xs sm:text-sm text-[#3A2618]/85 flex items-start gap-2 mt-2">
                      <span className="font-bold text-[#9A1B1F] flex-shrink-0">Mẹo nhỏ:</span>
                      <span>{st.tips}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 4: EXPERT TIPS FROM ARTISANS */}
        <section className="bg-gradient-to-br from-[#9A1B1F] to-[#7A1518] text-[#F4E8C1] rounded-3xl p-6 sm:p-10 shadow-xl space-y-4 sm:space-y-6 border border-[#F4E8C1]/20">
          <div className="flex items-center gap-2.5 text-[#F4E8C1]">
            <Sparkles size={24} />
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide">
              Bí Quyết Từ Nghệ Nhân Làng Nghề
            </h3>
          </div>

          <div className="space-y-3">
            {currentGuide.expertTips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#F4E8C1]/90 leading-relaxed font-light">
                <CheckCircle2 size={18} className="text-[#F4E8C1] flex-shrink-0 mt-1" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: LIVE SUPPORT & COMMUNITY SHARE */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#3A2618]/12 shadow-sm text-center space-y-6">
          <div className="max-w-md mx-auto space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#0084FF]/10 text-[#0084FF] flex items-center justify-center mx-auto mb-2 shadow-inner">
              <MessageCircle size={26} />
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1B12]">
              Cần Trợ Giúp Trong Quá Trình Làm?
            </h4>
            <p className="text-xs sm:text-sm text-[#3A2618]/70 font-light">
              Đội ngũ Chạm Thức luôn sẵn sàng giải đáp thắc mắc hoặc hướng dẫn trực tiếp nếu bạn gặp khó khăn trong khi thực hành.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://m.me/61592690401391"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0084FF] hover:bg-[#006FDB] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <MessageCircle size={18} />
              <span>Nhắn Tin Hỗ Trợ Qua Messenger</span>
            </a>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F8F5F0] hover:bg-[#3A2618]/10 border border-[#3A2618]/15 text-[#3A2618] font-bold text-sm sm:text-base rounded-2xl transition-all active:scale-95"
            >
              <span>Xem Thêm Các Hộp DIY Khác</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      {/* Full Consistent Brand Footer */}
      <Footer />
    </div>
  );
}

export default function HuongDanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-3 border-[#9A1B1F] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif font-bold text-[#9A1B1F]">Đang tải hướng dẫn...</p>
          </div>
        </div>
      }
    >
      <GuideContent />
    </Suspense>
  );
}
