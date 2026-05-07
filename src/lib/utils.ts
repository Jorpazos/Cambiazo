import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export const LISTING_LABELS: Record<string, string> = {
  CAMBIO: "Cambio",
  VENDO: "Vendo",
  BUSCO: "Busco",
};

export const LISTING_COLORS: Record<string, string> = {
  CAMBIO: "bg-brand-blue text-white",
  VENDO: "bg-brand-green text-white",
  BUSCO: "bg-amber-500 text-white",
};
