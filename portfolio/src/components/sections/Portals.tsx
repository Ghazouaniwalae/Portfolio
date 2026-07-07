"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, T, prefersReduced } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { PortalCard } from "@/components/ui/PortalCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { usePortal } from "@/lib/portal-context";
import { portals, portalOrder } from "@/data/portals";

export function Portals() {
  const ref = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const { active, select, clear } = usePortal();

  // VIEWING chip: slide from the top edge, amber underline TRACES left→right.
  useGSAP(
    () => {
      const chip = chipRef.current;
      if (!chip) return;
      const underline = chip.querySelector("[data-chip-underline]");
      if (prefersReduced) {
        gsap.set(chip, { y: 0, opacity: 1 });
        gsap.set(underline, { scaleX: 1 });
        return;
      }
      gsap
        .timeline()
        .fromTo(chip, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: T.FAST })
        .fromTo(
          underline,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: T.BASE },
          "-=0.05"
        );
    },
    { dependencies: [active], scope: chipRef }
  );

  useGSAP(
    () => {
      const cards = ref.current?.querySelectorAll("[data-portal-card]");
      if (!cards || cards.length === 0) return;
      if (prefersReduced) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }
      // Reveal via an explicit onEnter so a mis-measured start (from async
      // image layout shifts above) can't leave the cards stuck at opacity 0.
      gsap.set(cards, { opacity: 0, y: 20 });
      const reveal = () =>
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: T.BASE,
          ease: "power2.out",
          stagger: T.STAGGER * 2,
          overwrite: true,
        });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: reveal,
      });
      // Recompute against the current layout; if the section is already in
      // view this fires the trigger immediately.
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  const activePortal = active ? portals[active as keyof typeof portals] : null;

  return (
    <section id="portals" className="relative py-20 md:py-20">
      {/* AI Pattern Background */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="1" fill="var(--color-blue)" opacity="0.2" />
              <circle cx="38" cy="12" r="1" fill="var(--color-blue)" opacity="0.2" />
              <circle cx="12" cy="38" r="1" fill="var(--color-teal)" opacity="0.2" />
              <circle cx="38" cy="38" r="1" fill="var(--color-teal)" opacity="0.2" />
              <line x1="12" y1="12" x2="38" y2="12" stroke="var(--color-blue)" opacity="0.06" strokeWidth="0.5" />
              <line x1="12" y1="12" x2="12" y2="38" stroke="var(--color-blue)" opacity="0.06" strokeWidth="0.5" />
              <line x1="38" y1="12" x2="38" y2="38" stroke="var(--color-teal)" opacity="0.06" strokeWidth="0.5" />
              <line x1="12" y1="38" x2="38" y2="38" stroke="var(--color-teal)" opacity="0.06" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
      <span aria-hidden className="ghost-numeral left-0 hidden lg:block">
        03
      </span>
      <Container width="wide" className="relative z-[1]">
        <SectionTitle label="03 — Problems I solve" className="mb-10">
          <h2 className="max-w-[32ch] font-display text-3xl font-semibold md:text-4xl">
            Whether you're building an AI product, automating work nobody has time for, or trying to get answers out of data you already have — I build the system that solves it end to end.
          </h2>
        </SectionTitle>

        {/* VIEWING chip */}
        {activePortal && (
          <div ref={chipRef} className="mb-6 flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-steel)]">
              VIEWING:
            </span>
            <div className="relative inline-block">
              <span className="font-mono text-sm text-[var(--color-ink)]">
                {activePortal.label}
              </span>
              <div
                data-chip-underline
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-amber)]"
              />
            </div>
            <button
              onClick={clear}
              className="font-mono text-sm text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        <div ref={ref} className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {portalOrder.map((id, i) => {
            const p = portals[id];
            return (
              <div
                key={id}
                data-portal-card
                data-portal-id={id}
                className="transition-all duration-[150ms] hover:-translate-y-[2px] hover:shadow-[var(--shadow-lift)]"
              >
                <PortalCard
                  label={p.label}
                  pain={p.pain}
                  headline={p.headline}
                  techStack={p.techStack}
                  projects={p.projects}
                  active={active === id}
                  onSelect={() => (active === id ? clear() : select(id))}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
