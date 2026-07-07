"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, T, prefersReduced } from "@/lib/gsap";
import { CTAButton } from "./CTAButton";

export function MobileCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;
    if (prefersReduced) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }

    // Hidden until the hero scrolls out of view, then slides up once.
    gsap.set(el, { y: 100, opacity: 0 });
    ScrollTrigger.create({
      start: () => window.innerHeight * 0.9,
      once: true,
      onEnter: () =>
        gsap.to(el, { y: 0, opacity: 1, duration: T.BASE, ease: "power2.out" }),
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-card)] border-t border-[var(--color-hairline)] p-4 md:hidden"
    >
      <CTAButton href="#contact" variant="solid" className="w-full">
        Book a free call
      </CTAButton>
    </div>
  );
}
