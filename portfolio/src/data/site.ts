/** Site-wide copy: hero, counters, sections, footer. */

export const hero = {
  eyebrow: "AI SYSTEMS · DOCUMENT INTELLIGENCE · FORECASTING",
  h1: "Turn scattered data into systems that do the work for you.",
  sub: "I design and build AI systems that eliminate repetitive work, turn scattered data into decisions, and integrate into the tools your team already uses.",
  credibility: "AI systems, end to end · From messy data to a working app",
};

/** 03 — Problems I solve */
export const problems = [
  {
    title: "Document & content intelligence",
    problem: "Reviews, meetings, PDFs, and inboxes pile up and nobody has time to read them.",
    solution: "I build systems that read them for you and hand back answers.",
  },
  {
    title: "Forecasting & decision support",
    problem: "You want to know what's coming, not just what already happened.",
    solution: "I build explainable prediction systems — every output comes with the reason behind it.",
  },
  {
    title: "Custom AI products",
    problem: "You have an AI idea but no one to build the whole thing.",
    solution: "I take it from idea to a working, integrated app — not a notebook.",
  },
];

/** 02 — terminal strip cycling facts */
export const terminalLines = [
  "analyzing 10k reviews… $3.2M saved",
  "forecasting sales… ↑15% accuracy",
  "converting data waste → $127K",
  "auditing website UX… +23% CTR",
  "automating documents… 40h saved",
];

/** 03 — good fit */
export const goodFit = {
  heading: "You might be a good fit if…",
  points: [
    "You know something on your website isn't converting — you just don't know what.",
    "Your data lives in spreadsheets, PDFs, and inboxes, and nobody has time to turn it into a decision.",
    "Someone on your team spends hours summarizing meetings or reading reviews by hand.",
    "You want a working system you can point to, not a slide deck promising one.",
  ],
};

/** 04 — portal card blurbs */
export const portalCards = {
  build: {
    pain: "You have an idea. You need someone who can design, build, and deploy the whole system — not just a prototype.",
    headline: "AI products",
    techStack: "PyTorch · Transformers · LangGraph",
    projects: ["SmartShop AI", "FX AlphaLab"],
  },
  extract: {
    pain: "Your team spends hours reading PDFs, summarizing meetings, or copying data between tools. That's not a people problem — it's a systems problem.",
    headline: "Documents and workflows",
    techStack: "Whisper · MS Graph API · RAG",
    projects: ["Teams Summarizer"],
  },
  predict: {
    pain: "You have data. You need decisions. Forecast trends, score performance, surface what a person would miss.",
    headline: "Predictions and audits",
    techStack: "SHAP · Fine-tuning · ChromaDB",
    projects: ["Critiq", "FX AlphaLab"],
  },
};

/** 05 — by the numbers */
export const byTheNumbers = [
  { value: 10, label: "Systems built from scratch", prefix: "+" },
  { value: 10, label: "Industries served", prefix: "+" },
  { value: 100, label: "Explainable outputs", suffix: "%" },
];

/** 08 — quote */
export const quote = {
  eyebrow: "— PRINCIPLE 01 —",
  before: "Context is ",
  word: "Key",
  after: ".",
  attribution: "WALA GHAZOUANI",
};

/** 11 — about */
export const about = {
  facts: [
    "Based in Tunisia — remote worldwide",
    "Data science engineering",
    "End-to-end AI systems",
    "Multi-agent architectures",
  ],
  paragraph:
    "I'm Wala. I build AI systems end to end — from raw data to a working app your team actually uses. Most projects I take on have the same shape: the answers are already in the data, but no one has time to find them. A thousand reviews no one read. A website losing conversions for reasons no one can name. I find the pattern, build the system, and make sure it stays solved — not just demo'd.",
  howIThink:
    "I start with what's costing you time or money. Half the time the fix is a script or a database view, not a model. If a spreadsheet formula beats a neural network, I'll tell you that too.",
  photoCaption: "Where the work happens — Tunis",
  personalTouch:
    "When I'm not building systems, I'm analyzing football matches — formations, pressing triggers, transition patterns. Football and data are both pattern-driven. I just happen to get paid for one of them. For now.",
};

/** 12 — how i think */
export const howIThink =
  "I start with what's actually costing you time or money. Half the time the fix is a script or a database view, not a model. AI earns its place when there's real pattern-finding to do — reading thousands of reviews, forecasting from noisy data, scoring a site across 20 dimensions a person would skim past. The goal isn't the flashiest pipeline. It's solving the problem so it stays solved. If a spreadsheet formula beats a neural network, I'll tell you that too.";

/** Tech stack */
export const techStack = {
  modeling: ["PyTorch", "Transformers", "SHAP", "Fine-tuning"],
  pipelines: ["LangGraph", "RAG", "ChromaDB", "Playwright"],
  delivery: ["APIs", "Flask", "Desktop apps", "Microsoft Graph"],
};

/** 13 — working together */
export const process = {
  steps: [
    { week: "WK 0", title: "Discovery", body: "We talk through the problem. You get a one-page plan." },
    { week: "WK 1–2", title: "Prototype", body: "Working demo on your own sample data — not a mockup." },
    { week: "WK 3–6", title: "Build & integrate", body: "Built against your real data, plugged into your tools." },
    { week: "DEPLOY", title: "Deploy", body: "Live in your environment, with monitoring." },
    { week: "SUPPORT", title: "Support", body: "I stay on for fixes and adjustments." },
  ],
  riskKillers: [
    "Weekly progress updates",
    "You own the source code — always",
    "Fixed scope, fixed price, agreed up front",
    "Free prototype on your data before you commit",
    "No lock-in — standard tools",
  ],
};

/** FAQ section */
export const faq = [
  {
    question: "Why not just use ChatGPT?",
    answer: "Sometimes you should — and if it solves your problem, I'll tell you. But most businesses don't need another chat window. They need software that works in the background: connecting to your tools, processing data on a schedule, and keeping running without someone copying and pasting prompts every day. That's the difference between using an AI tool and hiring an AI engineer.",
  },
  {
    question: "How long does a project usually take?",
    answer: "Most systems go from first call to working prototype in two weeks. Full build and deployment is typically four to six weeks depending on complexity. You'll see progress weekly, not at the end.",
  },
  {
    question: "Do I own the code?",
    answer: "Yes. Always. Every line, every model, every pipeline. No lock-in, no proprietary frameworks, no dependencies on me to keep it running.",
  },
  {
    question: "Can you work with our existing tools?",
    answer: "That's the whole point. I build systems that plug into what you already use — Teams, Outlook, your CRM, your database. Not a separate platform you have to adopt.",
  },
  {
    question: "Is AI always the right solution?",
    answer: "No. And I'll tell you when it's not. If a script, a database view, or a spreadsheet formula solves the problem, that's what I'll recommend. AI earns its place when there's real pattern-finding to do — not before.",
  },
];

/** 14 — why not chatgpt */
export const whyNotChatGPT = {
  q: "Can't ChatGPT already do this?",
  a: "Sometimes ChatGPT is the answer — and when it is, I'll tell you. But it doesn't watch your inbox, retrain on your product catalog, log every score it gives, or plug into your tools without someone building that bridge. That's the part I build.",
};

/** 16 — close */
export const close = {
  h2: "What's slow, broken, or piling up in your business right now?",
  description:
    "Tell me the bottleneck. If AI is the right tool, I'll build it end to end. If a script or a spreadsheet solves it, I'll tell you that too — and save you the project.",
  calendlyUrl: "{{CALENDLY_URL}}",
};

/** 17 — footer */
export const footer = {
  nav: [
    { label: "Work", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "GitHub", href: "https://github.com/Ghazouaniwalae" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/wala-ghazouani/" },
    { label: "Email", href: "mailto:walaghazouani.work@gmail.com?subject=Project%20inquiry%20from%20your%20portfolio&body=Hi%20Wala%20Eddine%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project.%0A%0AWhat%20I%20need%3A%20%0AMy%20timeline%3A%20%0AMy%20budget%20range%3A%20%0A%0AThanks%2C%0A" },
  ],
  tagline:
    "No trackers. No cookies. I analyze data for a living — yours isn't the product.",
};

export const sectionLabels = {
  hero: "01 — HOOK",
  good: "02 — DIAGNOSIS",
  portals: "03 — Problems I solve",
  numbers: "04 — TELEMETRY",
  work: "04 — Evidence",
  wheel: "05 — What I deliver",
  pipeline: "06 — SIGNAL",
  quote: "07 — PRINCIPLE",
  about: "09 — OPERATOR",
  think: "10 — METHOD",
  process: "11 — PROTOCOL",
  roi: "12 — ESTIMATE",
  close: "13 — CONTACT",
};
