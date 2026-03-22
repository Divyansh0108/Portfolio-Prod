"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { TagPill } from "@/components/ui/TagPill";
import { researchItems } from "@/lib/data";

export function FeaturedResearch() {
  const paper = researchItems[0]; // Single published paper

  return (
    <motion.section
      id="featured-research"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="py-16 border-t border-[var(--border)]"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-[var(--foreground)]">
          Publication
        </h2>
        <Link
          href="/research"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-150"
        >
          View research
          <ArrowRight size={13} />
        </Link>
      </div>

      <Link
        href={paper.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex gap-4 rounded-lg border border-[var(--border)] p-5 hover:border-[var(--muted-foreground)] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-150"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-[var(--muted)]">
          <FileText size={16} className="text-[var(--muted-foreground)]" />
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="text-xs font-medium text-[var(--foreground)]">
              {paper.venue}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">· {paper.date}</span>
          </div>
          <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--muted-foreground)] transition-colors">
            {paper.title}
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] leading-snug line-clamp-2">
            {paper.subtitle}
          </p>
          {paper.tags && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {paper.tags.map((tag) => (
                <TagPill key={tag} label={tag} />
              ))}
            </div>
          )}
        </div>
        <ArrowUpRight
          size={14}
          className="mt-0.5 flex-shrink-0 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors"
        />
      </Link>
    </motion.section>
  );
}
