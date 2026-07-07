# Motion & Style Spec — "Instruments on Paper"
### Wala Eddine Ghazouani · AI Systems Portfolio · Build-Ready Reference

This is the single source of truth for how the site looks and moves. Build
against it top to bottom. It assumes the existing stack (Next.js App Router,
Tailwind, GSAP + ScrollTrigger) and the existing 15-section funnel.

**The one job of this site:** prove that Wala builds *end-to-end AI systems*
that solve real business problems. Every style and motion choice is kept or
cut by that test. Restraint is the premium signal — Linear and Stripe win by
what they leave out. We do not add a second visual language.

---

## PART 0 — Governing rules (enforce in every review)

### 0.1 The three-gesture motion vocabulary
Every animation on the site is one of these. If it is not, cut it.

| Gesture | What it is | Reserved for |
|---|---|---|
| **SETTLE** | arrival from a small offset, easing to rest | default reveal, editorial content |
| **TRACE** | a stroke/line drawing itself (`stroke-dashoffset` or `scaleX` from a fixed origin) | "the system is working" — pipelines, connectors, underlines |
| **ROLL** | odometer number counting up | proof and metrics ONLY |

### 0.2 Timing constants (put in `lib/gsap.ts`, never inline)
```ts
export const T = {
  FAST: 0.2,    // state changes: active/inactive, hover, toggles
  BASE: 0.6,    // standard reveals
  SLOW: 1.1,    // hero timeline, connector draws
  STAGGER: 0.08,
};
gsap.defaults({ ease: "power2.out", duration: T.BASE });
```

### 0.3 Colour discipline (extends the existing token rule to motion)
- **Amber** appears only on: metrics, active states, primary CTAs/links,
  active pipeline nodes. Never as ambient decoration.
- Bright `signal` / `trace` colours appear only inside dark panels.
- Motion follows the same rule: amber motion = "something meaningful is
  active," never "something is decorated."

### 0.4 Resting state
Everything not actively being read is **still**. Ambient perpetual motion is
banned with exactly one exception: the Field Notes marquee. Nothing else
animates in the viewport while it is on screen.

### 0.5 Reduced motion + performance
- Every GSAP call gated on `prefers-reduced-motion` → `gsap.set()` final
  state, no tween.
- Lighthouse target ≥95 all categories. Bundle = GSAP core + ScrollTrigger
  + Flip only. No particle libs, no cursor libs, no sound.

---

## PART 1 — Global styles & surfaces

### 1.1 Surfaces
- **Paper** (`--color-paper`) is the page. Cards are white on paper with
  `--shadow-lift` (layered, never a single hard drop shadow).
- **Dark panels** (`--color-panel`, `--shadow-panel`) are rare and meaningful:
  only the Terminal Strip, the project pipeline diagrams, and the terminal
  contact input. Dark = "you are looking at the machine working."

### 1.2 Scroll progress line (persistent instrument)
- Fixed 2px amber line at viewport top, `scrub: true` on body height.
- The site's one always-on reading. Keep it.
- **Addition:** as each section crosses into view, a fixed corner mono label
  updates (`04 — TELEMETRY`) and the progress line pulses one tick. Turns
  scrolling into "advancing through instrument readings." Cheap, on-brand.

### 1.3 Section-title reveal (applies to ALL section headings)
Before each heading appears: a short 1px line TRACES outward from the left
(`scaleX 0→1`, `T.BASE`, `transform-origin: left`), *then* the
TelemetryLabel + heading SETTLE in. This is the unifying entrance for every
section — replaces ad-hoc per-section heading animations.

---

## PART 2 — Kept "premium" ideas (the only extras we build)

Everything from the brainstorm that survives the "does it prove skill?" test.

### 2.1 Interactive architecture diagram per project — THE centerpiece
The single most valuable addition. Turns "trust me, I build systems" into
visible proof. One reusable engine, data-driven, one static SVG per project
supplied later. Full spec in PART 4.

### 2.2 Honest terminal contact input
Mono `>` prompt; visitor describes their problem; text pre-fills the
Calendly brief so the call starts warm. **We cut** the fake
"AI interprets → estimated 6 weeks" flow — that theater makes readers doubt
your *real* metrics. The pre-brief alone is memorable and 100% honest.

### 2.3 Terminal Strip with state variety
`Running… ███░░░ → ✓ Completed`, cycling — but every line from a REAL run.

### 2.4 Footer live status
`● Available · UTC+1 · <24h response · Building 3 systems`. Real, useful,
converts. The dot pulses gently (the one footer motion).

### 2.5 Terminal-style FAQ expand
On open: `> loading answer…` for ~250ms, then answer fades in. One small
delight, restrained.

### CUT (with reason — do not build):
custom cursor + trailing particles, floating data-packet particles,
scanlines, noise texture, mouse spotlight, 30s morphing gradients, magnetic
buttons, sound effects, animated brain behind portrait, floating skill
labels around photo, rotating hero keywords. *Each adds ambient motion that
competes with content, dents Lighthouse, and reads as "agency template" —
the exact thing we're escaping.*

---

## PART 3 — Per-section animation & style spec (current 15 sections)

### 1 · Preloader
- **Style:** paper background, single centered mono line + 2px amber
  progress bar (NOT a Jarvis boot sequence — one honest bar).
- **Motion:** bar TRACES `scaleX 0→1` over real load; on ready, whole
  preloader fades `opacity 1→0, 0.4s`, then unmounts.
- **Reduced motion:** skip bar, fade only.

### 2 · Hero
- **Style:** paper, editorial. Portrait still and serious. Neural-network
  SVG background stays subtle.
- **Motion — entrance timeline (<1s total):**
  ```
  eyebrow   opacity 0→1                    (0.0, dur 0.5)
  heading   y 30→0, opacity 0→1            (-0.3 overlap)
  sub       y 20→0, opacity 0→1            (-0.3 overlap)
  CTAs      y 20→0, opacity 0→1            (-0.3 overlap)
  counters  ROLL begins                    (on heading settle)
  ```
- **Neural nodes idle-alive:** `opacity 0.3→0.5`, 2–4s per node, randomized
  phase, `repeat:-1, yoyo:true`. Tiny amplitude. This is the ONE ambient
  exception justified by "idle monitor" — keep amplitude near-invisible.
- **Portrait:** parallax `-50px` on scroll (`scrub:1`). NO hover scale on a
  face — reads as toy-like.
- **CTA hover:** solid fills + a single light streak crosses once, 150ms
  (kept from brainstorm — it's a Trace gesture, restrained). Ghost: border
  + 2px lift.

### 3 · About
- **Style:** biggest whitespace on the page after HowIThink. Let it breathe.
- **Motion:** photo parallax `-30px` (`scrub:1`); staggered SETTLE reveals
  per existing delays. Photo hover: 2px lift + faint hairline glow border
  (`T.FAST`) — NOT rotation, NOT floating labels.

### 4 · Terminal Strip
- **Style:** dark panel, mono, `>` prefix, amber block cursor `▌`.
- **Motion:** typewriter with variable speed + tiny random pauses (feels
  like inference). Cycle states: `analyzing… → ███░░░ → ✓ done`. Pause on
  hover. All lines from real runs.
- **Reduced motion:** show completed lines statically, no typing.

### 5 · Good Fit
- **Style:** white card, teal check glyphs.
- **Motion:** each line SETTLES (`fade`, stagger `0.05`); as each lands, its
  teal check does a quick `scale 0.8→1` "light up" (`T.FAST`). One pass, no
  loop. (This is the honest version of the brainstorm's "green indicator
  lights" — no fake "checking…" delay.)

### 6 · Portals (signature interaction) — uses GSAP **Flip**
- **Style:** cards on paper, 2px lift on hover, NO 3D tilt.
- **Motion — on portal select:**
  - matched project cards physically TRAVEL to new positions
    (`350ms, power3.inOut`) via Flip — the eye follows the routing, which
    *is* the "input → outputs" pitch.
  - unmatched cards → `opacity 0.4, scale 0.97` (`T.FAST`).
  - `VIEWING: EXTRACT ✕` chip slides from top edge; amber underline TRACES
    left→right.
- **Done when:** selecting a portal reorders Projects, swaps headline + ROI
  preset + close CTA, updates URL hash, ✕ restores default.

### 7 · By The Numbers
- **Style:** fine instrument-grid background, tabular mono nums,
  amber prefix/suffix.
- **Motion:** three stats ROLL left→right, **150ms apart** (sequential =
  "readings arriving," not a simultaneous flash). A 1px amber underline
  TRACES beneath each number on its counter `onComplete` (not on scroll) —
  "value locked." Optional: a faint sparkline draws behind each stat via
  TRACE, muted steel, once.
- **Mechanical odometer feel:** `snap:1` on the tweened object; render digits
  via state. (This satisfies the brainstorm's "airport counter" idea within
  the Roll gesture.)

### 8 · Projects — BIGGEST opportunity
- **Style:** problem-first cards; project name only as small mono sub-label.
- **Motion — card:** hover = 2px lift + shadow. On portal change, rows
  reorder `opacity 0.4→1, y 8→0, stagger 0.05, dur 0.4`.
- **Progressive disclosure (kept from brainstorm, honest form):**
  - resting: PROBLEM + one-line solution + impact.
  - hover: the mini architecture diagram hint fades in (steel).
  - click → `/work/[slug]`: full interactive pipeline (PART 4).
- No auto-opening screenshots; the diagram is the hero, not a screenshot.

### 9 · Quote
- **Motion:** word-by-word rise `yPercent 110→0, opacity 0→1, stagger 0.12,
  dur 0.7`, trigger at 70%. One key word in gradient. This is the site's one
  "special" reveal — allowed because it's a single editorial moment.
- **Cut:** the "words pulse every few seconds" loop — violates resting state.

### 10 · Field Notes
- **Style:** full-width dark-ish strip, mono, diamond `◆` separators, edge
  fade.
- **Motion:** infinite marquee `xPercent -50, 40s linear, repeat:-1`, pause
  on hover. THE one perpetual-motion exception. Content reads as telemetry
  (`Forecast generated · Model loaded · Agent connected`) — all real/plausible
  system events, not invented metrics.
- **Guard:** nothing else animates in-viewport while this is on screen.

### 11 · Skill Wheel — riskiest, high payoff
- **Style:** 440px wheel, two rings, 12-o'clock amber marker, center text.
- **Motion:** scroll rotation `-320°`, `scrub:0.5`. **Critical:** the active
  cluster (whichever hits the marker) eases to full opacity + amber border in
  a **decoupled** `T.FAST` tween — never tied to the scrub — so reading stays
  crisp mid-rotation. Others at 45%.
- **Center morph (kept, restrained):** center label crossfades to the active
  cluster name only — NOT a spawning list of sub-techs (too busy).
- **Mobile:** drop the wheel → horizontal scroll chips.
- **Reduced motion:** static wheel, all clusters at full opacity, no rotate.

### 12 · Working Together
- **Motion:** connector line TRACES `scaleX 0→1, T.SLOW` (the "electricity"
  idea, disciplined — a clean single pulse, not a looping current), then
  steps SETTLE in `stagger 0.12`. Each step's amber dot lights on arrival.
- **FAQ:** terminal-style expand — `> loading answer…` ~250ms → answer fades
  in. Toggle `T.FAST`.

### 13 · Close (contact)
- **Style:** terminal input — dark or bordered card, mono, `>` prefix,
  blinking amber caret (CSS only).
- **Motion:** container fade `0.8s`. Caret blink CSS. Calendly lazy-loads
  (`next/dynamic`) on button click.
- **Behaviour:** typed text pre-fills Calendly custom question (`?a1=…`) so
  the call is pre-briefed. NO fake AI analysis of their input.

### 14 · Footer
- **Style:** dark-ish, mono nav, hover steel→signal.
- **Motion:** live-status block — `● Available` dot pulses gently
  (`opacity 0.5→1`, 2s, yoyo). Everything else static. `UTC+1 · <24h ·
  Building 3 systems`.

### 15 · Mobile CTA
- **Style:** fixed bottom solid "Book a free call."
- **Motion:** slides up once after hero scrolls out; no perpetual motion.

---

## PART 4 — The animated architecture diagram engine

The centerpiece. One component, data-driven, renders every project's pipeline
from the static SVG you supply per project.

### 4.1 Concept
A pipeline of nodes that DRAWS ITSELF into being on scroll — the visual claim
that Wala owns every layer, data → deployed system.

### 4.2 Three states
| State | Trigger | Behaviour |
|---|---|---|
| **Resting** | default | full pipeline visible but muted (steel); edges undrawn |
| **Drawing** | scroll into view, once | nodes SETTLE left→right `stagger 0.12`; edges TRACE via `stroke-dashoffset` so data visibly "flows"; ~1.2s total |
| **Focus** | hover a node | that node lifts 2px, amber-marks active, shows label + one-line role; others dim to 45% |

### 4.3 Data shape (you fill one per project)
```ts
type Pipeline = {
  nodes: { id: string; label: string; sublabel?: string }[];
  edges: { from: string; to: string }[];
  metrics: { value: string; label: string }[];  // real only
};
```
Same engine renders SmartShop (`Reviews → Clean → Embeddings → Vector DB →
LLM → Dashboard`) and MLOps from different data. Consistency = credibility.

### 4.4 Working with your static SVGs
When you supply each static diagram:
- **Preferred:** clean SVG with labeled node groups
  (`id="node-embeddings"`, `id="edge-embeddings-vectordb"`). Then strokes and
  nodes animate directly against your art.
- **Alternative:** I rebuild as native SVG from your layout for full control.
- Decide per file on delivery.

### 4.5 Honesty rule (non-negotiable)
Nodes and metrics reflect only what the system really does. No invented
percentages. The diagram's credibility is the entire point of building it.

### 4.6 Reduced motion + mobile
- Reduced motion: render completed diagram static, all nodes full opacity.
- Mobile: pipeline stacks vertically (reads naturally as "flow downward"),
  edges TRACE top→bottom.

---

## PART 5 — Microinteractions (the disciplined shortlist)

Only these. Each maps to an approved gesture.

| Interaction | Spec | Gesture |
|---|---|---|
| Card hover | 2–3px lift + `shadow-lift`, 150ms | — |
| Link underline | grows from center, `T.FAST` | TRACE |
| Section title | 1px line traces before heading | TRACE |
| Numbers | roll on scroll-in | ROLL |
| Icons | SVG stroke self-draws once on reveal | TRACE |
| Image reveal | mask wipe (clip-path), not fade | TRACE-adjacent |
| Buttons | fill + single light streak (Hero CTA only) | TRACE |

**Explicitly excluded:** magnetic buttons, custom cursor, cursor trails,
sound. They cost trust and Lighthouse for zero proof of skill.

---

## PART 6 — Build order (unchanged funnel, motion layered in)

1. Lock `lib/gsap.ts` timing constants + reduced-motion helper.
2. Global: scroll-progress line + section-title trace + corner label.
3. Hero timeline → By The Numbers roll → Portals Flip (the three signature
   moments).
4. Diagram engine on one project, verify, then roll to all.
5. Terminal Strip, FAQ terminal expand, Close terminal input, Footer status.
6. Mobile pass → reduced-motion pass → Lighthouse ≥95 pass.
7. Chanel rule before launch: walk the page, remove one accessory.

---

*Discipline note: after each section, run the three checks — mobile,
reduced-motion, and "does amber appear anywhere it shouldn't?" The site's
credibility comes from restraint. When in doubt, cut the motion.*
