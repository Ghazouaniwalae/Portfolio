"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TelemetryLabel } from "@/components/ui/TelemetryLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { whyNotChatGPT } from "@/data/site";

export function WhyNotChatGPT() {
  return (
    <section className="py-20 md:py-24">
      <Container width="editorial">
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="rounded-[var(--radius)] border border-[var(--color-hairline)] bg-[var(--color-card)] p-8 shadow-[var(--shadow-lift)] md:p-12">
            <ScrollReveal direction="up" delay={0.15}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:gap-12">
                <div>
                  <TelemetryLabel variant="amber">Q</TelemetryLabel>
                  <h2 className="mt-3 font-display text-2xl font-semibold leading-tight md:max-w-[10ch]">
                    {whyNotChatGPT.q}
                  </h2>
                </div>
                <div>
                  <ScrollReveal direction="up" delay={0.2}>
                    <TelemetryLabel>A</TelemetryLabel>
                    <p className="mt-3 text-[17px] leading-relaxed text-[var(--color-steel)]">
                      {whyNotChatGPT.a}
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
