export type PortalId = "build" | "extract" | "predict";

export interface Project {
  slug: string;
  /** Full display name for case pages */
  name: string;
  /** Short mono sub-label under the card */
  shortName: string;
  problem: string;
  solutionShort: string;
  impact: string;
  tags: string[];
  role: string;
  /** Relevance weight per portal, drives ordering (0–1) */
  portalWeights: Record<PortalId, number>;

  /** Screenshot slot */
  screenshot: string; // filename in /public/screenshots
  screenshotLabel: string; // dev placeholder label, e.g. "CRITIQ DASHBOARD — 1440×900"
  screenshotDark: boolean; // dark-panel screenshot (fx)

  /** Teaser rows render dimmed with no screenshot */
  teaser?: boolean;
  teaserTag?: string;

  /* ---- case page ---- */
  before: string;
  after: string;
  architecture: string[];
  /** The real deliverable shown in the dark SAMPLE OUTPUT panel */
  sampleOutput: string;
  metrics: string[];
  repository?: string;
}

export const projects: Project[] = [
  {
    slug: "critiq",
    name: "Critiq — Brand DNA & UX Analyzer",
    shortName: "CRITIQ",
    problem:
      "Businesses know their website isn't converting — they just don't know why. A redesign costs five figures, an agency audit takes weeks, and free tools check one thing — never the whole picture.",
    solutionShort:
      "Paste in a URL, get back a full brand and UX audit. Six specialized agents run in parallel, scoring 20 dimensions, grounded in UX research — not a single prompt to ChatGPT.",
    impact:
      "6 AI agents producing a complete audit in minutes instead of days.",
    tags: ["LANGGRAPH", "CHROMADB", "PLAYWRIGHT", "VLLM"],
    role: "Architecture · AI engineering · backend · frontend · deployment",
    portalWeights: { build: 0.6, extract: 0.8, predict: 0.9 },
    screenshot: "critiqHomePageDark.jpg",
    screenshotLabel: "CRITIQ DASHBOARD — 1440×900",
    screenshotDark: true,
    before: "A single URL — for example, a homepage the client wants audited.",
    after:
      "A live dashboard filling in as agents finish: a brand identity panel beside a scored UX audit — 20 dimensions, an overall grade, ranked priority fixes — with one-click PDF export.",
    architecture: [
      "URL Input",
      "Hybrid Scraper",
      "6 Parallel Agents",
      "RAG-Grounded Scoring",
      "Verdict Fuser",
      "Report",
    ],
    sampleOutput:
      "A scored audit dashboard: overall grade, 20 weighted dimensions with sub-scores, and a severity-ordered list of priority fixes.",
    metrics: ["6 parallel agents", "20 UX dimensions scored", "Self-hosted LLM, RAG-grounded"],
    repository: "https://github.com/Ghazouaniwalae/brand-dna-analyzer",
  },
  {
    slug: "fx-alphalab",
    name: "FX AlphaLab — Multi-Agent Financial Forecasting",
    shortName: "FX ALPHALAB",
    problem:
      "Traders drown in macro data, news sentiment, and price charts — and can't combine them fast enough to act.",
    solutionShort:
      "Each agent studies one signal. Weighted votes fuse into a single prediction. Every call ships with a SHAP explanation — nothing is a black box.",
    impact: "Every prediction includes a full explanation of why.",
    tags: ["PYTORCH", "TRANSFORMERS", "SHAP"],
    role: "Architecture · model training · explainability pipeline · frontend",
    portalWeights: { build: 0.7, extract: 0.3, predict: 1.0 },
    screenshot: "FxAlphaLabDashboard.jpg",
    screenshotLabel: "FX PREDICTION PANEL — 1440×900",
    screenshotDark: true,
    before:
      "OHLC price history, macro indicators, and a rolling sentiment score for a currency pair.",
    after:
      "A prediction panel: an agent-by-agent vote breakdown, a SHAP bar chart ranking which signal drove the call, and a confidence score.",
    architecture: [
      "Macro + Sentiment + Market Data",
      "Specialized Agents",
      "Weighted Ensemble",
      "SHAP Explainer",
      "Prediction",
    ],
    sampleOutput:
      "A prediction with a SHAP bar chart of signal contributions and the individual agent votes that fused into the call.",
    metrics: ["3 signals fused", "5 architectures tested", "Every prediction explained"],
    repository: "https://github.com/Ghazouaniwalae/FX-AlphaLab",
  },
  {
    slug: "smartshop",
    name: "SmartShop AI — Multimodal E-Commerce Platform",
    shortName: "SMARTSHOP AI",
    problem:
      "Online stores lose sales when product pages are inaccessible, badly described, or hard to search.",
    solutionShort:
      "Six AI modules behind one API — descriptions, image quality checks, classification, sentiment analysis, and a RAG chatbot for shoppers. Not one model prompted six ways, but six models fine-tuned for six jobs.",
    impact: "Six models fine-tuned and unified behind one API.",
    tags: ["BLIP", "RESNET-50", "BERT", "LLAMA 3.1"],
    role: "Model fine-tuning · API design · RAG pipeline · deployment",
    portalWeights: { build: 0.9, extract: 0.7, predict: 0.5 },
    screenshot: "SelvoHomePage.jpg",
    screenshotLabel: "SMARTSHOP PRODUCT PAGE — 1440×900",
    screenshotDark: false,
    before: "A product listing — title, images, and existing customer reviews.",
    after:
      "A product page: an auto-generated description, an image-quality flag, a sentiment breakdown of its reviews, and a chatbot answering a shopper's question with a source snippet.",
    architecture: [
      "Product Data",
      "Vision + NLP Models",
      "Fusion Layer",
      "Recommendation & Chatbot",
      "REST API",
    ],
    sampleOutput:
      "A product page with a generated description, a sentiment breakdown of its reviews, and WCAG-compliant alt text.",
    metrics: ["6 AI modules", "6 models fine-tuned", "WCAG-compliant alt text"],
    repository: "https://github.com/Ghazouaniwalae/4ds-deep",
  },
  {
    slug: "teams-summarizer",
    name: "Teams Meeting Summarizer",
    shortName: "TEAMS SUMMARIZER",
    problem:
      "Teams spend hours writing meeting notes that half the room forgets by morning.",
    solutionShort:
      "A desktop app that records, transcribes with Whisper, and hands back a clean summary — pulled straight from Teams, OneDrive, or Outlook. No manual upload, no copy-pasting between apps.",
    impact: "Integrated directly with Microsoft Teams — zero manual steps.",
    tags: ["WHISPER", "FLASK", "MS GRAPH API"],
    role: "Architecture · speech pipeline · Microsoft integration · desktop app",
    portalWeights: { build: 0.6, extract: 1.0, predict: 0.2 },
    screenshot: "MeetsDashboard.png",
    screenshotLabel: "SUMMARIZER DESKTOP — 1440×900",
    screenshotDark: false,
    before: "A recorded meeting (audio file or live Teams call).",
    after:
      "A desktop window showing the meeting title, a transcript excerpt, and a generated summary with action items in bold.",
    architecture: [
      "Audio Input",
      "Whisper Transcription",
      "LLM Summarization",
      "Flask API",
      "Desktop App",
    ],
    sampleOutput:
      "A desktop window with the transcript, the generated summary, and the action items pulled out in bold.",
    metrics: ["Audio to summary in one pipeline", "3 Microsoft Graph APIs", "Built at Wevioo"],
    repository: "https://github.com/Ghazouaniwalae/pfa3",
  },
];

export const caseProjects = projects.filter((p) => !p.teaser);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/**
 * Filenames (in /public/screenshots) that actually exist. Until a real capture
 * is dropped in and listed here, the WindowFrame renders its labeled
 * placeholder. Add "critiq-dashboard.png" etc. as the assets land.
 */
export const readyScreenshots = new Set<string>([
  "critiqHomePageDark.jpg",
  "FxAlphaLabDashboard.jpg",
  "SelvoHomePage.jpg",
  "MeetsDashboard.png",
]);
export const screenshotSrc = (p: Project) =>
  p.screenshot && readyScreenshots.has(p.screenshot) ? p.screenshot : undefined;
