import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-semibold tracking-[0.02em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-brand/70 bg-[linear-gradient(135deg,#bb1f24_0%,#8a1418_100%)] text-white shadow-[0_18px_38px_rgba(170,27,31,0.28)] hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(170,27,31,0.35)]",
        secondary:
          "border-gold/40 bg-[linear-gradient(135deg,#f8df9c_0%,#d5a347_100%)] text-ink shadow-[0_16px_32px_rgba(201,152,57,0.22)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(201,152,57,0.28)]",
        outline:
          "border-[#171d29]/12 bg-white/72 text-ink shadow-[0_14px_30px_rgba(15,23,42,0.08)] hover:border-brand/25 hover:bg-white",
        dark: "border-white/10 bg-ink text-white shadow-[0_18px_34px_rgba(15,23,42,0.28)] hover:bg-[#1a2030] hover:-translate-y-0.5",
        ghost: "border-transparent bg-transparent text-ink hover:bg-white/60",
        link: "border-transparent bg-transparent px-0 text-brand shadow-none hover:text-brand-strong",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-[13px]",
        lg: "h-14 px-8 text-[15px]",
        xl: "h-16 px-10 text-base",
        icon: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
