"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardFade = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <motion.section
      id="featured-projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
      className="py-16 border-t border-[var(--border)]"
    >
      <motion.div variants={cardFade} className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-[var(--foreground)]">Projects</h2>
        <Link
          href="/projects"
          id="featured-projects-view-all"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-150"
        >
          View all projects
          <ArrowRight size={13} />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((project) => (
          <motion.div key={project.id} variants={cardFade}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
