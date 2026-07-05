import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Badge — usado para tags curtas dentro de cards (duração, período, entrada,
 * status de inscrição). Não é clicável; para ações use Button.
 */
function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
