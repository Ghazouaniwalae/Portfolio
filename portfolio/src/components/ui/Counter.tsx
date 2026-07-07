"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** classes for the number itself */
  numberClassName?: string;
  className?: string;
  duration?: number;
  /** delay before the roll begins — used to sequence multiple counters */
  delay?: number;
  /** callback when counter finishes rolling */
  onComplete?: () => void;
}

/** Odometer roll-up that fires once when scrolled into view. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  numberClassName = "font-mono text-4xl md:text-5xl font-semibold text-[var(--color-ink)] tabular-nums",
  className = "",
  duration = 1.6,
  delay = 0,
  onComplete,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  // Keep the latest onComplete without making it an animation dependency —
  // Counter re-renders every onUpdate tick, so an inline callback would
  // otherwise re-register the tween continuously.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useGSAP(
    () => {
      if (reduced) {
        setDisplay(value);
        onCompleteRef.current?.();
        return;
      }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: value,
        duration,
        delay,
        ease: "power2.out",
        snap: { v: 1 },
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        onUpdate: () => setDisplay(Math.round(obj.v)),
        onComplete: () => onCompleteRef.current?.(),
      });
    },
    { scope: ref, dependencies: [reduced, value, duration, delay] }
  );

  return (
    <span ref={ref} className={`${numberClassName} ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
