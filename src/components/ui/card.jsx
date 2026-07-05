import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-2xl border border-border bg-card text-card-foreground p-5", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-2 flex flex-col gap-1", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h4 ref={ref} className={cn("text-[15px] font-semibold leading-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardMeta = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />
));
CardMeta.displayName = "CardMeta";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground leading-relaxed", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-3 flex flex-wrap gap-2", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardMeta, CardContent, CardFooter };
