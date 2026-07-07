"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { process } from "@/data/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TelemetryLabel } from "@/components/ui/TelemetryLabel";
import { Container } from "@/components/ui/Container";

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }

    gsap.fromTo(
      ".process-step",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.15 }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-28">
      <Container width="wide">
        <ScrollReveal direction="fade" delay={0.1}>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-ink)] mb-12">
            Process
          </h2>
        </ScrollReveal>

        {/* Horizontal timeline */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="mb-16 overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-4">
              {process.steps.map((step, index) => (
                <div key={index} className="process-step flex-shrink-0 w-48">
                  <div className="font-mono text-xs text-[var(--color-amber)] mb-2">
                    {step.week}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--color-steel)]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Risk killers */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-8 shadow-[var(--shadow-lift)] mb-16">
            <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-6">
              What makes this low-risk
            </h3>
            <ul className="space-y-3">
              {process.riskKillers.map((killer, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[var(--color-teal)] mt-0.5">✓</span>
                  <span className="text-[var(--color-ink)]">{killer}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
