"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { TelemetryLabel } from "@/components/ui/TelemetryLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { usePortal } from "@/lib/portal-context";
import { portals } from "@/data/portals";

export function ROICalculator() {
  const { active } = usePortal();
  const portal = portals[active ?? "build"];
  const reduced = useReducedMotion();

  // slider values keyed by slider.key, reset when the preset changes
  const [values, setValues] = useState<Record<string, number>>({});
  useEffect(() => {
    const next: Record<string, number> = {};
    portal.roi.sliders.forEach((s) => (next[s.key] = s.default));
    setValues(next);
  }, [portal]);

  const total = useMemo(() => {
    if (Object.keys(values).length === 0) return 0;
    return Math.round(portal.roi.compute(values));
  }, [values, portal]);

  // spring-animate the displayed total
  const [display, setDisplay] = useState(0);
  const obj = useRef({ v: 0 });
  useEffect(() => {
    if (reduced) {
      setDisplay(total);
      return;
    }
    gsap.to(obj.current, {
      v: total,
      duration: 0.9,
      ease: "elastic.out(1, 0.6)",
      onUpdate: () => setDisplay(Math.round(obj.current.v)),
    });
  }, [total, reduced]);

  return (
    <section className="relative overflow-hidden py-24 md:py-28">
      {/* scatter + trendline background */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
        style={{ maskImage: "linear-gradient(90deg, transparent, #000 20%, #000 80%, transparent)" }}
      >
        <line x1="40" y1="360" x2="760" y2="60" stroke="var(--color-amber)" strokeWidth="1.5" />
        {Array.from({ length: 26 }).map((_, i) => (
          <circle
            key={i}
            cx={40 + (i / 25) * 720 + (Math.sin(i * 3) * 14)}
            cy={360 - (i / 25) * 300 + Math.cos(i * 5) * 24}
            r="3"
            fill="var(--color-ink)"
          />
        ))}
      </svg>

      <Container width="wide" className="relative z-[1]">
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="mb-12">
            <ScrollReveal direction="up" delay={0.15}>
              <TelemetryLabel>12 — ESTIMATE</TelemetryLabel>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="mt-3 max-w-[18ch] font-display text-3xl font-semibold md:text-4xl">
                What is the manual version quietly costing you?
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* sliders */}
            <ScrollReveal direction="up" delay={0.25}>
              <div className="flex flex-col gap-8">
                {portal.roi.sliders.map((s, i) => {
                  const v = values[s.key] ?? s.default;
                  return (
                    <ScrollReveal key={s.key} direction="fade" delay={0.3 + i * 0.05}>
                      <div>
                        <div className="flex items-baseline justify-between">
                          <label htmlFor={`roi-${s.key}`} className="text-[15px] text-[var(--color-steel)]">
                            {s.label}
                          </label>
                          <span className="font-mono text-lg font-medium tabular-nums text-[var(--color-ink)]">
                            {s.prefix ?? ""}
                            {v}
                            {s.suffix ?? ""}
                          </span>
                        </div>
                        <input
                          id={`roi-${s.key}`}
                          type="range"
                          min={s.min}
                          max={s.max}
                          step={s.step}
                          value={v}
                          onChange={(e) =>
                            setValues((prev) => ({ ...prev, [s.key]: Number(e.target.value) }))
                          }
                          className="roi-slider mt-3 w-full"
                          style={{ accentColor: "var(--color-amber)" }}
                        />
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* output */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-col justify-center rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-card)] p-8 shadow-[var(--shadow-lift)]">
                <TelemetryLabel variant="amber">$ / YEAR</TelemetryLabel>
                <div className="mt-2 font-mono text-[clamp(2.75rem,7vw,4.5rem)] font-semibold tabular-nums leading-none text-[var(--color-ink)]">
                  ${display.toLocaleString("en-US")}
                </div>
                <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-[var(--color-steel)]">
                  Estimated yearly cost of manual work — automation typically recovers 60–80%.
                </p>
                <div className="mt-8">
                  <CTAButton href="#close" variant="solid">
                    Book a free call
                  </CTAButton>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
