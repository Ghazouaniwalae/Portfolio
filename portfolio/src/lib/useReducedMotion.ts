"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user prefers reduced motion.
 * Starts `true` on the server / first paint so animations never flash
 * before the preference is known.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** True on desktop pointers only — gates cursor-following / tilt effects. */
export function usePrecisePointer(): boolean {
  const [precise, setPrecise] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setPrecise(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return precise;
}
