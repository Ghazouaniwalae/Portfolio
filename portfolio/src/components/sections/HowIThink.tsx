"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { TelemetryLabel } from "@/components/ui/TelemetryLabel";

export function HowIThink() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* topographic contour lines */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
        style={{ maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)" }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse
            key={i}
            cx="400"
            cy="300"
            rx={80 + i * 55}
            ry={50 + i * 38}
            fill="none"
            stroke="var(--color-steel)"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="container-editorial relative z-[1] max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
        <Reveal>
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Left side - Text content */}
            <div className="md:col-span-2">
              <TelemetryLabel variant="signal" className="mb-6">06 · METHOD</TelemetryLabel>
              <div className="space-y-8 text-[var(--color-steel)]">
                <p className="font-display text-2xl md:text-3xl leading-relaxed">
                  I build the whole system, not just the model.
                </p>
                <p className="text-lg leading-relaxed">
                  I'm Wala — I build AI systems end to end, from the messy data all the way to a working app someone can actually use. I like problems where the answer is hidden in plain sight: a thousand reviews nobody read, a forecast buried in noise, a website losing sales for reasons no one has time to name. I'd rather ship something that stays solved than something that demos well.
                </p>
                <p className="text-lg leading-relaxed">
                  I start with what's actually costing you time or money. Half the time the fix is a script or a database view, not a model. AI earns its place when there's real pattern-finding to do — reading thousands of reviews, forecasting from noisy data, scoring a site across 20 dimensions a person would skim past. The goal isn't the flashiest pipeline. It's solving the problem so it stays solved. If a spreadsheet formula beats a neural network, I'll tell you that too.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="text-[var(--color-teal)]">•</span>
                    <span>Based in Tunis TN</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[var(--color-teal)]">•</span>
                    <span>Focus: multi-agent systems, UX intelligence</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[var(--color-teal)]">•</span>
                    <span>Education: data science engineering</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[var(--color-teal)]">•</span>
                    <span>Currently: building an AI Coach Avatar</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side - Workspace image */}
            <div className="aspect-square rounded-2xl overflow-hidden border border-[var(--color-line)]">
              <Image
                src="/images/workspace2.png"
                alt="Wala Eddine Ghazouani - Workspace"
                width={400}
                height={400}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}