"use client";

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
      className="group relative flex h-full min-h-[300px] flex-col rounded-lg border border-[var(--border)] bg-[var(--background)] p-5 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-smooth)] hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[0_14px_34px_-22px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          {project.category}
        </span>
        <ArrowUpRight
          size={14}
          className="text-[var(--muted-foreground)] transition-[transform,color] duration-300 ease-[var(--ease-smooth)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--foreground)]"
        />
      </div>

      <div className="mb-3">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
          {project.title}
        </h3>
        <p className="line-clamp-3 text-sm text-[var(--muted-foreground)] leading-relaxed max-w-prose">
          {project.description}
        </p>
      </div>

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

      <ul className="mt-auto space-y-1.5">
        {project.bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-1.5 text-xs text-[var(--muted-foreground)]"
          >
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--muted-foreground)]" />
            <span className="line-clamp-1">
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
