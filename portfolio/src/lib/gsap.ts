import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

export const T = {
  FAST: 0.2,
  BASE: 0.6,
  SLOW: 1.1,
  STAGGER: 0.08,
};

gsap.defaults({ ease: "power2.out", duration: T.BASE });

export const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, Flip };
