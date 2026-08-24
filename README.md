# CHẠM THỨC — Chạm Tinh Hoa, Mở Văn Hóa

Chạm Thức là nền tảng thương mại trải nghiệm di sản và bộ kit DIY làng nghề truyền thống Việt Nam. Dự án tôn vinh nghệ nhân dân gian qua các sản phẩm sáng tạo từ Làng nón Chuông, Làng tò he Xuân La và Làng tre Thạch Xá.

---

## Tính Năng Nổi Bật

- **Giao Diện Editorial Lookbook:** Trình bày sản phẩm theo phong cách tạp chí di sản với tông màu Giấy Điệp (`#F8F5F0`) và Gỗ Trầm (`#2A1B12`).
- **Hộp Quà Ngẫu Nhiên (Blind Box Gallery):** Xem chi tiết sản phẩm 2 cột với 4 biến thể phụ kiện ngẫu nhiên kèm thông tin chi tiết về di sản nghệ nhân.
- **Giỏ Hàng Đa Sản Phẩm (Multi-Item Cart):** Quản lý chọn mua nhiều loại sản phẩm trong cùng một đơn hàng, tự động lưu và đồng bộ giỏ hàng qua `localStorage`.
- **Tự Động Tạo Mã Đơn Hàng Không Trùng Lặp:** Mã đơn dạng `CTMMDD-xxxxxx` với thuật toán kiểm tra trùng lặp 5 lần trước khi lưu vào cơ sở dữ liệu.
- **Xử Lý Đơn Hàng Real-Time (Next.js App Router API):** Ghi nhận đơn hàng vào Supabase Database với trạng thái `PENDING` / `PROCESSING`.
- **Thông Báo Đơn Hàng Qua Facebook Messenger:** Tự động gửi tin nhắn tổng hợp thông tin đơn hàng tới tài khoản Facebook Admin ngay khi khách hàng đặt mua thành công via Facebook Graph API.
- **Tích Hợp Thanh Toán VietQR & COD:** Tự động sinh mã VietQR theo số tiền đơn hàng và cung cấp nút xác nhận nhanh qua Messenger.
- **Trang Quản Trị Đơn Hàng Admin (/admin):** Bảo vệ bằng mã PIN, hiển thị thống kê tổng quan (doanh thu, số đơn, đơn chờ thanh toán) và cho phép cập nhật trạng thái đơn hàng / thanh toán theo thời gian thực.
- **Facebook Messenger Customer Chat Widget:** Nhúng plugin trò chuyện trực tiếp của Facebook Messenger ngay trên giao diện website.

---

## Công Nghệ Sử Dụng

- **Core Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling & Animation:** Tailwind CSS v4, Framer Motion
- **Database & Backend:** Supabase (PostgREST), Next.js API Routes (Serverless Functions)
- **Integrations:** Facebook Graph API v18.0, VietQR API, Lucide React

---

## Biến Môi Trường (Environment Variables)

Tạo file `.env` ở thư mục gốc của dự án và khai báo các biến môi trường sau:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Facebook Messenger Order Notifications (Graph API)
FB_PAGE_ACCESS_TOKEN="your-facebook-page-access-token"
ADMIN_FB_PSID="your-admin-facebook-psid"

# Facebook Customer Chat Widget & Fanpage Links
NEXT_PUBLIC_FB_PAGE_ID="your-facebook-page-id"
NEXT_PUBLIC_FB_PAGE_USERNAME="your-facebook-page-username"

# VietQR Payment Configuration
NEXT_PUBLIC_BANK_ID="MB"
NEXT_PUBLIC_BANK_ACCOUNT_NO="your-bank-account-number"
NEXT_PUBLIC_BANK_ACCOUNT_NAME="your-bank-account-name"

# Admin Dashboard Access PIN
NEXT_PUBLIC_ADMIN_PIN="123456"
```

---

## Cấu Trúc Cơ Sở Dữ Liệu (Supabase SQL Schema)

Chạy lệnh SQL sau trong **Supabase SQL Editor** để tạo bảng lưu trữ đơn hàng:

```sql
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  order_code text not null,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  product_name text not null,
  product_price numeric not null,
  payment_method text not null,
  notes text,
  payment_status text default 'PENDING',
  order_status text default 'PROCESSING',
  created_at timestamp with time zone default now()
);
```

---

## Hướng Dẫn Cài Đặt & Chạy Cục Bộ

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy server phát triển (Development mode):**
   ```bash
   npm run dev
   ```
   Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để kiểm tra giao diện.

3. **Kiểm tra build sản phẩm (Production build):**
   ```bash
   npm run build
   ```

4. **Chạy bản build sản phẩm:**
   ```bash
   npm run start
   ```

---

## Cấu Trúc Thư Mục Dự Án

```text
├── public/                     # Ảnh logo, sản phẩm và họa tiết vân mây
├── src/
│   ├── app/
│   │   ├── admin/page.tsx      # Trang quản trị Admin bảo vệ bằng PIN
│   │   ├── api/
│   │   │   ├── admin/update-order/route.ts  # API cập nhật trạng thái đơn hàng
│   │   │   └── checkout/route.ts            # API ghi nhận đơn hàng & phát tin nhắn FB
│   │   ├── globals.css         # Cấu hình Tailwind v4 và các màu di sản
│   │   ├── layout.tsx          # Root Layout chứa Cloud Pattern & Messenger Widget
│   │   └── page.tsx            # Landing Page chính Chạm Thức
│   ├── components/
│   │   ├── ui/                 # CraftCard, Button, ProductDrawer
│   │   ├── B2BSection.tsx      # Khối hợp tác doanh nghiệp ESG
│   │   ├── CartDrawer.tsx      # Giỏ hàng đa sản phẩm & form COD
│   │   ├── CheckoutModal.tsx   # Popup thanh toán VietQR & Messenger
│   │   ├── CloudPatternOverlay.tsx # Họa tiết mây biên lề 2 bên
│   │   ├── CulturalStation.tsx # Trạm di sản văn hóa câu chuyện làng nghề
│   │   ├── Footer.tsx          # Chân trang di sản
│   │   ├── HeroSection.tsx     # Khối Hero chào mừng
│   │   ├── MessengerChat.tsx   # Plugin trò chuyện Facebook Messenger
│   │   ├── Navbar.tsx          # Thanh điều hướng với đếm số lượng giỏ hàng
│   │   ├── ProductCollection.tsx # Khối trình bày Bộ Kit DIY
│   │   └── ProductModal.tsx    # Popup 2 cột xem chi tiết & Blind Box
│   ├── lib/
│   │   ├── supabase.ts         # Khởi tạo Supabase client chuẩn hóa URL
│   │   └── utils.ts            # Hàm tạo mã đơn hàng CTMMDD-xxxxxx & cn helper
│   └── types/                  # Type definitions (CraftItem, OrderRecord...)
├── .env.example                # File mẫu biến môi trường
├── .gitignore                  # Cấu hình bỏ qua file bí mật .env
├── package.json
└── README.md
```

---

## Triển Khai Lên Vercel

1. Đăng nhập [Vercel](https://vercel.com) và kết nối với kho chứa GitHub `Cham_Thuc`.
2. Khai báo đầy đủ các biến môi trường trong mục **Settings -> Environment Variables**.
3. Bấm **Deploy** để phát hành ứng dụng lên tên miền chính thức.

---

## 📜 Giấy Phép (License)

Dự án được cấp phép theo [MIT License](LICENSE).
- **Mã nguồn (Source Code)**: Tự do sử dụng, chỉnh sửa và học hỏi.
- **Tài sản thương hiệu (Brand Assets & Media)**: Tên thương hiệu, logo *Chạm Thức* và toàn bộ hình ảnh/video tư liệu thuộc quyền sở hữu của team dự án.

