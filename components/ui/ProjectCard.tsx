"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TagPill } from "./TagPill";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    // Max ±8° tilt
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    card.style.boxShadow = "0 16px 40px -8px rgba(0,0,0,0.18)";
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    card.style.boxShadow = "";
  };

  return (
    <Link
      ref={cardRef}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      id={`project-card-${project.id}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group flex flex-col rounded-lg border border-[var(--border)] p-5 hover:border-[var(--muted-foreground)] transition-[border-color] duration-200 bg-[var(--background)] h-full"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
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

      {/* Bullets */}
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

      {project.bullets.length > 2 && (
        <span className="mt-2 text-xs font-medium text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-150">
          Read more →
        </span>
      )}
    </Link>
  );
}
