"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { footer } from "@/data/site";

export function Footer() {
  const dotRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (prefersReduced || !dotRef.current) return;

    // Teal status dot pulse — opacity 0.5→1, 2s yoyo (the one footer motion).
    gsap.fromTo(
      dotRef.current,
      { opacity: 0.5 },
      { opacity: 1, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" }
    );
  }, []);

  return (
    <footer className="py-20 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Live-status block */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-xs text-[var(--color-steel)]">
          <span
            ref={dotRef}
            aria-hidden
            className="h-2 w-2 rounded-full bg-[var(--color-teal)]"
          />
          <span>Available</span>
          <span aria-hidden className="text-[var(--color-hairline)]">·</span>
          <span>UTC+1</span>
          <span aria-hidden className="text-[var(--color-hairline)]">·</span>
          <span>{'<'}24h response</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-8 mb-12">
          {footer.nav.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="link-underline font-mono text-xs uppercase tracking-wider text-[var(--color-steel)] hover:text-[var(--color-signal)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-[var(--color-hairline)] pt-8">
          <p className="font-mono text-xs text-[var(--color-steel)] text-center mb-4">
            {footer.tagline}
          </p>
          <p className="font-mono text-xs text-[var(--color-steel)]/60 text-center">
            © 2026 Wala Eddine Ghazouani
          </p>
        </div>
      </div>
    </footer>
  );
}