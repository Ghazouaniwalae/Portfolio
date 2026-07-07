"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, T, prefersReduced } from "@/lib/gsap";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Container } from "@/components/ui/Container";
import dynamic from "next/dynamic";

const InlineWidget = dynamic(() => import("react-calendly").then(mod => mod.InlineWidget), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-[var(--color-hairline)] rounded-[var(--radius-card)] animate-pulse" />,
});

export function Close() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCalendly, setShowCalendly] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useGSAP(() => {
    if (prefersReduced) {
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: T.BASE }
    );
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-20">
      <Container width="wide">
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <SectionTitle label="08 — Let's talk" className="mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-ink)]">
                Every great system starts with one conversation.
              </h2>
            </SectionTitle>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="mb-8">
                <div className="relative">
                  <span className="absolute left-0 top-0 font-mono text-[var(--color-amber)] text-lg">
                    &gt;
                  </span>
                  <input
                    type="text"
                    suppressHydrationWarning
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="We spend hours every week reading supplier invoices..."
                    className="w-full pl-8 pr-4 py-4 font-mono text-lg bg-[var(--color-card)] border border-[var(--color-hairline)] rounded-lg focus:outline-none focus:border-[var(--color-amber)] text-[var(--color-ink)] placeholder:text-[var(--color-steel)]"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="space-y-4">
                {!showCalendly ? (
                  <button
                    onClick={() => setShowCalendly(true)}
                    suppressHydrationWarning
                    className="w-full py-4 px-8 bg-[var(--color-ink)] text-white font-medium rounded-lg hover:bg-[var(--color-amber)] transition-colors text-lg"
                  >
                    Book a discovery call →
                  </button>
                ) : (
                  <div className="min-h-[600px]">
                    <InlineWidget
                      url={
                        inputValue.trim()
                          ? `https://calendly.com/walaghazouani-work?a1=${encodeURIComponent(inputValue.trim())}`
                          : "https://calendly.com/walaghazouani-work"
                      }
                      styles={{ height: "600px" }}
                    />
                  </div>
                )}
                
                <div className="text-center">
                  <a 
                    href="mailto:walaghazouani.work@gmail.com"
                    className="text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    Or email me directly → walaghazouani.work@gmail.com
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="mt-8 text-center text-[var(--color-steel)] text-sm">
                30-minute call. No sales pitch. If AI isn't the right solution, I'll tell you.
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}