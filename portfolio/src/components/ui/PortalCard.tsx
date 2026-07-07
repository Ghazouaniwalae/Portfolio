"use client";

import { useRef, useState } from "react";
import { gsap, T, prefersReduced } from "@/lib/gsap";
import { TelemetryLabel } from "./TelemetryLabel";

interface PortalCardProps {
  label: string;
  pain: string;
  headline: string;
  techStack: string;
  projects: string[];
  active: boolean;
  onSelect: () => void;
}

export function PortalCard({
  label,
  pain,
  headline,
  techStack,
  projects,
  active,
  onSelect,
}: PortalCardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [showProjects, setShowProjects] = useState(false);

  const onEnter = () => {
    if (ref.current && !prefersReduced) {
      gsap.to(ref.current, { y: -2, duration: T.FAST, ease: "power2.out" });
    }
    setShowProjects(true);
  };

  const onLeave = () => {
    if (ref.current && !prefersReduced) {
      gsap.to(ref.current, { y: 0, duration: T.FAST, ease: "power2.out" });
    }
    setShowProjects(false);
  };

  return (
    <button
      ref={ref}
      type="button"
      suppressHydrationWarning
      onClick={onSelect}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-pressed={active}
      className={`gradient-border group relative block h-full w-full p-7 text-left shadow-[var(--shadow-lift)] transition-all duration-[150ms] hover:-translate-y-[2px] hover:shadow-[var(--shadow-lift)] ${
        active ? "ring-2 ring-[var(--color-amber)] ring-offset-2 ring-offset-[var(--color-paper)]" : ""
      }`}
    >
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <TelemetryLabel variant={active ? "amber" : "steel"}>{label}</TelemetryLabel>
          <span
            aria-hidden
            className="font-mono text-xs text-[var(--color-steel)] transition-transform duration-[150ms] group-hover:translate-x-1"
          >
            →
          </span>
        </div>

        <p className="mt-6 font-mono text-[13px] leading-relaxed text-[var(--color-steel)]">
          "{pain}"
        </p>

        <h3 className="mt-5 font-display text-xl font-semibold text-[var(--color-ink)]">
          {headline}
        </h3>

        <div className="mt-auto pt-8">
          <p className="text-sm font-mono text-[var(--color-steel)] mb-3">
            {techStack}
          </p>
          <div className="flex flex-wrap gap-2 opacity-0 transition-opacity duration-[150ms] group-hover:opacity-100">
            {projects.map((project) => (
              <span key={project} className="text-xs font-medium text-[var(--color-amber)]">
                → {project}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
