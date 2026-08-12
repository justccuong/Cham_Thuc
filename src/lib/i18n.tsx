"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "vi" | "en";

interface Translations {
  nav: {
    home: string;
    products: string;
    story: string;
    b2b: string;
    cart: string;
    exploreBox: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaExplore: string;
    ctaBlindBox: string;
  };
  products: {
    badge: string;
    title: string;
    subtitle: string;
    viewDetails: string;
    addToCart: string;
    priceSuffix: string;
  };
  modal: {
    secretItem: string;
    materials: string;
    artisanStory: string;
    blindBoxTag: string;
    addToCart: string;
    orderNow: string;
  };
  cart: {
    title: string;
    itemCount: string;
    emptyTitle: string;
    emptySubtitle: string;
    selectedProducts: string;
    addMore: string;
    totalCOD: string;
    checkoutBtn: string;
    formTitle: string;
    fullName: string;
    phone: string;
    address: string;
    notes: string;
    confirmOrder: string;
    orderSuccess: string;
    orderCode: string;
    finish: string;
  };
  storySection: {
    badge: string;
    title: string;
    subtitle: string;
    statVillages: string;
    statArtisans: string;
    statHandmade: string;
  };
  b2b: {
    badge: string;
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    cta: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    rights: string;
  };
}

export const translations: Record<Language, Translations> = {
  vi: {
    nav: {
      home: "Trang chủ",
      products: "Hộp Giao Thời",
      story: "Làng Nghề",
      b2b: "B2B Doanh Nghiệp",
      cart: "Giỏ Hàng",
      exploreBox: "Khám phá Hộp",
    },
    hero: {
      badge: "BỘ KIT DIY THỦ CÔNG DI SẢN VIỆT NAM",
      titleLine1: "CHẠM TINH HOA",
      titleLine2: "MỞ VĂN HÓA",
      subtitle:
        "Mang tinh hoa làng nghề truyền thống Việt Nam về ngôi nhà của bạn qua từng chiếc Hộp DIY thủ công độc bản.",
      ctaExplore: "KHÁM PHÁ BỘ KIT",
      ctaBlindBox: "MỞ HỘP NGẪU NHIÊN",
    },
    products: {
      badge: "BỘ BỘT LÀNG NGHỀ THỦ CÔNG",
      title: "BỘ KIT DIY HỘP GIAO THỜI",
      subtitle:
        "Mỗi bộ kit bao gồm đầy đủ nguyên liệu tự nhiên, dụng cụ chế tác thủ công và câu chuyện di sản làng nghề độc bản.",
      viewDetails: "Xem Chi Tiết",
      addToCart: "Thêm Vào Giỏ",
      priceSuffix: "đ",
    },
    modal: {
      secretItem: "Vật phẩm bí mật",
      materials: "Nguyên liệu tự nhiên",
      artisanStory: "Hành trình di sản nghệ nhân",
      blindBoxTag: "Hộp Quà Ngẫu Nhiên",
      addToCart: "THÊM VÀO GIỎ HÀNG",
      orderNow: "ĐẶT MUA NGAY",
    },
    cart: {
      title: "Giỏ Hàng",
      itemCount: "sản phẩm",
      emptyTitle: "Giỏ hàng của bạn đang trống.",
      emptySubtitle: "Chọn thêm các Hộp DIY bên dưới để đặt mua chung một đơn hàng!",
      selectedProducts: "SẢN PHẨM ĐÃ CHỌN:",
      addMore: "THÊM HỘP KHÁC VỀ CÙNG CHUYẾN:",
      totalCOD: "Tổng tiền thanh toán (COD):",
      checkoutBtn: "TIẾP TỤC ĐẶT HÀNG COD",
      formTitle: "Thông Tin Đặt Hàng COD",
      fullName: "Họ và tên người nhận",
      phone: "Số điện thoại nhận hàng",
      address: "Địa chỉ nhận hàng chi tiết",
      notes: "Ghi chú cho đơn hàng (không bắt buộc)",
      confirmOrder: "XÁC NHẬN ĐẶT HÀNG COD",
      orderSuccess: "Đặt Hàng Thành Công!",
      orderCode: "Mã đơn hàng:",
      finish: "HOÀN TẤT",
    },
    storySection: {
      badge: "TRẠM VĂN HÓA DI SẢN",
      title: "CÂU CHUYỆN LÀNG NGHỀ",
      subtitle: "Hành trình bảo tồn và trao truyền giá trị di sản thủ công Việt qua từng thế hệ nghệ nhân.",
      statVillages: "Làng nghề di sản",
      statArtisans: "Nghệ nhân kỳ cựu",
      statHandmade: "Thủ công 100%",
    },
    b2b: {
      badge: "GIẢI PHÁP QUÀ TẶNG DOANH NGHIỆP ESG",
      title: "ĐỒNG HÀNH CÙNG DI SẢN VIỆT",
      subtitle: "Mang văn hóa di sản thủ công Việt Nam vào quà tặng doanh nghiệp sang trọng và bền vững.",
      feature1Title: "Đột phá ESG",
      feature1Desc: "Tạo tác động xã hội hỗ trợ trực tiếp thu nhập nghệ nhân làng nghề.",
      feature2Title: "Độc Bản Thương Hiệu",
      feature2Desc: "Khắc logo thương hiệu riêng trên các hộp quà chất liệu mây tre tự nhiên.",
      feature3Title: "Trải Nghiệm Văn Hóa",
      feature3Desc: "Tổ chức Workshop thủ công trải nghiệm trực tiếp cho nhân sự và đối tác.",
      cta: "LIÊN HỆ HỢP TÁC DOANH NGHIỆP",
    },
    footer: {
      tagline: "Nền tảng thương mại trải nghiệm di sản và bộ kit DIY làng nghề truyền thống Việt Nam.",
      copyright: "Chạm Thức. Tất cả quyền được bảo lưu.",
      rights: "Tôn vinh nghệ nhân dân gian Việt Nam.",
    },
  },
  en: {
    nav: {
      home: "Home",
      products: "DIY Kits",
      story: "Craft Villages",
      b2b: "Corporate B2B",
      cart: "Cart",
      exploreBox: "Explore Kits",
    },
    hero: {
      badge: "VIETNAMESE HERITAGE HANDCRAFTED DIY KITS",
      titleLine1: "TOUCH ESSENCE",
      titleLine2: "UNLOCK CULTURE",
      subtitle:
        "Bring the essence of traditional Vietnamese craft villages into your home through unique DIY experience boxes.",
      ctaExplore: "EXPLORE DIY KITS",
      ctaBlindBox: "MYSTERY BOX",
    },
    products: {
      badge: "HERITAGE HANDCRAFTED COLLECTION",
      title: "DIY EXPERIENCE KITS",
      subtitle:
        "Each kit includes natural raw materials, traditional craft tools, and unique artisan heritage stories.",
      viewDetails: "View Details",
      addToCart: "Add to Cart",
      priceSuffix: "VND",
    },
    modal: {
      secretItem: "Secret Item",
      materials: "Natural Materials",
      artisanStory: "Artisan Heritage Journey",
      blindBoxTag: "Mystery Gift Box",
      addToCart: "ADD TO SHOPPING CART",
      orderNow: "ORDER NOW",
    },
    cart: {
      title: "Shopping Cart",
      itemCount: "items",
      emptyTitle: "Your shopping cart is currently empty.",
      emptySubtitle: "Add DIY Experience Kits below to combine them into one order!",
      selectedProducts: "SELECTED PRODUCTS:",
      addMore: "ADD MORE KITS TO THIS SHIPMENT:",
      totalCOD: "Total COD Payment:",
      checkoutBtn: "PROCEED TO COD CHECKOUT",
      formTitle: "COD Shipping Information",
      fullName: "Full Name",
      phone: "Phone Number",
      address: "Detailed Shipping Address",
      notes: "Order Notes (Optional)",
      confirmOrder: "CONFIRM COD ORDER",
      orderSuccess: "Order Placed Successfully!",
      orderCode: "Order Code:",
      finish: "FINISH",
    },
    storySection: {
      badge: "HERITAGE CULTURAL STATION",
      title: "CRAFT VILLAGE STORIES",
      subtitle: "Preserving and passing down Vietnamese handcraft heritage values across generations.",
      statVillages: "Heritage Villages",
      statArtisans: "Master Artisans",
      statHandmade: "100% Handcrafted",
    },
    b2b: {
      badge: "CORPORATE ESG GIFTING SOLUTIONS",
      title: "PARTNER WITH VIETNAMESE HERITAGE",
      subtitle: "Elevate your corporate gifting with authentic, sustainable Vietnamese craft heritage.",
      feature1Title: "ESG Social Impact",
      feature1Desc: "Directly support artisan livelihoods and local craft village economies.",
      feature2Title: "Custom Branding",
      feature2Desc: "Engrave your custom corporate logo on premium bamboo and rattan gift boxes.",
      feature3Title: "Cultural Workshops",
      feature3Desc: "Organize hands-on traditional craft workshops for clients and team events.",
      cta: "CONTACT FOR CORPORATE B2B",
    },
    footer: {
      tagline: "Experience platform for Vietnamese traditional craft village DIY kits and cultural heritage.",
      copyright: "Cham Thuc. All rights reserved.",
      rights: "Honoring Vietnamese folk master artisans.",
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("vi");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cham_thuc_lang") as Language;
      if (saved === "vi" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("cham_thuc_lang", newLang);
    } catch {
      // ignore
    }
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
