"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fieldNotes } from "@/data/fieldNotes";

export function FieldNotes() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (prefersReduced || !trackRef.current) return;
      // track holds two copies; move by half its width for a seamless loop
      tween.current = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    },
    { scope: trackRef }
  );

  const items = [...fieldNotes, ...fieldNotes];

  return (
    <ScrollReveal direction="fade" delay={0.1}>
      <div
        className="container-full overflow-hidden border-y border-[var(--color-panel-line)] bg-[var(--color-panel)] py-4"
        role="marquee"
        aria-label="Field notes"
        onMouseEnter={() => tween.current?.pause()}
        onMouseLeave={() => tween.current?.resume()}
        onFocusCapture={() => tween.current?.pause()}
        onBlurCapture={() => tween.current?.resume()}
      >
        <div className="edge-fade-x">
          <div ref={trackRef} className="flex w-max gap-12 whitespace-nowrap">
            {items.map((note, i) => (
              <span
                key={i}
                className="flex items-center gap-12 font-mono text-[13px] text-[var(--color-steel)]"
              >
                {note}
                <span aria-hidden className="text-[var(--color-signal)]">
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
