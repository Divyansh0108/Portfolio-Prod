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
      className="group flex flex-col rounded-lg border border-[var(--border)] p-5 hover:border-[var(--muted-foreground)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-[var(--background)] h-full"
    >
      {/* Category + arrow */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          {project.category}
        </span>
        <ArrowUpRight
          size={14}
          className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-150"
        />
      </div>

      {/* Title + description */}
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.slice(0, 4).map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
        {project.tags.length > 4 && (
          <span className="text-[10px] text-[var(--muted-foreground)] self-center">
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      {/* Bullets — show max 2, rest behind "Read more" */}
      <ul className="space-y-1 flex-1">
        {project.bullets.slice(0, 2).map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-1.5 text-xs text-[var(--muted-foreground)]"
          >
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--muted-foreground)]" />
            <span className="line-clamp-1">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Read more if content was truncated */}
      {project.bullets.length > 2 && (
        <span className="mt-2 text-xs font-medium text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-150">
          Read more →
        </span>
      )}
    </Link>
  );
}
