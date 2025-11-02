import { cn } from "../../utils/cn";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";

type Variants = "primary" | "secondary";

type Common = {
  variant?: Variants;
  right?: ReactNode; // emoji/icon on the right
  large?: boolean; // larger CTA
  to?: string; // react-router route
  href?: string; // external or normal URL
  newTab?: boolean; // only for href (adds target+rel)
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Common;
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & Common;

/** Accepts button props AND link props; chooses element by presence of `to`/`href`. */
type Props = ButtonProps & LinkProps;

const baseSize = (large?: boolean) =>
  large ? "px-10 py-6 text-3xl" : "px-6 py-3 text-base";

function classes(
  variant: Variants = "primary",
  large?: boolean,
  className?: string
) {
  const shared = cn(
    "group inline-flex items-center justify-center rounded-full",
    "font-extrabold tracking-tight whitespace-nowrap",
    baseSize(large),
    "transition-all duration-300 will-change-transform",
    "focus-visible:outline-none"
  );

  if (variant === "secondary") {
    return cn(
      shared,
      "bg-transparent border-[3px] border-b-[6px] border-primary text-primary",
      "hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.08)]",
      "active:translate-y-0 active:shadow-none",
      "focus-visible:ring-4 focus-visible:ring-primary/20",
      className
    );
  }

  return cn(
    shared,
    "bg-primary text-white",
    "hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(40,25,0,0.25)]",
    "active:translate-y-0 active:shadow-[0_8px_16px_rgba(40,25,0,0.18)]",
    "focus-visible:ring-4 focus-visible:ring-primary/30",
    className
  );
}

function RightWrap({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <span
      className={cn(
        "ml-1 text-[1.35em] inline-flex",
        "transition-transform duration-300",
        "group-hover:translate-x-1 group-hover:rotate-3"
      )}
    >
      {children}
    </span>
  );
}

const JaliButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (
    {
      className,
      variant = "primary",
      right,
      large,
      to,
      href,
      newTab,
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    const content = (
      <>
        <span className="mr-2">{children}</span>
        <RightWrap>{right}</RightWrap>
      </>
    );

    const cls = classes(
      variant,
      large,
      cn(disabled && "opacity-60 pointer-events-none", className)
    );

    // 1) React Router <Link>
    if (to) {
      return (
        <Link
          ref={ref as any}
          to={to}
          className={cls}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          {...(rest as any)}
        >
          {content}
        </Link>
      );
    }

    // 2) Plain anchor <a>
    if (href) {
      return (
        <a
          ref={ref as any}
          href={href}
          className={cls}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          {...(rest as any)}
        >
          {content}
        </a>
      );
    }

    // 3) Default <button>
    return (
      <button
        ref={ref as any}
        className={cls}
        disabled={disabled}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

export default JaliButton;
