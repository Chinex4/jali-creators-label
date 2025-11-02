import { cn } from "../../utils/cn";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  right?: ReactNode; // emoji or icon on the right
  large?: boolean; // for the huge CTA in the footer/hero
};

const JaliButton = forwardRef<HTMLButtonElement, Props>(
  (
    { className, variant = "primary", right, large, children, ...rest },
    ref
  ) => {
    if (variant === "secondary") {
      return (
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center rounded-full border-6 border-primary bg-transparent",
            "text-primary font-extrabold tracking-tight whitespace-nowrap",
            large ? "px-10 py-6 text-3xl" : "px-6 py-3 text-base",
            "shadow-none hover:shadow-soft transition-shadow duration-300",
            className
          )}
          {...rest}
        >
          <span className="mr-2">{children}</span>
          {right && <span className="text-[1.35em] ml-1">{right}</span>}
        </button>
      );
    }

    // primary
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-primary text-white",
          "font-extrabold tracking-tight whitespace-nowrap",
          large ? "px-10 py-6 text-3xl" : "px-6 py-3 text-base",
          "shadow-soft hover:shadow transition-all duration-300",
          className
        )}
        {...rest}
      >
        <span className="mr-2">{children}</span>
        {right && <span className="text-[1.35em] ml-1">{right}</span>}
      </button>
    );
  }
);
export default JaliButton;
