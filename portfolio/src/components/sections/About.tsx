"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, T, prefersReduced } from "@/lib/gsap";
import { about } from "@/data/site";
import { ScrollReveal } from "../ui/ScrollReveal";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReduced) {
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }

    // Parallax effect on photo
    if (photoRef.current) {
      gsap.to(photoRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 px-8 md:px-16 lg:px-24 relative overflow-hidden">
      {/* AI Pattern Background */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="data-flow" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 30 Q 15 15 30 30 T 60 30" stroke="var(--color-blue)" opacity="0.15" fill="none" strokeWidth="0.5" />
              <path d="M0 20 Q 15 35 30 20 T 60 20" stroke="var(--color-teal)" opacity="0.1" fill="none" strokeWidth="0.5" />
              <path d="M0 40 Q 15 25 30 40 T 60 40" stroke="var(--color-amber)" opacity="0.1" fill="none" strokeWidth="0.5" />
              <circle cx="15" cy="30" r="1" fill="var(--color-blue)" opacity="0.2" />
              <circle cx="45" cy="30" r="1" fill="var(--color-blue)" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#data-flow)" />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Photo with workspace image */}
        <div ref={photoRef} className="relative">
          <ScrollReveal direction="zoomOut" delay={0.1}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden transition-all duration-[200ms] hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:border-[var(--color-amber)] hover:border">
              <Image
                src="/images/workspace2.png"
                alt="Wala Eddine Ghazouani - Workspace"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="mt-3 text-sm font-mono text-[var(--color-steel)]">
              {about.photoCaption}
            </p>
          </ScrollReveal>
        </div>

        {/* Text content */}
        <div>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-ink)] mb-6">
              I build the whole system, not just the model.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg text-[var(--color-steel)] mb-8 leading-relaxed">
              {about.paragraph}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-base text-[var(--color-steel)] mb-8 leading-relaxed italic">
              {about.howIThink}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <ul className="space-y-3 mb-8">
              {about.facts.map((fact, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[var(--color-teal)] mt-0.5">•</span>
                  <span className="text-[var(--color-ink)]">{fact}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.6}>
            <div className="pt-6 border-t border-[var(--color-hairline)]">
              <p className="text-sm text-[var(--color-steel)] leading-relaxed">
                {about.personalTouch}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}