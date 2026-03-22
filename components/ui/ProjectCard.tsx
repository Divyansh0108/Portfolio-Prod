import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TagPill } from "./TagPill";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      id={`project-card-${project.id}`}
      className="group flex flex-col gap-3 rounded-lg border border-[var(--border)] p-5 hover:border-[var(--muted-foreground)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-[var(--background)]"
    >
      {/* Category + arrow */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          {project.category}
        </span>
        <ArrowUpRight
          size={14}
          className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-150"
        />
      </div>

      {/* Title + description */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>

      {/* Bullets */}
      <ul className="space-y-1">
        {project.bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-1.5 text-xs text-[var(--muted-foreground)]"
          >
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--muted-foreground)]" />
            {bullet}
          </li>
        ))}
      </ul>
    </Link>
  );
}
