import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number) {
  return Number(value.toFixed(2)).toString();
}

export function calculatePercentageChange(current: number, previous: number) {
  return ((current - previous) / previous) * 100;
}

export function percentageChangeClassName(value: number) {
  return value > 0 ? "text-green-500" : "text-red-500"
}
