"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Animated architecture flow — nodes draw in on scroll. */
export function CaseArchitecture({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const nodes = ref.current?.querySelectorAll("[data-arch-node]");
      const links = ref.current?.querySelectorAll("[data-arch-link]");
      if (!nodes) return;
      if (reduced) {
        gsap.set([...Array.from(nodes), ...Array.from(links ?? [])], { opacity: 1, scale: 1 });
        return;
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      Array.from(nodes).forEach((node, i) => {
        tl.from(node, { opacity: 0, scale: 0.85, duration: 0.4, ease: "back.out(1.5)" }, i * 0.15);
        if (links && links[i]) {
          tl.from(links[i], { opacity: 0, scaleX: 0, duration: 0.3, ease: "power2.out" }, i * 0.15 + 0.1);
        }
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-y-3">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <span
            data-arch-node
            className="rounded-md border border-[var(--color-hairline)] bg-[var(--color-card)] px-4 py-2.5 font-mono text-[13px] text-[var(--color-ink)] shadow-[var(--shadow-lift)]"
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
