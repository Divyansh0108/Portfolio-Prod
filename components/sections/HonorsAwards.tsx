"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { awards } from "@/lib/data";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export function HonorsAwards() {
  return (
    <motion.section
      id="honors-awards"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
      className="py-16 border-t border-[var(--border)]"
    >
      <motion.h2
        variants={fadeUp}
        className="text-base font-semibold text-[var(--foreground)] mb-6"
      >
        Honors &amp; Awards
      </motion.h2>

      <div className="space-y-4">
        {awards.map((award, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-4 hover:border-[var(--muted-foreground)] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[var(--muted)]">
              <Trophy size={14} className="text-[var(--muted-foreground)]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-wrap items-center gap-x-2">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {award.title}
                </h3>
                <span className="text-xs text-[var(--muted-foreground)]">
                  · {award.date}
                </span>
              </div>
              <p className="text-xs font-medium text-[var(--muted-foreground)]">
                {award.issuer}
              </p>
              <p className="text-sm text-[var(--muted-foreground)] leading-snug mt-0.5">
                {award.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
