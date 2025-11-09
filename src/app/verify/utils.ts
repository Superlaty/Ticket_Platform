import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transferDate(date: string): string {
  const d = new Date(date);
  return d.toISOString();
}

// 用於顯示的格式: 2024/05/01 14:30
export function formatDateDisplay(dateString: string): string {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);

  // 檢查日期是否有效
  if (isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

// 用於 datetime-local input 的格式: YYYY-MM-DDTHH:mm
export function formatDate(dateString: string): string {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);

  // 檢查日期是否有效
  if (isNaN(date.getTime())) {
    return "";
  }

  // datetime-local input 需要的格式: YYYY-MM-DDTHH:mm
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
