import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates an order code in format: CT + MMDD + "-" + 4-digit random number
 * Example: CT0811-4892
 */
export function generateOrderCode(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
  return `CT${month}${day}-${randomDigits}`;
}
