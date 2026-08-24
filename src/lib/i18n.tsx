"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type Language = "vi" | "en";

export interface Translations {
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
    items: {
      nonLa: { name: string; village: string; subtitle: string; desc: string; tag: string };
      toHe: { name: string; village: string; subtitle: string; desc: string; tag: string };
      chuonChuon: { name: string; village: string; subtitle: string; desc: string; tag: string };
    };
  };
  modal: {
    materialsHeader: string;
    giftHeader: string;
    giftNoteTitle: string;
    giftNoteDesc: string;
    selectBoxBtn: string;
    close: string;
    secretTag: string;
    baseTag: string;
    gift1Tag: string;
    gift2Tag: string;
  };
  cart: {
    title: string;
    itemCountSuffix: string;
    emptyTitle: string;
    emptySubtitle: string;
    selectedProducts: string;
    addMore: string;
    totalLabel: string;
    checkoutBtn: string;
    formTitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    paymentMethodLabel: string;
    paymentVietQR: string;
    paymentCOD: string;
    codBadge: string;
    confirmOrderBtn: string;
    backToCart: string;
    orderListTitle: string;
    orderSuccessTitle: string;
    orderSuccessThanks: string;
    orderCodeLabel: string;
    totalAmount: string;
    vietqrScanGuide: string;
    vietqrTransferContent: string;
    vietqrBankAccount: string;
    codConfirmMsg: string;
    messengerConfirmBtn: string;
    callConfirmNote: string;
    finishBtn: string;
  };
  storySection: {
    badge: string;
    title: string;
    subtitle: string;
    artisanTitle: string;
    artisanDesc: string;
    statVillages: string;
    statArtisans: string;
    statHandmade: string;
  };
  b2b: {
    badge: string;
    title: string;
    subtitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    formTitle: string;
    companyLabel: string;
    companyPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
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
      products: "BST Hương Sắc Giao Thời",
      story: "Làng Nghề",
      b2b: "B2B Doanh Nghiệp",
      cart: "Giỏ Hàng",
      exploreBox: "Khám phá Hộp",
    },
    hero: {
      badge: "BỘ KIT DIY SẢN PHẨM THỦ CÔNG LÀNG NGHỀ VIỆT NAM",
      titleLine1: "CHẠM TINH HOA",
      titleLine2: "MỞ VĂN HÓA",
      subtitle:
        "Đánh thức giác quan, trải nghiệm văn hóa Việt qua từng hộp khám phá.",
      ctaExplore: "KHÁM PHÁ SẢN PHẨM",
      ctaBlindBox: "MỞ HỘP NGẪU NHIÊN",
    },
    products: {
      badge: "KHÁM PHÁ LÀNG NGHỀ VIỆT NAM",
      title: "BỘ KIT DIY Sản Phẩm Thủ Công Làng Nghề Việt Nam",
      subtitle: "Biết chủ đề – Bất ngờ phiên bản. Chọn làng nghề bạn yêu thích, tự tay hoàn thiện sản phẩm và khám phá những câu chuyện văn hóa được gìn giữ qua nhiều thế hệ.",
      viewDetails: "Xem chi tiết ->",
      addToCart: "Thêm Vào Giỏ",
      priceSuffix: "đ",
      items: {
        nonLa: {
          name: "Bộ DIY Nón Lá Mini",
          village: "Làng Nón Chuông — Hà Nội",
          subtitle: "Trang trí nón lá thủ công",
          desc: "Bộ kit tự làm nón lá mini kèm quà tặng ngẫu nhiên.",
          tag: "LÀNG NÓN CHUÔNG",
        },
        toHe: {
          name: "Bộ DIY Tò He Dân Gian",
          village: "Làng Tò He Xuân La — Hà Nội",
          subtitle: "Nặn tò he truyền thống",
          desc: "Nặn tò he bằng bột màu tự nhiên kèm bộ dụng cụ tạo hình.",
          tag: "LÀNG TÒ HE XUÂN LA",
        },
        chuonChuon: {
          name: "Bộ DIY Chuồn Chuồn Tre",
          village: "Làng Tre Thạch Xá — Hà Nội",
          subtitle: "Tô màu chuồn chuồn thăng bằng",
          desc: "Tô màu chuồn chuồn tre thăng bằng kèm chân đế.",
          tag: "LÀNG TRE THẠCH XÁ",
        },
      },
    },
    modal: {
      materialsHeader: "Thành phần trong hộp:",
      giftHeader: "1 TRONG CÁC PHỤ KIỆN TẶNG KÈM NGẪU NHIÊN:",
      giftNoteTitle: "Ghi chú phần quà ngẫu nhiên",
      giftNoteDesc:
        "Mỗi hộp chắc chắn gồm bộ dụng cụ làm thủ công đầy đủ, đi kèm 1 phụ kiện hoặc chi tiết trang trí ngẫu nhiên trong các mẫu hiển thị ở gallery bên trái.",
      selectBoxBtn: "CHỌN HỘP NÀY - ",
      close: "Đóng",
      secretTag: "Hiếm",
      baseTag: "Gốc",
      gift1Tag: "Mẫu 01",
      gift2Tag: "Mẫu 02",
    },
    cart: {
      title: "Giỏ Hàng",
      itemCountSuffix: "sản phẩm",
      emptyTitle: "Giỏ hàng của bạn đang trống.",
      emptySubtitle: "Chọn thêm các Hộp DIY bên dưới để đặt mua chung một đơn hàng!",
      selectedProducts: "SẢN PHẨM ĐÃ CHỌN:",
      addMore: "THÊM HỘP KHÁC VỀ CÙNG CHUYẾN:",
      totalLabel: "Tổng tiền:",
      checkoutBtn: "TIẾP TỤC ĐẶT HÀNG",
      formTitle: "Thông Tin Đặt Hàng",
      fullNameLabel: "Họ và tên người nhận",
      fullNamePlaceholder: "Nhập đầy đủ họ và tên",
      phoneLabel: "Số điện thoại nhận hàng",
      phonePlaceholder: "Nhập số điện thoại (10 chữ số)",
      addressLabel: "Địa chỉ giao hàng chi tiết",
      addressPlaceholder: "Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành",
      notesLabel: "Ghi chú giao hàng (Không bắt buộc)",
      notesPlaceholder: "Ví dụ: Giao giờ hành chính, gọi trước khi giao...",
      paymentMethodLabel: "PHƯƠNG THỨC THANH TOÁN:",
      paymentVietQR: "Chuyển khoản Ngân hàng (VietQR)",
      paymentCOD: "Thanh toán khi nhận hàng (COD)",
      codBadge: "Hình thức: Ship COD (Thanh toán tiền mặt khi nhận hàng)",
      confirmOrderBtn: "XÁC NHẬN ĐẶT HÀNG",
      backToCart: "Quay lại giỏ hàng",
      orderListTitle: "Danh sách đặt mua",
      orderSuccessTitle: "Đặt Hàng Thành Công!",
      orderSuccessThanks: "Cảm ơn bạn đã đồng hành cùng Chạm Thức.",
      orderCodeLabel: "Mã đơn hàng:",
      totalAmount: "Tổng tiền:",
      vietqrScanGuide: "Quét mã QR để chuyển khoản nhanh",
      vietqrTransferContent: "Nội dung chuyển khoản:",
      vietqrBankAccount: "Tài khoản ngân hàng:",
      codConfirmMsg: "Bạn đã chọn Thanh toán khi nhận hàng. Shop sẽ xác nhận đơn và giao tới bạn sớm nhất!",
      messengerConfirmBtn: "Xác nhận đơn qua Messenger",
      callConfirmNote: "Đội ngũ Chạm Thức sẽ gọi điện xác nhận đơn hàng trước khi giao!",
      finishBtn: "HOÀN TẤT",
    },
    storySection: {
      badge: "TRẠM KỂ CHUYỆN",
      title: "Làng Nghề Truyền Thống",
      subtitle: "Hành trình bảo tồn và trao truyền giá trị di sản thủ công Việt qua từng thế hệ nghệ nhân.",
      artisanTitle: "Nghệ Nhân Làng Nghề Việt",
      artisanDesc:
        "Từng ngón tay nghệ nhân gửi gắm cả cuộc đời gìn giữ di sản dân tộc. Chạm Thức đồng hành trao truyền nét đẹp thủ công đến thế hệ trẻ.",
      statVillages: "Làng nghề di sản",
      statArtisans: "Nghệ nhân kỳ cựu",
      statHandmade: "Thủ công 100%",
    },
    b2b: {
      badge: "Doanh Nghiệp & ESG",
      title: "Giải Pháp Quà Tặng B2B",
      subtitle: "Nâng tầm quà tặng đối tác bằng mô hình Hộp Khám Phá di sản cá nhân hóa.",
      pillar1Title: "Kết Nối Nghệ Nhân Và Làng Nghề",
      pillar1Desc: "Góp phần đưa sản phẩm và giá trị của làng nghề đến gần hơn với khách hàng, đối tác và cộng đồng thông qua một hình thức trải nghiệm hiện đại.",
      pillar2Title: "Đồng Hành Cùng ESG",
      pillar2Desc: "Kết hợp giá trị văn hóa, cộng đồng và tiêu dùng có trách nhiệm trong các chương trình quà tặng doanh nghiệp, góp phần tạo thêm giá trị xã hội từ mỗi sản phẩm.",
      pillar3Title: "Bao Bì Xanh",
      pillar3Desc: "Sử dụng 100% vật liệu tre nứa và bao bì tự nhiên phân hủy sinh học theo định hướng ESG.",
      formTitle: "ĐĂNG KÝ TƯ VẤN QUÀ TẶNG B2B",
      companyLabel: "Tên đơn vị / Doanh nghiệp *",
      companyPlaceholder: "Nhập tên công ty hoặc tổ chức",
      phoneLabel: "Số điện thoại liên hệ *",
      phonePlaceholder: "Nhập số điện thoại (10 chữ số)",
      emailLabel: "Email doanh nghiệp *",
      emailPlaceholder: "example@company.com",
      submitBtn: "GỬI YÊU CẦU TƯ VẤN B2B",
      successTitle: "Gửi Yêu Cầu Thành Công!",
      successDesc: "Chạm Thức sẽ liên hệ trực tiếp với bạn trong vòng 24 giờ làm việc.",
    },
    footer: {
      tagline:
        "Chạm Thức là dự án phát triển các hộp trải nghiệm văn hóa Việt Nam theo chủ đề làng nghề truyền thống.",
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
      badge: "HANDCRAFTED DIY KITS — VIETNAMESE CRAFT VILLAGES",
      titleLine1: "TOUCH ESSENCE",
      titleLine2: "UNLOCK CULTURE",
      subtitle:
        "Awaken your senses, experience Vietnamese culture through each discovery box.",
      ctaExplore: "EXPLORE PRODUCTS",
      ctaBlindBox: "MYSTERY BOX",
    },
    products: {
      badge: "EXPLORE VIETNAMESE CRAFT VILLAGES",
      title: "Handcrafted DIY Kits — Vietnamese Craft Villages",
      subtitle: "Know the theme — Surprise the edition. Pick your favorite craft village, handcraft the product, and discover cultural stories preserved across generations.",
      viewDetails: "View Details ->",
      addToCart: "Add to Cart",
      priceSuffix: "VND",
      items: {
        nonLa: {
          name: "Mini Conical Hat DIY Kit",
          village: "Chuong Village — Hanoi",
          subtitle: "Handcrafted Conical Hat Painting",
          desc: "DIY mini conical hat kit with mystery random accessories.",
          tag: "CHUONG VILLAGE",
        },
        toHe: {
          name: "Folk Toy Dough (To He) Kit",
          village: "Xuan La Village — Hanoi",
          subtitle: "Traditional Dough Figurines",
          desc: "Mold traditional figurines with natural rice dough & sculpting tools.",
          tag: "XUAN LA VILLAGE",
        },
        chuonChuon: {
          name: "Bamboo Dragonfly DIY Kit",
          village: "Thach Xa Village — Hanoi",
          subtitle: "Balancing Bamboo Dragonfly",
          desc: "Paint balancing bamboo dragonflies with display stands.",
          tag: "THACH XA VILLAGE",
        },
      },
    },
    modal: {
      materialsHeader: "Box Component Kit:",
      giftHeader: "1 OF RANDOM BONUS ACCESSORIES:",
      giftNoteTitle: "Mystery Gift Note",
      giftNoteDesc:
        "Each kit comes with full DIY tools plus 1 random accessory or decoration item from the left gallery variants.",
      selectBoxBtn: "CHOOSE THIS KIT - ",
      close: "Close",
      secretTag: "Secret",
      baseTag: "Base",
      gift1Tag: "Item 01",
      gift2Tag: "Item 02",
    },
    cart: {
      title: "Shopping Cart",
      itemCountSuffix: "items",
      emptyTitle: "Your shopping cart is currently empty.",
      emptySubtitle: "Select DIY Experience Kits below to combine them into one order!",
      selectedProducts: "SELECTED PRODUCTS:",
      addMore: "ADD MORE KITS TO THIS SHIPMENT:",
      totalLabel: "Total:",
      checkoutBtn: "PROCEED TO CHECKOUT",
      formTitle: "Order Information",
      fullNameLabel: "Full Recipient Name",
      fullNamePlaceholder: "Enter your full name",
      phoneLabel: "Contact Phone Number",
      phonePlaceholder: "Enter 10-digit phone number",
      addressLabel: "Detailed Shipping Address",
      addressPlaceholder: "House number, street name, district, city",
      notesLabel: "Delivery Notes (Optional)",
      notesPlaceholder: "e.g. Deliver during office hours, call before arrival...",
      paymentMethodLabel: "PAYMENT METHOD:",
      paymentVietQR: "Bank Transfer (VietQR)",
      paymentCOD: "Cash on Delivery (COD)",
      codBadge: "Payment: Ship COD (Cash on Delivery)",
      confirmOrderBtn: "CONFIRM ORDER",
      backToCart: "Back to cart",
      orderListTitle: "Order items",
      orderSuccessTitle: "Order Placed Successfully!",
      orderSuccessThanks: "Thank you for supporting Vietnamese craft village heritage with Cham Thuc.",
      orderCodeLabel: "Order Code:",
      totalAmount: "Total:",
      vietqrScanGuide: "Scan the QR code for instant bank transfer",
      vietqrTransferContent: "Transfer description:",
      vietqrBankAccount: "Bank account:",
      codConfirmMsg: "You selected Cash on Delivery. We will confirm your order and deliver it to you as soon as possible!",
      messengerConfirmBtn: "Confirm order via Messenger",
      callConfirmNote: "Our Cham Thuc team will phone you to confirm the order before shipping!",
      finishBtn: "FINISH",
    },
    storySection: {
      badge: "STORY STATION",
      title: "Traditional Craft Villages",
      subtitle: "Preserving and passing down Vietnamese handcraft heritage values across generations of master artisans.",
      artisanTitle: "Vietnamese Heritage Master Artisans",
      artisanDesc:
        "Every artisan dedicates a lifetime to preserving national culture. Cham Thuc accompanies them in sharing handicraft beauty with younger generations.",
      statVillages: "Heritage Villages",
      statArtisans: "Master Artisans",
      statHandmade: "100% Handcrafted",
    },
    b2b: {
      badge: "Corporate & ESG",
      title: "B2B Gifting Solutions",
      subtitle: "Elevate partner gifts with personalized cultural heritage discovery boxes.",
      pillar1Title: "Connecting Artisans & Craft Villages",
      pillar1Desc: "Bringing craft village products and cultural values closer to customers, partners, and communities through modern experiential formats.",
      pillar2Title: "ESG Partnership",
      pillar2Desc: "Combining cultural values, community engagement, and responsible consumption in corporate gifting programs, adding social value to every product.",
      pillar3Title: "Green Eco Packaging",
      pillar3Desc: "Use 100% natural bamboo & biodegradable eco-friendly packaging aligned with corporate ESG.",
      formTitle: "REGISTER FOR B2B GIFT CONSULTATION",
      companyLabel: "Company / Organization Name *",
      companyPlaceholder: "Enter your company or organization name",
      phoneLabel: "Contact Phone Number *",
      phonePlaceholder: "Enter 10-digit phone number",
      emailLabel: "Corporate Email *",
      emailPlaceholder: "example@company.com",
      submitBtn: "SUBMIT B2B CONSULTATION REQUEST",
      successTitle: "Inquiry Submitted Successfully!",
      successDesc: "Our Cham Thuc team will contact you within 24 business hours.",
    },
    footer: {
      tagline:
        "Cham Thuc is a project developing Vietnamese cultural heritage experience boxes themed around traditional craft villages.",
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
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "vi";
    try {
      const saved = localStorage.getItem("cham_thuc_lang") as Language;
      if (saved === "vi" || saved === "en") {
        return saved;
      }
    } catch {
      // ignore
    }
    return "vi";
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cham_thuc_lang", newLang);
      } catch {
        // ignore
      }
    }
  }, []);

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
