# Portfolio Implementation Guide — Wala Eddine Ghazouani
### "Instruments on Paper" · Next.js + Tailwind + GSAP · Lead-Closing Funnel

Follow this top to bottom. Each step has a **Done when** check so you always
know if you can move on. Estimated total: 3–4 weeks part-time.

---

## PHASE 0 — Before writing code (1 evening)

### 0.1 Accounts & assets
- [ ] Buy domain (walaeddine.dev / weg.dev — Namecheap or Cloudflare)
- [ ] GitHub repo: `portfolio` (public — it's part of the proof)
- [ ] Vercel account connected to GitHub
- [ ] Calendly free account → create event "Discovery call — 30 min"
- [ ] Collect: headshot, GitHub/LinkedIn URLs, contact email

### 0.2 Content homework (do in a Google Doc first, not in code)
For each project (FX AlphaLab, SmartShop, BrandDNA/UX Analyzer, MLOps
Pipeline, Wevioo Summarizer) write:
1. **Problem line** — the client-world pain ("E-commerce stores can't read
   thousands of reviews")
2. **Solution paragraph** — 2–3 sentences, plain language
3. **Impact line** — one honest metric (`6 AI MODULES`, `3 MICROSOFT APIS
   INTEGRATED`, `100% EXPLAINABLE OUTPUTS`)
4. **Stack tags** — 3–5 max
5. Before/after sentences for the case page

Also write: the 4 "good fit" checkmarks, the "How I think" paragraph, the
"Why not ChatGPT" answer, and 8–12 real finding lines from a real UX
Analyzer run (these become the Replay Theater script).

**Done when:** every section of the site has real copy in a doc. Never
design against lorem ipsum — copy IS the design here.

---

## PHASE 1 — Foundation (days 1–2)

### 1.1 Scaffold
```bash
npx create-next-app@latest portfolio \
  --typescript --tailwind --app --src-dir --eslint
cd portfolio
npm install gsap @gsap/react
npm install react-calendly        # close section
```
Keep it lean. No UI kit, no component library — we own every pixel.

### 1.2 Folder structure
```
src/
├── app/
│   ├── layout.tsx              # fonts, metadata, <PortalProvider>
│   ├── page.tsx                # the one-page funnel (section order)
│   ├── globals.css             # tokens (@theme), base styles
│   └── work/
│       └── [slug]/page.tsx     # case study pages (SSG from data)
├── components/
│   ├── ui/                     # the kit — dumb, reusable
│   │   ├── TelemetryLabel.tsx  # mono uppercase micro-label
│   │   ├── SectionHeading.tsx  # eyebrow + heading pattern
│   │   ├── CTAButton.tsx       # solid ink / ghost variants
│   │   ├── Counter.tsx         # odometer roll-up number
│   │   ├── Tag.tsx             # mono stack/outcome chip
│   │   └── Reveal.tsx          # scroll-reveal wrapper (GSAP)
│   ├── sections/               # one file per funnel section
│   │   ├── Hero.tsx
│   │   ├── GoodFit.tsx
│   │   ├── Portals.tsx
│   │   ├── ProblemsSolved.tsx
│   │   ├── ReplayTheater.tsx
│   │   ├── HowIThink.tsx
│   │   ├── WorkingTogether.tsx
│   │   ├── WhyNotChatGPT.tsx
│   │   ├── ROICalculator.tsx
│   │   └── Close.tsx
│   └── theater/                # replay internals
│       ├── AgentChip.tsx       # ○ queued · ● active · ✓ done
│       └── TerminalLog.tsx     # typewriter log renderer
├── data/
│   ├── projects.ts             # all case study content
│   ├── portals.ts              # portal defs + routing map
│   └── replay-timeline.json    # recorded analyzer run script
├── lib/
│   ├── portal-context.tsx      # selected portal state (React context)
│   └── gsap.ts                 # plugin registration, defaults
└── public/                     # headshot, og-image, favicons
```
Rule: **sections compose ui, never the reverse.** All copy lives in `data/`,
never hardcoded in components — this is what makes portal routing trivial.

### 1.3 Design tokens (globals.css)
```css
@theme {
  /* Instruments on Paper */
  --color-paper: #FBFAF7;      /* page background */
  --color-card: #FFFFFF;
  --color-hairline: #E4E2DB;
  --color-ink: #10182B;        /* primary text, solid CTAs */
  --color-steel: #5F6B7A;      /* secondary text */
  --color-amber: #C47D0E;      /* accent on light — data/CTA only */
  --color-teal: #0E8C6D;       /* outcomes on light */
  /* dark instrument panels only: */
  --color-panel: #0A0F1E;
  --color-panel-line: #1F2937;
  --color-signal: #FFB224;     /* amber on dark */
  --color-trace: #2DD4A7;      /* teal on dark */

  --font-display: var(--font-bricolage);
  --font-body: var(--font-inter);
  --font-mono: var(--font-jetbrains);

  --radius: 8px;
  --shadow-lift: 0 1px 2px rgb(16 24 43 / 0.04),
                 0 4px 12px rgb(16 24 43 / 0.06),
                 0 12px 32px rgb(16 24 43 / 0.06);
  --shadow-panel: 0 8px 24px rgb(16 24 43 / 0.12),
                  0 24px 64px rgb(16 24 43 / 0.10);
}
```
Discipline rules (enforce during review):
- Amber appears ONLY on: metrics, active agent states, primary links/CTAs.
- Bright `signal`/`trace` colors appear ONLY inside dark panels.
- Layered shadows only (`shadow-lift`) — never a single hard drop shadow.

### 1.4 Fonts (app/layout.tsx)
```tsx
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"], weight: ["500", "600"],
  variable: "--font-bricolage",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"], weight: ["400", "500"],
  variable: "--font-jetbrains",
});
// apply all three variables on <html className={...}>
```

### 1.5 GSAP setup (lib/gsap.ts)
```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power2.out", duration: 0.6 });
export { gsap, ScrollTrigger };
```
Every animated component:
```tsx
"use client";
import { useGSAP } from "@gsap/react";
// respect reduced motion EVERYWHERE:
const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// if prefersReduced → gsap.set(...) final states, no tweens
```

**Done when:** `npm run dev` shows a paper-colored page with all three fonts
rendering, deployed to Vercel on your domain (yes, deploy the empty shell —
you iterate on a live URL from day one).

---

## PHASE 2 — The component kit (days 3–4)

Build these in isolation first (a scratch `/kit` page helps). Keep each under
~60 lines.

| Component | Spec |
|---|---|
| `TelemetryLabel` | mono, 11px, uppercase, tracking `0.15em`, steel (amber variant) |
| `SectionHeading` | TelemetryLabel eyebrow (`02 — DIAGNOSIS`) + Bricolage heading |
| `CTAButton` | `solid` = ink bg/paper text; `ghost` = hairline border. Hover: translateY(-2px) + shadow-lift, 150ms |
| `Counter` | rolls 0→target when scrolled into view (GSAP `snap: 1` on an object, render via state). Mono, respects reduced motion (jump to value) |
| `Tag` | mono 9px chip, hairline border; `outcome` variant = teal |
| `Reveal` | wraps children; on enter: opacity 0→1, y 20→0, `once: true` |

**Done when:** every kit component renders on `/kit` and looks correct at
mobile width.

---

## PHASE 3 — Sections, in build order (days 5–12)

Build top to bottom. Wire each into `page.tsx` as you finish it.

### 3.1 Hero
- Eyebrow: `AI SYSTEMS · WORKFLOW AUTOMATION · DOCUMENT INTELLIGENCE`
- H1: **"Automate the work that costs you hours every week."**
- Sub: "Custom AI that turns your documents, calls, and business data into
  decisions — integrated into the tools you already use."
- CTAs: solid "See the work ↓" (anchor scroll) · ghost "Book a free call"
- Proof bar: three `Counter`s — 6+ / 5 / 12+ with mono labels
- Entrance: single timeline — eyebrow fades, H1 rises (0.5s), counters roll.
  Total < 1s. No typing effect (cut for restraint).
- Scroll progress: fixed 2px amber line at viewport top,
  `ScrollTrigger scrub` on body height.

**Done when:** hero reads in 5 seconds, entrance runs once, progress line
tracks scroll.

### 3.2 GoodFit
Four ✓ lines on a white card ("You might be a good fit if…"): repetitive
manual work / unused business data / AI into existing software / MVP in
weeks. Teal check glyphs, one `Reveal`. No other motion.

### 3.3 Portals (the routing brain)
`data/portals.ts`:
```ts
export type PortalId = "build" | "extract" | "predict";
export const portals = {
  build:   { label: "BUILD",   pain: "I have an AI idea but no one to build it",
             headline: "From idea to deployed system.",
             projects: ["fx-alphalab", "smartshop", "mlops"],
             roi: { preset: "shipping" },
             cta: "Let's scope your idea" },
  extract: { label: "EXTRACT", pain: "My data is a mess of documents, calls, and text",
             headline: "Your documents, calls and reviews are full of answers.",
             projects: ["wevioo-summarizer", "branddna", "smartshop"],
             roi: { preset: "manual-hours" },
             cta: "Show me what's in my data" },
  predict: { label: "PREDICT", pain: "I want my business to predict, not react",
             headline: "Stop reacting. Start predicting.",
             projects: ["fx-alphalab", "smartshop"],
             roi: { preset: "wrong-decisions" },
             cta: "Explore prediction for my business" },
};
```
- `lib/portal-context.tsx`: `{ portal, setPortal }`, synced to URL hash
  (`/#extract`) so routes are shareable. Read hash on mount.
- Selecting a portal: cards reorder via **FLIP-style** transition (GSAP
  `Flip` plugin or CSS `view-transition`), section headline crossfades,
  a small "recommended approach" card appears (approach + typical
  timeline + matched cases). Quiet — no overlay takeover (cut).
- Hover: max 3–4° tilt via CSS transform on mouse position; skip on touch.
- A pinned mono chip `VIEWING: EXTRACT ✕` clears the portal.

**Done when:** clicking a portal reorders ProblemsSolved, swaps headline +
ROI preset + close CTA, updates the hash, and ✕ restores default.

### 3.4 ProblemsSolved
`data/projects.ts` — each project: `slug, problem, solutionShort, impact,
tags[], portalWeights, before, after, architecture[], metrics[]`.
Card anatomy (problem-first):
```
[ mono tags ]
Problem sentence (heading size)      ← the hook
Solution in one line (steel)
IMPACT LINE (mono, amber)
See how it works →
```
Project names appear only as small mono sub-labels. Hover: lift + shadow.
Dimmed teaser card at the end: `IN PROGRESS 2026 — AI COACH AVATAR`.
Case pages (`/work/[slug]`) — build ONE template: header → before/after →
architecture diagram (SVG nodes, draw-in on scroll with `DrawSVG`-style
stroke animation or simple staggered reveals) → metrics counters → process
notes → next-case footer. Before/after drag slider: two absolutely stacked
layers + `clip-path: inset()` driven by a drag handle (pointer events),
keyboard accessible (arrow keys).

**Done when:** all 5 case pages generate from data alone, slider works with
mouse, touch, and keyboard.

### 3.5 ReplayTheater — THE moment (budget 2 full days)
The only dark panel on the page (`--color-panel`, `--shadow-panel`).
`data/replay-timeline.json` — a recorded run as a timeline:
```json
{ "meta": { "target": "example-client.com", "duration": 42 },
  "events": [
    { "t": 0.0,  "type": "status", "text": "Input detected — example-client.com" },
    { "t": 1.2,  "type": "agent",  "id": "crawler", "state": "active" },
    { "t": 6.8,  "type": "agent",  "id": "crawler", "state": "done", "took": "5.6s" },
    { "t": 7.0,  "type": "log",    "tag": "VISION", "text": "contrast 2.8:1 on primary CTA — fails WCAG AA" },
    { "t": 34.0, "type": "status", "text": "Generating recommendations..." },
    { "t": 38.0, "type": "summary","findings": 3, "top": "HIGH SEVERITY — CTA invisible above the fold" }
  ] }
```
Fill `events` from a REAL analyzer run — real findings only, no invented
revenue percentages.
- Engine: one GSAP timeline seeking through events; play/pause + 1x/2x.
- `TerminalLog`: typewriter with variable speed + tiny random pauses
  (feels like inference). Amber block cursor `▌`.
- `AgentChip` states: ○ steel → ● pulsing signal → ✓ trace + duration.
- Autoplay ONLY when ≥60% in viewport, once, muted-quiet; replay button after.
- Ends on findings summary + amber line:
  `→ WANT THIS RUN ON YOUR SITE? BOOK A FREE CALL` (links to Close, prefills
  the terminal input with "Run the analyzer on my site").
- Reduced motion: render the completed end-state statically.

**Done when:** a stranger watching it asks "wait, is that running live?"

### 3.6 HowIThink
One editorial paragraph, biggest whitespace on the page. "Don't start with
the model. Start with the bottleneck. … Sometimes no AI is needed. The goal
isn't impressive technology — it's solving the business problem." No motion
beyond `Reveal`. This section sells trust; let it breathe.

### 3.7 WorkingTogether
Horizontal 5-step timeline (mono week labels): Discovery → Prototype (week
1–2, "you see something working") → Build & integrate → Deploy → Support.
Under it, the risk-killers as ✓ lines: weekly updates · working prototype in
two weeks · transparent architecture & docs · **you own the source code** ·
post-launch support.

### 3.8 WhyNotChatGPT
Small two-column card. Q: "Can't ChatGPT already do this?" A: "Sometimes —
and when it can, I'll tell you. But businesses need integrations, pipelines,
security, deployment, monitoring. That's what I build."

### 3.9 ROICalculator
Three range inputs (custom amber thumb) — presets swap by portal:
hours/week of manual work · avg hourly cost · team size.
Output: `$ / YEAR` in large mono, animated with a spring
(`gsap.to(obj, { value, ease: "elastic.out(0.6, 0.5)" })` rendering via
state). Label: "estimated yearly cost of manual work — automation typically
recovers 60–80%." CTA inherits portal language.

### 3.10 Close + Footer
- H2: "What's broken, missing, or too slow in your business right now?"
- Terminal input: mono, `> ` prefix, blinking amber caret (CSS animation).
- Beside it: `react-calendly` `InlineWidget`; pass the typed text via
  Calendly URL prefill (`?a1=...` custom question) so the call is pre-briefed.
- Footer: nav (Work · Process · GitHub · LinkedIn · Email), the line
  "No trackers. No cookies. I analyze data for a living — yours isn't the
  product." © 2026.

**Done when:** typing in the prompt and booking creates a Calendly event
containing the typed text.

---

## PHASE 4 — Polish & launch (days 13–16)

### 4.1 Mobile pass
- Portals stack vertically; tilt disabled; tap = select.
- Proof bar → compact 3-col row. Theater → full-width card, log 5–6 lines.
- Sticky bottom bar on mobile: one solid "Book a free call".
- Test on a real phone, not just DevTools.

### 4.2 Accessibility & motion
- Visible focus rings (amber outline) on all interactive elements.
- Slider + sliders keyboard-operable. Theater has text alternative.
- `prefers-reduced-motion`: every GSAP call gated; final states set instantly.

### 4.3 Performance (target Lighthouse ≥ 95 all categories)
- `next/image` for the headshot; fonts already subset via `next/font`.
- No third-party scripts except Calendly (lazy-load it:
  `next/dynamic`, only when Close scrolls near).
- Check bundle: GSAP core + ScrollTrigger only (~60KB) — no other libs.

### 4.4 SEO & metadata
- `metadata` in layout: title "Wala Eddine Ghazouani — AI Systems &
  Automation", description with search-language keywords (workflow
  automation, document processing, AI integration).
- OG image (1200×630) in the design system — ink headline on paper.
- `sitemap.ts` + `robots.ts` (built into App Router).

### 4.5 Launch checklist
- [ ] Custom domain live with HTTPS
- [ ] All 5 case pages real-content complete
- [ ] Replay timeline uses real analyzer findings
- [ ] Calendly tested end-to-end
- [ ] Lighthouse ≥95 mobile & desktop
- [ ] Someone non-technical understood what you sell in 30 seconds

---

## PHASE 5 — Post-launch backlog (compound assets)
1. PDF case studies (downloadable — recruiters love them)
2. Engineering articles (`/articles`): "How I built a multi-agent UX
   analyzer", "Production lessons deploying Whisper", "Why most RAG
   systems fail"
3. RAG portfolio chat ("Ask about my experience" — searches your own
   projects, answers with citations) — on-brand proof of RAG skill
4. Live Playground: deploy the analyzer async (submit URL → emailed
   report) and upgrade the theater to accept real submissions
5. AI Coach Avatar case study when it ships
6. 30-day review: which funnel section loses people? Fix the weakest stage.

---

## Working rhythm
- Commit per component; deploy previews on every push (Vercel does this).
- After each section: mobile check + reduced-motion check + "does amber
  appear anywhere it shouldn't?" check.
- Chanel rule before launch: walk the page and remove one accessory.
