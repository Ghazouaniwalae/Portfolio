# Portfolio Content — Wala Eddine Ghazouani (v2, positioning rewrite)

**Core positioning — repeat this idea across the site, in different words each time:**
> I design AI systems that turn messy business data into automated decisions.
> Meeting transcripts → decisions. Product reviews → decisions. Market signals → decisions. Website data → decisions.

---

## SECTION 1: HERO

**Eyebrow:** AUTOMATED DECISIONS · MULTI-AGENT SYSTEMS · PRODUCTION AI

**H1:** AI systems that replace repetitive work — not just chatbots.

**Subheading:** AI systems for document processing, workflow automation, forecasting, and intelligent web applications — built around your data, not around whatever model is trending.

**Positioning line (place directly under the subheading, smaller):** I design AI systems that turn messy business data into automated decisions.

**Proof counters:**
- 4 / End-to-end AI systems shipped
- 15+ / AI models integrated across them
- 10+ / External APIs & frameworks used in production

---

## SECTION 2: GOOD FIT CHECKMARKS

✓ You're making decisions on gut feel because the data that would answer the question is scattered across five tools.
✓ Someone on your team spends real hours turning meetings, reviews, or documents into something usable.
✓ You don't know what's actually wrong with your website, only that something isn't converting.
✓ You want a working system you can point to, not a slide deck promising one.

---

## SECTION 3: PORTALS

### BUILD
- **The situation:** "I have an idea for an AI product but no one to build the whole thing."
- **What you get:** From idea to working system.
- **CTA:** Let's scope your idea
- **Matched projects:** SmartShop AI (six AI modules built and integrated into one e-commerce platform), Teams Meeting Summarizer (a full pipeline from raw audio to a desktop app).

### EXTRACT
- **The situation:** "I have documents, meetings, or reviews piling up and no time to go through them."
- **What you get:** Raw content turned into decisions.
- **CTA:** Send me a sample file
- **Matched projects:** Teams Meeting Summarizer (audio to transcript to summary via Whisper and an LLM), SmartShop AI's sentiment and RAG chatbot modules.

### PREDICT
- **The situation:** "I want to know what's coming, or what's quietly broken in what I already have."
- **What you get:** Forecasts and audits you can explain, not a black box.
- **CTA:** Talk about your data
- **Matched projects:** FX AlphaLab (multi-agent forecasting with SHAP explainability behind every call), Critiq (a full brand and UX audit scored and explained dimension by dimension).

---

## SECTION 4: PROJECT CASE STUDIES

> Build note: each **Architecture** flow below should render as an animated SVG diagram on the project page (see the Critiq reference build in the Pipeline Reveal section), not plain text.
> Each project page follows: System Overview → Architecture → Key Decisions → Sample Input → Sample Output → Tech Stack → Repository. The Sample Input / Sample Output pairing should be the most visual element on the page — a real side-by-side, not a paragraph.

### Critiq — Brand DNA & UX Analyzer

**System Overview:** Most website audits answer one question. Critiq answers twenty. Paste in a URL and six specialized AI agents analyze branding, UX, accessibility, navigation, copywriting, and conversion flow at the same time, then a scoring layer grounded in real UX research (NN/g, WCAG, Baymard, CXL) fuses everything into one prioritized report — with a heuristic fallback so a flaky LLM call never leaves you with an empty page.

**Architecture:** URL → Hybrid Scrape (Playwright + Firecrawl) → 6 Parallel Agents (Visual / Copy / Navigation / Mobile / Speed / Journey) → RAG-Grounded Dimension Scoring → Verdict Fuser → Report (live stream + PDF)

**Key Decisions:**
- Hybrid scraping (Playwright + Firecrawl running concurrently) instead of one tool, so total wait time is the slowest step, not the sum of all of them.
- Confidence-gated heuristic fallback on every dimension, so one failed LLM call degrades the report instead of breaking it.

**Sample Input:** A single URL — for example, a homepage the client wants audited.

**Sample Output:** A live dashboard filling in as agents finish: a brand identity panel (color palette, fonts, tone of voice) beside a scored UX audit — 20 dimensions, an overall grade, ranked priority fixes — with one-click PDF export.

**Tech Stack:** LangGraph, ChromaDB (RAG), Playwright + Firecrawl, self-hosted vLLM (Llama 3.1 70B)

**Repository:** https://github.com/Ghazouaniwalae/brand-dna-analyzer
**Screenshots:** [to be added]

---

### FX AlphaLab — Multi-Agent Financial AI System

**System Overview:** Markets move on three things at once — macro data, sentiment, and price action — and most trading models only look at one. FX AlphaLab treats a trade like a vote among specialists instead of a single black-box output: five model architectures each read one signal, and a weighted ensemble merges their calls into a single explained prediction.

**Architecture:** Macro + Sentiment + Market Data → Specialized Agents → Weighted Ensemble → SHAP Explainer → Prediction

**Key Decisions:**
- SHAP-based explainability on every prediction, so a trader can see which signal actually drove the call.
- An ensemble across five architectures (Transformers, LSTM, GRU, TCN, fully connected) instead of betting the whole system on one model family.

**Sample Input:** OHLC price history, macro indicators, and a rolling sentiment score for a currency pair.

**Sample Output:** A dashboard panel showing a currency-pair prediction: an agent-by-agent vote breakdown, a SHAP bar chart ranking which signal drove the call, and a confidence score, alongside three sample predictions with their outcome and driving factors.

**Tech Stack:** Python, PyTorch, Transformers/LSTM/GRU/TCN, SHAP

**Repository:** https://github.com/Ghazouaniwalae/FX-AlphaLab
**Screenshots:** [to be added]

---

### SmartShop AI — Multimodal E-Commerce Platform

**System Overview:** An online store is really six small problems stacked on top of each other — product copy, image quality, search, recommendations, reviews, and support. SmartShop AI treats each as its own model rather than forcing one system to do everything: six modules covering description generation, image quality, classification, recommendation, sentiment, and a RAG chatbot, all served through a single API.

**Architecture:** Product Data → Vision + NLP Models → Fusion Layer → Recommendation & Chatbot → REST API

**Key Decisions:**
- Separate fine-tuned models per task instead of one generalist model, so each module stays debuggable on its own.
- WCAG 2.1-compliant alt-text generation built in by default, not bolted on afterward.

**Sample Input:** A product listing — title, images, and existing customer reviews.

**Sample Output:** A product page mockup: an auto-generated description, an image-quality flag, a sentiment breakdown of its reviews, and a chatbot answering a shopper's question with a source snippet.

**Tech Stack:** BLIP, ResNet-50, BERT, Sentence-BERT, LLaMA 3.1 8B, Flask

**Repository:** https://github.com/Ghazouaniwalae/4ds-deep
**Screenshots:** [to be added]

---

### Teams Meeting Summarizer

**System Overview:** Meeting notes are usually someone's unpaid second job. This app turns a recorded call directly into a written summary — Whisper transcribes the audio, an LLM writes it up, and the whole thing is pulled straight from Teams, OneDrive, or Outlook instead of a manual upload.

**Architecture:** Audio Input → Whisper Transcription → LLM Summarization → Flask API → Desktop App

**Key Decisions:**
- Built inside the Microsoft ecosystem (Graph API) instead of as a standalone tool nobody would actually open.
- Shipped as a desktop app, not a browser tab, since that's where the target users already work.

**Sample Input:** A recorded meeting (audio file or live Teams call).

**Sample Output:** A desktop window showing the meeting title, a transcript excerpt, and a generated summary with action items in bold.

**Tech Stack:** Whisper, Flask, JavaFX, Microsoft Graph API

**Repository:** https://github.com/Ghazouaniwalae/pfa3 *(returned a 404 when I checked it — private, or a different repo than intended. Confirm before publishing.)*
**Screenshots:** [to be added]

---

## SECTION 5: ENGINEERING TRADEOFFS

*A section most portfolios skip. It doesn't need to explain every detail — it needs to show the client that decisions were made on purpose, not defaults.*

**Why self-host the LLM instead of calling OpenAI?**
Cost at volume, data privacy for client-facing audits, lower latency on a dedicated endpoint, and full control over model version and behavior.

**Why LangGraph for orchestration?**
Reliable multi-agent orchestration with built-in parallel execution (six agents running at once, not in sequence), and a graph structure that stays maintainable as agents get added or changed.

---

## SECTION 6: PIPELINE REVEAL — Critiq

*The homepage's animated architecture diagram. Real pipeline, not illustrative.*

**Pipeline stages:** URL Input → Hybrid Scraper (Playwright + Firecrawl) → 6 Parallel Agents (Visual / Copy / Navigation / Mobile / Speed / Journey) → RAG-Grounded Dimension Scoring (ChromaDB + self-hosted LLM) → Verdict Fuser → Report (live stream + PDF)

**Sample findings** (illustrative — mapped to Critiq's real dimensions and agents, not a live scan output):
1. Visual Agent — HIGH — Color Contrast & Accessibility: primary CTA button contrast ratio falls below the WCAG AA minimum.
2. Copy Agent — MEDIUM — Value Proposition Strength: homepage headline doesn't say what the product does or who it's for within the first screen.
3. Navigation Agent — HIGH — Trust Signals: no visible security badge, contact address, or third-party reviews on the homepage.
4. Copy Agent — MEDIUM — Content Scanability: long paragraphs with no subheadings or bullet breaks.
5. Visual Agent — LOW — Typography Hierarchy: headline and body text sit at nearly the same size, no clear hierarchy.
6. Navigation Agent — HIGH — Form UX Quality: contact form has no inline validation and unlabeled fields.
7. Speed Agent — MEDIUM — Page Speed: largest content image loads uncompressed, slowing first paint.
8. Mobile Agent — HIGH — Mobile Responsiveness: primary CTA sits below the fold on a standard phone screen.
9. Journey Agent — MEDIUM — First Impression Clarity: unclear within a few seconds what the site does or why to stay.

---

## SECTION 7: HOW I THINK

I start with what's actually costing you time or money. Half the time, the fix is a script or a database view, not a model. AI shows up when there's real pattern-finding to do — reading thousands of reviews, forecasting from noisy data, scoring a site across 20 UX dimensions a person would skim past. Building the flashiest pipeline isn't the goal, solving the problem so it stays solved is. If a spreadsheet formula beats a neural network, I'll tell you that too.

---

## SECTION 8: WHY CAN'T MY EMPLOYEE JUST USE CHATGPT?

ChatGPT is great at answering questions. It's not built to remember your data, connect to the tools you already run, act on a schedule without someone prompting it, or produce the same consistent output every time. That gap — between using AI and having AI built into how your business runs — is what I build.

---

## SECTION 9: PROCESS

**Workflow Audit → System Blueprint → AI Prototype → Integration → Deployment → Optimization**

1. **Workflow Audit:** We map out where the manual work actually happens and where an AI system would save the most time.
2. **System Blueprint:** You get a one-page plan of what gets built, in what order, and why.
3. **AI Prototype:** You see a working demo on your own sample data, not a mockup.
4. **Integration:** The system gets built against your real data and plugged into the tools you already use.
5. **Deployment:** It goes live in your environment, with monitoring so you know if it breaks.
6. **Optimization:** I stay on to tune, fix, and adjust once real usage starts.

**Risk-killers:**
- Weekly progress updates — you're never in the dark.
- You own the source code — always.
- Fixed scope, fixed price, agreed before I write a line of code.
- Free prototype on your own data before you commit to the full build.
- No lock-in — the system runs on standard tools, not a proprietary platform.

---

## SECTION 10: ROI CALCULATOR PRESETS

**BUILD:**
- Hours/week spent on manual work you want automated — default 10
- Hourly cost of that person's time ($) — default 25
- Weeks per year this work happens — default 48

**EXTRACT:**
- Documents/reviews/meetings processed per week — default 50
- Minutes spent per item — default 8
- Hourly cost of the person doing it ($) — default 20

**PREDICT:**
- Decisions per month that rely on a forecast or audit — default 20
- Estimated cost of a wrong call ($) — default 200
- Share of decisions currently made on gut feel (%) — default 40

---

## SECTION 11: CLOSE SECTION

**H2:** What repetitive task is slowing down your business?

**Description:** Whether it's documents, forecasting, internal workflows, or customer support, let's design an AI system around it — one that turns the mess into a decision your team doesn't have to make by hand.

**CTA:** Tell me what's slowing you down

*(Keep a smaller, secondary lead magnet on Critiq's own project page specifically: "Curious what's actually wrong with your website? Send me your URL and email — Critiq scores it across 20 UX dimensions and I'll send back the report within 48 hours." This stays scoped to that project instead of being the whole site's main CTA.)*

---

## SECTION 12: FOOTER

No trackers. No cookies. I analyze data for a living — yours isn't the product.

---

## SECTION 13: SEO

**Page title:** Wala Eddine Ghazouani — AI Systems Engineer
**Meta description:** AI systems that turn messy business data — documents, forecasts, workflows, websites — into automated decisions.

---

## WHAT I COULDN'T FIND / STILL NEEDS YOUR INPUT

- **No business-outcome metrics anywhere** (revenue saved, hours saved, accuracy %, conversion lift). Every metric above is scope-based (agents built, models integrated, APIs used), not outcome-based. If any project has a real result behind it, send it.
- **No confirmed production deployment** for any of the four projects — all are described as built and working, not confirmed live for a paying client.
- **`pfa3` repo returned a 404** when I checked it. Mapped to Teams Meeting Summarizer based on naming convention — confirm before publishing.
- **Screenshots are placeholders** in every case study. Once you send them, the Sample Input / Sample Output copy should get rewritten to describe the actual images instead of the generic mockup descriptions above.
- **Section 6's findings are still illustrative**, not from an actual Critiq scan. Swap in real findings from a real run if you want that section fully honest.
- **The "15+ AI models" and "10+ APIs & frameworks" counters are conservative estimates** from counting across all four projects' documented stacks — recount if you want an exact number instead of a rounded one.
