import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Open-source tools, libraries, and apps I've shipped.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-16">
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
