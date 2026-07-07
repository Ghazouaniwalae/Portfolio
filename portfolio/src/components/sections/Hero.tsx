"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, T, prefersReduced } from "@/lib/gsap";
import { CTAButton } from "../ui/CTAButton";
import { hero } from "@/data/site";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReduced) {
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    // Entrance timeline (<1s total)
    tl.fromTo(
      ".hero-eyebrow",
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )
    .fromTo(
      ".hero-heading",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    )
    .fromTo(
      ".hero-sub",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    )
    .fromTo(
      ".hero-ctas",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    )
    .fromTo(
      ".hero-credibility",
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.3"
    )
    // Portrait: clip-path mask wipe (not a fade/zoom)
    .fromTo(
      ".hero-portrait",
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power3.out" },
      0.15
    );

    // Parallax effect on portrait
    if (portraitRef.current) {
      gsap.to(portraitRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Neural network nodes idle pulse
    if (nodesRef.current) {
      const nodes = nodesRef.current.querySelectorAll("circle");
      nodes.forEach((node) => {
        const duration = 2 + Math.random() * 2; // 2-4s randomized
        gsap.to(node, {
          opacity: 0.5,
          duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2, // randomized phase
        });
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-20 relative overflow-hidden">
      {/* AI Pattern Background */}
      <div ref={nodesRef} className="absolute inset-0 -z-10 opacity-6">
        <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="neural-network" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="var(--color-blue)" opacity="0.3" />
              <circle cx="60" cy="20" r="1.5" fill="var(--color-blue)" opacity="0.3" />
              <circle cx="40" cy="40" r="2" fill="var(--color-amber)" opacity="0.3" />
              <circle cx="20" cy="60" r="1.5" fill="var(--color-teal)" opacity="0.3" />
              <circle cx="60" cy="60" r="1.5" fill="var(--color-teal)" opacity="0.3" />
              <line x1="20" y1="20" x2="40" y2="40" stroke="var(--color-blue)" opacity="0.1" strokeWidth="0.5" />
              <line x1="60" y1="20" x2="40" y2="40" stroke="var(--color-blue)" opacity="0.1" strokeWidth="0.5" />
              <line x1="20" y1="60" x2="40" y2="40" stroke="var(--color-teal)" opacity="0.1" strokeWidth="0.5" />
              <line x1="60" y1="60" x2="40" y2="40" stroke="var(--color-teal)" opacity="0.1" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-network)" />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side */}
        <div>
          <p className="hero-eyebrow font-mono text-xs uppercase tracking-widest text-[var(--color-steel)] mb-6">
            {hero.eyebrow}
          </p>

          <h1 className="hero-heading font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--color-ink)] leading-tight mb-6">
            {hero.h1}
          </h1>

          <p className="hero-sub text-lg md:text-xl text-[var(--color-steel)] max-w-xl mb-10">
            {hero.sub}
          </p>

          <div className="hero-ctas flex flex-wrap gap-4 mb-12">
            <CTAButton href="#projects" variant="solid">
              See the work ↓
            </CTAButton>
            <CTAButton href="#contact" variant="ghost">
              Book a free call
            </CTAButton>
          </div>

          <p className="hero-credibility font-mono text-sm text-[var(--color-steel)]">
            {hero.credibility}
          </p>
        </div>

        {/* Right side - Portrait with parallax (no hover scale) */}
        <div ref={portraitRef} className="relative">
          <div className="hero-portrait relative aspect-[3/4] rounded-[var(--radius-card)] flex items-center justify-center overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Wala Eddine Ghazouani"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}