"use client";

import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { TelemetryLabel } from "../ui/TelemetryLabel";

export function PersonalGallery() {
  const portraits = [
    {
      src: "/images/profile.jpg",
      alt: "Wala Eddine Ghazouani - Portrait 1",
      label: "Portrait"
    },
    {
      src: "/images/workspace2.png",
      alt: "Wala Eddine Ghazouani - Workspace",
      label: "Workspace"
    },
    {
      src: "/images/portrait3.jpg",
      alt: "Wala Eddine Ghazouani - Portrait 3",
      label: "In Motion"
    },
  ];

  return (
    <section id="gallery" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
        <Reveal>
          <div className="mb-16">
            <TelemetryLabel variant="signal" className="mb-4">02 · ABOUT</TelemetryLabel>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-ink)]">
              Who I Am
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portraits.map((portrait, index) => (
              <div key={index} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--color-line)] hover:border-[var(--color-signal)] transition-all duration-300">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-bg)] to-transparent p-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-steel)]">
                    {portrait.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}