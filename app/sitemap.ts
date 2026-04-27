import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/data";

// Static last-modified dates — update these when pages change meaningfully.
// Using new Date() on every build falsely signals constant freshness to crawlers.
const PAGE_DATES = {
  home:     new Date("2026-04-22"),
  projects: new Date("2026-04-22"),
  research: new Date("2026-01-15"),
  writing:  new Date("2026-04-22"), // refreshed at ISR revalidation time (30 min)
  contact:  new Date("2025-01-01"),
  beyond:   new Date("2026-04-22"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();

  return [
    {
      url: base,
      lastModified: PAGE_DATES.home,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/projects`,
      lastModified: PAGE_DATES.projects,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/research`,
      lastModified: PAGE_DATES.research,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/writing`,
      lastModified: PAGE_DATES.writing,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/beyond`,
      lastModified: PAGE_DATES.beyond,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/contact`,
      lastModified: PAGE_DATES.contact,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
