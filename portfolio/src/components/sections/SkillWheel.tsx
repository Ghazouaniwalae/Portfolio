"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, T, prefersReduced } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { TelemetryLabel } from "@/components/ui/TelemetryLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { skillClusters, skillWheel } from "@/data/skills";

export function SkillWheel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const centerLabelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0); // active skill index

  const N = skillWheel.length;
  const SWEEP = 320; // degrees rotated across the scroll range

  useGSAP(
    () => {
      if (prefersReduced || !wheelRef.current) return;
      const state = { rot: 0 };
      gsap.to(state, {
        rot: SWEEP,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.5,
        },
        onUpdate: () => {
          gsap.set(wheelRef.current, { rotate: -state.rot });
          // which skill is nearest 12 o'clock
          const idx = Math.round((state.rot / 360) * N) % N;
          setActive((idx + N) % N);
        },
      });
    },
    { scope: sectionRef }
  );

  // Decoupled animation for active cluster (not tied to scrub)
  useGSAP(
    () => {
      if (prefersReduced) return;

      const clusterElements = sectionRef.current?.querySelectorAll("[data-cluster]");
      if (!clusterElements) return;

      clusterElements.forEach((el, i) => {
        const isActive = skillWheel[active].cluster === i;
        gsap.to(el, {
          opacity: isActive ? 1 : 0.45,
          duration: T.FAST,
          ease: "power2.out",
        });
      });

      // Center label crossfade to active cluster name
      const activeCluster = skillClusters[skillWheel[active].cluster];
      if (centerLabelRef.current && activeCluster) {
        gsap.to(centerLabelRef.current, {
          opacity: 0,
          duration: T.FAST / 2,
          onComplete: () => {
            // Update text and fade in
            gsap.to(centerLabelRef.current, {
              opacity: 1,
              duration: T.FAST / 2,
            });
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [active] }
  );

  const activeCluster = skillClusters[skillWheel[active].cluster];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20">
      {/* AI Pattern Background */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="radial-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="25" fill="none" stroke="var(--color-blue)" opacity="0.05" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="18" fill="none" stroke="var(--color-teal)" opacity="0.04" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="12" fill="none" stroke="var(--color-amber)" opacity="0.04" strokeWidth="0.5" />
              <line x1="30" y1="5" x2="30" y2="55" stroke="var(--color-blue)" opacity="0.04" strokeWidth="0.5" />
              <line x1="5" y1="30" x2="55" y2="30" stroke="var(--color-teal)" opacity="0.04" strokeWidth="0.5" />
              <circle cx="30" cy="5" r="1" fill="var(--color-amber)" opacity="0.2" />
              <circle cx="30" cy="55" r="1" fill="var(--color-amber)" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#radial-pattern)" />
        </svg>
      </div>
      <Container width="wide">
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* left — description */}
            <div>
              <SectionTitle label="05 — What I deliver">
                <h2 className="max-w-[20ch] font-display text-3xl font-semibold md:text-4xl">
                  I build the whole pipeline, not just the model.
                </h2>
              </SectionTitle>
              <ScrollReveal direction="up" delay={0.25}>
                <p className="mt-4 max-w-[40ch] text-[15px] text-[var(--color-steel)]">
                  From scraping raw data to deploying a production app, every layer of the system is one person&apos;s responsibility — mine.
                </p>
              </ScrollReveal>
              <div className="mt-8 space-y-6">
                {skillClusters.map((c, i) => (
                  <ScrollReveal key={c.label} direction="fade" delay={0.3 + i * 0.05}>
                    <div data-cluster className={`transition-opacity duration-[${T.FAST * 1000}ms]`}>
                      <TelemetryLabel
                        variant={skillWheel[active].cluster === i ? "amber" : "steel"}
                      >
                        {c.label}
                      </TelemetryLabel>
                      <p className="mt-1 max-w-[42ch] text-[15px] text-[var(--color-steel)]">
                        {c.blurb}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

            {/* mobile chips */}
            <div className="mt-8 flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {skillWheel.map((s) => (
                <span
                  key={s.name}
                  className="whitespace-nowrap rounded-full border border-[var(--color-hairline)] px-3 py-1.5 font-mono text-[11px] text-[var(--color-steel)]"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* right — wheel (desktop) */}
          <div className="relative hidden aspect-square items-center justify-center lg:flex">
            <div className="relative h-[440px] w-[440px] translate-x-8">
              {/* dial rings */}
              <div className="absolute inset-0 rounded-full border border-[var(--color-hairline)]" />
              <div className="absolute inset-8 rounded-full border border-dashed border-[var(--color-hairline)]" />

              {/* 12 o'clock marker */}
              <span className="absolute left-1/2 top-1 h-3 w-px -translate-x-1/2 bg-[var(--color-amber)]" />

              {/* center label */}
              <div ref={centerLabelRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-amber)] leading-tight">
                  End-to-end AI systems.
                </span>
                <span className="mt-1 font-display text-xl font-semibold leading-tight">
                  Built from scratch.
                </span>
              </div>

              {/* rotating skills */}
              <div ref={wheelRef} className="absolute inset-0">
                {skillWheel.map((s, i) => {
                  const angle = (i / N) * 360;
                  const isActive = i === active;
                  return (
                    <div
                      key={s.name}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-208px) rotate(${-angle}deg)`,
                      }}
                    >
                      <span
                        className={`-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors duration-[${T.FAST * 1000}ms] ${
                          isActive
                            ? "border-[var(--color-amber)] bg-[var(--color-amber)]/5 text-[var(--color-amber)]"
                            : "border-[var(--color-hairline)] text-[var(--color-steel)]"
                        } inline-block`}
                      >
                        {s.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
