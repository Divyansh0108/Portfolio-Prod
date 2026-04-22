"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TagPill } from "./TagPill";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    card.style.boxShadow = "0 16px 40px -8px rgba(0,0,0,0.18)";

    if (glareRef.current) {
      const xPct = (x / rect.width) * 100;
      const yPct = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255,255,255,0.13) 0%, transparent 65%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const onMouseEnter = () => setHovered(true);

  const onMouseLeave = () => {
    setHovered(false);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    card.style.boxShadow = "";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  const extraBullets = project.bullets.slice(2);
  const hasExtra = extraBullets.length > 0;

  return (
    <Link
      ref={cardRef}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      id={`project-card-${project.id}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative flex flex-col rounded-lg border border-[var(--border)] p-5 hover:border-[var(--muted-foreground)] transition-[border-color] duration-200 bg-[var(--background)] overflow-hidden"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Glare overlay */}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300"
      />

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
        <p
          className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-prose transition-all duration-200"
          style={{ WebkitLineClamp: hovered ? "unset" : 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
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

      {/* Always-visible bullets */}
      <ul className="space-y-1">
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

      {/* Extra bullets revealed on hover */}
      <AnimatePresence initial={false}>
        {hovered && hasExtra && (
          <motion.ul
            key="extra"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mt-1 space-y-1"
          >
            {extraBullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-xs text-[var(--muted-foreground)]"
              >
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--muted-foreground)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* "Read more" hint when not hovered and there are extra bullets */}
      <AnimatePresence initial={false}>
        {!hovered && hasExtra && (
          <motion.span
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mt-2 text-xs font-medium text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-150"
          >
            Hover to expand →
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
