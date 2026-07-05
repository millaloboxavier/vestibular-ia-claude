import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes condicionalmente e resolve conflitos do Tailwind
 * (ex: "p-2 p-4" vira só "p-4"). Usado em todos os componentes de ui/.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
