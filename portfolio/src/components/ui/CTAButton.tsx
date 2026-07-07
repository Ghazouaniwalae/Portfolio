"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, T, prefersReduced } from "@/lib/gsap";

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  onClick?: () => void;
  href?: string;
  target?: string;
  type?: "button" | "submit";
  className?: string;
}

/**
 * Solid = ink fill (primary). Ghost = hairline outline.
 * Amber only ever appears via focus ring / links, per the discipline rules.
 * Light streak animation on hover.
 */
export function CTAButton({
  children,
  variant = "solid",
  onClick,
  href,
  target,
  type = "button",
  className = "",
}: CTAButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReduced || !buttonRef.current) return;

    const button = buttonRef.current;
    
    const handleMouseEnter = () => {
      // Light streak sweeps across button
      if (streakRef.current) {
        gsap.fromTo(
          streakRef.current,
          { x: "-100%" },
          { x: "100%", duration: 0.4, ease: "power2.out" }
        );
      }
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const base =
    "group inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] font-medium rounded-[var(--radius)] transition-all duration-[150ms] will-change-transform relative overflow-hidden";

  const styles =
    variant === "solid"
      ? "bg-[var(--color-ink)] text-[var(--color-paper)] hover:-translate-y-[2px] hover:shadow-[var(--shadow-lift)] active:translate-y-0"
      : "border border-[var(--color-hairline)] text-[var(--color-ink)] hover:-translate-y-[2px] hover:border-[var(--color-ink)] active:translate-y-0";

  const cls = `${base} ${styles} ${className}`;

  const content = (
    <>
      {/* Light streak overlay */}
      <div
        ref={streakRef}
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full pointer-events-none"
      />
      {children}
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={cls}
        suppressHydrationWarning
      >
        {content}
      </a>
    );
  }

  return (
    <button ref={buttonRef as React.RefObject<HTMLButtonElement>} type={type} onClick={onClick} className={cls} suppressHydrationWarning>
      {content}
    </button>
  );
}
