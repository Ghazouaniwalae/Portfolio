"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, T, prefersReduced } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { TelemetryLabel } from "@/components/ui/TelemetryLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { byTheNumbers } from "@/data/site";

export function ByTheNumbers() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="container-full relative overflow-hidden border-y border-[var(--color-hairline)] py-16">
      {/* fine instrument grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)",
        }}
      >
        <defs>
          <pattern id="numbers-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="var(--color-ink)" strokeWidth="0.5" />
            <path d="M0 24H6M24 0V6" stroke="var(--color-amber)" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#numbers-grid)" />
      </svg>

      <Container width="wide" className="relative z-[1]">
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="mb-10">
            <TelemetryLabel>04 — TELEMETRY</TelemetryLabel>
          </div>
        </ScrollReveal>
        <div ref={containerRef} className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {byTheNumbers.map((n, i) => (
            <ScrollReveal key={n.label} direction="up" delay={0.15 + i * 0.15}>
              <div className="flex flex-col">
                <div className="font-mono text-4xl md:text-5xl font-semibold text-[var(--color-ink)] tabular-nums relative">
                  {n.prefix && <span className="text-[var(--color-amber)]">{n.prefix}</span>}
                  <Counter
                    value={n.value}
                    delay={i * 0.15}
                    onComplete={() => {
                      // Amber underline TRACES beneath the number once it locks.
                      const underline = containerRef.current?.querySelector(`[data-underline="${i}"]`);
                      if (!underline) return;
                      gsap.fromTo(
                        underline,
                        { scaleX: 0, transformOrigin: "left" },
                        { scaleX: 1, duration: prefersReduced ? 0 : T.FAST, ease: "power2.out" }
                      );
                    }}
                  />
                  {n.suffix && <span className="text-[var(--color-amber)]">{n.suffix}</span>}
                  {/* Amber underline — traces on counter complete */}
                  <div
                    data-underline={i}
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-amber)]"
                  />
                </div>
                <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-steel)]">
                  {n.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
