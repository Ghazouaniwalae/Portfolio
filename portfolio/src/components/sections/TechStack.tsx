"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { techStack } from "@/data/site";

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const prefersReducedMotion = typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }

    gsap.fromTo(
      ".tech-category",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-ink)] mb-12">
          Tech stack
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="tech-category">
            <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-4">
              Modeling
            </h3>
            <ul className="space-y-2">
              {techStack.modeling.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-sm text-[var(--color-steel)] hover:text-[var(--color-amber)] cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredTech(tech)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="tech-category">
            <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-4">
              Pipelines
            </h3>
            <ul className="space-y-2">
              {techStack.pipelines.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-sm text-[var(--color-steel)] hover:text-[var(--color-amber)] cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredTech(tech)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="tech-category">
            <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-4">
              Delivery
            </h3>
            <ul className="space-y-2">
              {techStack.delivery.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-sm text-[var(--color-steel)] hover:text-[var(--color-amber)] cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredTech(tech)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {hoveredTech && (
          <div className="mt-8 p-4 bg-[var(--color-card)] rounded-[var(--radius-card)] border border-[var(--color-hairline)]">
            <p className="font-mono text-sm text-[var(--color-amber)]">
              {hoveredTech} used in: Critiq, FX AlphaLab, SmartShop, Teams Summarizer
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
