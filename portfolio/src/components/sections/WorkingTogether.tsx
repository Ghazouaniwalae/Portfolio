"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, T, prefersReduced } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { TelemetryLabel } from "@/components/ui/TelemetryLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { process, faq } from "@/data/site";

export function WorkingTogether() {
  const ref = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [loadingAnswer, setLoadingAnswer] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      setLoadingAnswer(null);
    } else {
      setLoadingAnswer(index);
      setExpandedIndex(index);
      // Show loading state then reveal answer
      setTimeout(() => {
        setLoadingAnswer(null);
      }, 250);
    }
  };

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const line = root.querySelector("[data-connector]");
      const steps = root.querySelectorAll("[data-step]");
      const checks = root.querySelectorAll("[data-check]");

      if (prefersReduced) {
        gsap.set(line, { scaleX: 1 });
        gsap.set([...Array.from(steps), ...Array.from(checks)], { opacity: 1, y: 0 });
        return;
      }

      // Connector line TRACES scaleX 0→1, T.SLOW (single pulse)
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: T.SLOW,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        }
      );
      
      // Steps SETTLE in with stagger 0.12
      gsap.from(steps, {
        opacity: 0,
        y: 20,
        duration: T.BASE,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
      
      // Amber dots light on arrival
      gsap.from(checks, {
        opacity: 0,
        y: 10,
        duration: T.FAST,
        stagger: 0.07,
        scrollTrigger: { trigger: root, start: "top 55%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section id="process" className="py-20">
      <Container width="wide">
        <ScrollReveal direction="fade" delay={0.1}>
          <div ref={ref}>
            <SectionTitle label="11 — PROTOCOL" className="mb-14">
              <h2 className="max-w-[16ch] font-display text-3xl font-semibold md:text-4xl">
                How we go from problem to a system that runs.
              </h2>
            </SectionTitle>

            <ScrollReveal direction="up" delay={0.2}>
              {/* timeline */}
              <div className="relative">
                <div
                  data-connector
                  className="absolute left-0 top-[7px] hidden h-px w-full origin-left bg-[var(--color-hairline)] md:block"
                />
                <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5">
                  {process.steps.map((s, i) => (
                    <ScrollReveal key={s.title} direction="fade" delay={0.25 + i * 0.06}>
                      <li data-step className="relative">
                        <span data-check className="relative z-[1] block h-3.5 w-3.5 rounded-full border-2 border-[var(--color-amber)] bg-[var(--color-paper)]" />
                        <TelemetryLabel className="mt-4 block" variant="amber">
                          {s.week}
                        </TelemetryLabel>
                        <h3 className="mt-1 font-display text-lg font-semibold">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--color-steel)]">
                          {s.body}
                        </p>
                      </li>
                    </ScrollReveal>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            {/* FAQ Section */}
            <ScrollReveal direction="fade" delay={0.6}>
              <div className="mt-16">
                <TelemetryLabel>FAQ</TelemetryLabel>
                <h3 className="mt-4 font-display text-2xl font-semibold text-[var(--color-ink)] mb-8">
                  Common questions ({faq.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {faq.map((item, index) => (
                    <div 
                      key={`faq-${index}`}
                      className="rounded-lg border border-[var(--color-hairline)] bg-[var(--color-card)] p-6"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <span className="font-display text-lg font-semibold text-[var(--color-ink)] flex-1">
                          {index + 1}. {item.question}
                        </span>
                        <button
                          onClick={() => toggleExpand(index)}
                          suppressHydrationWarning
                          className="text-[var(--color-amber)] text-2xl font-light bg-none border-none cursor-pointer p-0"
                        >
                          {expandedIndex === index ? "−" : "+"}
                        </button>
                      </div>
                      {expandedIndex === index && (
                        <div className="mt-4 pt-4 border-t border-[var(--color-hairline)]">
                          {loadingAnswer === index ? (
                            <p className="text-[15px] text-[var(--color-steel)] leading-relaxed font-mono">
                              &gt; loading answer…
                            </p>
                          ) : (
                            <p className="text-[15px] text-[var(--color-steel)] leading-relaxed">
                              {item.answer}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
