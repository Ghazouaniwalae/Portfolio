"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, T, prefersReduced } from "@/lib/gsap";
import { TelemetryLabel } from "@/components/ui/TelemetryLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { quote } from "@/data/site";

export function Quote() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll("[data-word]");
      if (!words) return;
      if (prefersReduced) {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        }
      );
    },
    { scope: ref }
  );

  const words = `${quote.before}${quote.word}${quote.after}`.split(" ");

  return (
    <section className="relative py-20 md:py-24">
      {/* corner ticks */}
      <span aria-hidden className="absolute bottom-10 left-10 h-6 w-6 border-b border-l border-[var(--color-hairline)]" />
      <span aria-hidden className="absolute bottom-10 right-10 h-6 w-6 border-b border-r border-[var(--color-hairline)]" />

      <ScrollReveal direction="fade" delay={0.1}>
        <div ref={ref} className="container-editorial text-center">
          <ScrollReveal direction="up" delay={0.15}>
            <TelemetryLabel>{quote.eyebrow}</TelemetryLabel>
          </ScrollReveal>
          <blockquote className="mt-10 font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.05]">
            {words.map((w, i) => {
              const isKey = w.includes(quote.word);
              return (
                <span
                  key={i}
                  className={`inline-block overflow-hidden pb-[0.08em] align-bottom ${
                    i < words.length - 1 ? "mr-[0.25em]" : ""
                  }`}
                >
                  <span
                    data-word
                    className={`inline-block will-change-transform ${isKey ? "gradient-word" : ""}`}
                  >
                    {w}
                  </span>
                </span>
              );
            })}
          </blockquote>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-steel)]">
              {quote.attribution}
            </p>
          </ScrollReveal>
        </div>
      </ScrollReveal>
    </section>
  );
}
