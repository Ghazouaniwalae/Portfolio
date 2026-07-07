"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, T, prefersReduced } from "@/lib/gsap";

/** 2px amber scroll-progress line fixed at the top of the viewport with corner label. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [currentLabel, setCurrentLabel] = useState("");

  useGSAP(() => {
    if (prefersReduced) {
      gsap.set(barRef.current, { scaleX: 1 });
      return;
    }

    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });
    
    // Main scroll progress
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Section label updates and pulse effect
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      const sectionLabel = section.querySelector(".telemetry")?.textContent || "";
      
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setCurrentLabel(sectionLabel);
          // Pulse effect
          gsap.fromTo(barRef.current, 
            { opacity: 1 },
            { opacity: 0.6, duration: 0.1, yoyo: true, repeat: 1 }
          );
        },
        onEnterBack: () => {
          setCurrentLabel(sectionLabel);
          gsap.fromTo(barRef.current, 
            { opacity: 1 },
            { opacity: 0.6, duration: 0.1, yoyo: true, repeat: 1 }
          );
        },
      });
    });

    // Async images/fonts shift layout after triggers are first measured;
    // refresh once everything has loaded so no entrance trigger is left stale.
    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    }
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
      >
        <div ref={barRef} className="h-full w-full bg-[var(--color-amber)]" />
      </div>
      {currentLabel && (
        <div
          ref={labelRef}
          className="fixed top-4 right-4 z-[60] font-mono text-[11px] uppercase tracking-wider text-[var(--color-steel)] bg-[var(--color-paper)] px-3 py-1 rounded border border-[var(--color-hairline)]"
        >
          {currentLabel}
        </div>
      )}
    </>
  );
}
