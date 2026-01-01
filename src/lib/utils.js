import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de Tailwind CSS de manera inteligente
 * Evita conflictos y duplicados entre clases
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
