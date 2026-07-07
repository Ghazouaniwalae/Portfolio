"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade" | "zoom" | "zoomIn" | "zoomOut";
  delay?: number;
  className?: string;
  zoomAmount?: number;
}

export function ScrollReveal({ children, direction = "up", delay = 0, className = "", zoomAmount = 0.2 }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }

    if (!containerRef.current) return;

    const element = containerRef.current;
    
    // Set initial state based on direction
    const initialState: Record<string, any> = { opacity: 0 };
    const finalState: Record<string, any> = { opacity: 1 };

    switch (direction) {
      case "up":
        initialState.y = 60;
        initialState.scale = 0.95;
        finalState.y = 0;
        finalState.scale = 1;
        break;
      case "down":
        initialState.y = -60;
        initialState.scale = 0.95;
        finalState.y = 0;
        finalState.scale = 1;
        break;
      case "left":
        initialState.x = 60;
        initialState.scale = 0.95;
        finalState.x = 0;
        finalState.scale = 1;
        break;
      case "right":
        initialState.x = -60;
        initialState.scale = 0.95;
        finalState.x = 0;
        finalState.scale = 1;
        break;
      case "fade":
        // Just opacity
        break;
      case "zoom":
        initialState.scale = 0.8;
        finalState.scale = 1;
        break;
      case "zoomIn":
        initialState.scale = 0.5;
        initialState.opacity = 0;
        finalState.scale = 1;
        finalState.opacity = 1;
        break;
      case "zoomOut":
        initialState.scale = 1.2;
        initialState.opacity = 0;
        finalState.scale = 1;
        finalState.opacity = 1;
        break;
    }

    gsap.set(element, initialState);

    gsap.to(element, {
      ...finalState,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, [direction, delay, zoomAmount, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
