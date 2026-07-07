"use client";

import Link from "next/link";
import { WindowFrame } from "./WindowFrame";
import { Tag } from "./Tag";
import { screenshotSrc, type Project } from "@/data/projects";

/**
 * Self-contained project card for the Projects carousel: screenshot on top,
 * problem-first copy below, colored "View details" CTA. Hover lifts + zooms
 * the whole card and pushes the screenshot in slightly (group-hover).
 */
export function ProjectGridCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-card)] shadow-[var(--shadow-lift)] transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_56px_rgb(16_24_43/.18)]"
    >
      {/* screenshot */}
      <div className="overflow-hidden border-b border-[var(--color-hairline)]">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.05]">
          <WindowFrame
            src={screenshotSrc(project)}
            label={project.screenshotLabel}
            url={`${project.slug}.app`}
            dark={project.screenshotDark}
          />
        </div>
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-steel)]">
          {project.shortName}
        </span>

        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-[var(--color-ink)]">
          {project.problem}
        </h3>

        <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-steel)]">
          {project.solutionShort}
        </p>

        <p className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-amber)]">
          {project.impact}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-2 gap-y-1">
          {project.tags.slice(0, 4).map((t) => (
            <Tag key={t} className="font-mono text-[10px] text-[var(--color-steel)]">
              {t}
            </Tag>
          ))}
        </div>

        {/* colored View details CTA */}
        <div className="mt-auto flex items-center justify-end border-t border-[var(--color-hairline)] pt-5">
          <span className="inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-amber)] px-4 py-2 font-mono text-[12px] font-medium text-[var(--color-amber)] transition-colors duration-150 group-hover:bg-[var(--color-amber)] group-hover:text-[var(--color-paper)]">
            View details
            <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
