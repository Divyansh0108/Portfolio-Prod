import type { MetadataRoute } from "next";

function getBaseUrl() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

// Static last-modified dates — update these when pages change meaningfully.
// Using new Date() on every build falsely signals constant freshness to crawlers.
const PAGE_DATES = {
  home:     new Date("2025-04-11"),
  projects: new Date("2025-04-11"),
  research: new Date("2024-12-01"),
  writing:  new Date("2025-04-11"), // refreshed at ISR revalidation time (30 min)
  contact:  new Date("2025-01-01"),
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
      url: `${base}/contact`,
      lastModified: PAGE_DATES.contact,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
