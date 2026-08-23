"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface OrderRecord {
  id: string;
  order_code: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  product_name: string;
  product_price: number;
  payment_method: string;
  notes: string;
  payment_status: "PENDING" | "PAID" | "CANCELLED";
  order_status: "PROCESSING" | "SHIPPING" | "DELIVERED";
  created_at: string;
}

const AUTH_KEY = "cham_thuc_admin_auth";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(AUTH_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Auto-fetch orders when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    let ignore = false;
    fetch("/api/admin/orders")
      .then((res) => {
        if (res.status === 401) {
          if (!ignore) {
            setIsAuthenticated(false);
            sessionStorage.removeItem(AUTH_KEY);
            setPinError("Phiên đăng nhập đã hết hạn. Vui lòng nhập lại mã PIN.");
          }
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!ignore && data?.success && Array.isArray(data.orders)) {
          setOrders(data.orders as OrderRecord[]);
        }
      })
      .catch((err) => {
        console.error("Fetch orders exception:", err);
      });

    return () => {
      ignore = true;
    };
  }, [isAuthenticated]);

  const handleManualRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem(AUTH_KEY);
        setPinError("Phiên đăng nhập đã hết hạn. Vui lòng nhập lại mã PIN.");
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders as OrderRecord[]);
      } else {
        console.error("Fetch orders error:", data.error);
      }
    } catch (err) {
      console.error("Fetch orders exception:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setPinError("Vui lòng nhập mã PIN.");
      return;
    }

    setIsLoggingIn(true);
    setPinError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        try {
          sessionStorage.setItem(AUTH_KEY, "true");
        } catch {
          // ignore
        }
        setIsAuthenticated(true);
        setPinError("");
      } else {
        setPinError(data.error || "Mã PIN không chính xác.");
      }
    } catch {
      setPinError("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setPinInput("");
    setOrders([]);
  };

  const handleStatusChange = async (
    orderId: string,
    field: "payment_status" | "order_status",
    value: string
  ) => {
    setUpdatingId(orderId);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, [field]: value } : o))
    );

    try {
      const res = await fetch("/api/admin/update-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, field, value }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error("Update status failed:", data.error);
        void handleManualRefresh();
      }
    } catch (err) {
      console.error("Update status error:", err);
      void handleManualRefresh();
    } finally {
      setUpdatingId(null);
    }
  };

  // Stats
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.payment_status === "PAID")
    .reduce((sum, o) => sum + (o.product_price || 0), 0);
  const pendingPaymentsCount = orders.filter(
    (o) => o.payment_status === "PENDING"
  ).length;

  // PIN GUARD SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper-ivory flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-text-wood/10 shadow-xl max-w-sm w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-2xl font-bold text-brand-red">
              CHẠM THỨC ADMIN
            </h1>
            <p className="font-sans text-xs text-text-wood/60">
              Vui lòng nhập mã PIN quản trị để tiếp tục
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={10}
                placeholder="Nhập mã PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                disabled={isLoggingIn}
                className="w-full h-12 px-4 rounded-xl border border-text-wood/20 text-center font-price font-bold text-lg tracking-widest text-text-wood focus:outline-none focus:border-brand-red disabled:opacity-50"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-600 mt-2 text-center">{pinError}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoggingIn}
              className="w-full h-12 bg-brand-red text-brand-gold font-bold text-sm rounded-xl uppercase tracking-wider disabled:opacity-60 cursor-pointer"
            >
              {isLoggingIn ? "ĐANG XÁC THỰC..." : "XÁC NHẬN MÃ PIN"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-paper-ivory text-text-wood p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-text-wood/10 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-red">
            BẢNG QUẢN TRỊ ĐƠN HÀNG
          </h1>
          <p className="font-sans text-xs sm:text-sm text-text-wood/60 mt-1">
            Hệ thống theo dõi và xử lý đơn hàng Chạm Thức (Bảo Mật Server-Side)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleManualRefresh}
            disabled={loading}
            className="px-4 py-2 bg-paper-warm border border-text-wood/15 hover:border-brand-red text-text-wood font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "ĐANG TẢI..." : "LÀM MỚI"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            ĐĂNG XUẤT
          </button>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-text-wood/10 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-text-wood/60 block">
            TỔNG SỐ ĐƠN HÀNG
          </span>
          <p className="font-price text-3xl font-extrabold text-brand-red">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-text-wood/10 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-text-wood/60 block">
            DOANH THU ĐÃ THU (PAID)
          </span>
          <p className="font-price text-3xl font-extrabold text-bamboo-green">
            {totalRevenue.toLocaleString("vi-VN")} đ
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-text-wood/10 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-text-wood/60 block">
            ĐƠN CHỜ THANH TOÁN (PENDING)
          </span>
          <p className="font-price text-3xl font-extrabold text-amber-600">
            {pendingPaymentsCount}
          </p>
        </div>
      </div>

      {/* Order Data Table */}
      <div className="bg-white rounded-3xl border border-text-wood/10 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-text-wood/10 flex justify-between items-center">
          <h2 className="font-serif text-lg font-bold text-brand-red">
            DANH SÁCH ĐƠN HÀNG ({orders.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-paper-warm border-b border-text-wood/10 text-text-wood/70 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-4">MÃ ĐƠN</th>
                <th className="p-4">KHÁCH HÀNG</th>
                <th className="p-4">ĐỊA CHỈ</th>
                <th className="p-4">SẢN PHẨM & GIÁ</th>
                <th className="p-4">PTTT</th>
                <th className="p-4">TRẠNG THÁI TT</th>
                <th className="p-4">TRẠNG THÁI ĐƠN</th>
                <th className="p-4">NGÀY ĐẶT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-text-wood/10 font-sans">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-text-wood/50">
                    {loading ? "Đang tải dữ liệu đơn hàng..." : "Chưa có đơn hàng nào."}
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`hover:bg-paper-warm/50 transition-colors ${
                      updatingId === order.id ? "opacity-60" : ""
                    }`}
                  >
                    <td className="p-4 font-price font-extrabold text-brand-red">
                      {order.order_code || order.id.slice(0, 8)}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-text-wood">{order.customer_name}</p>
                      <p className="font-price text-text-wood/60">{order.customer_phone}</p>
                    </td>
                    <td className="p-4 max-w-[200px] text-text-wood/80 truncate" title={order.customer_address}>
                      {order.customer_address}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-text-wood">{order.product_name}</p>
                      <p className="font-price font-bold text-brand-red">
                        {order.product_price ? order.product_price.toLocaleString("vi-VN") : 0} đ
                      </p>
                    </td>
                    <td className="p-4 text-text-wood/80 font-medium">
                      {order.payment_method}
                    </td>
                    <td className="p-4">
                      <select
                        value={order.payment_status || "PENDING"}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            "payment_status",
                            e.target.value
                          )
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                          order.payment_status === "PAID"
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                            : order.payment_status === "CANCELLED"
                            ? "bg-red-50 border-red-300 text-red-800"
                            : "bg-amber-50 border-amber-300 text-amber-800"
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.order_status || "PROCESSING"}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            "order_status",
                            e.target.value
                          )
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                          order.order_status === "DELIVERED"
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                            : order.order_status === "SHIPPING"
                            ? "bg-blue-50 border-blue-300 text-blue-800"
                            : "bg-stone-50 border-stone-300 text-stone-800"
                        }`}
                      >
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPING">SHIPPING</option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
                    </td>
                    <td className="p-4 font-price text-xs text-text-wood/60 whitespace-nowrap">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleString("vi-VN")
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
