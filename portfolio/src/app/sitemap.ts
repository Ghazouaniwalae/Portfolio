import type { MetadataRoute } from "next";
import { caseProjects } from "@/data/projects";

const base = "https://walaghazouani.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...caseProjects.map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
