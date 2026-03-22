"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";

const cards = [
  {
    id: "footer-cta-projects",
    title: "Projects",
    description: "Open-source tools and production systems I've built.",
    cta: "Explore →",
    href: "/projects",
  },
  {
    id: "footer-cta-research",
    title: "Research",
    description: "Published work in ML, computer vision, and sensor-based recognition.",
    cta: "Learn more →",
    href: "/research",
  },
  {
    id: "footer-cta-contact",
    title: "Work with me",
    description:
      "Open to research collaborations, ML roles, and interesting projects.",
    cta: "Get in touch",
    href: "/contact",
  },
];

export function FooterCTA() {
  return (
    <motion.section
      id="footer-cta"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="py-16 border-t border-[var(--border)]"
    >
      {/* 3-column CTA cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            id={card.id}
            className="group flex flex-col gap-2 rounded-lg border border-[var(--border)] p-5 hover:border-[var(--muted-foreground)] hover:shadow-sm transition-all duration-150"
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              {card.title}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] flex-1 leading-relaxed">
              {card.description}
            </p>
            <span className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--muted-foreground)] transition-colors duration-150 inline-flex items-center gap-1">
              {card.cta}
            </span>
          </Link>
        ))}
      </div>

      {/* Availability + contact */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-sm text-[var(--muted-foreground)] flex-1">
          Open to research collaborations, ML/AI roles, and impactful projects.
        </p>
        <Link
          href={`mailto:${siteConfig.email}`}
          id="footer-cta-email"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors duration-150"
        >
          <Mail size={13} />
          Email me
          <ArrowRight size={13} />
        </Link>
      </div>
    </motion.section>
  );
}
