import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseProjects, getProject, screenshotSrc } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { TelemetryLabel } from "@/components/ui/TelemetryLabel";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { CaseArchitecture } from "@/components/ui/CaseArchitecture";
import { PipelineReveal } from "@/components/sections/PipelineReveal";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { fxAlphaLabPipeline } from "@/data/architectures";

export function generateStaticParams() {
  return caseProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Wala Eddine Ghazouani`,
    description: project.solutionShort,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.teaser) notFound();

  const idx = caseProjects.findIndex((p) => p.slug === slug);
  const next = caseProjects[(idx + 1) % caseProjects.length];

  return (
    <main className="pb-24 pt-28">
      <Container width="wide">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-steel)] transition-colors hover:text-[var(--color-amber)]"
        >
          <span aria-hidden>←</span> All work
        </Link>

        {/* header */}
        <header className="mt-10 max-w-[60ch]">
          <TelemetryLabel>CASE STUDY</TelemetryLabel>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            {project.name}
          </h1>
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <p className="mt-6 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-amber)]">
            {project.impact}
          </p>
        </header>

        {/* screenshot */}
        <div className="mt-12">
          <WindowFrame
            src={screenshotSrc(project)}
            label={project.screenshotLabel}
            url={`${project.slug}.app`}
            dark={project.screenshotDark}
          />
        </div>

        {/* before / after */}
        <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-lift)]">
            <TelemetryLabel>BEFORE — WHAT GOES IN</TelemetryLabel>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-steel)]">
              {project.before}
            </p>
          </div>
          <div className="gradient-border p-6 shadow-[var(--shadow-lift)]">
            <TelemetryLabel variant="teal">AFTER — WHAT COMES OUT</TelemetryLabel>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-steel)]">
              {project.after}
            </p>
          </div>
        </section>

        {/* architecture */}
        <section className="mt-16">
          <TelemetryLabel>ARCHITECTURE</TelemetryLabel>
          <div className="mt-6">
            <CaseArchitecture steps={project.architecture} />
          </div>
        </section>

        {/* Pipeline reveal for Critiq only */}
        {slug === "critiq" && <PipelineReveal />}
      </Container>

      {/* Interactive pipeline diagram for FX AlphaLab */}
      {slug === "fx-alphalab" && (
        <ArchitectureDiagram
          pipeline={fxAlphaLabPipeline}
          label="PIPELINE ARCHITECTURE"
          heading="How a signal is built, data → deployed system."
        />
      )}

      {/* sample output panel — dark */}
      <div className="container-full mt-16 bg-[var(--color-panel)] py-16 text-[var(--color-paper)]">
        <Container width="wide">
          <TelemetryLabel variant="signal">SAMPLE OUTPUT</TelemetryLabel>
          <p className="mt-4 max-w-[70ch] font-display text-xl font-medium leading-relaxed md:text-2xl">
            {project.sampleOutput}
          </p>
          <div className="mt-8">
            <WindowFrame
              label={`${project.shortName} — SAMPLE OUTPUT`}
              url={`${project.slug}.app/report`}
              dark
            />
          </div>
        </Container>
      </div>

      <Container width="wide">
        {/* metrics */}
        <section className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m} className="border-t border-[var(--color-hairline)] pt-4">
              <p className="font-mono text-sm text-[var(--color-ink)]">{m}</p>
            </div>
          ))}
        </section>

        {project.repository && (
          <a
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 font-mono text-[13px] text-[var(--color-steel)] transition-colors hover:text-[var(--color-amber)]"
          >
            <span aria-hidden>↗</span> View source on GitHub
          </a>
        )}

        {/* next case */}
        <Link
          href={`/work/${next.slug}`}
          className="group mt-16 flex items-center justify-between border-t border-[var(--color-hairline)] pt-8"
        >
          <div>
            <TelemetryLabel>NEXT CASE</TelemetryLabel>
            <p className="mt-2 font-display text-2xl font-semibold transition-colors group-hover:text-[var(--color-amber)]">
              {next.name}
            </p>
          </div>
          <span
            aria-hidden
            className="font-mono text-2xl text-[var(--color-steel)] transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </Container>
    </main>
  );
}
