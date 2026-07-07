"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { TelemetryLabel } from "@/components/ui/TelemetryLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { pipelineStages, findings, type Severity } from "@/data/pipeline";

const sevColor: Record<Severity, string> = {
  HIGH: "text-[var(--color-signal)] border-[var(--color-signal)]",
  MED: "text-[var(--color-trace)] border-[var(--color-trace)]",
  LOW: "text-[var(--color-steel)] border-[var(--color-panel-line)]",
};

export function PipelineReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const panel = root.querySelector("[data-panel]");
      const nodes = root.querySelectorAll("[data-node]");
      const cards = root.querySelectorAll("[data-finding]");

      if (reduced) {
        gsap.set(panel, { rotateX: 0, opacity: 1 });
        gsap.set(nodes, { opacity: 1 });
        nodes.forEach((n) => n.setAttribute("data-lit", "true"));
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      // panel lifts off the page
      gsap.fromTo(
        panel,
        { rotateX: 4, opacity: 0, transformPerspective: 1200, transformOrigin: "center top" },
        {
          rotateX: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        }
      );

      // nodes light in order, scrubbed
      nodes.forEach((node, i) => {
        gsap.to(node, {
          scrollTrigger: {
            trigger: root,
            start: `top ${60 - i * 4}%`,
            once: true,
            onEnter: () => node.setAttribute("data-lit", "true"),
          },
        });
      });

      // findings pop severity-ordered
      gsap.set(cards, { opacity: 0, y: 16 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.6)",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 45%", once: true },
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  const agentsStage = pipelineStages.find((s) => s.agents);

  return (
    <section className="container-full bg-[var(--color-paper)] py-24 md:py-28">
      <Container width="wide">
        <ScrollReveal direction="fade" delay={0.1}>
          <div ref={ref}>
            <ScrollReveal direction="up" delay={0.15}>
              <div className="mb-8">
                <TelemetryLabel>06 — SIGNAL</TelemetryLabel>
                <h2 className="mt-3 max-w-[20ch] font-display text-3xl font-semibold md:text-4xl">
                  What runs when you paste in a URL.
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div
                data-panel
                className="relative overflow-hidden rounded-[var(--radius)] bg-[var(--color-panel)] p-8 shadow-[var(--shadow-panel)] md:p-12"
                style={{ willChange: "transform" }}
              >
            {/* quiet amber waveform trace */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full opacity-20"
              preserveAspectRatio="none"
              viewBox="0 0 1200 100"
            >
              <path
                d="M0 50 Q 150 10 300 50 T 600 50 T 900 50 T 1200 50"
                fill="none"
                stroke="var(--color-signal)"
                strokeWidth="1"
              />
            </svg>

            <div className="relative grid gap-10 lg:grid-cols-2">
              {/* pipeline flow */}
              <div className="flex flex-col gap-3">
                {pipelineStages.map((stage) => (
                  <div key={stage.id}>
                    <div
                      data-node
                      data-lit="false"
                      className="group rounded-md border border-[var(--color-panel-line)] bg-[var(--color-panel)] px-4 py-3 font-mono text-sm text-[var(--color-steel)] transition-colors duration-500 data-[lit=true]:border-[var(--color-signal)]/60 data-[lit=true]:text-[var(--color-paper)]"
                    >
                      <span className="mr-2 text-[var(--color-signal)] opacity-0 transition-opacity duration-500 group-data-[lit=true]:opacity-100">
                        ●
                      </span>
                      {stage.label}
                    </div>
                    {stage.agents && (
                      <div className="mt-2 grid grid-cols-2 gap-1.5 pl-4 sm:grid-cols-3">
                        {stage.agents.map((a) => (
                          <span
                            key={a}
                            className="rounded border border-[var(--color-panel-line)] px-2 py-1 text-center font-mono text-[11px] text-[var(--color-trace)]"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* findings feed */}
              <div>
                <TelemetryLabel variant="signal">
                  FINDINGS — {agentsStage?.agents?.length} AGENTS REPORTING
                </TelemetryLabel>
                <ul className="mt-4 flex flex-col gap-2">
                  {findings.map((f, i) => (
                    <li
                      key={i}
                      data-finding
                      className="flex items-start gap-3 rounded-md border border-[var(--color-panel-line)] bg-black/20 px-3 py-2.5"
                    >
                      <span
                        className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium ${sevColor[f.severity]}`}
                      >
                        {f.severity}
                      </span>
                      <span className="font-mono text-[12px] text-[var(--color-steel)]">
                        <span className="text-[var(--color-paper)]">{f.agent}</span> —{" "}
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative mt-10 flex flex-col items-start gap-4 border-t border-[var(--color-panel-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-sm text-[var(--color-signal)]">
                → WANT THIS RUN ON YOUR SITE?
              </p>
              <CTAButton
                href="#close"
                variant="solid"
                className="bg-[var(--color-signal)] text-[var(--color-panel)] hover:bg-[var(--color-signal)]"
              >
                Get a free audit
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
