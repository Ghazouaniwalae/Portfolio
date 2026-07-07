"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface SectionHeadingProps {
  /** Each entry is one visual line, revealed via clip mask in sequence. */
  lines: string[];
  className?: string;
  as?: "h1" | "h2";
  size?: string;
}

export function SectionHeading({
  lines,
  className = "",
  as: Tag = "h2",
  size = "text-3xl sm:text-4xl md:text-5xl",
}: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const inner = ref.current?.querySelectorAll<HTMLElement>("[data-line]");
      if (!inner) return;
      if (reduced) {
        gsap.set(inner, { yPercent: 0 });
        return;
      }
      gsap.set(inner, { yPercent: 110 });
      gsap.to(inner, {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <Tag ref={ref} className={`font-display font-semibold ${size} ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <span data-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
