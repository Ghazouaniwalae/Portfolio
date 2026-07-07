"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { problems } from "@/data/site";

export function Problems() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }

    gsap.fromTo(
      ".problem-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-ink)] mb-12">
          What I build for clients.
        </h2>

        <div className="space-y-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="problem-card bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 md:p-8 shadow-[var(--shadow-lift)] hover:shadow-[var(--shadow-panel)] hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">
                {problem.title}
              </h3>
              <p className="text-[var(--color-steel)] mb-4">
                {problem.problem}
              </p>
              <p className="text-[var(--color-ink)] font-medium">
                {problem.solution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
