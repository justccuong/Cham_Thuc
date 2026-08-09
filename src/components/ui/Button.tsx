import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-full cursor-pointer";

    const variants: Record<string, string> = {
      primary: "bg-brand-red text-brand-gold hover:bg-brand-red-hover shadow-md hover:shadow-lg",
      secondary: "bg-bamboo-green text-paper-ivory hover:bg-bamboo-green/90 shadow-md",
      outline: "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-paper-ivory",
      ghost: "text-text-wood hover:bg-brand-red/10 hover:text-brand-red",
    };

    const sizes: Record<string, string> = {
      sm: "px-4 py-1.5 text-xs font-semibold uppercase tracking-wider",
      md: "px-6 py-2.5 text-sm font-semibold tracking-wide",
      lg: "px-8 py-3.5 text-base font-bold tracking-wider uppercase",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
