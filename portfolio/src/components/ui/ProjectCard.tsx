"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ProjectCardProps {
  tags: string[];
  problem: string;
  solution: string;
  impact: string;
  children: React.ReactNode;
}

export function ProjectCard({ tags, problem, solution, impact, children }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set(contentRef.current, { height: "auto", opacity: 1 });
      return;
    }

    if (isExpanded) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isExpanded, prefersReducedMotion]);

  return (
    <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] shadow-[var(--shadow-lift)] overflow-hidden">
      {/* Collapsed view */}
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 border rounded text-[var(--color-steel)] border-[var(--color-hairline)]"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3">
          {problem}
        </h3>
        
        <p className="text-[var(--color-steel)] text-sm mb-4">
          {solution}
        </p>
        
        <p className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-wider">
          {impact}
        </p>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 font-mono text-sm text-[var(--color-ink)] hover:text-[var(--color-amber)] transition-colors"
        >
          {isExpanded ? "Collapse case study ↑" : "Expand case study →"}
        </button>
      </div>

      {/* Expanded view */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
      >
        <div className="p-6 md:p-8 pt-0 border-t border-[var(--color-hairline)]">
          {children}
        </div>
      </div>
    </div>
  );
}
