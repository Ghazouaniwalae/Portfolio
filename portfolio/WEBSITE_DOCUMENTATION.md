# Website Documentation

## Overview
This portfolio website showcases AI systems development work with a modern, animated design. Built with Next.js (App Router), React, TypeScript, Tailwind CSS, and GSAP animations.

---

## Page Structure

### Main Page (`src/app/page.tsx`)
Sections rendered in order:
1. Preloader
2. Hero
3. About
4. TerminalStrip
5. GoodFit
6. Portals
7. ByTheNumbers
8. Projects
9. Quote
10. FieldNotes
11. SkillWheel
12. WorkingTogether
13. Close
14. Footer
15. MobileCTA

---

## Section-by-Section Documentation

### 1. Preloader
**Location:** `src/components/sections/Preloader.tsx`
**Purpose:** Initial loading animation

**Animation:**
- GSAP timeline animation on load
- Fades out when page is ready

---

### 2. Hero Section
**Location:** `src/components/sections/Hero.tsx`
**Section Label:** None (first section)
**Copy:**
- Eyebrow: "AI SYSTEMS · DOCUMENT INTELLIGENCE · FORECASTING"
- Heading: "Turn scattered data into systems that do the work for you."
- Sub: "I design and build AI systems that eliminate repetitive work, turn scattered data into decisions, and integrate into the tools your team already uses."
- CTA Buttons: "See the work ↓" (solid), "Book a free call" (ghost)
- Credibility: "AI systems, end to end · From messy data to a working app"

**Components:**
- `CTAButton` - Solid and ghost variants
- `ScrollReveal` - Wrapper for scroll animations
- `ShapeAnimation` - Decorative animated shapes (circle, blob, square)
- `Image` - Profile portrait with Next.js Image component

**Animations:**
- **GSAP Timeline** (on mount):
  - Eyebrow: opacity 0→1 (0.5s)
  - Heading: opacity 0→1, y 30→0 (0.5s, staggered -0.3s)
  - Sub: opacity 0→1, y 20→0 (0.5s, staggered -0.3s)
  - CTAs: opacity 0→1, y 20→0 (0.5s, staggered -0.3s)
  - Credibility: opacity 0→1 (0.5s, staggered -0.3s)
- **Parallax Effect:** Portrait moves -50px on scroll (scrub: 1)
- **ScrollReveal:** Individual elements with direction="up" and staggered delays
- **Portrait:** ZoomIn animation (scale 0.5→1, opacity 0→1)
- **Hover Effects:** Portrait scale 1.05 on hover

**Background:**
- SVG neural network pattern (circles and lines)
- Decorative animated shapes (circle, blob, square)

---

### 3. About Section
**Location:** `src/components/sections/About.tsx`
**Copy:**
- Heading: "I build the whole system, not just the model."
- Paragraph: From `about.paragraph` in site.ts
- How I Think: From `about.howIThink` in site.ts (italic)
- Facts: List of bullet points from `about.facts`
- Personal Touch: From `about.personalTouch` (with border separator)
- Photo Caption: From `about.photoCaption`

**Components:**
- `ScrollReveal` - Multiple wrappers for staggered animations
- `Image` - Workspace photo

**Animations:**
- **Parallax Effect:** Photo moves -30px on scroll (scrub: 1)
- **ScrollReveal:**
  - Photo: direction="zoomOut", delay=0.1
  - Photo caption: direction="up", delay=0.15
  - Heading: direction="up", delay=0.2
  - Paragraph: direction="up", delay=0.3
  - How I Think: direction="up", delay=0.4
  - Facts list: direction="up", delay=0.5
  - Personal touch: direction="up", delay=0.6
- **Hover Effects:** Photo scale 1.05 on hover
- **Float Animation:** Applied to photo container

**Background:**
- SVG data flow pattern (curved lines and dots)

---

### 4. Terminal Strip
**Location:** `src/components/sections/TerminalStrip.tsx`
**Copy:** Cycling lines from `terminalLines` array:
- "analyzing 10k reviews… $3.2M saved"
- "forecasting sales… ↑15% accuracy"
- "converting data waste → $127K"
- "auditing website UX… +23% CTR"
- "automating documents… 40h saved"

**Components:**
- `ScrollReveal` - Fade direction wrapper

**Animations:**
- **Typing Effect:** Custom JavaScript typing animation
  - Types characters at 45ms interval
  - Pauses 1.6s at end of line
  - Deletes at 22ms interval
  - Pauses 300ms before next line
  - Loops through all lines
- **ScrollReveal:** direction="fade", delay=0.1
- **Caret Blink:** CSS animation on cursor
- **Pause on Hover:** Typing pauses when mouse enters

**Styling:**
- Terminal-style panel with border
- Mono font with ">" prefix
- Blinking cursor

---

### 5. Good Fit Section
**Location:** `src/components/sections/GoodFit.tsx`
**Section Label:** "02 — DIAGNOSIS"
**Copy:**
- Heading: "You might be a good fit if…"
- Points (from `goodFit.points`):
  1. "You know something on your website isn't converting — you just don't know what."
  2. "Your data lives in spreadsheets, PDFs, and inboxes, and nobody has time to turn it into a decision."
  3. "Someone on your team spends hours summarizing meetings or reading reviews by hand."
  4. "You want a working system you can point to, not a slide deck promising one."

**Components:**
- `Container` - Editorial width
- `TelemetryLabel` - Section label
- `ScrollReveal` - Multiple wrappers

**Animations:**
- **ScrollReveal:**
  - Container: direction="fade", delay=0.1
  - Label: direction="up", delay=0.15
  - Heading: direction="up", delay=0.2
  - List items: direction="fade", staggered (0.25 + i * 0.05)

**Styling:**
- Gradient border card
- Shadow lift effect
- Checkmark bullets (teal color)

---

### 6. Portals Section
**Location:** `src/components/sections/Portals.tsx`
**Section Label:** "03 — Problems I solve"
**Copy:**
- Heading: "Whether you're building an AI product, automating work nobody has time for, or trying to get answers out of data you already have — I build the system that solves it end to end."

**Components:**
- `Container` - Wide width
- `TelemetryLabel` - Section label
- `PortalCard` - Individual problem cards
- `ScrollReveal` - Animation wrappers

**Animations:**
- **GSAP:** Cards fade in with stagger (0.15s each)
  - opacity 0→1, y 20→0
  - duration 0.5s, ease power2.out
  - scrollTrigger at 80% viewport
- **ScrollReveal:**
  - Container: direction="fade", delay=0.1
  - Label: direction="up", delay=0.15
  - Heading: direction="up", delay=0.2
  - Cards: direction="up", staggered (0.3 + i * 0.08)

**PortalCard Components:**
- techStack display
- projects links (fade in on hover)
- 2px lift on hover (no 3D tilt)
- Active state handling via portal context

**Background:**
- SVG circuit pattern (grid of circles and lines)
- Ghost numeral "03" on left

---

### 7. By The Numbers Section
**Location:** `src/components/sections/ByTheNumbers.tsx`
**Section Label:** "04 — TELEMETRY"
**Copy:** Stats from `byTheNumbers` array:
- "$3.2M" - "Saved for clients"
- "15%" - "Accuracy improvement"
- "40h" - "Weekly hours saved"

**Components:**
- `Container` - Wide width
- `TelemetryLabel` - Section label
- `Counter` - Animated number counter
- `ScrollReveal` - Animation wrappers

**Animations:**
- **ScrollReveal:**
  - Label: direction="fade", delay=0.1
  - Stats: direction="up", staggered (0.15 + i * 0.08)
- **Counter Animation:** Numbers count up when in view

**Styling:**
- Border top and bottom
- Grid pattern background (fine instrument grid)
- 3-column grid layout
- Prefix/suffix in amber color
- Tabular nums for monospaced numbers

---

### 8. Projects Section
**Location:** `src/components/sections/Projects.tsx`
**Section Label:** "04 — Evidence"
**Copy:**
- Heading: "Every system below started with a business problem — not an AI model."

**Components:**
- `Container` - Wide width
- `TelemetryLabel` - Section label
- `ProjectRow` - Individual project cards
- `ScrollReveal` - Animation wrappers

**Animations:**
- **GSAP Reorder:** When portal selection changes
  - Rows fade from opacity 0.4→1, y 8→0
  - Staggered 0.05s
  - Duration 0.4s
- **ScrollReveal:** Not used (horizontal scroll container)
- **Hover Effects:** Cards scale 1.02 on hover
- **Horizontal Scroll:** Shift+wheel for horizontal scroll

**ProjectRow Components:**
- Problem display
- Solution display
- Impact display
- Tech tags (smaller styling)
- Role field
- CTA: "Explore the system"
- Screenshot with hover lift (2px)
- No 3D tilt effect

**Data:**
- Projects sorted by portal weight when portal is active
- 4 main case projects (Critiq, ResumeAI, SalesForecast, DocIntel)

**Background:**
- SVG matrix pattern (grid with circles and lines)

---

### 9. Quote Section
**Location:** `src/components/sections/Quote.tsx`
**Copy:**
- Eyebrow: "07 — PRINCIPLE"
- Quote: "The goal isn't the flashiest pipeline. It's solving the problem so it stays solved."
- Attribution: "WALA EDDINE GHAZOUANI"

**Components:**
- `TelemetryLabel` - Section label
- `ScrollReveal` - Animation wrappers

**Animations:**
- **GSAP Word Reveal:**
  - Words slide up from yPercent 110→0
  - Opacity 0→1
  - Duration 0.7s
  - Staggered 0.12s per word
  - ScrollTrigger at 70% viewport
- **ScrollReveal:**
  - Container: direction="fade", delay=0.1
  - Label: direction="up", delay=0.15
  - Attribution: direction="up", delay=0.2

**Styling:**
- Centered editorial layout
- Large display typography (clamp 2.25rem to 4rem)
- Key word highlighted with gradient
- Corner tick decorations

---

### 10. Field Notes Section
**Location:** `src/components/sections/FieldNotes.tsx`
**Copy:** Marquee of field notes from `fieldNotes` array

**Components:**
- `ScrollReveal` - Fade wrapper

**Animations:**
- **GSAP Infinite Marquee:**
  - Track moves xPercent -50
  - Duration 40s
  - Repeat -1 (infinite)
  - Pauses on hover/focus
- **ScrollReveal:** direction="fade", delay=0.1

**Styling:**
- Full-width strip with border
- Panel background
- Edge fade effect
- Diamond separator (◆)
- Mono font

---

### 11. Skill Wheel Section
**Location:** `src/components/sections/SkillWheel.tsx`
**Section Label:** "05 — What I deliver"
**Copy:**
- Heading: "I build the whole pipeline, not just the model."
- Intro: "From scraping raw data to deploying a production app, every layer of the system is one person's responsibility — mine."
- Center of wheel: "End-to-end AI systems. Built from scratch."
- Skill clusters (7 groupings):
  1. AI System Development
  2. Web Scraping and Data Collection
  3. Document Intelligence
  4. Automation and Workflow
  5. Data Analysis and Visualization
  6. APIs and Integrations
  7. Deployment and Support

**Components:**
- `Container` - Wide width
- `TelemetryLabel` - Section label
- `ScrollReveal` - Animation wrappers

**Animations:**
- **GSAP Scroll Rotation:**
  - Wheel rotates -320° across scroll range
  - Scrub 0.5
  - Active skill updates based on rotation
  - ScrollTrigger 80%→20% viewport
- **ScrollReveal:**
  - Container: direction="fade", delay=0.1
  - Label: direction="up", delay=0.15
  - Heading: direction="up", delay=0.2
  - Intro: direction="up", delay=0.25
  - Skill clusters: direction="fade", staggered (0.3 + i * 0.05)
- **Active State:** Opacity transition (100% vs 45%)

**Wheel Design:**
- 440px diameter
- Two rings (solid and dashed)
- 12 o'clock amber marker
- Skills positioned radially
- Active skill highlighted (amber border/bg)
- Center text static

**Mobile:**
- Horizontal scroll chips instead of wheel

**Background:**
- SVG radial pattern (concentric circles with lines)

---

### 12. Working Together Section
**Location:** `src/components/sections/WorkingTogether.tsx`
**Section Label:** "11 — PROTOCOL"
**Copy:**
- Heading: "How we go from problem to a system that runs."
- Timeline steps:
  - WK 0: Discovery - "We talk through the problem. You get a one-page plan."
  - WK 1–2: Prototype - "Working demo on your own sample data — not a mockup."
  - WK 3–6: Build & integrate - "Built against your real data, plugged into your tools."
  - DEPLOY: Deploy - "Live in your environment, with monitoring."
  - SUPPORT: Support - "I stay on for fixes and adjustments."
- FAQ (5 questions):
  1. Why not just use ChatGPT?
  2. How long does a project usually take?
  3. Do I own the code?
  4. Can you work with our existing tools?
  5. Is AI always the right solution?

**Components:**
- `Container` - Wide width
- `TelemetryLabel` - Section label
- `ScrollReveal` - Animation wrappers

**Animations:**
- **GSAP Timeline:**
  - Connector line: scaleX 0→1 (1.1s, power2.out)
  - Steps: opacity 0→1, y 20→0 (0.5s, stagger 0.12s)
  - FAQ checks: opacity 0→1, y 10→0 (0.4s, stagger 0.07s)
  - ScrollTrigger at 70% viewport
- **ScrollReveal:**
  - Container: direction="fade", delay=0.1
  - Label: direction="up", delay=0.15
  - Timeline: direction="up", delay=0.2
  - Steps: direction="fade", staggered (0.25 + i * 0.06)
  - FAQ: direction="fade", delay=0.6

**Timeline Design:**
- Horizontal connector line (desktop)
- 5 column grid (responsive)
- Amber dots at each step
- Week labels in amber

**FAQ Design:**
- 2-column grid (md:grid-cols-2)
- Expandable cards with +/− toggle
- Card styling: border, card background, padding
- Answer reveals with top border separator

---

### 13. Close Section
**Location:** `src/components/sections/Close.tsx`
**Section Label:** "08 — Let's talk"
**Copy:**
- Heading: "Every great system starts with one conversation."
- Input placeholder: "We spend hours every week reading supplier invoices..."
- Button: "Book a discovery call →"
- Email link: "Or email me directly → walaghazouani.work@gmail.com"
- Reassurance: "30-minute call. No sales pitch. If AI isn't the right solution, I'll tell you."

**Components:**
- `Container` - Wide width
- `TelemetryLabel` - Section label
- `ScrollReveal` - Animation wrappers
- `InlineWidget` - Calendly embed (dynamic import)

**Animations:**
- **GSAP Fade In:** Container opacity 0→1 (0.8s)
- **ScrollReveal:**
  - Container: direction="fade", delay=0.1
  - Label: direction="up", delay=0.15
  - Heading: direction="up", delay=0.15
  - Input: direction="up", delay=0.2
  - Button/Calendly: direction="up", delay=0.25
  - Reassurance: direction="up", delay=0.3

**Input Design:**
- Large mono font
- ">" prefix in amber
- Card background with border
- Focus state: amber border

**Calendly:**
- Dynamically imported (no SSR)
- Loading state: pulse animation
- 600px height
- Shows on button click

---

### 14. Footer
**Location:** `src/components/sections/Footer.tsx`
**Copy:**
- Nav links: Work, Process, GitHub, LinkedIn, Email
- Tagline: "No trackers. No cookies. I analyze data for a living — yours isn't the product."
- Copyright: "© 2026 Wala Eddine Ghazouani"

**Components:**
- None (static HTML)

**Animations:**
- None

**Styling:**
- Background color
- Top border
- Centered nav
- Mono font
- Hover color change (steel→signal)

---

### 15. Mobile CTA
**Location:** `src/components/ui/MobileCTA.tsx`
**Purpose:** Floating CTA button for mobile

**Components:**
- Button with fixed positioning

---

## Shared UI Components

### ScrollReveal
**Location:** `src/components/ui/ScrollReveal.tsx`
**Purpose:** Scroll-triggered reveal animations using GSAP ScrollTrigger

**Directions:**
- `up` - y 60→0, scale 0.95→1
- `down` - y -60→0, scale 0.95→1
- `left` - x 60→0, scale 0.95→1
- `right` - x -60→0, scale 0.95→1
- `fade` - opacity only
- `zoom` - scale 0.8→1
- `zoomIn` - scale 0.5→1, opacity 0→1
- `zoomOut` - scale 1.2→1, opacity 0→1

**Props:**
- `direction` - Animation direction
- `delay` - Delay in seconds
- `className` - Additional classes
- `zoomAmount` - Custom zoom amount

**Accessibility:**
- Respects `prefers-reduced-motion`

---

### TelemetryLabel
**Location:** `src/components/ui/TelemetryLabel.tsx`
**Purpose:** Section labels with styling variants

**Variants:**
- `default` - Steel color
- `amber` - Amber color (for active states)
- `steel` - Steel color

**Styling:**
- Mono font
- Small uppercase
- Tracking wide

---

### Container
**Location:** `src/components/ui/Container.tsx`
**Purpose:** Responsive width containers

**Widths:**
- `wide` - Max width for content sections
- `editorial` - Narrower for reading content

---

### CTAButton
**Location:** `src/components/ui/CTAButton.tsx`
**Purpose:** Call-to-action buttons

**Variants:**
- `solid` - Filled background
- `ghost` - Transparent with border

---

### PortalCard
**Location:** `src/components/ui/PortalCard.tsx`
**Purpose:** Problem/solution cards in Portals section

**Features:**
- techStack display
- projects links (fade in on hover)
- 2px lift on hover
- Active state handling

---

### ProjectRow
**Location:** `src/components/ui/ProjectRow.tsx`
**Purpose:** Project cards in Projects section

**Structure:**
- Problem display
- Solution display
- Impact display
- Tech tags
- Role field
- CTA: "Explore the system"
- Screenshot with hover lift

---

### Counter
**Location:** `src/components/ui/Counter.tsx`
**Purpose:** Animated number counting

**Animation:**
- Counts up from 0 to target value
- Triggers when in view

---

## Animation Patterns

### GSAP + ScrollTrigger
- Used for scroll-based animations
- Scrub effects for parallax/rotation
- Once: true for one-time animations
- Trigger points: typically 70-80% viewport

### Staggered Reveals
- Common pattern: delay + index * multiplier
- Creates sequential element appearance
- Typical stagger: 0.05-0.15s

### Reduced Motion Support
- All animations respect `prefers-reduced-motion`
- GSAP sets opacity to 1 immediately
- Typing/marquee animations disabled

### Hover Effects
- Scale transforms (1.02-1.05)
- Color transitions
- Shadow changes
- Border color changes

## Color System

### CSS Variables
- `--color-ink` - Primary text
- `--color-steel` - Secondary text
- `--color-amber` - Accent/highlight
- `--color-teal` - Success/checkmarks
- `--color-blue` - Decorative
- `--color-card` - Card backgrounds
- `--color-paper` - Ring offset
- `--color-hairline` - Borders
- `--color-bg` - Page background
- `--color-line` - Panel lines
- `--color-panel` - Panel background
- `--color-signal` - Interactive elements
- `--color-trace` - Terminal text
- `--shadow-panel` - Card shadows
- `--shadow-lift` - Lift shadows

## Typography

### Font Families
- `font-display` - Headings (display font)
- `font-mono` - Labels, code, terminal text
- Default - Body text

### Font Sizes
- Hero: 4xl-6xl (clamp responsive)
- Section headings: 3xl-4xl
- Body: lg-xl
- Labels: xs-sm (uppercase, tracking)

## Data Sources

### Site Data (`src/data/site.ts`)
- `hero` - Hero section copy
- `problems` - Problems I solve
- `terminalLines` - Terminal cycling text
- `goodFit` - Good fit criteria
- `portalCards` - Portal card content
- `byTheNumbers` - Stats counters
- `quote` - Quote section
- `about` - About section
- `process` - Process timeline
- `faq` - FAQ questions
- `footer` - Footer links

### Other Data Files
- `src/data/portals.ts` - Portal-specific data
- `src/data/projects.ts` - Project case studies
- `src/data/skills.ts` - Skill wheel data
- `src/data/fieldNotes.ts` - Field notes marquee

## Accessibility Features

- Reduced motion support
- ARIA labels
- Keyboard navigation
- Focus states
- Semantic HTML
- Alt text on images
- Live regions for terminal strip
