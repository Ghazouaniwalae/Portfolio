"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/**
 * Fixed hairline rail down the left margin with a small amber dot that tracks
 * scroll position. Desktop-only instrument chrome.
 */
export function MarginRail() {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(dotRef.current, {
      top: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
      },
    });
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-6 z-40 hidden w-px lg:block"
    >
      <div className="absolute inset-y-8 left-0 w-px bg-[var(--color-hairline)]" />
      <div
        ref={dotRef}
        className="absolute left-1/2 top-8 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--color-amber)] shadow-[0_0_0_3px_rgba(196,125,14,0.15)]"
      />
    </div>
  );
}
