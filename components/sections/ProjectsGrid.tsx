"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

export function ProjectsGrid() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  const toggle = (tag: string) => setActiveTag(activeTag === tag ? null : tag);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all duration-150 ${
            activeTag === null
              ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] font-medium"
              : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          {activeTag === null && <Check size={10} strokeWidth={3} />}
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all duration-150 ${
              activeTag === tag
                ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] font-medium"
                : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {activeTag === tag && <Check size={10} strokeWidth={3} />}
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--muted-foreground)] py-8 text-center">
          No projects match this filter.
        </p>
      )}
    </div>
  );
}
