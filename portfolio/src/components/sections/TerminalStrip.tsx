"use client";

import { useEffect, useRef, useState } from "react";
import { terminalLines } from "@/data/site";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function TerminalStrip() {
  const [text, setText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [progress, setProgress] = useState("");
  const paused = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(terminalLines[0]);
      return;
    }
    let i = 0;
    let deleting = false;
    let current = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (paused.current) {
        timer = setTimeout(tick, 200);
        return;
      }
      const full = terminalLines[current];
      if (!deleting) {
        i++;
        setText(full.slice(0, i));
        if (i >= full.length) {
          deleting = true;
          // Show progress state before deleting
          setProgress("███░░░");
          setTimeout(() => setProgress("████░░"), 300);
          setTimeout(() => setProgress("█████░"), 600);
          setTimeout(() => setProgress("██████"), 900);
          setTimeout(() => setProgress("✓ done"), 1200);
          timer = setTimeout(tick, 2000); // Longer pause to show progress
          return;
        }
        timer = setTimeout(tick, 45);
      } else {
        i--;
        setText(full.slice(0, i));
        setProgress("");
        if (i <= 0) {
          deleting = false;
          current = (current + 1) % terminalLines.length;
          setLineIdx(current);
          timer = setTimeout(tick, 300);
          return;
        }
        timer = setTimeout(tick, 22);
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <ScrollReveal direction="fade" delay={0.1}>
      <div
        className="container-full border-y border-[var(--color-panel-line)] bg-[var(--color-panel)]"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        <div className="container-wide">
          <p className="flex items-center py-4 font-mono text-sm text-[var(--color-trace)]">
            <span className="mr-2 text-[var(--color-steel)]">&gt;</span>
            <span aria-live="polite">{text || terminalLines[lineIdx]}</span>
            {progress && (
              <span className="ml-2 text-[var(--color-amber)]">
                {progress}
              </span>
            )}
            <span className="caret-blink ml-1 inline-block h-[1.1em] w-[0.55em] translate-y-[0.12em] bg-[var(--color-signal)]" />
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
