"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, T, prefersReduced } from "@/lib/gsap";

type AnimationState = "resting" | "drawing" | "focus";

interface FXArchitectureProps {
  steps: string[];
}

/**
 * FX AlphaLab architecture diagram with three animation states:
 * - resting: static display
 * - drawing: nodes draw in sequentially
 * - focus: active node highlights with amber glow
 */
export function FXArchitecture({ steps }: FXArchitectureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<AnimationState>("resting");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      if (prefersReduced || !ref.current) return;

      const nodes = ref.current?.querySelectorAll("[data-arch-node]");
      const links = ref.current?.querySelectorAll("[data-arch-link]");
      if (!nodes) return;

      // Drawing animation: nodes draw in sequentially
      if (state === "drawing") {
        const tl = gsap.timeline();
        Array.from(nodes).forEach((node, i) => {
          tl.from(node, { opacity: 0, scale: 0.85, duration: T.FAST, ease: "back.out(1.5)" }, i * 0.15);
          if (links && links[i]) {
            tl.from(links[i], { opacity: 0, scaleX: 0, duration: T.FAST, ease: "power2.out" }, i * 0.15 + 0.1);
          }
        });
      }

      // Focus animation: hovered node highlights with amber glow
      if (state === "focus" && hoveredIndex !== null) {
        nodes.forEach((node, i) => {
          const isHovered = i === hoveredIndex;
          gsap.to(node, {
            borderColor: isHovered ? "var(--color-amber)" : "var(--color-hairline)",
            boxShadow: isHovered ? "0 0 20px rgba(251,191,36,0.3)" : "var(--shadow-lift)",
            duration: T.FAST,
            ease: "power2.out",
          });
        });
      }
    },
    { scope: ref, dependencies: [state, hoveredIndex] }
  );

  // Trigger drawing animation on mount
  useGSAP(() => {
    if (!prefersReduced) {
      setState("drawing");
      setTimeout(() => setState("resting"), 2000);
    }
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-y-3">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <span
            data-arch-node
            onMouseEnter={() => {
              setState("focus");
              setHoveredIndex(i);
            }}
            onMouseLeave={() => {
              setState("resting");
              setHoveredIndex(null);
            }}
            className="rounded-md border border-[var(--color-hairline)] bg-[var(--color-card)] px-4 py-2.5 font-mono text-[13px] text-[var(--color-ink)] shadow-[var(--shadow-lift)] cursor-pointer transition-all duration-[150ms]"
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span
              data-arch-link
              aria-hidden
              className="mx-2 inline-block h-px w-8 origin-left bg-[var(--color-amber)]"
            />
          )}
        </div>
      ))}
    </div>
  );
}
