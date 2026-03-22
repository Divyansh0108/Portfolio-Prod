"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  const [page, setPage] = useState(0);

  // 2 cards per page
  const perPage = 2;
  const totalPages = Math.ceil(featured.length / perPage);
  const start = page * perPage;
  const visible = featured.slice(start, start + perPage);

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  return (
    <motion.section
      id="featured-projects"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="py-16 border-t border-[var(--border)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-[var(--foreground)]">
          Projects
        </h2>
        <Link
          href="/projects"
          id="featured-projects-view-all"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-150"
        >
          View all projects
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {visible.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        {totalPages > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous projects"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all duration-150 shadow-sm"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={next}
              aria-label="Next projects"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all duration-150 shadow-sm"
            >
              <ChevronRight size={14} />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5 mt-5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === page
                  ? "w-5 bg-[var(--foreground)]"
                  : "w-1.5 bg-[var(--border)] hover:bg-[var(--muted-foreground)]"
              }`}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}
