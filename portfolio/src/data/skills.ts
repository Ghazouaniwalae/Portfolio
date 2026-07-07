/** 10 — Skill wheel clusters. */
export interface SkillCluster {
  label: string;
  blurb: string;
  skills: string[];
}

export const skillClusters: SkillCluster[] = [
  {
    label: "AI SYSTEM DEVELOPMENT",
    blurb: "End-to-end AI products and multi-agent systems designed around your specific business problem.",
    skills: ["AI System Development", "AI Agents"],
  },
  {
    label: "WEB SCRAPING AND DATA COLLECTION",
    blurb: "Reliable scrapers and pipelines that turn any source into clean, structured data.",
    skills: ["Web Scraping", "Data Collection"],
  },
  {
    label: "DOCUMENT INTELLIGENCE",
    blurb: "OCR, summarization, and extraction to automate document-heavy workflows.",
    skills: ["Document Intelligence"],
  },
  {
    label: "AUTOMATION AND WORKFLOW",
    blurb: "Connect your tools, automate repetitive tasks, and eliminate manual steps from your processes.",
    skills: ["Workflow Automation"],
  },
  {
    label: "DATA ANALYSIS AND VISUALIZATION",
    blurb: "Transform raw data into clear insights and interactive dashboards.",
    skills: ["Data Analysis", "Visualization"],
  },
  {
    label: "APIS AND INTEGRATIONS",
    blurb: "Clean APIs that plug your AI system into the tools your team already uses.",
    skills: ["API Integrations"],
  },
  {
    label: "DEPLOYMENT AND SUPPORT",
    blurb: "Ship to production with monitoring, documentation, and post-launch support.",
    skills: ["Deployment"],
  },
];

/** Flattened, in wheel order, each tagged with its cluster index. */
export const skillWheel = skillClusters.flatMap((c, ci) =>
  c.skills.map((name) => ({ name, cluster: ci }))
);
