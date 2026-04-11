import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Open-source tools, libraries, and apps I've shipped.",
};

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Divyansh Pandey",
  url: `${baseUrl}/projects`,
  itemListElement: projects.map((project, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "SoftwareApplication",
      name: project.title,
      description: project.description,
      applicationCategory: project.category,
      url: project.href,
      author: {
        "@type": "Person",
        name: "Divyansh Pandey",
        url: baseUrl,
      },
    },
  })),
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <div className="mb-10">
        <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          Work
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Projects
        </h1>
        <p className="mt-2 text-[0.925rem] text-[var(--muted-foreground)] max-w-lg">
          A collection of open-source tools, experiments, and production systems
          I've built or contributed to.
        </p>
      </div>

      <ProjectsGrid />
    </div>
  );
}
