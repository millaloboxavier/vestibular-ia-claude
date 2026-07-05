import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-85",
        outline: "border border-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
        ghost: "hover:bg-accent",
        link: "underline-offset-4 hover:underline text-primary"
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "default"
    }
  }
);

/**
 * Button — peça base de ação. Todos os CTAs do site (Inscreva-se, Ver
 * detalhes, chips de próximo passo) devem usar este componente, nunca
 * <button> cru, para manter acessibilidade e estilo consistentes.
 *
 * @param {"default"|"outline"|"ghost"|"link"} variant
 * @param {"default"|"sm"|"lg"|"icon"} size
 * @param {boolean} asChild - renderiza como o filho (ex: um <a>) mantendo o estilo
 */
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
