"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Direction = "up" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  direction?: Direction;
  /** stagger direct children instead of the wrapper */
  stagger?: number;
  delay?: number;
  distance?: number;
  className?: string;
  as?: "div" | "section" | "ul" | "li";
  start?: string;
}

const offset = (d: Direction, dist: number) => {
  switch (d) {
    case "up":
      return { y: dist };
    case "left":
      return { x: -dist };
    case "right":
      return { x: dist };
    default:
      return {};
  }
};

/**
 * Scroll-triggered reveal. Children start hidden via the `.js-reveal` class
 * (so reduced-motion / no-run states still show content), released by GSAP.
 */
export function Reveal({
  children,
  direction = "up",
  stagger,
  delay = 0,
  distance = 24,
  className = "",
  as: Tag = "div",
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : el;

      if (reduced) {
        gsap.set(targets, { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(targets, { opacity: 0, ...offset(direction, distance) });
      gsap.to(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        delay,
        ease: "power2.out",
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${stagger ? "" : "js-reveal"} ${className}`}
    >
      {children}
    </Tag>
  );
}
