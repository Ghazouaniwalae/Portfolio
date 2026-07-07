"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, T } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Container } from "@/components/ui/Container";
import { TelemetryLabel } from "@/components/ui/TelemetryLabel";
import type { Pipeline } from "@/data/architectures";

interface EdgePath {
  key: string;
  from: string;
  to: string;
  d: string;
}

/**
 * Data-driven pipeline diagram (PART 4 of the motion spec). Renders any
 * `Pipeline` into a dark panel with three states:
 *  - resting: nodes muted (steel), edges undrawn
 *  - drawing: nodes SETTLE top→bottom, edges TRACE via stroke-dashoffset (once)
 *  - focus:   hover a node → it lifts + amber-marks, others dim to 45%
 * Click a node to pin it: related edges light and an engineering detail shows.
 * Reduced motion renders the completed diagram statically; layout stacks
 * vertically on mobile and edges re-measure on resize.
 */
export function ArchitectureDiagram({
  pipeline,
  label = "ARCHITECTURE",
  heading,
}: {
  pipeline: Pipeline;
  label?: string;
  heading: string;
}) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [edgePaths, setEdgePaths] = useState<EdgePath[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);

  const rows = useMemo(() => {
    const byRow = new Map<number, typeof pipeline.nodes>();
    for (const n of pipeline.nodes) {
      const arr = byRow.get(n.row) ?? [];
      arr.push(n);
      byRow.set(n.row, arr);
    }
    return [...byRow.entries()].sort((a, b) => a[0] - b[0]).map(([, nodes]) => nodes);
  }, [pipeline.nodes]);

  const active = pinned ?? hovered;

  /** The set of nodes/edges highlighted while a node is focused. */
  const relatedEdges = useMemo(() => {
    if (!active) return new Set<string>();
    const s = new Set<string>();
    pipeline.edges.forEach((e) => {
      if (e.from === active || e.to === active) s.add(`${e.from}-${e.to}`);
    });
    return s;
  }, [active, pipeline.edges]);

  /** Measure node boxes and build one curved path per edge. */
  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const gb = grid.getBoundingClientRect();
    const center = (el: HTMLElement, edge: "top" | "bottom") => {
      const b = el.getBoundingClientRect();
      return { x: b.left - gb.left + b.width / 2, y: (edge === "top" ? b.top : b.bottom) - gb.top };
    };
    const paths: EdgePath[] = [];
    for (const e of pipeline.edges) {
      const a = nodeRefs.current.get(e.from);
      const b = nodeRefs.current.get(e.to);
      if (!a || !b) continue;
      const p1 = center(a, "bottom");
      const p2 = center(b, "top");
      const midY = (p1.y + p2.y) / 2;
      paths.push({
        key: `${e.from}-${e.to}`,
        from: e.from,
        to: e.to,
        d: `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`,
      });
    }
    setSize({ w: gb.width, h: gb.height });
    setEdgePaths(paths);
  }, [pipeline.edges]);

  // Re-measure on layout and whenever the grid resizes (responsive / mobile stack).
  useLayoutEffect(() => {
    measure();
    const grid = gridRef.current;
    if (!grid || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(grid);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Entrance: nodes SETTLE top→bottom, edges TRACE in flow order (once).
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || edgePaths.length === 0) return;
      const nodeEls = [...nodeRefs.current.entries()]
        .sort((a, b) => {
          const ra = pipeline.nodes.find((n) => n.id === a[0])!.row;
          const rb = pipeline.nodes.find((n) => n.id === b[0])!.row;
          return ra - rb;
        })
        .map(([, el]) => el);
      const strokes = root.querySelectorAll<SVGPathElement>("[data-edge]");

      if (reduced) {
        gsap.set(nodeEls, { opacity: 1, y: 0 });
        strokes.forEach((s) => s.style.setProperty("stroke-dashoffset", "0"));
        return;
      }

      gsap.set(nodeEls, { opacity: 0.35, y: 14 });
      strokes.forEach((s) => {
        const len = s.getTotalLength();
        s.style.strokeDasharray = `${len}`;
        s.style.strokeDashoffset = `${len}`;
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
      tl.to(nodeEls, { opacity: 1, y: 0, duration: T.BASE, stagger: T.STAGGER + 0.04 });
      tl.to(
        strokes,
        { strokeDashoffset: 0, duration: T.SLOW, ease: "power2.inOut", stagger: 0.05 },
        0.2
      );
    },
    { scope: rootRef, dependencies: [reduced, edgePaths.length] }
  );

  const setNodeRef = (id: string) => (el: HTMLElement | null) => {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  };

  const activeNode = active ? pipeline.nodes.find((n) => n.id === active) : null;

  return (
    <section
      ref={rootRef}
      className="container-full mt-16 bg-[var(--color-panel)] py-16 text-[var(--color-paper)] md:py-20"
    >
      <Container width="wide">
        <TelemetryLabel variant="signal">{label}</TelemetryLabel>
        <h2 className="mt-4 max-w-[24ch] font-display text-2xl font-semibold md:text-3xl">
          {heading}
        </h2>

        <div ref={gridRef} className="relative mt-10">
          {/* edge layer */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
            preserveAspectRatio="none"
            fill="none"
          >
            {edgePaths.map((p) => {
              const lit = active ? relatedEdges.has(p.key) : false;
              return (
                <path
                  key={p.key}
                  data-edge
                  d={p.d}
                  stroke={lit ? "var(--color-signal)" : "var(--color-panel-line)"}
                  strokeWidth={lit ? 1.6 : 1}
                  strokeLinecap="round"
                  style={{ transition: "stroke 200ms ease, stroke-width 200ms ease" }}
                />
              );
            })}
          </svg>

          {/* node layer */}
          <div className="relative flex flex-col gap-8 md:gap-10">
            {rows.map((rowNodes, i) => (
              <div
                key={i}
                className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-6"
              >
                {rowNodes.map((n) => {
                  const isActive = active === n.id;
                  const dimmed = active && !isActive && !relatedEdges.has(`${active}-${n.id}`) && !relatedEdges.has(`${n.id}-${active}`);
                  return (
                    <button
                      key={n.id}
                      ref={setNodeRef(n.id)}
                      type="button"
                      onMouseEnter={() => setHovered(n.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(n.id)}
                      onBlur={() => setHovered(null)}
                      onClick={() => setPinned((p) => (p === n.id ? null : n.id))}
                      aria-pressed={pinned === n.id}
                      className="group relative w-full min-w-[9rem] rounded-md border bg-[var(--color-panel)]/80 px-4 py-3 text-left font-mono shadow-[var(--shadow-panel)] transition-all duration-200 sm:w-auto sm:max-w-[15rem] sm:flex-1"
                      style={{
                        borderColor: isActive ? "var(--color-signal)" : "var(--color-panel-line)",
                        transform: isActive ? "translateY(-2px)" : "translateY(0)",
                        opacity: dimmed ? 0.45 : 1,
                        boxShadow: isActive
                          ? "0 0 24px color-mix(in srgb, var(--color-signal) 22%, transparent)"
                          : "none",
                      }}
                    >
                      <span
                        className="block text-[13px] font-medium"
                        style={{ color: isActive ? "var(--color-signal)" : "var(--color-paper)" }}
                      >
                        {n.label}
                      </span>
                      {n.sublabel && (
                        <span className="mt-1 block text-[11px] text-[var(--color-steel)]">
                          {n.sublabel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* focus detail — click a node */}
        <div className="mt-6 min-h-[1.5rem] font-mono text-[12px] text-[var(--color-steel)]">
          {activeNode?.detail ? (
            <p>
              <span className="text-[var(--color-signal)]">
                {pinned ? "▸ " : "· "}
                {activeNode.label}
              </span>{" "}
              — {activeNode.detail}
            </p>
          ) : (
            <p className="text-[var(--color-steel)]/70">
              Hover a stage to trace its role · click to pin.
            </p>
          )}
        </div>

        {/* metrics */}
        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-[var(--color-panel-line)] pt-8 sm:grid-cols-3">
          {pipeline.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-mono text-2xl font-semibold text-[var(--color-signal)]">{m.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-steel)]">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
