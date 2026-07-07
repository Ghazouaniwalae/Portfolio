"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, Flip, prefersReduced } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { ProjectGridCard } from "@/components/ui/ProjectGridCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { usePortal } from "@/lib/portal-context";
import { caseProjects } from "@/data/projects";

export function Projects() {
  const { active } = usePortal();
  const listRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const ordered = useMemo(() => {
    if (!active) return caseProjects;
    return [...caseProjects].sort(
      (a, b) => b.portalWeights[active] - a.portalWeights[active]
    );
  }, [active]);

  // Flip: cards physically travel to their new positions on portal change.
  // Skip the first run so the initial (overlapping) CSS layout is left intact —
  // running Flip on mount was pulling the cards out of flow and spacing them.
  const flipReady = useRef(false);
  useGSAP(
    () => {
      if (!flipReady.current) {
        flipReady.current = true;
        return;
      }
      if (prefersReduced || !listRef.current) return;

      const rows = listRef.current.querySelectorAll("[data-row]");
      if (!rows || rows.length === 0) return;

      const state = Flip.getState(rows);

      ordered.forEach((project) => {
        const row = listRef.current?.querySelector(`[data-row-slug="${project.slug}"]`);
        if (row) listRef.current?.appendChild(row);
      });

      Flip.from(state, {
        duration: 0.35,
        ease: "power3.inOut",
      });

      gsap.fromTo(
        rows,
        { opacity: 0.4, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 }
      );
    },
    { dependencies: [active], scope: listRef }
  );

  // Shift + wheel scrolls the carousel horizontally. A plain wheel is left
  // alone so vertical page scrolling still works over the section.
  useGSAP(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey || e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section id="work" className="relative overflow-hidden border-0 py-20 md:py-24">
      {/* AI Pattern Background */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="matrix-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="40" height="40" fill="none" stroke="var(--color-blue)" opacity="0.06" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="1.5" fill="var(--color-amber)" opacity="0.2" />
              <line x1="0" y1="20" x2="40" y2="20" stroke="var(--color-blue)" opacity="0.04" strokeWidth="0.5" />
              <line x1="20" y1="0" x2="20" y2="40" stroke="var(--color-blue)" opacity="0.04" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#matrix-pattern)" />
        </svg>
      </div>
      <Container width="wide" className="border-0">
        <SectionTitle label="04 — Evidence" className="mb-14">
          <h2 className="max-w-[24ch] font-display text-3xl font-semibold md:text-4xl">
            Every system below started with a business problem — not an AI model.
          </h2>
        </SectionTitle>

      </Container>

      {/* horizontal, overlapping carousel — full-bleed so cards can run to the edge */}
      <div
        ref={scrollerRef}
        className="scrollbar-hide flex snap-x snap-proximity items-stretch overflow-x-auto px-6 pb-8 pt-2 md:px-12 lg:px-24"
      >
        <div ref={listRef} className="flex items-stretch">
          {ordered.map((project, i) => (
            <div
              key={project.slug}
              data-row
              data-row-slug={project.slug}
              className={`relative z-10 w-[85vw] shrink-0 snap-center hover:z-30 sm:w-[400px] lg:w-[440px] ${
                i > 0 ? "-ml-12 sm:-ml-28" : ""
              }`}
            >
              <ProjectGridCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
