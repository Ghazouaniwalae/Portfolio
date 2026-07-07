import type { PortalId } from "./projects";

export type { PortalId };

export interface RoiSlider {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  prefix?: string; // e.g. "$"
  suffix?: string; // e.g. "%"
}

export interface RoiPreset {
  /** compute yearly cost from the three slider values, keyed by slider.key */
  sliders: [RoiSlider, RoiSlider, RoiSlider];
  compute: (v: Record<string, number>) => number;
}

export interface Portal {
  id: PortalId;
  label: string;
  pain: string;
  headline: string;
  techStack: string;
  projects: string[];
  roi: RoiPreset;
}

export const portals: Record<PortalId, Portal> = {
  build: {
    id: "build",
    label: "BUILD",
    pain: "You have an idea. You need someone who can design, build, and deploy the whole system — not just a prototype.",
    headline: "AI products",
    techStack: "PyTorch · Transformers · LangGraph",
    projects: ["SmartShop AI", "FX AlphaLab"],
    roi: {
      sliders: [
        { key: "hours", label: "Hours/week of manual work", min: 1, max: 40, step: 1, default: 10 },
        { key: "rate", label: "Hourly cost", min: 5, max: 150, step: 5, default: 25, prefix: "$" },
        { key: "weeks", label: "Weeks/year", min: 20, max: 52, step: 1, default: 48 },
      ],
      compute: (v) => v.hours * v.rate * v.weeks,
    },
  },
  extract: {
    id: "extract",
    label: "EXTRACT",
    pain: "Your team spends hours reading PDFs, summarizing meetings, or copying data between tools. That's not a people problem — it's a systems problem.",
    headline: "Documents and workflows",
    techStack: "Whisper · MS Graph API · RAG",
    projects: ["Teams Summarizer"],
    roi: {
      sliders: [
        { key: "items", label: "Items/week", min: 5, max: 500, step: 5, default: 50 },
        { key: "minutes", label: "Minutes per item", min: 1, max: 60, step: 1, default: 8 },
        { key: "rate", label: "Hourly cost", min: 5, max: 150, step: 5, default: 20, prefix: "$" },
      ],
      compute: (v) => (v.items * v.minutes * 52 * v.rate) / 60,
    },
  },
  predict: {
    id: "predict",
    label: "PREDICT",
    pain: "You have data. You need decisions. Forecast trends, score performance, surface what a person would miss.",
    headline: "Predictions and audits",
    techStack: "SHAP · Fine-tuning · ChromaDB",
    projects: ["Critiq", "FX AlphaLab"],
    roi: {
      sliders: [
        { key: "decisions", label: "Forecast decisions/month", min: 1, max: 100, step: 1, default: 20 },
        { key: "cost", label: "Cost of a wrong call", min: 50, max: 2000, step: 50, default: 200, prefix: "$" },
        { key: "gut", label: "% made on gut feel", min: 0, max: 100, step: 5, default: 40, suffix: "%" },
      ],
      compute: (v) => v.decisions * 12 * v.cost * (v.gut / 100),
    },
  },
};

/** Portal card content (pain → headline → cta) in display order */
export const portalOrder: PortalId[] = ["build", "extract", "predict"];
