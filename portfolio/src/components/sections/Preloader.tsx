"use client";

import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, T, prefersReduced } from "@/lib/gsap";

/** 00 — mono boot line with amber progress bar, skipped on repeat visits. */
export function Preloader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current && show && !leaving && !prefersReduced) {
      // Progress bar traces (scaleX 0→1)
      gsap.fromTo(
        barRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.9, ease: "power2.out" }
      );
    }
    if (containerRef.current && leaving) {
      // Whole preloader fades out
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [show, leaving]);

  // Run once on mount
  useEffect(() => {
    if (sessionStorage.getItem("booted")) return;
    sessionStorage.setItem("booted", "1");
    setShow(true);
    const hold = prefersReduced ? 200 : 900;
    const t1 = setTimeout(() => setLeaving(true), hold);
    const t2 = setTimeout(() => setShow(false), hold + 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[var(--color-paper)]"
    >
      <div className="font-mono text-sm text-[var(--color-steel)] mb-4">
        <span className="text-[var(--color-amber)]">&gt;</span> initializing…
      </div>
      {/* Amber progress bar */}
      <div className="w-48 h-[2px] bg-[var(--color-hairline)] overflow-hidden">
        <div ref={barRef} className="h-full w-full bg-[var(--color-amber)]" />
      </div>
    </div>
  );
}
