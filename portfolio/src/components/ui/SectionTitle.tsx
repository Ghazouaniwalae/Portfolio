"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, T, prefersReduced } from "@/lib/gsap";
import { TelemetryLabel } from "./TelemetryLabel";

interface SectionTitleProps {
  label: React.ReactNode;
  labelVariant?: "steel" | "amber" | "teal" | "signal" | "trace";
  /** The heading (and any adjacent subtext) that SETTLES in after the trace. */
  children: React.ReactNode;
  className?: string;
  /** Trace-line colour override — e.g. `bg-[var(--color-signal)]` on dark panels. */
  lineClassName?: string;
}

/**
 * Unified section-title entrance (spec 1.3): a 1px line TRACES outward from the
 * left, then the TelemetryLabel + heading SETTLE in. This replaces ad-hoc
 * per-section heading reveals so every section opens the same way.
 */
export function SectionTitle({
  label,
  labelVariant = "steel",
  children,
  className = "",
  lineClassName = "bg-[var(--color-amber)]",
}: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReduced) {
        gsap.set(lineRef.current, { scaleX: 1 });
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        return;
      }
      gsap
        .timeline({
          scrollTrigger: { trigger: containerRef.current, start: "top 85%", once: true },
        })
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: T.BASE }
        )
        .fromTo(
          contentRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: T.BASE },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      <span
        ref={lineRef}
        aria-hidden
        className={`mb-4 block h-px w-16 origin-left ${lineClassName}`}
      />
      <div ref={contentRef}>
        <TelemetryLabel variant={labelVariant} as="div" className="mb-3">
          {label}
        </TelemetryLabel>
        {children}
      </div>
    </div>
  );
}
