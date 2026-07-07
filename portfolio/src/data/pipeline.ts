/** 07 — Pipeline reveal (Critiq architecture) + findings that pop per agent. */

export interface PipelineStage {
  id: string;
  label: string;
  /** agents render as a cluster */
  agents?: string[];
}

export const pipelineStages: PipelineStage[] = [
  { id: "input", label: "URL Input" },
  { id: "scraper", label: "Hybrid Scraper" },
  {
    id: "agents",
    label: "6 Parallel Agents",
    agents: ["Visual", "Copy", "Navigation", "Mobile", "Speed", "Journey"],
  },
  { id: "scoring", label: "RAG-Grounded Scoring" },
  { id: "fuser", label: "Verdict Fuser" },
  { id: "report", label: "Report" },
];

export type Severity = "HIGH" | "MED" | "LOW";

export interface Finding {
  severity: Severity;
  agent: string;
  text: string;
}

/** Severity-ordered, as popped at each agent. */
export const findings: Finding[] = [
  { severity: "HIGH", agent: "Visual", text: "Primary CTA contrast below WCAG AA minimum" },
  { severity: "HIGH", agent: "Navigation", text: "No security badge, contact address, or reviews visible" },
  { severity: "HIGH", agent: "Mobile", text: "Primary CTA below the fold on a standard phone" },
  { severity: "HIGH", agent: "Navigation", text: "Contact form: no inline validation, unlabeled fields" },
  { severity: "MED", agent: "Copy", text: "Headline doesn't say what the product does or who it's for" },
  { severity: "MED", agent: "Copy", text: "Long paragraphs, no subheadings" },
  { severity: "MED", agent: "Speed", text: "Largest image uncompressed, slowing first paint" },
  { severity: "MED", agent: "Journey", text: "Unclear within seconds why to stay" },
  { severity: "LOW", agent: "Visual", text: "No typographic hierarchy" },
];

/** 16 — three preview findings shown under the close form. */
export const previewFindings: string[] = [
  "Primary CTA contrast below the WCAG AA minimum",
  "No security badge, contact address, or reviews visible",
  "Primary CTA below the fold on a standard phone",
];
