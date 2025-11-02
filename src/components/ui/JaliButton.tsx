import { cn } from "../../utils/cn";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  right?: ReactNode;   // emoji/icon on the right
  large?: boolean;     // larger CTA
};

const baseSize = (large?: boolean) =>
  large ? "px-10 py-6 text-3xl" : "px-6 py-3 text-base";

const JaliButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", right, large, children, ...rest }, ref) => {
    if (variant === "secondary") {
      return (
        <button
          ref={ref}
          className={cn(
            "group inline-flex items-center justify-center rounded-full bg-transparent",
            // use arbitrary border widths to match mock (Tailwind doesn’t ship border-3/6)
            "border-[3px] border-b-[6px] border-primary text-primary font-extrabold tracking-tight whitespace-nowrap",
            baseSize(large),
            // hover / press / focus states
            "transition-all duration-300 will-change-transform",
            "hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.08)]",
            "active:translate-y-0 active:shadow-none",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
            className
          )}
          {...rest}
        >
          <span className="mr-2">{children}</span>
          {right && (
            <span
              className={cn(
                "ml-1 text-[1.35em] inline-flex",
                // playful nudge on hover
                "transition-transform duration-300",
                "group-hover:translate-x-1 group-hover:-rotate-6"
              )}
            >
              {right}
            </span>
          )}
        </button>
      );
    }

    // PRIMARY
    return (
      <button
        ref={ref}
        className={cn(
          "group inline-flex items-center justify-center rounded-full bg-primary text-white",
          "font-extrabold tracking-tight whitespace-nowrap",
          baseSize(large),
          // animation
          "transition-all duration-300 will-change-transform",
          "hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(40,25,0,0.25)]",
          "active:translate-y-0 active:shadow-[0_8px_16px_rgba(40,25,0,0.18)]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
          className
        )}
        {...rest}
      >
        <span className="mr-2">{children}</span>
        {right && (
          <span
            className={cn(
              "ml-1 text-[1.35em] inline-flex",
              "transition-transform duration-300",
              "group-hover:translate-x-1 group-hover:rotate-3"
            )}
          >
            {right}
          </span>
        )}
      </button>
    );
  }
);

export default JaliButton;
