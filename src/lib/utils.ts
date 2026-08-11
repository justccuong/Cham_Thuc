import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates an order code in format: CT + MMDD + "-" + 6 random uppercase alphanumeric chars
 * Example: CT0811-K9X2M4
 */
export function generateOrderCode(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomAlphanumeric = "";
  for (let i = 0; i < 6; i++) {
    randomAlphanumeric += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CT${month}${day}-${randomAlphanumeric}`;
}
