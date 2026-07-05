import { cn } from "@/lib/utils";

/**
 * Skeleton — bloco cinza pulsante usado como placeholder de carregamento.
 * Bloco base de todos os *Skeleton de LoadingSkeleton.jsx.
 */
export function Skeleton({ className, ...props }) {
  return <div className={cn("animate-pulse rounded-md bg-secondary", className)} {...props} />;
}
