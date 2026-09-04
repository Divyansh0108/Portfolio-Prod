import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TagPill } from "@/components/ui/TagPill";
import { projects } from "@/lib/data";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="featured-projects" className="py-12 border-t border-[var(--border)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-[var(--foreground)]">Projects</h2>
        <Link
          href="/projects"
          id="featured-projects-view-all"
          className="group inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] transition-[transform,color] duration-200 ease-[var(--ease-pop)] hover:-translate-y-0.5 hover:text-[var(--foreground)] active:translate-y-0 active:scale-95"
        >
          View all
          <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="flex flex-col">
        {featured.map((project) => (
          <Link
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            id={`featured-project-${project.id}`}
            className="group -mx-3 flex items-start justify-between gap-4 rounded-lg px-3 py-4 transition-[transform,background-color] duration-200 ease-[var(--ease-pop)] hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] active:translate-y-0"
          >
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {project.title}
                </h3>
                <span className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {project.tags.slice(0, 5).map((tag) => (
                  <TagPill key={tag} label={tag} />
                ))}
              </div>
            </div>
            <ArrowUpRight
              size={14}
              className="mt-0.5 flex-shrink-0 text-[var(--muted-foreground)] transition-all duration-150 group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
